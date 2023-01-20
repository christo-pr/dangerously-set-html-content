<center>
<h1>
⚠️⚠️⚠️
dangerously-set-html-content
⚠️⚠️⚠️
</h1>
</center>

> Render raw html at your own risk!

[![NPM](https://img.shields.io/npm/v/dangerously-set-html-content.svg)](https://www.npmjs.com/package/dangerously-set-html-content) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Context

Here's a blog post that explain more in detail:

- [Render dangerous content with React](https://dev.to/christo_pr/render-dangerous-content-with-react-2j7j)

## TL;DR

React uses `dangerouslySetInnerHtml` prop to render raw html, and works pretty much well for almost all the cases, but what if your html has some `scripts` tags inside??

When you use `dangerouslySetInnerHtml` on a component, internally react is using the `innerHtml` property of the node to set the content, which for [safety purposes](https://developer.mozilla.org/en-US/docs/Web/API/Element/innerHTML#Security_considerations) doesn't execute any javascript.

This behavior seemed very odd to me (I mean the prop name contains the word `dangerously`, and also you need to pass an object with a `__html` propery, which is on purpose, so you really know what you doing), although it have totally sense now, still doesn't solve my issue

After a little bit of search I found that the `document` has something called [Range](https://developer.mozilla.org/en-US/docs/Web/API/Range), this API let you create a fragment of the document, so using that I created `dangerously-set-html-content`.

This React component renders html from a string, and executes any js code inside of it!! 🎉

🚨🚨 **USE IT AT YOUR OWN RISK** 🚨🚨

## Install

```bash
yarn add dangerously-set-html-content
// or
// npm install --save dangerously-set-html-content
```

## Usage

```jsx
import React from 'react'

import InnerHTML from 'dangerously-set-html-content'

function Example {

  const html = `
    <div>This wil be rendered</div>
    <script>
      alert('testing')
    </script>

  `

  return (
    <InnerHTML html={html} />
  )
}
```

This will also work for scripts with the `src` attribute set it

## Development

After cloning the repo and install all deps, you can do to `example/` directory to install the example dependencies (the package will be a symlink to the file in `src/`)

Once you're on that directory you can run:

```
npm start
```

And an example all will be open.

## Running unit test

Run:

```
npm test
```

## License

MIT © [christo-pr](https://github.com/christo-pr)
