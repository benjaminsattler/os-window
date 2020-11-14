import OsWindow, * as OsWindowExports from '../main.js';

describe('exports', () => {
  describe('main module', () => {
    describe('default export', () => {
      it('exports Oswindow as default', () => {
        chai.expect(OsWindow).not.to.equal(null);
        chai.expect(OsWindow).to.equal(window.customElements.get('os-window'));
      });
    });

    it('exports OsTheme', () => {
      chai.expect(OsWindowExports).haveOwnPropertyDescriptor('OsTheme');
      chai.expect(OsWindowExports.OsTheme).not.to.equal(null);
    });

    it('exports Theme', () => {
      chai.expect(OsWindowExports).haveOwnPropertyDescriptor('Theme');
      chai.expect(OsWindowExports.Theme).not.to.equal(null);
    });

    it('exports WindowState', () => {
      chai.expect(OsWindowExports).haveOwnPropertyDescriptor('WindowState');
      chai.expect(OsWindowExports.WindowState).not.to.equal(null);
    });
  });
});
