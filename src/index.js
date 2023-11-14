'use client'

const { createElement, useEffect, useRef } = require('react')

function DangerouslySetHtmlContent({
  html,
  dangerouslySetInnerHTML,
  allowRerender,
  ...rest
}) {
  // We remove 'dangerouslySetInnerHTML' from props passed to the div
  const divRef = useRef(null)
  const isFirstRender = useRef(true)

  useEffect(() => {
    if (!html || !divRef.current) throw new Error("html prop can't be null")
    if (!isFirstRender.current) return
    isFirstRender.current = Boolean(allowRerender)

    const slotHtml = document.createRange().createContextualFragment(html) // Create a 'tiny' document and parse the html string
    divRef.current.innerHTML = '' // Clear the container
    divRef.current.appendChild(slotHtml) // Append the new content
  }, [html, divRef])

  return createElement('div', { ...rest, ref: divRef })
}

module.exports = DangerouslySetHtmlContent
