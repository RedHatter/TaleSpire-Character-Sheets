export function range(from: number = 0, to: number): Array<number> {
  if (to === undefined) {
    to = from
    from = 0
  }

  return Array.from({ length: to - from }, (_, i) => i + from)
}

export function modifier(n: number) {
  return Math.floor((n - 10) / 2)
}

export function debounce(fn: Function, delay: number): Function {
  let timer = null
  return (...args) => {
    clearTimeout(timer)
    timer = setTimeout(fn, delay, ...args)
  }
}
