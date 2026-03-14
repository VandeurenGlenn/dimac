import { adminPasswordHash } from './generated/admin-config.js'

const ADMIN_SESSION_KEY = 'dimac-admin-authenticated'
const ADMIN_EVENT = 'dimac-admin-session-changed'

const toHex = (buffer: ArrayBuffer) =>
  [...new Uint8Array(buffer)].map((value) => value.toString(16).padStart(2, '0')).join('')

export const adminAuthEnabled = Boolean(adminPasswordHash)

export const isAdminLoggedIn = () => {
  if (!adminAuthEnabled) return false
  return globalThis.sessionStorage?.getItem(ADMIN_SESSION_KEY) === 'true'
}

export const notifyAdminSessionChange = () => {
  globalThis.dispatchEvent(
    new CustomEvent(ADMIN_EVENT, {
      detail: { loggedIn: isAdminLoggedIn() }
    })
  )
}

export const onAdminSessionChange = (listener: (loggedIn: boolean) => void) => {
  const handler = (event: Event) => {
    const detail = (event as CustomEvent<{ loggedIn?: boolean }>).detail
    listener(Boolean(detail?.loggedIn))
  }

  globalThis.addEventListener(ADMIN_EVENT, handler)
  return () => globalThis.removeEventListener(ADMIN_EVENT, handler)
}

export const loginAdmin = async (password: string) => {
  if (!adminAuthEnabled) return false

  const normalizedPassword = password.trim()
  if (!normalizedPassword) return false

  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(normalizedPassword))
  const matches = toHex(digest) === adminPasswordHash

  if (matches) {
    globalThis.sessionStorage?.setItem(ADMIN_SESSION_KEY, 'true')
  } else {
    globalThis.sessionStorage?.removeItem(ADMIN_SESSION_KEY)
  }

  notifyAdminSessionChange()
  return matches
}

export const logoutAdmin = () => {
  globalThis.sessionStorage?.removeItem(ADMIN_SESSION_KEY)
  notifyAdminSessionChange()
}
