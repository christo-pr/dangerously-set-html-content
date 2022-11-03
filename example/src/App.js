import React, { useState } from 'react'
import InnerHTML from 'dangerously-set-html-content'

export function App() {
  const [content, setContent] = useState(`
    <div>This wil be rendered</div>
    <script>
      alert('testing')
    </script>
  `)
  const updatedHtml = `
    <div>Look at the console now!</div>
    <script>
      console.log('hacked!')
    </script>
  `

  return (
    <div>
      <InnerHTML style={{ color: 'white', background: 'red' }} html={content} />
      <button onClick={() => setContent(updatedHtml)}>
        Hit here to see magic!
      </button>
    </div>
  )
}

export default App
