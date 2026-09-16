import type Lenis from 'lenis'

let instance: Lenis | null = null

export function setLenis(lenis: Lenis | null): void {
  instance = lenis
}

export function getLenis(): Lenis | null {
  return instance
}

export interface ScrollTargetOptions {
  offset?: number
  immediate?: boolean
}

export function scrollToTarget(target: number | string, options: ScrollTargetOptions = {}) {
  if (instance) {
    instance.scrollTo(target, options)
    return
  }
  if (typeof target === 'string') {
    document.querySelector(target)?.scrollIntoView({ behavior: options.immediate ? 'auto' : 'smooth' })
    return
  }
  window.scrollTo({ top: target, behavior: options.immediate ? 'auto' : 'smooth' })
}