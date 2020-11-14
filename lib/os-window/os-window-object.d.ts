import { OsTheme } from './os-theme';
import { Theme } from './theme';
import { WindowState } from './window-state';

export interface OsWindowObject extends HTMLElement {
  attributeChangedCallback(name: string, oldValue: string, newValue: string): void;

  theme: Theme;

  osTheme: OsTheme;

  windowState: WindowState;

  hover: boolean;

  interactive: boolean;

  windowTitle: string;
}
