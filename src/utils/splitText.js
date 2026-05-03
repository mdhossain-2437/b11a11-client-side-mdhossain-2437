/**
 * Splits a node's text into per-character spans (preserving whitespace as
 * non-breaking spaces) and tags the node so it isn't split twice.
 *
 * Returns the array of created char spans so the caller can drive them with
 * GSAP / ScrollTrigger.
 */
export function splitChars(node) {
  if (!node || node.dataset.split === '1') {
    return Array.from(node?.querySelectorAll('span[data-char="1"]') || [])
  }
  const text = node.textContent || ''
  node.textContent = ''
  const chars = []
  for (const c of text) {
    if (c === ' ') {
      const space = document.createElement('span')
      space.textContent = '\u00A0'
      space.style.display = 'inline-block'
      node.appendChild(space)
      continue
    }
    const span = document.createElement('span')
    span.textContent = c
    span.dataset.char = '1'
    span.style.display = 'inline-block'
    span.style.willChange = 'transform, opacity'
    node.appendChild(span)
    chars.push(span)
  }
  node.dataset.split = '1'
  return chars
}
