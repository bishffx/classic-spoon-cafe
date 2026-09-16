// Smoke test: boot the production bundle inside jsdom and assert the app mounts.
// Run: node smoke.mjs
import { JSDOM, VirtualConsole } from 'jsdom'
import { readdirSync } from 'node:fs'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { join, dirname } from 'node:path'

const here = dirname(fileURLToPath(import.meta.url))
const dist = join(here, 'dist')
const assets = join(dist, 'assets')
const entry = readdirSync(assets).find((f) => f.startsWith('index-') && f.endsWith('.js'))

if (!entry) {
  console.error('SMOKE FAIL: no entry chunk found')
  process.exit(1)
}

const virtualConsole = new VirtualConsole()
virtualConsole.on('jsdomError', (e) => console.log('  [jsdom-warn]', String(e).slice(0, 160)))

const dom = new JSDOM(
  '<!doctype html><html><head></head><body><div id="root"></div></body></html>',
  { url: 'http://localhost/', pretendToBeVisual: true, virtualConsole },
)

const { window } = dom
const errors = []

for (const key of [
  'window', 'document', 'navigator', 'Window', 'HTMLElement', 'Element', 'Node',
  'Text', 'Comment', 'DocumentFragment', 'SVGElement', 'SVGSVGElement',
  'HTMLCollection', 'NodeList', 'CSSStyleDeclaration', 'getComputedStyle',
  'CustomEvent', 'IntersectionObserver', 'ResizeObserver', 'MutationObserver',
  'Event', 'MouseEvent', 'KeyboardEvent', 'WheelEvent', 'TouchEvent',
  'PointerEvent', 'InputEvent', 'FocusEvent',
]) {
  try {
    Object.defineProperty(globalThis, key, { value: window[key], configurable: true, writable: true })
  } catch {
    globalThis[key] = window[key]
  }
}
window.requestAnimationFrame = (cb) => setTimeout(() => cb(Date.now()), 16)
window.cancelAnimationFrame = (id) => clearTimeout(id)
globalThis.requestAnimationFrame = window.requestAnimationFrame
globalThis.cancelAnimationFrame = window.cancelAnimationFrame
window.addEventListener('error', (e) => errors.push(String(e.message ?? e.error)))
window.addEventListener('unhandledrejection', (e) => errors.push('unhandledrejection: ' + String(e.reason)))

// jsdom exposes these as undefined; provide real constructor stubs (browsers have real ones).
class ResizeObserverPoly {
  constructor(cb) {
    this.cb = cb
    this.onResize = () => this.cb([])
  }
  observe(el) {
    window.addEventListener('resize', this.onResize)
  }
  unobserve() {
    window.removeEventListener('resize', this.onResize)
  }
  disconnect() {
    window.removeEventListener('resize', this.onResize)
  }
}
class IntersectionObserverPoly {
  constructor(cb) {
    this.cb = cb
  }
  observe(el) {
    const rect = el.getBoundingClientRect ? el.getBoundingClientRect() : { top: 0, bottom: 0, left: 0, right: 0, width: 0, height: 0 }
    this.cb([{ target: el, isIntersecting: true, intersectionRatio: 1, boundingClientRect: rect, intersectionRect: rect, rootBounds: rect, time: 0 }], this)
  }
  unobserve() {}
  disconnect() {}
  takeRecords() {
    return []
  }
}
window.ResizeObserver = globalThis.ResizeObserver = ResizeObserverPoly
window.IntersectionObserver = globalThis.IntersectionObserver = IntersectionObserverPoly

// Vite injects modulepreload <link> tags and fetches them for lazy chunks;
// in jsdom those resolve against http://localhost/. Stub fetch so preloads are no-ops.
window.fetch = globalThis.fetch = () =>
  Promise.resolve({
    ok: true,
    status: 200,
    json: async () => ({}),
    text: async () => '',
    blob: async () => new Blob(),
    arrayBuffer: async () => new ArrayBuffer(0),
  })

// Polyfills for APIs jsdom lacks but real browsers have.
window.matchMedia = (query) => ({
  matches: false,
  media: query,
  onchange: null,
  addEventListener() {},
  removeEventListener() {},
  addListener() {},
  removeListener() {},
  dispatchEvent() {
    return false
  },
})
window.scrollTo = (x, y) => {
  window.scrollX = typeof x === 'number' ? x : 0
  window.scrollY = typeof y === 'number' ? y : 0
}
window.scrollBy = () => {}
window.HTMLElement.prototype.scrollIntoView = () => {}

try {
  await import(pathToFileURL(join(assets, entry)).href)
} catch (e) {
  console.error('SMOKE FAIL: import crashed')
  console.error(e)
  process.exit(1)
}

// Let lazy page chunks resolve and initial animations mount.
await new Promise((r) => setTimeout(r, 2000))

const body = window.document.body
const text = body.textContent ?? ''
const checks = [
  ['hero headline CLASSIC', text.includes('CLASSIC') && text.includes('SPOON')],
  ['hero copy', text.includes('Better conversations')],
  ['nav + CTA', text.includes('Visit Us')],
  ['footer wordmark', text.includes('Classic Spoon')],
  ['taste ai block', text.includes('Not sure what to order')],
  ['featured menu', text.includes('From the Spoon')],
  ['location section', text.includes('Get directions')],
]

let fail = false
for (const [name, ok] of checks) {
  if (ok) {
    console.log(`PASS  ${name}`)
  } else {
    console.log(`FAIL  ${name}`)
    fail = true
  }
}

if (errors.length) {
  console.error('\nRuntime errors captured:')
  for (const e of errors.slice(0, 20)) console.error('  ' + String(e).slice(0, 300))
  fail = true
} else {
  console.log('\nNo runtime errors.')
}

const bodyLen = text.replace(/\s+/g, ' ').trim().length
console.log(`\nRendered text length: ${bodyLen} chars`)
console.log('Rendered headings: ' + Array.from(body.querySelectorAll('h1,h2')).slice(0, 8).map((h) => (h.textContent ?? '').replace(/\s+/g, ' ').trim()).join(' | '))
console.log(fail ? '\nSMOKE: FAILED' : '\nSMOKE: OK')
process.exit(fail ? 1 : 0)