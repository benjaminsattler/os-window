import { OsWindowClass, OsWindowObject } from './lib';

type OsWindowIdentifier = 'os-window';

declare global {
  interface CustomElementRegistry {
    get(name: OsWindowIdentifier): OsWindowClass,
  }

  interface Document {
    createElement(
      tagName: OsWindowIdentifier,
      options?: ElementCreationOptions | undefined
    ): OsWindowObject;
  }
}

export * from './lib';
