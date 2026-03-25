import { LiteElement, html, css, property } from '@vandeurenglenn/lite'

export class CustomCapture extends LiteElement {
  @property({ type: String }) accessor label = 'Capture'

  static styles = [
    css`
      :host {
        display: block;
        padding: 1rem;
        border: 1px solid #ccc;
        border-radius: 8px;
        background: #fafafa;
        font-family: inherit;
        max-width: 300px;
      }
      button {
        padding: 0.5rem 1rem;
        font-size: 1rem;
        border: none;
        border-radius: 4px;
        background: #1976d2;
        color: #fff;
        cursor: pointer;
        transition: background 0.2s;
      }
      button:hover {
        background: #1565c0;
      }
      video,
      canvas {
        display: block;
        margin: 1rem 0;
        max-width: 100%;
        border-radius: 4px;
      }
    `
  ]

  private stream: MediaStream | null = null
  private videoRef?: HTMLVideoElement
  private canvasRef?: HTMLCanvasElement

  render() {
    return html`
      <button @click=${this.startCamera}>${this.label}</button>
      <video
        id="video"
        autoplay
        playsinline
        style="display:none;"></video>
      <canvas
        id="canvas"
        style="display:none;"></canvas>
      <button
        @click=${this.captureImage}
        ?disabled=${!this.stream}>
        Take Snapshot
      </button>
      <button
        @click=${this.stopCamera}
        ?disabled=${!this.stream}>
        Stop
      </button>
    `
  }

  firstRender() {
    this.videoRef = this.shadowRoot?.getElementById('video') as HTMLVideoElement
    this.canvasRef = this.shadowRoot?.getElementById('canvas') as HTMLCanvasElement
  }

  async startCamera() {
    if (!navigator.mediaDevices?.getUserMedia) return
    this.stream = await navigator.mediaDevices.getUserMedia({ video: true })
    if (this.videoRef) {
      this.videoRef.srcObject = this.stream
      this.videoRef.style.display = 'block'
    }
  }

  captureImage() {
    if (!this.videoRef || !this.canvasRef) return
    const video = this.videoRef
    const canvas = this.canvasRef
    canvas.width = video.videoWidth
    canvas.height = video.videoHeight
    canvas.getContext('2d')?.drawImage(video, 0, 0, canvas.width, canvas.height)
    canvas.style.display = 'block'
    this.dispatchEvent(
      new CustomEvent('capture', {
        detail: { image: canvas.toDataURL('image/png') }
      })
    )
  }

  stopCamera() {
    if (this.stream) {
      this.stream.getTracks().forEach((track) => track.stop())
      this.stream = null
    }
    if (this.videoRef) {
      this.videoRef.srcObject = null
      this.videoRef.style.display = 'none'
    }
    if (this.canvasRef) {
      this.canvasRef.style.display = 'none'
    }
  }
}
customElements.define('custom-capture', CustomCapture)
