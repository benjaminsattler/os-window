/* eslint-disable no-param-reassign */
/* eslint-disable import/extensions */
import OsThemes from './OsTheme.js';
import Themes from './Theme.js';
import WindowStates from './WindowState.js';

const templateElement = document.createElement('template');
const path = document.createElement('a');
path.href = import.meta.url;
templateElement.innerHTML = `
<style>
  @import '${path.pathname}/../../../style/OsWindow/index.css';
</style>
<div
  class="window-wrapper"
  aria-labelledby="window-title-text"
  aria-role="dialog"
  aria-describedby="window-content-slot-wrapper"
  tabindex="-1"
>
    <div class="window-title-bar">
        <div class="window-title-buttons">
            <button
              type="button"
              class="window-title-button window-title-button__close"
              aria-labelledby="window-title-button-close-label"
              aria-pressed="false"
            >
                <span class="aria-label" id="window-title-button-close-label">
                    close
                </span>
            </button>
            <button
              type="button"
              class="window-title-button window-title-button__minimize"
              aria-expanded="true"
              aria-controls="window-content-slot-wrapper"
              aria-pressed="false"
              aria-labelledby="window-title-button-minimize-label"
            >
                <span class="aria-label" id="window-title-button-minimize-label">
                    minimize
                </span>
            </button>
            <button
              type="button"
              class="window-title-button window-title-button__maximize"
              aria-expanded="true"
              aria-controls="window-content-slot-wrapper"
              aria-pressed="true"
              aria-labelledby="window-title-button-maximize-label"
            >
                <span class="aria-label" id="window-title-button-maximize-label">
                    maximize
                </span>
            </button>
        </div>
        <div class="window-title-text" id="window-title-text"></div>
    </div>
    <div class="window-content-slot-wrapper">
        <slot class="window-content-slot"></slot>
    </div>
</div>`;

const getShadowDom = function getShadowHtml() {
  return templateElement.content.cloneNode(true);
};

const triggerEvent = function triggerEvent(instance, name, detail) {
  instance.dispatchEvent(new CustomEvent(name, { detail }));
};

const onMinimizeClick = function onMinimizeClick() {
  const wrapper = this.__shadow.querySelector(':host([interactive]) .window-wrapper');
  if (wrapper) {
    this.windowState = 'minimized';
  }
};

const onMaximizeClick = function onMaximizeClick() {
  const wrapper = this.__shadow.querySelector(':host([interactive]) .window-wrapper');
  if (wrapper) {
    this.windowState = 'maximized';
  }
};

const addEventHandlers = function addEventHandlers(instance) {
  instance.__shadow.querySelector('.window-title-button__minimize').addEventListener('click', onMinimizeClick.bind(instance));
  instance.__shadow.querySelector('.window-title-button__maximize').addEventListener('click', onMaximizeClick.bind(instance));
};

const updateWindowTitle = function updateWindowTitle(instance, newTitle) {
  instance.__shadow.querySelector('#window-title-text').innerText = newTitle;
};

const enableWindowButtons = function enableWindowButtons(instance) {
  const closeButton = instance.__shadow.querySelector('.window-title-button__close');
  closeButton.setAttribute('tabindex', '0');
  closeButton.removeAttribute('disabled');

  const minimizeButton = instance.__shadow.querySelector('.window-title-button__minimize');
  minimizeButton.setAttribute('tabindex', '0');
  minimizeButton.removeAttribute('disabled');

  const maximizeButton = instance.__shadow.querySelector('.window-title-button__maximize');
  maximizeButton.setAttribute('tabindex', '0');
  maximizeButton.removeAttribute('disabled');

  instance.__shadow.querySelector('.window-wrapper').setAttribute('tabindex', '-1');
};

const disableWindowButtons = function disableWindowButtons(instance) {
  const closeButton = instance.__shadow.querySelector('.window-title-button__close');
  closeButton.setAttribute('tabindex', '-1');
  closeButton.setAttribute('disabled', 'disabled');

  const minimizeButton = instance.__shadow.querySelector('.window-title-button__minimize');
  minimizeButton.setAttribute('tabindex', '-1');
  minimizeButton.setAttribute('disabled', 'disabled');

  const maximizeButton = instance.__shadow.querySelector('.window-title-button__maximize');
  maximizeButton.setAttribute('tabindex', '-1');
  maximizeButton.setAttribute('disabled', 'disabled');

  instance.__shadow.querySelector('.window-wrapper').removeAttribute('tabindex');
};

const updateWindowButtons = function updateWindowButtons(instance, areButtonsActive) {
  if (areButtonsActive) {
    enableWindowButtons(instance);
  } else {
    disableWindowButtons(instance);
  }
};

const updateWindowState = function updateWindowState(instance, newValue) {
  const minimizeButton = instance.__shadow.querySelector('.window-title-button__minimize');
  const maximizeButton = instance.__shadow.querySelector('.window-title-button__maximize');

  minimizeButton.setAttribute('aria-expanded', newValue === 'maximized');
  maximizeButton.setAttribute('aria-expanded', newValue === 'maximized');

  minimizeButton.setAttribute('aria-pressed', newValue === 'minimized');
  maximizeButton.setAttribute('aria-pressed', newValue === 'maximized');
};

export default class OsWindow extends HTMLElement {
  constructor() {
    super();
    this.__shadow = this.attachShadow({ mode: 'closed' });
    this.__shadow.appendChild(getShadowDom());
    addEventHandlers(this);
    updateWindowTitle(this, this.windowTitle);
    updateWindowButtons(this, this.interactive);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) {
      return;
    }
    switch (name) {
      case 'hover':
        triggerEvent(this, 'hoverChange', {
          oldValue: !!oldValue,
          newValue: !!newValue,
        });
        break;
      case 'interactive':
        triggerEvent(this, 'interactiveChange', {
          oldValue: !!oldValue,
          newValue: !!newValue,
        });
        updateWindowButtons(this, newValue);
        break;
      case 'theme':
        triggerEvent(this, 'themeChange', {
          oldTheme: oldValue,
          newTheme: newValue,
        });
        break;
      case 'window-state':
        triggerEvent(this, 'windowStateChange', {
          oldWindowState: oldValue,
          newWindowState: newValue,
        });
        updateWindowState(this, newValue);
        break;
      case 'window-title':
        triggerEvent(this, 'windowTitleChange', {
          oldWindowTitle: oldValue,
          newWindowTitle: newValue,
        });
        updateWindowTitle(this, newValue);
        break;
      case 'os-theme':
        triggerEvent(this, 'osThemeChange', {
          oldOsTheme: oldValue,
          newOsTheme: newValue,
        });
        break;
      default:
    }
  }

  static get observedAttributes() {
    return [
      'hover',
      'interactive',
      'theme',
      'window-title',
      'window-state',
      'os-theme',
    ];
  }

  set theme(theme) {
    if (OsWindow.supportedThemes.indexOf(theme) === -1) {
      throw new RangeError('Unsupported theme');
    }
    this.setAttribute('theme', theme);
  }

  get theme() {
    if (this.hasAttribute('theme')) {
      if (OsWindow.supportedThemes.indexOf(this.getAttribute('theme')) === -1) {
        return OsWindow.defaultTheme;
      }
      return this.getAttribute('theme');
    }
    return OsWindow.defaultTheme;
  }

  static get supportedThemes() {
    return Themes;
  }

  static get defaultTheme() {
    return OsWindow.supportedThemes[0];
  }

  set osTheme(osTheme) {
    if (OsWindow.supportedOsThemes.indexOf(osTheme) === -1) {
      throw new RangeError('Unsupported os-theme');
    }
    this.setAttribute('os-theme', osTheme);
  }

  get osTheme() {
    if (this.hasAttribute('os-theme')) {
      if (OsWindow.supportedOsThemes.indexOf(this.getAttribute('os-theme')) === -1) {
        return OsWindow.defaultOsTheme;
      }
      return this.getAttribute('os-theme');
    }
    return OsWindow.defaultOsTheme;
  }

  static get supportedOsThemes() {
    return OsThemes;
  }

  static get defaultOsTheme() {
    return OsWindow.supportedOsThemes[0];
  }

  get windowState() {
    if (this.hasAttribute('window-state')) {
      if (OsWindow.supportedWindowStates.indexOf(this.getAttribute('window-state')) === -1) {
        return OsWindow.defaultWindowState;
      }
      return this.getAttribute('window-state');
    }
    return OsWindow.defaultWindowState;
  }

  set windowState(windowState) {
    if (OsWindow.supportedWindowStates.indexOf(windowState) === -1) {
      throw new RangeError('Unsupported window state');
    }
    this.setAttribute('window-state', windowState);
  }

  static get defaultWindowState() {
    return OsWindow.supportedWindowStates[0];
  }

  static get supportedWindowStates() {
    return WindowStates;
  }

  set hover(value) {
    if (value) {
      this.setAttribute('hover', 'hover');
    } else {
      this.removeAttribute('hover');
    }
  }

  get hover() {
    return this.hasAttribute('hover');
  }

  set interactive(value) {
    if (value) {
      this.setAttribute('interactive', 'interactive');
    } else {
      this.removeAttribute('interactive');
    }
  }

  get interactive() {
    return this.hasAttribute('interactive');
  }

  get windowTitle() {
    if (this.hasAttribute('window-title')) {
      return this.getAttribute('window-title');
    }
    return OsWindow.defaultWindowTitle;
  }

  set windowTitle(value) {
    this.setAttribute('window-title', value);
  }

  static get defaultWindowTitle() {
    return '';
  }
}
