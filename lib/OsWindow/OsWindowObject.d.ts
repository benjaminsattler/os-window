import { OsTheme } from './OsTheme';
import { Theme } from './Theme';
import { WindowState } from './WindowState';

export interface OsWindowObject extends HTMLElement {
  attributeChangedCallback(name: string, oldValue: string, newValue: string): void;

  theme: Theme;

  osTheme: OsTheme;

  windowState: WindowState;

  hover: boolean;

  interactive: boolean;

  windowTitle: string;
}
