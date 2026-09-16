type Listener = (e: MediaQueryListEvent) => void

interface SafeMQ {
  matches: boolean
  addEventListener: (type: string, cb: Listener) => void
  removeEventListener: (type: string, cb: Listener) => void
}

const noop = () => {}

/** matchMedia is not universal (older browsers, jsdom, some embeds). */
export function safeMedia(query: string): SafeMQ {
  if (typeof window !== 'undefined' && typeof window.matchMedia === 'function') {
    return window.matchMedia(query)
  }
  return { matches: false, addEventListener: noop as unknown as any, removeEventListener: noop as unknown as any }
}

export function usePrefersFinePointer(): boolean {
  if (typeof window === 'undefined') return false
  return safeMedia('(pointer: fine)').matches
}