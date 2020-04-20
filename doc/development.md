# Development

## Requirements

In order to start developing os-window, first checkout the repository:
```shell
> git clone https://github.com/benjaminsattler/os-window.git
```

Next make sure to install the development dependencies:
```shell
> cd os-window
> yarn
```

For the next step please make sure to have a working installation of **Python 2.x**. Start the preconfigured python web server to load the development debug HTML page:

```shell
> yarn dev
```

Now you can point your web browser at `http://localhost:8000/html/debug.html` and see the os-window custom element in action. It'll not automatically reload, make sure to refresh the page once you saved your changes.
## Running tests

In order to run the tests during development, simply type the following command in your console:

```shell
> yarn test
```

## Running EsLint

In order to run EsLint on the source and test files, simply type the following command in your console:

```shell
> yarn lint
```

The linter will also automatically be run in a git hook pre-commit.

## Extending os-window

You can extend the os-window custom element easily. The JavaScript class implementing the logic behind the element is exposed by the package. Follow the below snippet to start adjusting os-window to your liking:

```javascript
// Import the base class
import OsWindow from 'os-window';

// Define your custom element by extending os-window
class MyOsWindow extends OsWindow {
  // Your changes here.
  // Besides, ever thought about proposing a pull request with your changes? ;)
}

// Register your custom element to the CustomElementRegistry
customElements.define('my-os-window', MyOsWindow);
```

Once you have saved the above snippet in a JavaScript file, go ahead and include it in your HTML:

```html
<!DOCTYPE html>
<html>
  <head>
    <title> ... </title>
    <script type="module" src="<path/to/your/custom-module.js>"></script>
  </head>
  <body>
    <!-- Use your custom element like this -->
    <my-os-window></my-os-window>
  </body>
</html>
```

In order to test your new custom element, go ahead and load the HTML page in a web server.

> Due to security restrictions JavaScript module files need to be loaded using the `http:` or `https` scheme, so **you need to use a webserver for development**

If you are developing in the os-window repository, then you can simply type the following command in your console in order to start the preconfigured development web server:

> **Python 2.x** needs to be available during development because it's being used to start a simple web server used during development and for running the tests.

```shell
> yarn dev
```

## More Information

You can find more information at the following places:

- [Mozilla Developer Network: CustomElementRegistry API](https://developer.mozilla.org/en-US/docs/Web/API/CustomElementRegistry)
- [Mozilla Developer Network: CustomElements API](https://developer.mozilla.org/en-US/docs/Web/API/Window/customElements)
