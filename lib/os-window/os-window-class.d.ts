import { OsTheme } from './os-theme';
import { Theme } from './theme';
import { WindowState } from './window-state';

export interface OsWindowClass {
  supportedThemes: Theme[];

  defaultTheme: Theme;

  supportedOsThemes: OsTheme[];

  defaultOsTheme: OsTheme;

  supportedWindowStates: WindowState[];

  defaultWindowState: WindowState;

  defaultWindowTitle: string;

  observedAttributes: string[];
}
