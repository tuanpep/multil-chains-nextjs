import { Buffer } from 'buffer'
if (typeof window !== 'undefined' && window.Buffer === undefined) {
  // eslint-disable-next-line no-extra-semi
  ;(window as any).Buffer = Buffer
}

export {}
