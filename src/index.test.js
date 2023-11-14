import React, { useState } from 'react'
import { render, fireEvent } from '@testing-library/react'

import DangerouslySetHtmlContent from './'

describe('<DangerouslySetHtmlContent />', () => {
  test('Should not render if no props passed', () => {
    expect(() => {
      render(<DangerouslySetHtmlContent html='' />)
    }).toThrow()
  })

  test('Should render correctly with html prop', () => {
    const html = `
      <div>This wil be rendered</div>
      <script>
        alert('testing')
      </script>
    `
    expect(() => {
      render(<DangerouslySetHtmlContent html={html} />)
    }).not.toThrow()
  })

  test('Should render children properly from string', () => {
    const html = `
      <div data-testid="test">Test html</div>
    `
    const { queryByTestId } = render(<DangerouslySetHtmlContent html={html} />)

    expect(queryByTestId('test')).not.toBe(null)
    expect(queryByTestId('test')?.textContent).toBe('Test html')
  })

  test('Should render children properly from string with javascript and execute it', () => {
    const html = `
      <div data-testid="test">Test html</div>
      <script>
        window.alert('This got executed')
      </script>
    `
    window.alert = jest.fn()
    const { container } = render(<DangerouslySetHtmlContent html={html} />)

    expect(container.querySelector('script')).not.toBe(null)
    expect(container.querySelector('script')?.textContent?.trim()).toBe(
      "window.alert('This got executed')"
    )

    // We'll have to wait until next tick since it happens after render
    setTimeout(() => {
      expect(window.alert).toBeCalledWith('This got executed')
      expect(window.alert).toHaveBeenCalledTimes(1)
    }, 0)
  })

  test('Should pass props to the container div element', () => {
    const { container } = render(
      <DangerouslySetHtmlContent
        html={"<div id='inner'>test</div>"}
        className='outer'
      />
    )

    expect(container.querySelector('#inner')).not.toBe(null)
    expect(container.querySelector('.outer')).not.toBe(null)
  })

  test('Should allow rerender the component if "allowRerender" is passed in', () => {
    const ExampleApp = () => {
      const [content, setContent] = useState(
        `<div data-testid="first">First render</div>`
      )
      const updatedHtml = `
        <div data-testid="updated">Changed</div>
      `

      return (
        <>
          <DangerouslySetHtmlContent html={content} allowRerender />
          <button
            onClick={() => setContent(updatedHtml)}
            data-testid='update-button'
          >
            Click
          </button>
        </>
      )
    }

    const { queryByTestId } = render(<ExampleApp />)

    expect(queryByTestId('first')).not.toBe(null)
    expect(queryByTestId('first')?.textContent).toBe('First render')

    // Click the button
    fireEvent.click(queryByTestId('update-button'))

    // The content should be updated
    expect(queryByTestId('updated')).not.toBe(null)
    expect(queryByTestId('updated')?.textContent).toBe('Changed')
  })

  test('Should NOT allow rerender the component if "allowRerender" is NOT passed in', () => {
    const ExampleApp = () => {
      const [content, setContent] = useState(
        `<div data-testid="first">First render</div>`
      )
      const updatedHtml = `
        <div data-testid="updated">Changed</div>
      `

      return (
        <>
          <DangerouslySetHtmlContent html={content} />
          <button
            onClick={() => setContent(updatedHtml)}
            data-testid='update-button'
          >
            Click
          </button>
        </>
      )
    }

    const { queryByTestId } = render(<ExampleApp />)

    expect(queryByTestId('first')).not.toBe(null)
    expect(queryByTestId('first')?.textContent).toBe('First render')

    // Click the button
    fireEvent.click(queryByTestId('update-button'))

    // The content should not be updated
    expect(queryByTestId('updated')).toBe(null)
    // And remains the same
    expect(queryByTestId('first')).not.toBe(null)
    expect(queryByTestId('first')?.textContent).toBe('First render')
  })
})
