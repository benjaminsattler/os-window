# Installation

Install the custom element by adding it using your favorite package manager:

```shell
# NPM
npm --save os-window

# Yarn
yarn add os-window
```

## Basic Usage

Then you can use os-window in your application code.

```javascript
import 'os-window';

function createOsWindow() {
  var osWindow = document.createElement('os-window');
  document.body.appendChild(osWindow);

  return osWindow;
}
```
You can also add os-window directly to your web page:

```html
<!doctype html>
  <head>
    <title>...</title>
    <!-- Add this module to your document head -->
    <!-- Notice the value of the 'type' attribute, which needs to be set to 'module' -->
    <script type="module" src="node_modules/os-window/main.js"></script>
  </head>
  <body>
    <os-window></os-window>
  </body>
</html>
```

### Use the CDN

This project is also published to the CDN unpkg, which enables you to skip any local module installation when including this module in your webpage:

```html
<!-- Include specific version (recommended) -->
<script type="module" src="https://unpkg.com/os-window@0.3.0"></script>

<!-- Include latest version (not recommended) -->
<script type="module" src="https://unpkg.com/os-window"></script>
```
