describe('events', () => {
  describe('hoverChange', () => {
    describe('when the hover property is changed from true to false', () => {
      it('fires', (done) => {
        const sut = document.createElement('os-window');
        const handler = () => { done(); };
        sut.hover = true;
        sut.addEventListener('hoverChange', handler);
        sut.hover = false;
      });

      it('passes correct event details', (done) => {
        const sut = document.createElement('os-window');
        const handler = ({ detail: { oldValue, newValue } }) => {
          chai.expect(oldValue).to.equal(true);
          chai.expect(newValue).to.equal(false);
          done();
        };
        sut.hover = true;
        sut.addEventListener('hoverChange', handler);
        sut.hover = false;
      });
    });

    describe('when the hover property is changed from false to true', () => {
      it('fires', (done) => {
        const sut = document.createElement('os-window');
        const handler = () => { done(); };
        sut.hover = false;
        sut.addEventListener('hoverChange', handler);
        sut.hover = true;
      });

      it('passes correct event details', (done) => {
        const sut = document.createElement('os-window');
        const handler = ({ detail: { oldValue, newValue } }) => {
          chai.expect(oldValue).to.equal(false);
          chai.expect(newValue).to.equal(true);
          done();
        };
        sut.hover = false;
        sut.addEventListener('hoverChange', handler);
        sut.hover = true;
      });
    });

    describe('when the hover attribute is removed', () => {
      it('fires', (done) => {
        const sut = document.createElement('os-window');
        const handler = () => { done(); };
        sut.setAttribute('hover', 'hover');
        sut.addEventListener('hoverChange', handler);
        sut.removeAttribute('hover');
      });

      it('passes correct event details', (done) => {
        const sut = document.createElement('os-window');
        const handler = ({ detail: { oldValue, newValue } }) => {
          chai.expect(oldValue).to.equal(true);
          chai.expect(newValue).to.equal(false);
          done();
        };
        sut.setAttribute('hover', 'hover');
        sut.addEventListener('hoverChange', handler);
        sut.removeAttribute('hover');
      });
    });

    describe('when the hover attribute is added', () => {
      it('fires', (done) => {
        const sut = document.createElement('os-window');
        const handler = () => { done(); };
        sut.removeAttribute('hover');
        sut.addEventListener('hoverChange', handler);
        sut.setAttribute('hover', 'hover');
      });

      it('passes correct event details', (done) => {
        const sut = document.createElement('os-window');
        const handler = ({ detail: { oldValue, newValue } }) => {
          chai.expect(oldValue).to.equal(false);
          chai.expect(newValue).to.equal(true);
          done();
        };
        sut.removeAttribute('hover');
        sut.addEventListener('hoverChange', handler);
        sut.setAttribute('hover', 'hover');
      });
    });
  });

  describe('interactionChange', () => {
    describe('when the interactive property is changed from true to false', () => {
      it('fires', (done) => {
        const sut = document.createElement('os-window');
        const handler = () => { done(); };
        sut.interactive = true;
        sut.addEventListener('interactionChange', handler);
        sut.interactive = false;
      });

      it('passes correct event details', (done) => {
        const sut = document.createElement('os-window');
        const handler = ({ detail: { oldValue, newValue } }) => {
          chai.expect(oldValue).to.equal(true);
          chai.expect(newValue).to.equal(false);
          done();
        };
        sut.interactive = true;
        sut.addEventListener('interactionChange', handler);
        sut.interactive = false;
      });
    });

    describe('when the interactive property is changed from false to true', () => {
      it('fires', (done) => {
        const sut = document.createElement('os-window');
        const handler = () => { done(); };
        sut.interactive = false;
        sut.addEventListener('interactionChange', handler);
        sut.interactive = true;
      });

      it('passes correct event details', (done) => {
        const sut = document.createElement('os-window');
        const handler = ({ detail: { oldValue, newValue } }) => {
          chai.expect(oldValue).to.equal(false);
          chai.expect(newValue).to.equal(true);
          done();
        };
        sut.interactive = false;
        sut.addEventListener('interactionChange', handler);
        sut.interactive = true;
      });
    });

    describe('when the interactive attribute is removed', () => {
      it('fires', (done) => {
        const sut = document.createElement('os-window');
        const handler = () => { done(); };
        sut.setAttribute('interactive', 'interactive');
        sut.addEventListener('interactionChange', handler);
        sut.removeAttribute('interactive');
      });

      it('passes correct event details', (done) => {
        const sut = document.createElement('os-window');
        const handler = ({ detail: { oldValue, newValue } }) => {
          chai.expect(oldValue).to.equal(true);
          chai.expect(newValue).to.equal(false);
          done();
        };
        sut.setAttribute('interactive', 'interactive');
        sut.addEventListener('interactionChange', handler);
        sut.removeAttribute('interactive');
      });
    });

    describe('when the interactive attribute is added', () => {
      it('fires', (done) => {
        const sut = document.createElement('os-window');
        const handler = () => { done(); };
        sut.removeAttribute('interactive');
        sut.addEventListener('interactionChange', handler);
        sut.setAttribute('interactive', 'interactive');
      });

      it('passes correct event details', (done) => {
        const sut = document.createElement('os-window');
        const handler = ({ detail: { oldValue, newValue } }) => {
          chai.expect(oldValue).to.equal(false);
          chai.expect(newValue).to.equal(true);
          done();
        };
        sut.removeAttribute('interactive');
        sut.addEventListener('interactionChange', handler);
        sut.setAttribute('interactive', 'interactive');
      });
    });
  });

  describe('themeChange', () => {
    describe('when the theme property is changed', () => {
      it('fires', (done) => {
        const sut = document.createElement('os-window');
        const handler = () => { done(); };
        sut.theme = 'light';
        sut.addEventListener('themeChange', handler);
        sut.theme = 'dark';
      });

      it('passes correct event details', (done) => {
        const sut = document.createElement('os-window');
        const handler = ({ detail: { oldTheme, newTheme } }) => {
          chai.expect(oldTheme).to.equal('light');
          chai.expect(newTheme).to.equal('dark');
          done();
        };
        sut.theme = 'light';
        sut.addEventListener('themeChange', handler);
        sut.theme = 'dark';
      });

      describe('to an invalid value', () => {
        it('does not fire', (done) => {
          const sut = document.createElement('os-window');
          const handler = () => { chai.assert.fail('event handler called for invalid theme property value'); };
          sut.addEventListener('themeChange', handler);
          try {
            sut.theme = 'invalid';
          } finally {
            done();
          }
        });
      });
    });

    describe('when the theme attribute is changed', () => {
      it('fires', (done) => {
        const sut = document.createElement('os-window');
        const handler = () => { done(); };
        sut.setAttribute('theme', 'light');
        sut.addEventListener('themeChange', handler);
        sut.setAttribute('theme', 'dark');
      });

      it('passes correct event details', (done) => {
        const sut = document.createElement('os-window');
        const handler = ({ detail: { oldTheme, newTheme } }) => {
          chai.expect(oldTheme).to.equal('light');
          chai.expect(newTheme).to.equal('dark');
          done();
        };
        sut.setAttribute('theme', 'light');
        sut.addEventListener('themeChange', handler);
        sut.setAttribute('theme', 'dark');
      });
    });
  });

  describe('windowStateChange', () => {
    describe('when the windowState property is changed', () => {
      it('fires', (done) => {
        const sut = document.createElement('os-window');
        const handler = () => { done(); };
        sut.windowState = 'minimized';
        sut.addEventListener('windowStateChange', handler);
        sut.windowState = 'maximized';
      });

      it('passes correct event details', (done) => {
        const sut = document.createElement('os-window');
        const handler = ({ detail: { oldWindowState, newWindowState } }) => {
          chai.expect(oldWindowState).to.equal('minimized');
          chai.expect(newWindowState).to.equal('maximized');
          done();
        };
        sut.windowState = 'minimized';
        sut.addEventListener('windowStateChange', handler);
        sut.windowState = 'maximized';
      });

      describe('to an invalid value', () => {
        it('does not fire', (done) => {
          const sut = document.createElement('os-window');
          const handler = () => { chai.assert.fail('event handler called for invalid windowState property value'); };
          sut.addEventListener('windowStateChange', handler);
          try {
            sut.windowState = 'invalid';
          } finally {
            done();
          }
        });
      });
    });

    describe('when the window-state attribute is changed', () => {
      it('fires', (done) => {
        const sut = document.createElement('os-window');
        const handler = () => { done(); };
        sut.setAttribute('window-state', 'minimized');
        sut.addEventListener('windowStateChange', handler);
        sut.setAttribute('window-state', 'maximized');
      });

      it('passes correct event details', (done) => {
        const sut = document.createElement('os-window');
        const handler = ({ detail: { oldWindowState, newWindowState } }) => {
          chai.expect(oldWindowState).to.equal('minimized');
          chai.expect(newWindowState).to.equal('maximized');
          done();
        };
        sut.setAttribute('window-state', 'minimized');
        sut.addEventListener('windowStateChange', handler);
        sut.setAttribute('window-state', 'maximized');
      });
    });
  });

  describe('windowTitleChange', () => {
    describe('when the windowTitle property is changed', () => {
      it('fires', (done) => {
        const sut = document.createElement('os-window');
        const handler = () => { done(); };
        sut.windowTitle = 'old window title';
        sut.addEventListener('windowTitleChange', handler);
        sut.windowTitle = 'new window title';
      });

      it('passes correct event details', (done) => {
        const sut = document.createElement('os-window');
        const handler = ({ detail: { oldWindowTitle, newWindowTitle } }) => {
          chai.expect(oldWindowTitle).to.equal('old window title');
          chai.expect(newWindowTitle).to.equal('new window title');
          done();
        };
        sut.windowTitle = 'old window title';
        sut.addEventListener('windowTitleChange', handler);
        sut.windowTitle = 'new window title';
      });
    });

    describe('when the window-title attribute is changed', () => {
      it('fires', (done) => {
        const sut = document.createElement('os-window');
        const handler = () => { done(); };
        sut.setAttribute('window-title', 'old window title');
        sut.addEventListener('windowTitleChange', handler);
        sut.setAttribute('window-title', 'new window title');
      });

      it('passes correct event details', (done) => {
        const sut = document.createElement('os-window');
        const handler = ({ detail: { oldWindowTitle, newWindowTitle } }) => {
          chai.expect(oldWindowTitle).to.equal('old window title');
          chai.expect(newWindowTitle).to.equal('new window title');
          done();
        };
        sut.setAttribute('window-title', 'old window title');
        sut.addEventListener('windowTitleChange', handler);
        sut.setAttribute('window-title', 'new window title');
      });
    });
  });

  describe('osThemeChange', () => {
    describe('when the osTheme property is changed', () => {
      it('fires', (done) => {
        const sut = document.createElement('os-window');
        const handler = () => { done(); };
        sut.addEventListener('osThemeChange', handler);
        sut.osTheme = 'mac';
      });

      it('passes correct event details', (done) => {
        const sut = document.createElement('os-window');
        const handler = ({ detail: { oldOsTheme, newOsTheme } }) => {
          chai.expect(oldOsTheme).to.equal(null);
          chai.expect(newOsTheme).to.equal('mac');
          done();
        };
        sut.addEventListener('osThemeChange', handler);
        sut.osTheme = 'mac';
      });

      describe('to an invalid value', () => {
        it('does not fire', (done) => {
          const sut = document.createElement('os-window');
          const handler = () => { chai.assert.fail('event handler called for invalid osTheme property value'); };
          sut.addEventListener('osThemeChange', handler);
          try {
            sut.osTheme = 'invalid';
          } finally {
            done();
          }
        });
      });
    });

    describe('when the os-theme attribute is changed', () => {
      it('fires', (done) => {
        const sut = document.createElement('os-window');
        const handler = () => { done(); };
        sut.addEventListener('osThemeChange', handler);
        sut.setAttribute('os-theme', 'mac');
      });

      it('passes correct event details', (done) => {
        const sut = document.createElement('os-window');
        const handler = ({ detail: { oldOsTheme, newOsTheme } }) => {
          chai.expect(oldOsTheme).to.equal(null);
          chai.expect(newOsTheme).to.equal('mac');
          done();
        };
        sut.addEventListener('osThemeChange', handler);
        sut.setAttribute('os-theme', 'mac');
      });
    });
  });
});
