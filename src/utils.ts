export function range(from: number = 0, to: number): Array<number> {
  if (to === undefined) {
    to = from
    from = 0
  }

  return Array.from({ length: to - from }, (_, i) => i + from)
}

export function debounce(fn: Function, delay: number): Function {
  let timer = null
  return (...args) => {
    clearTimeout(timer)
    timer = setTimeout(fn, delay, ...args)
  }
}

export function mapObject(obj: any, fn: Function) {
  return Object.fromEntries(Object.entries(obj).map(([key, val]) => [key, fn(val, key)]))
}
