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

export function enumToSelect(obj: Object): Array<{ value: number; text: string }> {
  return Object.entries(obj)
    .filter(o => typeof o[1] === 'number')
    .map(([text, value]) => ({ value, text }))
}

const resizeObserver = new ResizeObserver(entries => {
  for (const entry of entries) {
    const node = entry.target as HTMLElement
    node.style.backgroundImage = box(node.clientWidth, node.clientHeight)
  }
})

export function handDrawn(node: HTMLElement) {
  resizeObserver.observe(node)
  return {
    destroy() {
      resizeObserver.unobserve(node)
    },
  }
}

function box(width: number, height: number): string {
  const stroke = '%23D1D5DB'
  const strokeWidth = 1

  const r1 = () => Math.random() * 10 + 20
  const r2 = () => Math.random() * 2

  let path = `M ${r2()} ${r2()}`

  let maxX = width - strokeWidth * 2
  let maxY = height - strokeWidth * 2

  for (let x = 0; x < maxX; x += r1()) path += ` L ${Math.min(x, maxX).toFixed(3)} ${r2().toFixed(3)}`

  for (let y = 0; y < maxY; y += r1()) path += ` L ${(maxX - r2()).toFixed(3)} ${Math.min(y, maxY).toFixed(3)}`

  for (let x = maxX; x > 0; x -= r1()) path += ` L ${Math.max(x, 0).toFixed(3)} ${(maxY - r2()).toFixed(3)}`

  for (let y = maxY; y > 0; y -= r1()) path += ` L ${r2().toFixed(3)} ${Math.max(y, 0).toFixed(3)}`

  path += ' Z'

  return `url('data:image/svg+xml;utf8,<svg viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg"><path d="${path}" fill="none" stroke="${stroke}" stroke-width="${strokeWidth}"/></svg>')`
}

export function portal(node: HTMLElement, parameters = { target: document.body }) {
  parameters.target.append(node)
}
