import { OsTheme } from './OsTheme';
import { Theme } from './Theme';
import { WindowState } from './WindowState';

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
