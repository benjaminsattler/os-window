let getShadowHtml = function(instance) {
        return `
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

    :host([hover]) .window-title-button:hover {
        color: rgba(0, 0, 0, .3);
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
        color: var(--mac-window-theme-light-font-color);
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
<div class="window-wrapper">
    <div class="window-title-bar">
        <div class="window-title-buttons">
            <button type="button" class="window-title-button window-title-button__close"></button>
            <button type="button" class="window-title-button window-title-button__minimize"></button>
            <button type="button" class="window-title-button window-title-button__maximize"></button>
        </div>
        <div class="window-title-text" id="window-title-text"></div>
    </div>
    <div class="window-content-slot-wrapper">
        <slot class="window-content-slot"></slot>
    </div>
</div>
    `;
}

const triggerEvent = function (instance, name, detail) {
    instance.dispatchEvent(new CustomEvent(name, { detail }));
}

const onMinimizeClick = function(e) {
    const wrapper = this.shadow.querySelector(':host([interactive]) .window-wrapper');
    if (wrapper) {
        this.windowState = 'minimized';
    }
}

const onMaximizeClick = function(e) {
    const wrapper = this.shadow.querySelector(':host([interactive]) .window-wrapper');
    if (wrapper) {
        this.windowState = 'maximized';
    }
}

const addEventHandlers = function (instance) {
    instance.shadow.querySelector('.window-title-button__minimize').addEventListener('click', onMinimizeClick.bind(instance));
    instance.shadow.querySelector('.window-title-button__maximize').addEventListener('click', onMaximizeClick.bind(instance));
}

const removeEventHandlers = function (instance) {
    instance.shadow.querySelector('.window-title-button__minimize').removeEventListener('click', onMinimizeClick.bind(instance));

    instance.shadow.querySelector('.window-title-button__maximize').removeEventHandlers('click', onMaximizeClick.bind(instance));
}

const updateWindowTitle = function(newTitle, instance) {
    instance.shadow.querySelector('#window-title-text').innerText = newTitle;
}

export default class OsWindow extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'closed' });
        this.shadow.innerHTML = getShadowHtml(this);
    }

    connectedCallback() {
        if (this.isConnected) {
            addEventHandlers(this, this.shadow);
            updateWindowTitle(this.windowTitle, this);
        } else {
            // TODO: this does not work
            removeEventHandlers(this, this.shadow);
        }
    }

    attributeChangedCallback(name, oldValue, newValue) {
        switch (name) {
            // TODO this is not fired
            case 'hoverChange':
                triggerEvent(this, 'hoverChange', {
                    oldValue,
                    newValue,
                });
            break;
            // TODO this is not fired
            case 'interactionChange':
                triggerEvent(this, 'interactionChange', {
                    oldValue,
                    newValue,
                });
            break;
            case 'theme':
                triggerEvent(this, 'themeChange', {
                    oldTheme: oldValue,
                    newTheme: newValue,
                });
            break;
            case 'window-state':
                triggerEvent(this, 'stateChange', {
                    oldState: oldValue,
                    newState: newValue,
                });
            break;
            case 'window-title':
                triggerEvent(this, 'titleChange', {
                    oldTitle: oldValue,
                    newTitle: newValue,
                });
                updateWindowTitle(newValue, this);
            break;
            case 'os-theme':
                triggerEvent(this, 'osThemeChange', {
                    oldOsTheme: oldValue,
                    newOsTheme: newValue,
                });
            break;
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
        if (this.supportedThemes.indexOf(theme) === -1) {
            throw new RangeError(`Unsupported theme`);
        }
        this.setAttribute('theme', theme);
    }

    get theme() {
        if (this.hasAttribute('theme')) {
            if (this.supportedThemes.indexOf(this.getAttribute('theme')) === -1) {
                return this.defaultTheme;
            }
            return this.getAttribute('theme');
        }
        return this.defaultTheme;
    }

    get supportedThemes() {
        return ['light', 'dark'];
    }

    get defaultTheme() {
        return this.supportedThemes[0];
    }

    set osTheme(osTheme) {
        if (this.supportedOsThemes.indexOf(osTheme) === -1) {
            throw new RangeError('Unsupported os-theme');
        }
        this.setAttribute('os-theme', osTheme);
    }

    get osTheme() {
        if (this.hasAttribute('os-theme')) {
            if (this.supportedOsThemes.indexOf(this.getAttribute('os-theme')) === -1) {
                return this.defaultOsTheme;
            }
            return this.getAttribute('os-theme');
        }
        return this.defaultOsTheme;
    }

    get supportedOsThemes() {
        return ['mac'];
    }

    get defaultOsTheme() {
        return this.supportedOsThemes[0];
    }

    get windowState() {
        if (this.hasAttribute('window-state')) {
            if (this.supportedWindowStates.indexOf(this.getAttribute('window-state')) === -1) {
                return this.defaultWindowState;
            }
            return this.getAttribute('window-state');
        }
        return this.defaultWindowState;
    }

    set windowState(windowState) {
        if (this.supportedWindowStates.indexOf(windowState) === -1) {
            throw new RangeError('Unsupported window state');
        }
        this.setAttribute('window-state', windowState);
    }

    get defaultWindowState() {
        return this.supportedWindowStates[0];
    }

    get supportedWindowStates() {
        return ['maximized', 'minimized'];
    }

    set hover(value) {
        if (!!value) {
            this.setAttribute('hover', 'hover');
        } else {
            this.removeAttribute('hover');
        }
    }

    get hover() {
        return this.hasAttribute('hover');
    }

    set interactive(value) {
        if (!!value) {
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
        return this.defaultWindowTitle;
    }

    set windowTitle(value) {
        this.setAttribute('window-title', value);
    }

    get defaultWindowTitle() {
        return '';
    }
};
