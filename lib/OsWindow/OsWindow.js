/* eslint-disable no-param-reassign */
/* eslint-disable import/extensions */
import OsThemes from './OsTheme.js';
import WindowStates from './WindowState.js';
import Themes from './Theme.js';

const templateElement = document.createElement('template');

/* {{{ html template */
templateElement.innerHTML = `
<style>
    /* {{{ ***** generic styles ******/
    :host {
        --win-7-window-theme-light-window-shadow: 4px 4px 8px rgba(0, 0, 0, .3),
          -4px 4px 8px rgba(0, 0, 0, .3),
          4px -4px 8px rgba(0, 0, 0, .3),
          -4px -4px 8px rgba(0, 0, 0, .3),
          inset 1px 1px 1px #c3d2e3,
          inset -1px 1px 1px #c3d2e3,
          inset 1px -1px 1px #c3d2e3,
          inset -1px -1px 1px #c3d2e3;
        --win-7-window-theme-light-border-color: #244667;
        --win-7-window-theme-dark-window-shadow: 4px 4px 8px rgba(0, 0, 0, .3),
          -4px 4px 8px rgba(0, 0, 0, .3),
          4px -4px 8px rgba(0, 0, 0, .3),
          -4px -4px 8px rgba(0, 0, 0, .3),
          inset 1px 1px 1px #c3d2e3,
          inset -1px 1px 1px #c3d2e3,
          inset 1px -1px 1px #c3d2e3,
          inset -1px -1px 1px #c3d2e3;
        --win-7-window-theme-dark-border-color: #525252;

        display: inline-block;
        transition: width .3s, height .3s;
        filter: drop-shadow( 0 2px 2px rgba(0, 0, 0, .3));
    }

    * {
        transition: color .1s, background .3s;
    }

    .window-wrapper {
        /* {{{ mac variables */
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
        /* }}} */

        /* {{{ win-xp variables */
        --win-xp-window-title-button-diameter: 1.7rem;
        --win-xp-window-border-radius: 8px;
        --win-xp-window-title-bar-height: 2.5rem;
        --win-xp-window-theme-dark-border-color: rgba(239,238,241,1);
        --win-xp-window-theme-dark-font-color: black;
        --win-xp-window-theme-dark-title-bar-text-shadow-color: #999999;
        --win-xp-window-theme-dark-title-bar-button-close-text-shadow-color: #724846;
        --win-xp-window-theme-dark-title-bar-button-close-font-color: #ffffff;
        --win-xp-window-theme-dark-title-bar-button-close-background-color: #ef534a;
        --win-xp-window-theme-dark-title-bar-button-close-hover-color: #f66030;
        --win-xp-window-theme-dark-title-bar-button-font-color: #4f4a59;
        --win-xp-window-theme-dark-title-bar-button-background-color: #d4d2e0;
        --win-xp-window-theme-dark-title-bar-border-color: #000000;
        --win-xp-window-theme-dark-title-bar-button-hover-color: #e4e2f0;
        --win-xp-window-theme-dark-title-bar-background-color: linear-gradient(180deg, rgba(134,133,139,1) 0%, rgba(239,238,241,1) 2%, rgba(166,165,186,1) 20%, rgba(252,253,255,1) 94%, rgba(132,132,141,1) 100%);
        --win-xp-window-theme-light-border-color: rgba(48,118,222,1);
        --win-xp-window-theme-light-font-color: #ffffff;
        --win-xp-window-theme-light-title-bar-text-shadow-color: #333333;
        --win-xp-window-theme-light-title-bar-button-close-font-color: #ffffff;
        --win-xp-window-theme-light-title-bar-button-close-background-color: #ef534a;
        --win-xp-window-theme-light-title-bar-button-close-hover-color: #f66030;
        --win-xp-window-theme-light-title-bar-button-font-color: #ffffff;
        --win-xp-window-theme-light-title-bar-button-background-color: #2c6af6;
        --win-xp-window-theme-light-title-bar-border-color: #ffffff;
        --win-xp-window-theme-light-title-bar-button-hover-color: #3c7af6;
        --win-xp-window-theme-light-title-bar-background-color: linear-gradient(180deg, rgba(48,118,222,1) 0%, rgba(48,147,255,1) 2%, rgba(2,82,227,1) 20%, rgba(5,106,255,1) 94%, rgba(15,70,192,1) 100%);
        --win-xp-window-font: sans-serif;
        /* }}} */

        /* {{{ win-7 variables */
        --win-7-window-title-button-height: 20px;
        --win-7-window-title-button-width: 28px;
        --win-7-window-border-radius: 8px;
        --win-7-window-title-bar-height: 2.5rem;
        --win-7-window-title-bar-button-background-color: linear-gradient(
          180deg,
          rgba(255,255,255,.4)   0%,
          rgba(255,255,255,.55)  50%,
          rgba(255,255,240,.1)   52%,
          rgba(255,255,255,.1)   100%
        );
        --win-7-window-title-bar-button-hover-background-color: linear-gradient(
          180deg,
          rgba(255,255,255,.6)   0%,
          rgba(255,255,255,.75)  50%,
          rgba(255,255,240,.3)   52%,
          rgba(255,255,255,.3)   100%
        );
        --win-7-window-title-bar-button-close-background-color: linear-gradient(
          180deg,
          #de877d 0%,
          #e49d96 50%,
          #c74233 52%,
          #c74233 100%
        );
        --win-7-window-title-bar-button-close-hover-background-color:linear-gradient(
          180deg,
          #e39991 0%,
          #e9afaa 50%,
          #cf5244 52%,
          #cf5244 100%
        );
        --win-7-window-font-color: #3b3932;
        --win-7-window-title-bar-text-shadow: 1px 1px 10px rgba(255,255,255,1);
        --win-7-window-title-bar-button-font-color: #ffffff;
        --win-7-window-font: sans-serif;
        --win-7-window-theme-light-background-color: rgba(161,187,215,.15);
        --win-7-window-theme-light-title-button-shadow: 1px 1px 0px #2b4e78,
          -1px 1px 0px #2b4e78,
          1px -1px 0px #2b4e78,
          -1px -1px 0px #2b4e78,
          inset 0px 0px 5px #dae1e9,
          inset 10px 0px 10px rgba(0,0,0,.1),
          inset -10px 0px 10px rgba(0,0,0,.10);
        --win-7-window-theme-light-title-button-hover-shadow: 1px 1px 0px #2b4e78,
          -1px 1px 0px #2b4e78,
          1px -1px 0px #2b4e78,
          -1px -1px 0px #2b4e78,
          inset 0px 0px 5px #dae1e9,
          inset 10px 0px 10px rgba(0,0,0,.1),
          inset -10px 0px 10px rgba(0,0,0,.10),
          2px 2px 2px rgba(255,255,255,0.3),
          -2px 2px 2px rgba(255,255,255,0.3),
          2px -2px 2px rgba(255,255,255,0.3),
          -2px -2px 2px rgba(255,255,255,0.3);
        --win-7-window-theme-light-title-button-close-shadow: 1px 1px 0px #2b4e78,
          -1px 1px 0px #2b4e78,
          1px -1px 0px #2b4e78,
          -1px -1px 0px #2b4e78,
          inset 0px 0px 5px #f2c3b4,
          inset 10px 0px 10px rgba(0,0,0,.1),
          inset -10px 0px 10px rgba(0,0,0,.10);
        --win-7-window-theme-light-title-button-font-border-color: #5d6171;
        --win-7-window-theme-dark-background-color: rgba(0,0,0,.35);
        --win-7-window-theme-dark-title-button-shadow: 1px 1px 0px #525252,
          -1px 1px 0px #525252,
          1px -1px 0px #525252,
          -1px -1px 0px #525252,
          inset 0px 0px 5px #dae1e9,
          inset 10px 0px 10px rgba(0,0,0,.1),
          inset -10px 0px 10px rgba(0,0,0,.10);
        --win-7-window-theme-dark-title-button-hover-shadow: 1px 1px 0px #525252,
          -1px 1px 0px #525252,
          1px -1px 0px #525252,
          -1px -1px 0px #525252,
          inset 0px 0px 5px #dae1e9,
          inset 10px 0px 10px rgba(0,0,0,.1),
          inset -10px 0px 10px rgba(0,0,0,.10),
          2px 2px 2px rgba(255,255,255,0.3),
          -2px 2px 2px rgba(255,255,255,0.3),
          2px -2px 2px rgba(255,255,255,0.3),
          -2px -2px 2px rgba(255,255,255,0.3);
        --win-7-window-theme-dark-title-button-close-shadow: 1px 1px 0px #525252,
          -1px 1px 0px #525252,
          1px -1px 0px #525252,
          -1px -1px 0px #525252,
          inset 0px 0px 5px #f2c3b4,
          inset 10px 0px 10px rgba(0,0,0,.1),
          inset -10px 0px 10px rgba(0,0,0,.10);
        --win-7-window-theme-dark-title-button-font-border-color: #5d6171;
        /* }}} */

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

    .window-content-slot-wrapper {
        overflow: hidden;
    }

    .window-title-button:focus {
      outline: none;
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
    /* }}} */

    /* {{{ ****** default theme styles ******/
    .window-wrapper {
        border-radius: var(--mac-window-border-radius);
    }

    .window-title-bar {
        height: var(--window-title-bar-height);
        line-height: var(--mac-window-title-bar-height);
        display: flex;
    }

    .window-title-buttons {
        margin-left: 1rem;
        white-space: nowrap;
    }

    .window-title-button {
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

    .window-title-button::after {
        line-height: 1;
        display: inline;
        vertical-align: 10%;
    }

    :host([hover]) .window-title-button:hover,
    :host([hover]) .window-title-button:focus {
        color: rgba(0, 0, 0, .3);
    }

    .window-title-button__close {
        background: var(--mac-window-title-bar-button-close-color);
    }

    .window-title-button__close::after {
        content: "⨉";
    }

    .window-title-button__minimize {
        background: var(--mac-window-title-bar-button-minimize-color);
    }

    .window-title-button__minimize::after {
        content: "–";
    }

    .window-title-button__maximize {
        background: var(--mac-window-title-bar-button-maximize-color);
    }

    .window-title-button__maximize::after {
        content: "+";
    }

    .window-title-text {
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

    .window-content-slot-wrapper {
        padding: 0 1rem .5rem 1rem;
        font-family: var(--mac-window-font);
        box-sizing: border-box;
    }

    :host([theme="dark"]) .window-content-slot-wrapper {
        color: var(--mac-window-theme-dark-font-color);
        background: var(--mac-window-theme-dark-background-color);
    }

    .window-content-slot-wrapper,
    :host([theme="light"]) .window-content-slot-wrapper {
        color: var(--mac-window-theme-light-font-color);
        background: var(--mac-window-theme-light-background-color);
    }

    :host([theme="dark"]) .window-title-text {
        color: var(--mac-window-theme-dark-font-color);
        background: var(--mac-window-theme-dark-background-color);
    }

    .window-title-text,
    :host([theme="light"]) .window-title-text {
        color: var(--mac-window-theme-light-font-color);
        background: var(--mac-window-theme-light-background-color);
    }

    .window-title-bar,
    :host([theme="light"]) .window-title-bar {
        color: var(--mac-window-theme-light-font-color);
        background: var(--mac-window-theme-light-background-color);
    }

    :host([theme="dark"]) .window-title-bar {
        color: var(--mac-window-theme-dark-font-color);
        background: var(--mac-window-theme-dark-background-color);
    }
    /* }}} */

    /* {{{ ****** mac theme styles ******/
    :host([os-theme="mac"]) .window-wrapper {
        border-radius: var(--mac-window-border-radius);
    }

    :host([os-theme="mac"]) .window-title-bar {
        height: var(--window-title-bar-height);
        line-height: var(--mac-window-title-bar-height);
        display: flex;
    }

    :host([os-theme="mac"]) .window-title-buttons {
        margin-left: 1rem;
        white-space: nowrap;
    }

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

    :host([os-theme="mac"]) .window-title-button::after {
        line-height: 1;
        display: inline;
        vertical-align: 10%;
    }

    :host([hover][os-theme="mac"]) .window-title-button:hover
    :host([hover][os-theme="mac"]) .window-title-button:focus {
        color: rgba(0, 0, 0, .3);
    }

    :host([os-theme="mac"]) .window-title-button__close {
        background: var(--mac-window-title-bar-button-close-color);
    }

    :host([os-theme="mac"]) .window-title-button__close::after {
        content: "⨉";
    }

    :host([os-theme="mac"]) .window-title-button__minimize {
        background: var(--mac-window-title-bar-button-minimize-color);
    }

    :host([os-theme="mac"]) .window-title-button__minimize::after {
        content: "–";
    }

    :host([os-theme="mac"]) .window-title-button__maximize {
        background: var(--mac-window-title-bar-button-maximize-color);
    }

    :host([os-theme="mac"]) .window-title-button__maximize::after {
        content: "+";
    }

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

    :host([os-theme="mac"]) .window-content-slot-wrapper {
        padding: 0 1rem .5rem 1rem;
        font-family: var(--mac-window-font);
        box-sizing: border-box;
    }

    :host([os-theme="mac"]) .window-content-slot-wrapper,
    :host([theme="light"][os-theme="mac"]) .window-content-slot-wrapper {
        color: var(--mac-window-theme-light-font-color);
        background: var(--mac-window-theme-light-background-color);
    }

    :host([theme="dark"][os-theme="mac"]) .window-content-slot-wrapper {
        color: var(--mac-window-theme-dark-font-color);
        background: var(--mac-window-theme-dark-background-color);
    }

    :host([os-theme="mac"]) .window-title-text,
    :host([theme="light"][os-theme="mac"]) .window-title-text {
        color: var(--mac-window-theme-light-font-color);
        background: var(--mac-window-theme-light-background-color);
    }

    :host([theme="dark"][os-theme="mac"]) .window-title-text {
        color: var(--mac-window-theme-dark-font-color);
        background: var(--mac-window-theme-dark-background-color);
    }

    :host([os-theme="mac"]) .window-title-bar,
    :host([theme="light"][os-theme="mac"]) .window-title-bar {
        color: var(--mac-window-theme-light-font-color);
        background: var(--mac-window-theme-light-background-color);
    }

    :host([theme="dark"][os-theme="mac"]) .window-title-bar {
        color: var(--mac-window-theme-dark-font-color);
        background: var(--mac-window-theme-dark-background-color);
    }
    /* }}} */

    /* {{{ ***** win-xp theme styles ******/
    :host([os-theme="win-xp"]) .window-wrapper {
        border-radius: var(--win-xp-window-border-radius);
    }

    :host([os-theme="win-xp"]) .window-title-bar {
        height: 2.5rem;
        line-height: var(--win-xp-window-title-bar-height);
        display: flex;
        flex-direction: row-reverse;
    }

    :host([os-theme="win-xp"]) .window-title-buttons {
        margin-right: 7px;
        margin-top: 7px;
        white-space: nowrap;
        display: flex;
    }

    :host([os-theme="win-xp"]) .window-title-button {
        border-width: 1px;
        border-style: solid;
        border-radius: calc(var(--win-xp-window-title-button-diameter) / 8);
        height: var(--win-xp-window-title-button-diameter);
        width: var(--win-xp-window-title-button-diameter);
        margin: 0 2px;
        font-weight: 600;
        fill: transparent;
        padding: 0 0 0 0;
        font-size: 1.45rem;
    }

    :host([os-theme="win-xp"]) .window-title-button__close {
        order: 3;
        background: var(--win-xp-window-title-bar-button-close-color);
    }

    :host([os-theme="win-xp"]) .window-title-button__close::after {
        content: "⨉";
    }

    :host([os-theme="win-xp"]) .window-title-button__maximize {
        order: 2;
    }

    :host([os-theme="win-xp"]) .window-title-button__maximize::after {
        -webkit-clip-path: polygon(0% 0%, 0% 100%, 8% 99%, 8% 17%, 92% 17%, 92% 92%, 0 92%, 0 100%, 100% 100%, 100% 0%);
        clip-path: polygon(0% 0%, 0% 100%, 8% 99%, 8% 17%, 92% 17%, 92% 92%, 0 92%, 0 100%, 100% 100%, 100% 0%);
        content: "";
        height: 18px;
        width: 18px;
        display: inline-block;
        line-height: 0.55;
    }

    :host([os-theme="win-xp"]) .window-title-button__minimize {
        order: 1;
    }

    :host([os-theme="win-xp"]) .window-title-button__minimize::after {
        content: "_";
        position: relative;
        left: -3px;
        top: -5px;
    }

    :host([os-theme="win-xp"]) .window-title-text {
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        text-align: left;
        font-family: var(--win-xp-window-font);
        padding-left: 1rem;
        width: 100%;
        margin: 0 auto;
        background: transparent;
    }

    :host([os-theme="win-xp"]) .window-content-slot-wrapper {
        font-family: var(--win-xp-window-font);
        box-sizing: border-box;
        border-width: 0 5px 5px 5px;
        border-style: solid;
        border-top: 0;
        padding-top: .5rem;
        overflow: hidden;
        color: black;
        background: #ebe8d7;
    }

    :host([window-state="minimized"][os-theme="win-xp"]) .window-content-slot-wrapper {
      padding-top: 0;
    }

    :host([os-theme="win-xp"]) .window-content-slot-wrapper,
    :host([theme="light"][os-theme="win-xp"]) .window-content-slot-wrapper {
        border-color: var(--win-xp-window-theme-light-border-color);
    }

    :host([os-theme="win-xp"][theme="dark"]) .window-content-slot-wrapper {
        border-color: var(--win-xp-window-theme-dark-border-color);
    }

    :host([os-theme="win-xp"]) .window-wrapper,
    :host([os-theme="win-xp"][theme="light"]) .window-wrapper {
        color: var(--win-xp-window-theme-light-font-color);
    }

    :host([os-theme="win-xp"]) .window-title-text,
    :host([theme="light"][os-theme="win-xp"]) .window-title-text {
        color: var(--win-xp-window-theme-light-font-color);
        text-shadow: 1px 1px 2px var(--win-xp-window-theme-light-title-bar-text-shadow-color);
    }

    :host([theme="dark"][os-theme="win-xp"]) .window-title-text {
        color: var(--win-xp-window-theme-dark-font-color);
        text-shadow: 1px 1px 2px var(--win-xp-window-theme-dark-title-bar-text-shadow-color);
    }

    :host([os-theme="win-xp"]) .window-title-bar,
    :host([theme="light"][os-theme="win-xp"]) .window-title-bar {
        color: var(--win-xp-window-theme-light-font-color);
        background: var(--win-xp-window-theme-light-title-bar-background-color);
    }

    :host([theme="dark"][os-theme="win-xp"]) .window-title-bar {
        color: var(--win-xp-window-theme-dark-font-color);
        background: var(--win-xp-window-theme-dark-title-bar-background-color);
    }

    :host([os-theme="win-xp"]) .window-title-button,
    :host([theme="light"][os-theme="win-xp"]) .window-title-button {
        background: var(--win-xp-window-theme-light-title-bar-button-background-color);
        border-color: var(--win-xp-window-theme-light-title-bar-border-color);
        color: var(--win-xp-window-theme-light-title-bar-button-font-color);
    }

    :host([theme="dark"][os-theme="win-xp"]) .window-title-button {
        background: var(--win-xp-window-theme-dark-title-bar-button-background-color);
        border-color: var(--win-xp-window-theme-dark-title-bar-border-color);
        color: var(--win-xp-window-theme-dark-title-bar-button-font-color);
        text-shadow: -1px 1px 1px #ffffff;
    }

    :host([hover][os-theme="win-xp"]) .window-title-button:hover,
    :host([hover][os-theme="win-xp"]) .window-title-button:focus,
    :host([hover][theme="light"][os-theme="win-xp"]) .window-title-button:hover,
    :host([hover][theme="light"][os-theme="win-xp"]) .window-title-button:focus {
        background: var(--win-xp-window-theme-light-title-bar-button-hover-color);
        color: var(--win-xp-window-theme-light-title-bar-button-font-color);
    }

    :host([hover][theme="dark"][os-theme="win-xp"]) .window-title-button:hover,
    :host([hover][theme="dark"][os-theme="win-xp"]) .window-title-button:focus {
        background: var(--win-xp-window-theme-dark-title-bar-button-hover-color);
        color: var(--win-xp-window-theme-dark-title-bar-button-font-color);
    }

    :host([os-theme="win-xp"]) .window-title-button__maximize::after,
    :host([theme="light"][os-theme="win-xp"]) .window-title-button__maximize::after {
        background: var(--win-xp-window-theme-light-title-bar-button-font-color);
    }

    :host([theme="dark"][os-theme="win-xp"]) .window-title-button__maximize::after {
        background: var(--win-xp-window-theme-dark-title-bar-button-font-color);
    }

    :host([os-theme="win-xp"]) .window-title-button__close,
    :host([theme="light"][os-theme="win-xp"]) .window-title-button__close {
        background: var(--win-xp-window-theme-light-title-bar-button-close-background-color);
        color: var(--win-xp-window-theme-light-title-bar-button-close-font-color);
    }

    :host([theme="dark"][os-theme="win-xp"]) .window-title-button__close {
        background: var(--win-xp-window-theme-dark-title-bar-button-close-background-color);
        color: var(--win-xp-window-theme-dark-title-bar-button-close-font-color);
        text-shadow: -1px -1px 1px var(--win-xp-window-theme-dark-title-bar-button-close-text-shadow-color);
    }

    :host([theme="dark"][os-theme="win-xp"]) .window-title-button__close::after {
        position: relative;
        top: -1px;
        color: var(--win-xp-window-theme-dark-title-bar-button-close-font-color);
    }

    :host([hover][os-theme="win-xp"]) .window-title-button__close:hover,
    :host([hover][os-theme="win-xp"]) .window-title-button__close:focus,
    :host([hover][theme="light"][os-theme="win-xp"]) .window-title-button__close:hover,
    :host([hover][theme="light"][os-theme="win-xp"]) .window-title-button__close:focus {
        background: var(--win-xp-window-theme-light-title-bar-button-close-hover-color);
    }

    :host([hover][theme="dark"][os-theme="win-xp"]) .window-title-button__close:hover,
    :host([hover][theme="dark"][os-theme="win-xp"]) .window-title-button__close:focus {
        background: var(--win-xp-window-theme-dark-title-bar-button-close-hover-color);
    }
    /* }}} */

    /* {{{ ***** win-7 theme styles ******/
    :host([os-theme="win-7"]) {
      backdrop-filter: blur(4px);
      -webkit-backdrop-filter: blur(4px);
      border-radius: 6px;
      overflow: hidden;
    }

    @supports not (backdrop-filter: blur(4px)) {
      :host([os-theme="win-7"]),
      :host([os-theme="win-7"][theme="light"]) {
        background: rgba(255,255,255,.3);
      }

      :host([os-theme="win-7"][theme="dark"]) {
        background: rgba(0,0,0,.3);
      }
    }

    :host([os-theme="win-7"]) .window-title-bar {
        height: 2.5rem;
        line-height: var(--win-7-window-title-bar-height);
        display: flex;
        flex-direction: row-reverse;
        background: transparent;
        border: 0;
    }

    :host([os-theme="win-7"]) .window-title-buttons {
        margin: 0 .35rem 0 0;
        padding: 0;
        white-space: nowrap;
        display: flex;
    }

    :host([os-theme="win-7"]) .window-title-button {
        border-radius: 0;
        height: var(--win-7-window-title-button-height);
        width: var(--win-7-window-title-button-width);
        margin: 0;
        font-weight: 600;
        padding: 0 0 0 0;
        font-size: 1.35rem;
        background: var(--win-7-window-title-bar-button-background-color);
    }

    :host([hover][os-theme="win-7"]) .window-title-button:hover,
    :host([hover][os-theme="win-7"]) .window-title-button:focus {
        background: var(--win-7-window-title-bar-button-hover-background-color);
    }

    :host([os-theme="win-7"]) .window-title-button::after {
        background: var(--win-7-window-title-bar-button-font-color);
    }

    :host([os-theme="win-7"]) .window-title-button__close {
        order: 3;
        position: relative;
        background: var(--win-7-window-title-bar-button-close-background-color);
        border-bottom-right-radius: 4px;
        width: calc(var(--win-7-window-title-button-width) * 1.8);
    }

    :host([hover][os-theme="win-7"]) .window-title-button__close:hover,
    :host([hover][os-theme="win-7"]) .window-title-button__close:focus {
        background: var(--win-7-window-title-bar-button-close-hover-background-color);
    }

    :host([os-theme="win-7"]) .window-title-button__close::after {
        -webkit-clip-path:polygon(55% 31%, 51% 41%, 47% 31%, 41% 31%, 41% 38%, 47% 52%, 41% 67%, 41% 74%, 47% 74%, 51% 63%, 55% 74%, 61% 74%, 61% 67%, 55% 52%, 61% 38%, 61% 31%);
        clip-path:polygon(55% 31%, 51% 41%, 47% 31%, 41% 31%, 41% 38%, 47% 52%, 41% 67%, 41% 74%, 47% 74%, 51% 63%, 55% 74%, 61% 74%, 61% 67%, 55% 52%, 61% 38%, 61% 31%);
        content: "";
        height: 100%;
        width: 100%;
        display: inline-block;
        line-height: 0.55;
    }

    :host([os-theme="win-7"]) .window-title-button__close::before {
        -webkit-clip-path:polygon(54.5% 28.5%, 51% 37.5%, 47.5% 28.5%, 40% 28.5%, 40% 40%, 45.5% 52%, 40% 66%, 40% 76.5%, 47.5% 76.5%, 51% 67%, 54.75% 76.5%, 62% 76.5%, 62% 66%, 56.5% 52%, 62% 40%, 62% 28.5%);
        clip-path:polygon(54.5% 28.5%, 51% 37.5%, 47.5% 28.5%, 40% 28.5%, 40% 40%, 45.5% 52%, 40% 66%, 40% 76.5%, 47.5% 76.5%, 51% 67%, 54.75% 76.5%, 62% 76.5%, 62% 66%, 56.5% 52%, 62% 40%, 62% 28.5%);
        content: "";
        height: 100%;
        width: 100%;
        display: inline-block;
        line-height: 0.55;
        position: absolute;
    }

    :host([os-theme="win-7"]) .window-title-button__maximize {
        order: 2;
        position: relative;
    }

    :host([os-theme="win-7"]) .window-title-button__maximize::before {
        -webkit-clip-path: polygon(31% 30%, 31% 76%, 41% 76%, 41% 44%, 63% 44%, 63% 61%, 37% 61%, 33% 76%, 74% 76%, 74% 30%);
        clip-path: polygon(31% 30%, 31% 76%, 41% 76%, 41% 44%, 63% 44%, 63% 61%, 37% 61%, 33% 76%, 74% 76%, 74% 30%);
        content: "";
        height: 100%;
        width: 100%;
        display: inline-block;
        line-height: 0.55;
        position: absolute;
    }

    :host([os-theme="win-7"]) .window-title-button__maximize::after {
        -webkit-clip-path: polygon(33% 33%, 33% 73%, 39% 73%, 39% 41%, 65% 41%, 65% 64%, 37% 64%, 33% 73%, 72% 73%, 72% 33%);
        clip-path: polygon(33% 33%, 33% 73%, 39% 73%, 39% 41%, 65% 41%, 65% 64%, 37% 64%, 33% 73%, 72% 73%, 72% 33%);
        content: "";
        height: 100%;
        width: 100%;
        display: inline-block;
        line-height: 0.55;
    }

    :host([os-theme="win-7"]) .window-title-button__minimize {
        order: 1;
        position: relative;
        border-bottom-left-radius: 4px;
    }

    :host([os-theme="win-7"]) .window-title-button__minimize::before {
        -webkit-clip-path: polygon(28.5% 55%, 71.5% 55%, 71.5% 75%, 28.5% 75%);
        clip-path: polygon(28.5% 55%, 71.5% 55%, 71.5% 75%, 28.5% 75%);
        content: "";
        height: 100%;
        width: 100%;
        display: inline-block;
        line-height: 0.55;
        position: absolute;
    }

    :host([os-theme="win-7"]) .window-title-button__minimize::after {
        -webkit-clip-path: polygon(31% 58%, 69% 58%, 69% 72%, 31% 72%);
        clip-path: polygon(31% 58%, 69% 58%, 69% 72%, 31% 72%);
        content: "";
        height: 100%;
        width: 100%;
        display: inline-block;
        line-height: 0.55;
    }

    :host([os-theme="win-7"]) .window-title-text {
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        font-family: var(--win-7-window-font);
        padding: 0;
        width: 100%;
        background: transparent;
        font-size: .8rem;
        text-shadow:var(--win-7-window-title-bar-text-shadow),
                    var(--win-7-window-title-bar-text-shadow),
                    var(--win-7-window-title-bar-text-shadow),
                    var(--win-7-window-title-bar-text-shadow),
                    var(--win-7-window-title-bar-text-shadow),
                    var(--win-7-window-title-bar-text-shadow),
                    var(--win-7-window-title-bar-text-shadow),
                    var(--win-7-window-title-bar-text-shadow),
                    var(--win-7-window-title-bar-text-shadow);
        color: var(--win-7-window-font-color);
    }

    :host([os-theme="win-7"]) .window-content-slot-wrapper {
        font-family: var(--win-7-window-font);
        box-sizing: border-box;
        border-width: 0 5px 5px 5px;
        border-color: transparent;
        border-style: solid;
        border-top: 0;
        padding-top: .5rem;
        overflow: hidden;
        color: black;
        background: transparent;
    }

    :host([window-state="minimized"][os-theme="win-7"]) .window-content-slot-wrapper {
      padding-top: 0;
    }

    :host([os-theme="win-7"]) .window-wrapper,
    :host([os-theme="win-7"][theme="light"]) .window-wrapper {
        background-color: var(--win-7-window-theme-light-background-color);
    }

    :host([os-theme="win-7"][theme="dark"]) .window-wrapper {
      background-color: var(--win-7-window-theme-dark-background-color);
    }

    :host([os-theme="win-7"]),
    :host([os-theme="win-7"][theme="light"]) {
      box-shadow: var(--win-7-window-theme-light-window-shadow);
      border: 1px solid var(--win-7-window-theme-light-border-color);
    }

    :host([os-theme="win-7"][theme="dark"]) {
      box-shadow: var(--win-7-window-theme-dark-window-shadow);
      border: 1px solid var(--win-7-window-theme-dark-border-color);
    }

    :host([os-theme="win-7"]) .window-title-button,
    :host([os-theme="win-7"][theme="light"]) .window-title-button {
      box-shadow: var(--win-7-window-theme-light-title-button-shadow);
    }

    :host([os-theme="win-7"][theme="dark"]) .window-title-button {
      box-shadow: var(--win-7-window-theme-dark-title-button-shadow);
    }

    :host([hover][os-theme="win-7"]) .window-title-button:hover,
    :host([hover][os-theme="win-7"]) .window-title-button:focus,
    :host([hover][os-theme="win-7"][theme="light"]) .window-title-button:hover,
    :host([hover][os-theme="win-7"][theme="light"]) .window-title-button:focus {
      box-shadow: var(--win-7-window-theme-light-title-button-hover-shadow);
    }

    :host([hover][os-theme="win-7"][theme="dark"]) .window-title-button:hover,
    :host([hover][os-theme="win-7"][theme="dark"]) .window-title-button:focus {
      box-shadow: var(--win-7-window-theme-dark-title-button-hover-shadow);
    }

    :host([os-theme="win-7"]) .window-title-button__close,
    :host([os-theme="win-7"][theme="light"]) .window-title-button__close {
      box-shadow: var(--win-7-window-theme-light-title-button-close-shadow);
    }

    :host([os-theme="win-7"][theme="dark"]) .window-title-button__close {
      box-shadow: var(--win-7-window-theme-dark-title-button-close-shadow);
    }

    :host([os-theme="win-7"]) .window-title-button::before,
    :host([os-theme="win-7"][theme="light"]) .window-title-button::before {
      background-color: var(--win-7-window-theme-light-title-button-font-border-color);
    }

    :host([os-theme="win-7"][theme="dark"]) .window-title-button::before {
      background-color: var(--win-7-window-theme-dark-title-button-font-border-color);
    }
    /* }}} */
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
/* }}} */

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
