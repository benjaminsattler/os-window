/* eslint-disable import/extensions */
import * as lib from './lib/index.js';

const {
  OsWindow,
  OsTheme,
  Theme,
  WindowState,
} = lib;

customElements.define('os-window', OsWindow);

export {
  OsTheme,
  Theme,
  WindowState,
};

export default OsWindow;
