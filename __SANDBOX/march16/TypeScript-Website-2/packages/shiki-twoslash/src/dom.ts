// Gets the position of an element relative to the whole page
const getAbsoluteElementPos = (element: HTMLElement) => {
  const bodyRect = document.body.getBoundingClientRect()
  const elemRect = element.getBoundingClientRect()
  const top = elemRect.top - bodyRect.top
  const left = elemRect.left - bodyRect.left
  return {
    top,
    left,
  }
}

// Hide it
const resetHover = () => {
  const globalPopover = document.getElementById("twoslash-mouse-hover-info")
  if (globalPopover) globalPopover.style.display = "none"
}

// Get it
const findOrCreateTooltip = () => {
  let globalPopover = document.getElementById("twoslash-mouse-hover-info")
  if (!globalPopover) {
    globalPopover = document.createElement("div")
    globalPopover.style.position = "absolute"
    globalPopover.id = "twoslash-mouse-hover-info"
    document.body.appendChild(globalPopover)
  }
  return globalPopover
}

const getRootRect = (element: HTMLElement): DOMRect => {
  if (element.nodeName.toLowerCase() === "pre") {
    return element.getBoundingClientRect()
  }

  return getRootRect(element.parentElement!)
}

// Gets triggered on the spans inside the codeblocks
const hover = (event: Event) => {
  const hovered = event.target as HTMLElement
  if (hovered.nodeName !== "DATA-LSP") return resetHover()

  const message = hovered.getAttribute("lsp")!
  const position = getAbsoluteElementPos(hovered)

  // Create or re-use the current hover div
  const tooltip = findOrCreateTooltip()

  // Use a textarea to un-htmlencode for presenting to the user
  var txt = document.createElement("textarea")
  txt.innerHTML = message
  tooltip.textContent = txt.value

  // Offset it a bit from the mouse and present it at an absolute position
  const yOffset = 20
  tooltip.style.display = "block"
  tooltip.style.top = `${position.top + yOffset}px`
  tooltip.style.left = `${position.left}px`

  // limit the width of the tooltip to the outer container (pre)
  const rootRect = getRootRect(hovered)
  const relativeLeft = position.left - rootRect.x
  tooltip.style.maxWidth = `${rootRect.width - relativeLeft}px`
}

/**
 * Creates the main mouse over popup for LSP info using the DOM API.
 * It is expected to be run inside a `useEffect` block inside your main
 * exported component in Gatsby.
 *
 * @example
 * import React, { useEffect } from "react"
 * import { setupTwoslashHovers } from "shiki-twoslash/dom";
 *
 * export default () => {
 *   // Add a the hovers
 *   useEffect(setupTwoslashHovers)
 *
 *   // Normal JSX
 *   return </>
 * }
 *
 */
export const setupTwoslashHovers = () => {
  const blocks = document.querySelectorAll(".shiki.lsp .code-container code")
  blocks.forEach((code) => {
    code.addEventListener("mouseover", hover)
    code.addEventListener("mouseout", resetHover)
  })
  return () => {
    blocks.forEach((code) => {
      code.removeEventListener("mouseover", hover)
      code.removeEventListener("mouseout", resetHover)
    })
  }
}
