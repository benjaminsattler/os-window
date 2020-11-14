import OsWindow from '../main.js';

describe('interface', () => {
  it('is defined as custom element', () => {
    chai.expect(window.customElements.get('os-window')).to.be.a('Function');
  });

  describe('set theme', () => {
    it('changes the theme', () => {
      const sut = document.createElement('os-window');
      sut.theme = 'dark';
      chai.expect(sut.theme).to.equal('dark');
      sut.theme = 'light';
      chai.expect(sut.theme).to.equal('light');
    });

    it('changes the attribute \'theme\' for valid values', () => {
      const sut = document.createElement('os-window');
      sut.theme = 'light';
      chai.expect(sut.getAttribute('theme')).to.equal('light');
      sut.theme = 'dark';
      chai.expect(sut.getAttribute('theme')).to.equal('dark');
    });

    it('throws RangeError for unsupported values', () => {
      const sut = document.createElement('os-window');
      const fn = () => { sut.theme = 'fail'; };
      chai.expect(fn).to.throw(RangeError, 'Unsupported theme');
    });

    it('does not change theme for unsupported values', () => {
      const sut = document.createElement('os-window');
      const wrongTheme = 'fail';
      const expectedTheme = sut.theme;
      try {
        sut.theme = wrongTheme;
      } catch (e) {
        // eslint-disable no-empty
      } finally {
        chai.expect(sut.theme).to.equal(expectedTheme);
      }
    });

    it('does not change the attribute theme for unsupported values', () => {
      const sut = document.createElement('os-window');
      const wrongTheme = 'fail';
      try {
        sut.theme = wrongTheme;
      } catch (e) {
        // eslint-disable no-empty
      } finally {
        chai.expect(sut.getAttribute('theme')).to.equal(null);
      }
    });

    it('accepts all supported themes', () => {
      const sut = document.createElement('os-window');
      try {
        for (let i = 0; i < OsWindow.supportedThemes.length; i += 1) {
          sut.theme = OsWindow.supportedThemes[i];
        }
      } catch (e) {
        chai.expect.fail(e);
      }
    });
  });

  describe('get theme', () => {
    it('returns the default theme when the attribute theme is null', () => {
      const sut = document.createElement('os-window');
      chai.expect(sut.theme).to.equal(OsWindow.defaultTheme);
    });

    it('returns the value of the attribute theme for supported themes', () => {
      const sut = document.createElement('os-window');
      for (let i = 0; i < OsWindow.supportedThemes.length; i += 1) {
        sut.setAttribute('theme', OsWindow.supportedThemes[i]);
        chai.expect(sut.theme).to.equal(OsWindow.supportedThemes[i]);
      }
    });

    it('returns defaultTheme for unsupported values of attribute theme', () => {
      const sut = document.createElement('os-window');
      sut.setAttribute('theme', 'unsupported');
      chai.expect(sut.theme).to.equal(OsWindow.defaultTheme);
    });
  });

  describe('get supportedThemes', () => {
    it('returns an array of all supported themes', () => {
      chai.expect(OsWindow.supportedThemes).to.be.a('Array');
      chai.expect(OsWindow.supportedThemes).to.have.lengthOf(2);
      chai.expect(OsWindow.supportedThemes).to.include.members(['light', 'dark']);
    });
  });

  describe('get defaultTheme', () => {
    it('returns a supported theme', () => {
      chai.expect(OsWindow.defaultTheme).to.be.oneOf(OsWindow.supportedThemes);
    });

    it('returns light', () => {
      chai.expect(OsWindow.defaultTheme).to.be.equal('light');
    });
  });

  describe('set osTheme', () => {
    it('changes the osTheme', () => {
      const sut = document.createElement('os-window');
      sut.osTheme = 'mac';
      chai.expect(sut.osTheme).to.equal('mac');
    });

    it('changes the attribute \'os-theme\' for valid values', () => {
      const sut = document.createElement('os-window');
      chai.expect(sut.getAttribute('os-theme')).to.equal(null);
      try {
        for (let i = 0; i < OsWindow.supportedOsThemes.length; i += 1) {
          sut.osTheme = OsWindow.supportedOsThemes[i];
          chai.expect(sut.getAttribute('os-theme')).to.equal(OsWindow.supportedOsThemes[i]);
        }
      } catch (e) {
        chai.expect.fail(e);
      }
    });

    it('throws RangeError for unsupported values', () => {
      const sut = document.createElement('os-window');
      const fn = () => { sut.osTheme = 'fail'; };
      chai.expect(fn).to.throw(RangeError, 'Unsupported os-theme');
    });

    it('does not change theme for unsupported values', () => {
      const sut = document.createElement('os-window');
      const expectedTheme = sut.osTheme;
      try {
        sut.osTheme = 'fail';
      } catch (e) {
        // eslint-disable no-empty
      } finally {
        chai.expect(sut.osTheme).to.equal(expectedTheme);
      }
    });

    it('does not change the attribute os-theme for unsupported values', () => {
      const sut = document.createElement('os-window');
      try {
        sut.osTheme = 'fail';
      } catch (e) {
        // eslint-disable no-empty
      } finally {
        chai.expect(sut.getAttribute('os-theme')).to.equal(null);
      }
    });

    it('accepts all supported os-themes', () => {
      const sut = document.createElement('os-window');
      try {
        for (let i = 0; i < OsWindow.supportedOsThemes.length; i += 1) {
          sut.osTheme = OsWindow.supportedOsThemes[i];
        }
      } catch (e) {
        chai.expect.fail(e);
      }
    });
  });

  describe('get osTheme', () => {
    it('returns the default os theme when the attribute os-theme is null', () => {
      const sut = document.createElement('os-window');
      chai.expect(sut.osTheme).to.equal(OsWindow.defaultOsTheme);
    });

    it('returns the value of the attribute os-theme for supported os themes', () => {
      const sut = document.createElement('os-window');
      for (let i = 0; i < OsWindow.supportedOsThemes.length; i += 1) {
        sut.setAttribute('os-theme', OsWindow.supportedOsThemes[i]);
        chai.expect(sut.osTheme).to.equal(OsWindow.supportedOsThemes[i]);
      }
    });

    it('returns defaultOsTheme for unsupported values of attribute os-theme', () => {
      const sut = document.createElement('os-window');
      sut.setAttribute('os-theme', 'unsupported');
      chai.expect(sut.osTheme).to.equal(OsWindow.defaultOsTheme);
    });
  });

  describe('get supportedOsThemes', () => {
    it('returns an array of all supported os themes', () => {
      chai.expect(OsWindow.supportedOsThemes).to.be.a('Array');
      chai.expect(OsWindow.supportedOsThemes).to.have.lengthOf(3);
      chai.expect(OsWindow.supportedOsThemes).to.include.members(['mac', 'win-xp', 'win-7']);
    });
  });

  describe('get defaultOsTheme', () => {
    it('returns a supported os theme', () => {
      chai.expect(OsWindow.defaultOsTheme).to.be.oneOf(OsWindow.supportedOsThemes);
    });

    it('returns mac', () => {
      chai.expect(OsWindow.defaultOsTheme).to.be.equal('mac');
    });
  });

  describe('get windowState', () => {
    it('returns the default windowState when the attribute window-state is null', () => {
      const sut = document.createElement('os-window');
      chai.expect(sut.windowState).to.equal(OsWindow.defaultWindowState);
    });

    it('returns the value of the attribute window-state for supported window states', () => {
      const sut = document.createElement('os-window');
      for (let i = 0; i < OsWindow.supportedWindowStates.length; i += 1) {
        sut.setAttribute('window-state', OsWindow.supportedWindowStates[i]);
        chai.expect(sut.windowState).to.equal(OsWindow.supportedWindowStates[i]);
      }
    });

    it('returns defaultWindowState for unsupported values of attribute window-state', () => {
      const sut = document.createElement('os-window');
      sut.setAttribute('window-state', 'unsupported');
      chai.expect(sut.windowState).to.equal(OsWindow.defaultWindowState);
    });
  });

  describe('set windowState', () => {
    it('changes the windowState', () => {
      const sut = document.createElement('os-window');
      sut.windowState = 'minimized';
      chai.expect(sut.windowState).to.equal('minimized');
      sut.windowState = 'maximized';
      chai.expect(sut.windowState).to.equal('maximized');
    });

    it('changes the attribute \'window-state\' for valid values', () => {
      const sut = document.createElement('os-window');
      sut.windowState = 'minimized';
      chai.expect(sut.getAttribute('window-state')).to.equal('minimized');
      sut.windowState = 'maximized';
      chai.expect(sut.getAttribute('window-state')).to.equal('maximized');
    });

    it('throws RangeError for unsupported values', () => {
      const sut = document.createElement('os-window');
      const fn = () => { sut.windowState = 'fail'; };
      chai.expect(fn).to.throw(RangeError, 'Unsupported window state');
    });

    it('does not change window state for unsupported values', () => {
      const sut = document.createElement('os-window');
      const wrongWindowState = 'fail';
      const expectedWindowState = sut.windowState;
      try {
        sut.theme = wrongWindowState;
      } catch (e) {
        // eslint-disable no-empty
      } finally {
        chai.expect(sut.windowState).to.equal(expectedWindowState);
      }
    });

    it('does not change the attribute window-state for unsupported values', () => {
      const sut = document.createElement('os-window');
      const wrongWindowState = 'fail';
      try {
        sut.windowState = wrongWindowState;
      } catch (e) {
        // eslint-disable no-empty
      } finally {
        chai.expect(sut.getAttribute('window-state')).to.equal(null);
      }
    });

    it('accepts all supported window states', () => {
      const sut = document.createElement('os-window');
      try {
        for (let i = 0; i < OsWindow.supportedWindowStates.length; i += 1) {
          sut.windowState = OsWindow.supportedWindowStates[i];
          chai.expect(sut.windowState).to.equal(OsWindow.supportedWindowStates[i]);
        }
      } catch (e) {
        chai.expect.fail(e);
      }
    });
  });

  describe('get defaultWindowState', () => {
    it('returns a supported window state', () => {
      chai.expect(OsWindow.defaultWindowState).to.be.oneOf(OsWindow.supportedWindowStates);
    });

    it('returns maximized', () => {
      chai.expect(OsWindow.defaultWindowState).to.be.equal('maximized');
    });
  });

  describe('get supportedWindowStates', () => {
    it('returns an array of all supported window states', () => {
      chai.expect(OsWindow.supportedWindowStates).to.be.a('Array');
      chai.expect(OsWindow.supportedWindowStates).to.have.lengthOf(2);
      chai.expect(OsWindow.supportedWindowStates).to.include.members(['maximized', 'minimized']);
    });
  });

  describe('get hover', () => {
    it('returns true when the attribute hover is set', () => {
      const sut = document.createElement('os-window');
      sut.setAttribute('hover', 'hover');
      chai.expect(sut.hover).to.equal(true);
    });

    it('returns true when the property hover is set', () => {
      const sut = document.createElement('os-window');
      sut.hover = true;
      chai.expect(sut.hover).to.equal(true);
    });

    it('returns false when the attribute hover is not set', () => {
      const sut = document.createElement('os-window');
      chai.expect(sut.hover).to.equal(false);
    });

    it('returns false when the property hover is not set', () => {
      const sut = document.createElement('os-window');
      chai.expect(sut.hover).to.equal(false);
    });

    it('returns false when the property hover is set to false', () => {
      const sut = document.createElement('os-window');
      sut.hover = false;
      chai.expect(sut.hover).to.equal(false);
    });
  });

  describe('set hover', () => {
    it('sets the property hover properly to true', () => {
      const sut = document.createElement('os-window');
      sut.hover = true;
      chai.expect(sut.getAttribute('hover')).to.equal('hover');
    });

    it('sets the attribute hover properly to true', () => {
      const sut = document.createElement('os-window');
      sut.hover = true;
      chai.expect(sut.hover).to.equal(true);
    });

    it('removes the attribute properly', () => {
      const sut = document.createElement('os-window');
      sut.hover = false;
      chai.expect(sut.hasAttribute('hover')).to.equal(false);
    });

    it('sets the attribute hover properly to false', () => {
      const sut = document.createElement('os-window');
      sut.hover = false;
      chai.expect(sut.hover).to.equal(false);
    });
  });

  describe('get interactive', () => {
    it('sets the property interactive properly to true', () => {
      const sut = document.createElement('os-window');
      sut.interactive = true;
      chai.expect(sut.getAttribute('interactive')).to.equal('interactive');
    });

    it('sets the attribute interactive properly to true', () => {
      const sut = document.createElement('os-window');
      sut.interactive = true;
      chai.expect(sut.interactive).to.equal(true);
    });

    it('removes the attribute properly', () => {
      const sut = document.createElement('os-window');
      sut.interactive = false;
      chai.expect(sut.hasAttribute('interactive')).to.equal(false);
    });

    it('sets the attribute interactive properly to false', () => {
      const sut = document.createElement('os-window');
      sut.interactive = false;
      chai.expect(sut.interactive).to.equal(false);
    });
  });

  describe('set interactive', () => {
    it('sets the property interactive properly to true', () => {
      const sut = document.createElement('os-window');
      sut.interactive = true;
      chai.expect(sut.getAttribute('interactive')).to.equal('interactive');
    });

    it('sets the attribute interactive properly to true', () => {
      const sut = document.createElement('os-window');
      sut.interactive = true;
      chai.expect(sut.interactive).to.equal(true);
    });

    it('removes the attribute properly', () => {
      const sut = document.createElement('os-window');
      sut.interactive = false;
      chai.expect(sut.hasAttribute('interactive')).to.equal(false);
    });

    it('sets the attribute interactive properly to false', () => {
      const sut = document.createElement('os-window');
      sut.interactive = false;
      chai.expect(sut.interactive).to.equal(false);
    });
  });

  describe('set windowTitle', () => {
    it('changes the windowTitle', () => {
      const sut = document.createElement('os-window');
      sut.windowTitle = 'title1';
      chai.expect(sut.windowTitle).to.equal('title1');
      sut.windowTitle = 'title2';
      chai.expect(sut.windowTitle).to.equal('title2');
    });

    it('changes the attribute \'window-title\'', () => {
      const sut = document.createElement('os-window');
      sut.windowTitle = 'title1';
      chai.expect(sut.getAttribute('window-title')).to.equal('title1');
      sut.windowTitle = 'title2';
      chai.expect(sut.getAttribute('window-title')).to.equal('title2');
    });
  });

  describe('get windowTitle', () => {
    it('returns the default window title when the attribute windowTitle is null', () => {
      const sut = document.createElement('os-window');
      chai.expect(sut.windowTitle).to.equal(OsWindow.defaultWindowTitle);
    });

    it('returns the value of the attribute windowTitle', () => {
      const sut = document.createElement('os-window');
      sut.setAttribute('window-title', 'window title');
      chai.expect(sut.getAttribute('window-title')).to.equal('window title');
    });

    it('returns defaultWindowTitle if the attribute window-title is missing', () => {
      const sut = document.createElement('os-window');
      chai.expect(sut.windowTitle).to.equal(OsWindow.defaultWindowTitle);
    });
  });

  describe('get defaultWindowTitle', () => {
    it('returns an empty string', () => {
      chai.expect(OsWindow.defaultWindowTitle).to.equal('');
    });
  });
});
