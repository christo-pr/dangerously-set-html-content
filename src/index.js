import React, { useEffect, useRef } from 'react'

function DangerouslySetHtmlContent({ html, dangerouslySetInnerHTML, ...rest }) {
  // We remove 'dangerouslySetInnerHTML' from props passed to the div
  const divRef = useRef(null)

  useEffect(() => {
    if (!html || !divRef.current) throw new Error("html prop cant't be null")

    const slotHtml = document.createRange().createContextualFragment(html) // Create a 'tiny' document and parse the html string
    divRef.current.innerHTML = '' // Clear the container
    divRef.current.appendChild(slotHtml) // Append the new content
  }, [html, divRef])

  // eslint-disable-next-line react/react-in-jsx-scope
  return <div {...rest} ref={divRef} />
}

export default DangerouslySetHtmlContent
