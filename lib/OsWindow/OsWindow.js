/* eslint-disable no-param-reassign */

const templateElement = document.createElement('template');
templateElement.innerHTML = `
<style>
    /****** generic styles ******/
    :host {
        display: inline-block;
        transition: width .3s, height .3s;
    }

    * {
        transition: color .1s, background .3s;
    }

    .window-wrapper {
        --mac-window-title-button-diameter: .8rem;
        --mac-window-border-radius: 8px;
        --mac-window-title-bar-height: 2.5rem;
        --mac-window-title-bar-button-close-color: #ef534a;
        --mac-window-title-bar-button-maximize-color: #97d272;
        --mac-window-title-bar-button-minimize-color: #edc04a;
        --mac-window-theme-dark-background-color: #343a46;
        --mac-window-theme-dark-font-color: #ffffff;
        --mac-window-theme-light-background-color: #eef1f5;
        --mac-window-theme-light-font-color: #87827d;
        --mac-window-font: sans-serif;

        filter: drop-shadow( 0 2px 2px rgba(0, 0, 0, .3));
        position: relative;
        width: 100%;
        min-width: 100px;
        max-width: 100%;
        overflow: hidden;
        max-height: 100%;
    }

    .window-title-buttons {
        position: relative;
    }

    :host(:not([window-state="maximized"])) .window-wrapper .window-content-slot-wrapper,
    :host([window-state="maximized"]) .window-wrapper .window-content-slot-wrapper {
        height: auto;
    }

    :host([window-state="minimized"]) .window-wrapper .window-content-slot-wrapper {
        height: 0;
        padding-bottom: 0;
    }

    .aria-label {
        display:none;
    }

    /****** mac theme / default theme styles ******/
    .window-wrapper,
    :host([os-theme="mac"]) .window-wrapper {
        border-radius: var(--mac-window-border-radius);
    }

    .window-title-bar,
    :host([os-theme="mac"]) .window-title-bar {
        height: var(--window-title-bar-height);
        line-height: var(--mac-window-title-bar-height);
        display: flex;
    }

    .window-title-buttons,
    :host([os-theme="mac"]) .window-title-buttons {
        margin-left: 1rem;
        white-space: nowrap;
    }

    .window-title-button,
    :host([os-theme="mac"]) .window-title-button {
        border-width: 0;
        border-radius: calc(var(--mac-window-title-button-diameter) / 2);
        height: var(--mac-window-title-button-diameter);
        width: var(--mac-window-title-button-diameter);
        margin: 0 calc(var(--mac-window-title-button-diameter) / 5);
        font-weight: 600;
        fill: transparent;
        padding: 0 0 0 0;
        color: transparent;
        transition: color .15s;
    }

    .window-title-button::after,
    :host([os-theme="mac"]) .window-title-button::after {
        line-height: 1;
        display: inline;
        vertical-align: 10%;
    }

    :host([hover]) .window-title-button:hover,
    :host([hover]) .window-title-button:focus,
    :host([hover][os-theme="mac"]) .window-title-button:hover
    :host([hover][os-theme="mac"]) .window-title-button:focus
    {
        color: rgba(0, 0, 0, .3);
    }

    .window-title-button__close,
    :host([os-theme="mac"]) .window-title-button__close {
        background: var(--mac-window-title-bar-button-close-color);
    }

    .window-title-button__close::after,
    :host([os-theme="mac"]) .window-title-button__close::after {
        content: "⨉";
    }

    .window-title-button__minimize,
    :host([os-theme="mac"]) .window-title-button__minimize {
        background: var(--mac-window-title-bar-button-minimize-color);
    }

    .window-title-button__minimize::after,
    :host([os-theme="mac"]) .window-title-button__minimize::after {
        content: "–";
    }

    .window-title-button__maximize,
    :host([os-theme="mac"]) .window-title-button__maximize {
        background: var(--mac-window-title-bar-button-maximize-color);
    }

    .window-title-button__maximize::after,
    :host([os-theme="mac"]) .window-title-button__maximize::after {
        content: "+";
    }

    .window-title-text,
    :host([os-theme="mac"]) .window-title-text {
        line-height: 2.95;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        text-align: center;
        font-family: var(--mac-window-font);
        padding: 0 3rem;
        width: 100%;
        margin: 0 auto;

    }

    .window-content-slot-wrapper,
    :host([os-theme="mac"]) .window-content-slot-wrapper {
        padding: 0 1rem .5rem 1rem;
        font-family: var(--mac-window-font);
        box-sizing: border-box;
    }

    :host([theme="dark"][os-theme="mac"]) .window-content-slot-wrapper,
    :host([theme="dark"]) .window-content-slot-wrapper {
        color: var(--mac-window-theme-dark-font-color);
        background: var(--mac-window-theme-dark-background-color);
    }

    .window-content-slot-wrapper,
    :host([os-theme="mac"]) .window-content-slot-wrapper,
    :host([theme="light"]) .window-content-slot-wrapper,
    :host([theme="light"][os-theme="mac"]) .window-content-slot-wrapper {
        color: var(--mac-window-theme-light-font-color);
        background: var(--mac-window-theme-light-background-color);
    }

    :host([theme="dark"]) .window-title-text,
    :host([theme="dark"][os-theme="mac"]) .window-title-text {
        color: var(--mac-window-theme-dark-font-color);
        background: var(--mac-window-theme-dark-background-color);
    }

    .window-title-text,
    :host([os-theme="mac"]) .window-title-text,
    :host([theme="light"]) .window-title-text,
    :host([theme="light"][os-theme="mac"]) .window-title-text {
        color: vr(--mac-window-theme-light-font-color);
        background: var(--mac-window-theme-light-background-color);
    }

    .window-title-bar,
    :host([os-theme="mac"]) .window-title-bar,
    :host([theme="light"]) .window-title-bar,
    :host([theme="light"][os-theme="mac"]) .window-title-bar {
        color: var(--mac-window-theme-light-font-color);
        background: var(--mac-window-theme-light-background-color);
    }

    :host([theme="dark"]) .window-title-bar,
    :host([theme="dark"][os-theme="mac"]) .window-title-bar {
        color: var(--mac-window-theme-dark-font-color);
        background: var(--mac-window-theme-dark-background-color);
    }

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
    return ['light', 'dark'];
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
    return ['mac'];
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
    return ['maximized', 'minimized'];
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
