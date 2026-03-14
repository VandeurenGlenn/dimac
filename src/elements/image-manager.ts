import { LiteElement, html, property } from '@vandeurenglenn/lite'

type AssetEntry = {
  fileName: string
  label: string
  preview: string
  source: 'manifest' | 'filesystem'
  order: number | null
}

const IMAGE_EXTENSIONS = ['.png', '.jpg', '.jpeg', '.webp', '.gif', '.heic', '.avif']

export class DimacImageManager extends LiteElement {
  @property({ type: Object }) accessor manifest: Record<string, string[]> = {}

  @property({ type: Object }) accessor projectFiles: Record<string, AssetEntry[]> = {}

  @property({ type: Array }) accessor projectNames: string[] = []

  @property({ type: String }) accessor selectedProject = ''

  @property({ type: String }) accessor newProjectName = ''

  @property({ type: String }) accessor renameProjectName = ''

  @property({ type: String }) accessor status = 'Kies de lokale src/assets-map om beelden te beheren.'

  @property({ type: Boolean }) accessor busy = false

  @property({ type: Boolean }) accessor directoryReady = false

  @property({ type: Boolean }) accessor browserSupported = typeof showDirectoryPicker === 'function'

  @property({ type: Boolean }) accessor dropActive = false

  accessor assetsDirectoryHandle: FileSystemDirectoryHandle | undefined

  accessor filePicker: HTMLInputElement | undefined

  #objectUrls = new Set<string>()

  #dropDepth = 0

  firstRender() {
    this.#seedFromManifest()
  }

  onChange(propertyKey: string) {
    if (propertyKey === 'manifest' && !this.directoryReady) {
      this.#seedFromManifest()
    }
  }

  disconnectedCallback(): void {
    super.disconnectedCallback()
    for (const url of this.#objectUrls) URL.revokeObjectURL(url)
    this.#objectUrls.clear()
  }

  #seedFromManifest() {
    const projectFiles = Object.fromEntries(
      Object.entries(this.manifest || {}).map(([project, images]) => [
        project,
        (images || []).map((image) => ({
          fileName: image.split('/').pop() || image,
          label: this.#stripOrderPrefix(image.split('/').pop() || image),
          preview: image,
          source: 'manifest' as const,
          order: this.#readOrderPrefix(image.split('/').pop() || image)
        }))
      ])
    )

    const projectNames = Object.keys(projectFiles).sort((left, right) => left.localeCompare(right, 'nl'))

    this.projectFiles = projectFiles
    this.projectNames = projectNames
    if (!projectNames.includes(this.selectedProject)) {
      this.selectedProject = projectNames[0] || ''
    }
    this.renameProjectName = this.selectedProject
  }

  #readOrderPrefix(name: string) {
    const match = /^(\d+)__(.+)$/.exec(name)
    if (!match) return null
    return Number.parseInt(match[1], 10)
  }

  #stripOrderPrefix(name: string) {
    const match = /^(\d+)__(.+)$/.exec(name)
    return match ? match[2] : name
  }

  #buildOrderedName(index: number, fileName: string) {
    const label = this.#stripOrderPrefix(fileName)
    return `${String(index + 1).padStart(3, '0')}__${label}`
  }

  #sortAssetEntries(entries: AssetEntry[]) {
    entries.sort((left, right) => {
      if (left.order !== null && right.order !== null && left.order !== right.order) {
        return left.order - right.order
      }
      if (left.order !== null && right.order === null) return -1
      if (left.order === null && right.order !== null) return 1
      return left.fileName.localeCompare(right.fileName, 'nl')
    })
  }

  async #ensurePermission(handle: FileSystemHandle) {
    const descriptor = { mode: 'readwrite' as const }
    if ((await handle.queryPermission(descriptor)) === 'granted') return true
    return (await handle.requestPermission(descriptor)) === 'granted'
  }

  async #selectAssetsDirectory() {
    if (!this.browserSupported) return

    try {
      const handle = await showDirectoryPicker({ mode: 'readwrite', startIn: 'pictures' })
      const granted = await this.#ensurePermission(handle)
      if (!granted) {
        this.status = 'Geen schrijfrechten op de gekozen map.'
        return
      }

      this.assetsDirectoryHandle = handle
      await this.#loadProjectsFromDirectory()
      this.status = `Beheer actief op map: ${handle.name}`
    } catch (error) {
      if ((error as DOMException)?.name === 'AbortError') return
      this.status = 'Kon de assets-map niet openen.'
    }
  }

  async #loadProjectsFromDirectory() {
    if (!this.assetsDirectoryHandle) return

    this.busy = true

    const nextProjectFiles: Record<string, AssetEntry[]> = {}

    for (const url of this.#objectUrls) URL.revokeObjectURL(url)
    this.#objectUrls.clear()

    try {
      for await (const entry of this.assetsDirectoryHandle.values()) {
        if (entry.kind !== 'directory') continue
        const projectHandle = entry as FileSystemDirectoryHandle
        const files: AssetEntry[] = []

        for await (const asset of projectHandle.values()) {
          if (asset.kind !== 'file' || !this.#isImageFile(asset.name)) continue
          const file = await (asset as FileSystemFileHandle).getFile()
          const preview = URL.createObjectURL(file)
          this.#objectUrls.add(preview)
          files.push({
            fileName: asset.name,
            label: this.#stripOrderPrefix(asset.name),
            preview,
            source: 'filesystem',
            order: this.#readOrderPrefix(asset.name)
          })
        }

        this.#sortAssetEntries(files)
        nextProjectFiles[projectHandle.name] = files
      }

      const projectNames = Object.keys(nextProjectFiles).sort((left, right) => left.localeCompare(right, 'nl'))
      this.projectFiles = nextProjectFiles
      this.projectNames = projectNames
      this.directoryReady = true
      if (!projectNames.includes(this.selectedProject)) {
        this.selectedProject = projectNames[0] || ''
      }
      this.renameProjectName = this.selectedProject
    } finally {
      this.busy = false
    }
  }

  #isImageFile(name: string) {
    const lower = name.toLowerCase()
    return IMAGE_EXTENSIONS.some((extension) => lower.endsWith(extension))
  }

  #sanitizeProjectName(value: string) {
    return value
      .trim()
      .replace(/[\\/:*?"<>|]+/g, ' ')
      .replace(/\s+/g, ' ')
  }

  #sanitizeFileName(name: string) {
    const cleaned = name.trim().replace(/[\\/:*?"<>|]+/g, '-')
    return cleaned || `beeld-${Date.now()}.jpg`
  }

  async #createProject() {
    if (!this.assetsDirectoryHandle) {
      this.status = 'Kies eerst een assets-map.'
      return
    }

    const projectName = this.#sanitizeProjectName(this.newProjectName)
    if (!projectName) {
      this.status = 'Geef eerst een projectnaam op.'
      return
    }

    this.busy = true
    try {
      await this.assetsDirectoryHandle.getDirectoryHandle(projectName, { create: true })
      this.newProjectName = ''
      await this.#loadProjectsFromDirectory()
      this.selectedProject = projectName
      this.status = `Projectmap aangemaakt: ${projectName}`
    } finally {
      this.busy = false
    }
  }

  async #renameProject() {
    if (!this.assetsDirectoryHandle || !this.selectedProject) {
      this.status = 'Selecteer eerst een projectmap.'
      return
    }

    const currentName = this.selectedProject
    const nextName = this.#sanitizeProjectName(this.renameProjectName)
    if (!nextName) {
      this.status = 'Geef eerst een nieuwe projectnaam op.'
      return
    }
    if (nextName === currentName) {
      this.status = 'De projectnaam is ongewijzigd.'
      return
    }
    if (this.projectNames.includes(nextName)) {
      this.status = 'Er bestaat al een projectmap met die naam.'
      return
    }

    this.busy = true
    try {
      const currentHandle = await this.assetsDirectoryHandle.getDirectoryHandle(currentName)
      const nextHandle = await this.assetsDirectoryHandle.getDirectoryHandle(nextName, { create: true })

      for await (const entry of currentHandle.values()) {
        if (entry.kind !== 'file') continue
        await this.#copyFile(currentHandle, entry.name, nextHandle, entry.name)
      }

      await this.assetsDirectoryHandle.removeEntry(currentName, { recursive: true })
      await this.#loadProjectsFromDirectory()
      this.selectedProject = nextName
      this.renameProjectName = nextName
      this.status = `Projectmap hernoemd naar ${nextName}.`
    } finally {
      this.busy = false
    }
  }

  async #openFilePicker() {
    if (!this.assetsDirectoryHandle) {
      this.status = 'Kies eerst een assets-map.'
      return
    }

    if (!this.selectedProject) {
      this.status = 'Selecteer eerst een projectmap.'
      return
    }

    if (!this.filePicker) {
      this.filePicker = document.createElement('input')
      this.filePicker.type = 'file'
      this.filePicker.accept = 'image/*'
      this.filePicker.multiple = true
      this.filePicker.addEventListener('change', async () => {
        const files = this.filePicker?.files
        if (files?.length) {
          await this.#uploadFiles(Array.from(files))
        }
        if (this.filePicker) this.filePicker.value = ''
      })
    }

    this.filePicker.click()
  }

  async #uploadFiles(files: File[]) {
    if (!this.assetsDirectoryHandle || !this.selectedProject || !files.length) return

    this.busy = true
    try {
      const projectHandle = await this.assetsDirectoryHandle.getDirectoryHandle(this.selectedProject, { create: true })

      for (const file of files) {
        const fileName = await this.#nextAvailableFileName(projectHandle, this.#sanitizeFileName(file.name))
        const fileHandle = await projectHandle.getFileHandle(fileName, { create: true })
        const writable = await fileHandle.createWritable()
        await writable.write(file)
        await writable.close()
      }

      await this.#loadProjectsFromDirectory()
      this.status = `${files.length} beeld${files.length === 1 ? '' : 'en'} toegevoegd aan ${this.selectedProject}.`
    } finally {
      this.busy = false
    }
  }

  async #copyFile(
    sourceDirectory: FileSystemDirectoryHandle,
    sourceName: string,
    targetDirectory: FileSystemDirectoryHandle,
    targetName: string
  ) {
    const sourceHandle = await sourceDirectory.getFileHandle(sourceName)
    const file = await sourceHandle.getFile()
    const targetHandle = await targetDirectory.getFileHandle(targetName, { create: true })
    const writable = await targetHandle.createWritable()
    await writable.write(file)
    await writable.close()
  }

  async #persistProjectOrder(project: string, orderedEntries: AssetEntry[]) {
    if (!this.assetsDirectoryHandle) return

    const projectHandle = await this.assetsDirectoryHandle.getDirectoryHandle(project)
    const tempStamp = Date.now()
    const tempNames = orderedEntries.map((entry, index) => {
      const extensionIndex = entry.fileName.lastIndexOf('.')
      const extension = extensionIndex >= 0 ? entry.fileName.slice(extensionIndex) : ''
      return `.__dimac_tmp__${tempStamp}__${index}${extension}`
    })

    for (let index = 0; index < orderedEntries.length; index += 1) {
      await this.#copyFile(projectHandle, orderedEntries[index].fileName, projectHandle, tempNames[index])
      await projectHandle.removeEntry(orderedEntries[index].fileName)
    }

    for (let index = 0; index < orderedEntries.length; index += 1) {
      await this.#copyFile(
        projectHandle,
        tempNames[index],
        projectHandle,
        this.#buildOrderedName(index, orderedEntries[index].fileName)
      )
      await projectHandle.removeEntry(tempNames[index])
    }
  }

  async #moveImage(fileName: string, direction: -1 | 1) {
    if (!this.assetsDirectoryHandle || !this.selectedProject) return

    const currentEntries = [...this.#selectedEntries].filter((entry) => entry.source === 'filesystem')
    const currentIndex = currentEntries.findIndex((entry) => entry.fileName === fileName)
    const nextIndex = currentIndex + direction
    if (currentIndex < 0 || nextIndex < 0 || nextIndex >= currentEntries.length) return

    const [entry] = currentEntries.splice(currentIndex, 1)
    currentEntries.splice(nextIndex, 0, entry)

    this.busy = true
    try {
      await this.#persistProjectOrder(this.selectedProject, currentEntries)
      await this.#loadProjectsFromDirectory()
      this.status = `Volgorde bijgewerkt voor ${this.selectedProject}.`
    } finally {
      this.busy = false
    }
  }

  async #nextAvailableFileName(projectHandle: FileSystemDirectoryHandle, fileName: string) {
    const extensionIndex = fileName.lastIndexOf('.')
    const baseName = extensionIndex >= 0 ? fileName.slice(0, extensionIndex) : fileName
    const extension = extensionIndex >= 0 ? fileName.slice(extensionIndex) : ''

    let index = 0
    let candidate = fileName

    while (true) {
      try {
        await projectHandle.getFileHandle(candidate)
        index += 1
        candidate = `${baseName}-${index}${extension}`
      } catch {
        return candidate
      }
    }
  }

  async #deleteImage(project: string, fileName: string) {
    if (!this.assetsDirectoryHandle) return
    if (!globalThis.confirm(`Verwijder ${fileName} uit ${project}?`)) return

    this.busy = true
    try {
      const projectHandle = await this.assetsDirectoryHandle.getDirectoryHandle(project)
      await projectHandle.removeEntry(fileName)
      await this.#loadProjectsFromDirectory()
      this.status = `${fileName} verwijderd uit ${project}.`
    } finally {
      this.busy = false
    }
  }

  async #deleteProject() {
    if (!this.assetsDirectoryHandle || !this.selectedProject) return
    if (!globalThis.confirm(`Verwijder projectmap ${this.selectedProject} inclusief alle beelden?`)) return

    this.busy = true
    try {
      await this.assetsDirectoryHandle.removeEntry(this.selectedProject, { recursive: true })
      const removedProject = this.selectedProject
      await this.#loadProjectsFromDirectory()
      this.status = `Projectmap verwijderd: ${removedProject}`
    } finally {
      this.busy = false
    }
  }

  #selectProject(project: string) {
    this.selectedProject = project
    this.renameProjectName = project
  }

  #onDropAreaEnter(event: DragEvent) {
    event.preventDefault()
    this.#dropDepth += 1
    this.dropActive = true
  }

  #onDropAreaLeave(event: DragEvent) {
    event.preventDefault()
    this.#dropDepth = Math.max(0, this.#dropDepth - 1)
    if (!this.#dropDepth) this.dropActive = false
  }

  #onDropAreaOver(event: DragEvent) {
    event.preventDefault()
    event.dataTransfer!.dropEffect = 'copy'
  }

  async #onDropAreaDrop(event: DragEvent) {
    event.preventDefault()
    this.#dropDepth = 0
    this.dropActive = false

    const files = Array.from(event.dataTransfer?.files || []).filter((file) => file.type.startsWith('image/'))
    if (!files.length) {
      this.status = 'Sleep een of meer afbeeldingsbestanden naar de dropzone.'
      return
    }

    await this.#uploadFiles(files)
  }

  get #selectedEntries() {
    return this.projectFiles[this.selectedProject] || []
  }

  render() {
    return html`
      <style>
        :host {
          display: grid;
          gap: 24px;
          width: 100%;
        }

        .manager {
          display: grid;
          gap: 24px;
          padding: clamp(20px, 3vw, 28px);
          border-radius: 24px;
          border: var(--surface-border);
          background: rgba(20, 15, 12, 0.82);
        }

        .toolbar,
        .create-row,
        .content,
        .project-list,
        .image-grid,
        .image-card,
        .empty-state {
          display: grid;
          gap: 14px;
        }

        .toolbar {
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          align-items: start;
        }

        .toolbar-copy,
        .toolbar-actions,
        .panel,
        .empty-state,
        .image-card {
          padding: 18px;
          border-radius: 20px;
          border: 1px solid rgba(204, 173, 150, 0.12);
          background: rgba(33, 25, 21, 0.88);
        }

        .toolbar-actions,
        .panel {
          align-content: start;
        }

        .eyebrow {
          display: inline-flex;
          width: fit-content;
          padding: 6px 12px;
          border-radius: 999px;
          background: rgba(168, 84, 39, 0.14);
          color: var(--md-sys-color-primary);
          text-transform: uppercase;
          letter-spacing: 0.12em;
          font-size: 11px;
          font-weight: 800;
        }

        h3,
        h4,
        p {
          margin: 0;
        }

        h3,
        h4 {
          font-family: var(--font-display);
          color: var(--md-sys-color-on-surface);
        }

        p,
        .hint,
        .status {
          color: var(--md-sys-color-on-surface-variant);
          line-height: 1.7;
        }

        .status {
          font-size: 13px;
        }

        .toolbar-actions,
        .create-row,
        .project-list,
        .image-actions,
        .image-meta,
        .rename-row,
        .drop-zone {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
        }

        .content {
          grid-template-columns: minmax(220px, 280px) minmax(0, 1fr);
        }

        .project-list {
          flex-direction: column;
        }

        button,
        input {
          border: 0;
          font: inherit;
          border-radius: 14px;
        }

        button {
          cursor: pointer;
          padding: 12px 16px;
          font-weight: 700;
          color: var(--md-sys-color-on-primary);
          background: linear-gradient(135deg, #a85427 0%, #cf7540 100%);
        }

        button.secondary {
          background: rgba(168, 84, 39, 0.12);
          color: var(--md-sys-color-on-surface);
          border: 1px solid rgba(168, 84, 39, 0.22);
        }

        button.ghost {
          background: rgba(255, 255, 255, 0.04);
          color: var(--md-sys-color-on-surface-variant);
        }

        button:disabled {
          cursor: progress;
          opacity: 0.6;
        }

        input {
          width: 100%;
          padding: 13px 15px;
          color: var(--md-sys-color-on-surface);
          background: rgba(12, 10, 9, 0.76);
          border: 1px solid rgba(204, 173, 150, 0.14);
        }

        .project-button {
          justify-content: flex-start;
          background: rgba(255, 255, 255, 0.04);
          color: var(--md-sys-color-on-surface);
        }

        .project-button[selected] {
          background: rgba(168, 84, 39, 0.18);
          border: 1px solid rgba(168, 84, 39, 0.34);
        }

        .image-grid {
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
        }

        .drop-zone {
          align-items: center;
          justify-content: center;
          min-height: 120px;
          padding: 18px;
          border-radius: 18px;
          border: 1px dashed rgba(168, 84, 39, 0.34);
          background: rgba(168, 84, 39, 0.06);
          color: var(--md-sys-color-on-surface-variant);
          text-align: center;
          transition:
            border-color 160ms ease,
            background-color 160ms ease,
            transform 160ms ease;
        }

        .drop-zone[active] {
          border-color: rgba(168, 84, 39, 0.72);
          background: rgba(168, 84, 39, 0.14);
          transform: scale(1.01);
        }

        .rename-row {
          align-items: center;
        }

        .rename-row input {
          flex: 1 1 260px;
        }

        .image-card img {
          width: 100%;
          aspect-ratio: 4 / 3;
          object-fit: cover;
          border-radius: 16px;
        }

        .image-meta {
          align-items: center;
          justify-content: space-between;
        }

        .tag {
          display: inline-flex;
          padding: 4px 10px;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.06);
          color: var(--md-sys-color-on-surface-variant);
          font-size: 12px;
          font-weight: 700;
        }

        @media (max-width: 980px) {
          .content {
            grid-template-columns: 1fr;
          }
        }
      </style>

      <section class="manager">
        <div class="toolbar">
          <div class="toolbar-copy">
            <span class="eyebrow">Admin</span>
            <h3>Beelden beheren</h3>
            <p>
              Kies de lokale src/assets-map van dit project. Uploads en verwijderingen gebeuren rechtstreeks in die map,
              waarna de bestaande build de webp-bestanden en het manifest opnieuw genereert.
            </p>
            <span class="status">${this.status}</span>
          </div>

          <div class="toolbar-actions">
            <button
              ?disabled=${this.busy || !this.browserSupported}
              @click=${() => this.#selectAssetsDirectory()}>
              ${this.directoryReady ? 'Andere assets-map kiezen' : 'Assets-map kiezen'}
            </button>
            <button
              class="secondary"
              ?disabled=${this.busy || !this.directoryReady || !this.selectedProject}
              @click=${() => this.#openFilePicker()}>
              Beelden uploaden
            </button>
            <button
              class="ghost"
              ?disabled=${this.busy || !this.directoryReady || !this.selectedProject}
              @click=${() => this.#deleteProject()}>
              Projectmap verwijderen
            </button>
            <span class="hint">
              ${this.browserSupported
                ? 'Na wijzigingen volstaat de bestaande watch/build om de publieke galerij te verversen. Drag-and-drop werkt ook op de geselecteerde projectmap.'
                : 'Deze browser ondersteunt geen schrijvende maptoegang. Gebruik hiervoor Chrome of Edge.'}
            </span>
          </div>
        </div>

        <div class="create-row">
          <input
            .value=${this.newProjectName}
            ?disabled=${this.busy || !this.directoryReady}
            @input=${(event) => (this.newProjectName = (event.target as HTMLInputElement).value)}
            placeholder="Nieuwe projectmap, bv. nieuw project diest" />
          <button
            ?disabled=${this.busy || !this.directoryReady}
            @click=${() => this.#createProject()}>
            Projectmap aanmaken
          </button>
        </div>

        <div class="content">
          <aside class="panel project-list">
            <h4>Projecten</h4>
            ${this.projectNames.length
              ? this.projectNames.map(
                  (project) => html`
                    <button
                      class="project-button"
                      ?selected=${this.selectedProject === project}
                      @click=${() => this.#selectProject(project)}>
                      ${project}
                    </button>
                  `
                )
              : html`<div class="empty-state">
                  <p>Nog geen projecten gevonden in de gekozen map of het huidige manifest.</p>
                </div>`}
          </aside>

          <section class="panel">
            <h4>${this.selectedProject || 'Geen project geselecteerd'}</h4>
            <div class="rename-row">
              <input
                .value=${this.renameProjectName}
                ?disabled=${this.busy || !this.directoryReady || !this.selectedProject}
                @input=${(event) => (this.renameProjectName = (event.target as HTMLInputElement).value)}
                placeholder="Nieuwe naam voor geselecteerde projectmap" />
              <button
                class="secondary"
                ?disabled=${this.busy || !this.directoryReady || !this.selectedProject}
                @click=${() => this.#renameProject()}>
                Project hernoemen
              </button>
            </div>
            <div
              class="drop-zone"
              ?active=${this.dropActive}
              @dragenter=${(event) => this.#onDropAreaEnter(event)}
              @dragleave=${(event) => this.#onDropAreaLeave(event)}
              @dragover=${(event) => this.#onDropAreaOver(event)}
              @drop=${(event) => this.#onDropAreaDrop(event)}>
              Sleep beelden hierheen om ze direct toe te voegen aan ${this.selectedProject || 'de gekozen projectmap'}.
            </div>
            ${this.#selectedEntries.length
              ? html`
                  <div class="image-grid">
                    ${this.#selectedEntries.map(
                      (entry, index) => html`
                        <article class="image-card">
                          <img
                            src=${entry.preview}
                            alt=${entry.label} />
                          <div class="image-meta">
                            <strong>${entry.label}</strong>
                            <span class="tag">${entry.source === 'filesystem' ? 'lokaal' : 'manifest'}</span>
                          </div>
                          <div class="image-actions">
                            <button
                              class="ghost"
                              ?disabled=${this.busy ||
                              !this.directoryReady ||
                              entry.source !== 'filesystem' ||
                              index === 0}
                              @click=${() => this.#moveImage(entry.fileName, -1)}>
                              Omhoog
                            </button>
                            <button
                              class="ghost"
                              ?disabled=${this.busy ||
                              !this.directoryReady ||
                              entry.source !== 'filesystem' ||
                              index === this.#selectedEntries.length - 1}
                              @click=${() => this.#moveImage(entry.fileName, 1)}>
                              Omlaag
                            </button>
                            <button
                              class="ghost"
                              ?disabled=${this.busy || !this.directoryReady || entry.source !== 'filesystem'}
                              @click=${() => this.#deleteImage(this.selectedProject, entry.fileName)}>
                              Verwijderen
                            </button>
                          </div>
                        </article>
                      `
                    )}
                  </div>
                `
              : html`
                  <div class="empty-state">
                    <p>
                      ${this.selectedProject
                        ? 'Deze projectmap bevat nog geen beelden.'
                        : 'Selecteer een project om beelden te bekijken of te uploaden.'}
                    </p>
                  </div>
                `}
          </section>
        </div>
      </section>
    `
  }
}

customElements.define('dimac-image-manager', DimacImageManager)
