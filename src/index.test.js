import React from 'react'
import { render } from '@testing-library/react'

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
})
