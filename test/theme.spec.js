/* eslint-disable camelcase */

function getStyles(win, selector, pseudoelement) {
  return window.getComputedStyle(
    win.toDomElement().__shadow.querySelector(selector),
    pseudoelement,
  );
}

function assertStylesEqual(styles1, styles2) {
  if (styles1.length !== styles2.length) {
    chai.expect.fail('Expected style objects to have same length');
  }

  for (let i = 0; i < styles1.length; i += 1) {
    chai.expect(styles1.getPropertyValue(styles1.item(i))).to.equal(
      styles2.getPropertyValue(styles2.item(i)),
      styles1.item(i),
    );
  }
}

function assertWindowTitleButtonStyleEqual(win1, win2) {
  assertStylesEqual(getStyles(win1, '.window-title-buttons'), getStyles(win2, '.window-title-buttons'));
  assertStylesEqual(getStyles(win1, '.window-title-button__close'), getStyles(win2, '.window-title-button__close'));
  assertStylesEqual(getStyles(win1, '.window-title-button__close', ':after'), getStyles(win2, '.window-title-button__close', ':after'));
  assertStylesEqual(getStyles(win1, '.window-title-button__minimize'), getStyles(win2, '.window-title-button__minimize'));
  assertStylesEqual(getStyles(win1, '.window-title-button__minimize', ':after'), getStyles(win2, '.window-title-button__minimize', ':after'));
  assertStylesEqual(getStyles(win1, '.window-title-button__maximize'), getStyles(win2, '.window-title-button__maximize'));
  assertStylesEqual(getStyles(win1, '.window-title-button__maximize', ':after'), getStyles(win2, '.window-title-button__maximize', ':after'));
}

function assertWindowTitlebarStyleEqual(win1, win2) {
  assertStylesEqual(getStyles(win1, '.window-title-bar'), getStyles(win2, '.window-title-bar'));
  assertStylesEqual(getStyles(win1, '.window-title-text'), getStyles(win2, '.window-title-text'));
  assertWindowTitleButtonStyleEqual(win1, win2);
}

function assertWindowStyleEqual(win1, win2) {
  assertStylesEqual(getStyles(win1, '.window-wrapper'), getStyles(win2, '.window-wrapper'));
  assertStylesEqual(getStyles(win1, '.window-content-slot-wrapper'), getStyles(win2, '.window-content-slot-wrapper'));
  assertWindowTitlebarStyleEqual(win1, win2);
}

describe('themes', function themes() {
  this.timeout(15000);

  let frame;

  // the following variables reference an os-window element.
  // the configuration of each element is reflected in the variable names.
  // the names have the pattern
  //
  // <os-theme>_<theme>
  //
  let default_default;
  let default_light;
  let default_dark;
  let mac_default;
  let mac_light;
  let mac_dark;
  let winxp_default;
  let winxp_light;
  let winxp_dark;
  let win7_default;
  let win7_light;
  let win7_dark;

  before((done) => {
    frame = quixote.createFrame({
      src: '/test/themes.html',
      width: 800,
    }, done);
  });

  after(() => {
    frame.remove();
  });

  beforeEach((done) => {
    frame.reload(done);
  });

  beforeEach(() => {
    default_default = frame.get('os-window:not([theme]):not([os-theme])');
    default_light = frame.get('os-window[theme="light"]:not([os-theme])');
    default_dark = frame.get('os-window[theme="dark"]:not([os-theme])');
    mac_default = frame.get('os-window[os-theme="mac"]:not([theme])');
    mac_light = frame.get('os-window[os-theme="mac"][theme="light"]');
    mac_dark = frame.get('os-window[os-theme="mac"][theme="dark"]');
    winxp_default = frame.get('os-window[os-theme="win-xp"]:not([theme])');
    winxp_light = frame.get('os-window[os-theme="win-xp"][theme="light"]');
    winxp_dark = frame.get('os-window[os-theme="win-xp"][theme="dark"]');
    win7_default = frame.get('os-window[os-theme="win-7"]:not([theme])');
    win7_light = frame.get('os-window[os-theme="win-7"][theme="light"]');
    win7_dark = frame.get('os-window[os-theme="win-7"][theme="dark"]');
  });

  describe('default os theme', () => {
    describe('default theme', () => {
      it('is equal to default os theme light', () => {
        assertWindowStyleEqual(default_default, default_light);
      });
      it('is equal to mac os theme light', () => {
        assertWindowStyleEqual(default_default, mac_light);
      });
      it('is equal to mac os theme default', () => {
        assertWindowStyleEqual(default_default, mac_default);
      });
    });

    describe('light theme', () => {
      it('is equal to default os theme default', () => {
        assertWindowStyleEqual(default_light, default_default);
      });
      it('is equal to mac os theme default', () => {
        assertWindowStyleEqual(default_light, mac_default);
      });
      it('is equal to mac os theme light', () => {
        assertWindowStyleEqual(default_light, mac_light);
      });
    });

    describe('dark theme', () => {
      it('is equal to mac os theme dark', () => {
        assertWindowStyleEqual(default_dark, mac_dark);
      });
    });
  });

  describe('mac os theme', () => {
    describe('default theme', () => {
      it('is equal to default os theme light', () => {
        assertWindowStyleEqual(mac_default, default_light);
      });
      it('is equal to mac os theme light', () => {
        assertWindowStyleEqual(mac_default, mac_light);
      });
    });

    describe('light theme', () => {
      it('is equal to default os theme default', () => {
        assertWindowStyleEqual(mac_light, default_default);
      });
      it('is equal to mac os theme default', () => {
        assertWindowStyleEqual(mac_light, mac_default);
      });

      describe('close button', () => {
        it.skip('has correct position', () => {
          const closeButton = mac_light.toDomElement().__shadow.querySelector('.window-title-button__close');
          chai.expect(closeButton.offsetLeft).to.equal(3);
          // TODO: This assertion breaks in CI
          chai.expect(closeButton.offsetTop).to.equal(14);
        });

        it('has correct background color', () => {
          const closeButton = mac_light.toDomElement().__shadow.querySelector('.window-title-button__close');
          const backgroundColor = window.getComputedStyle(closeButton).getPropertyValue('background-color');
          chai.expect(backgroundColor).to.equal('rgb(239, 83, 74)');
        });

        it('has correct foreground color', () => {
          const closeButton = mac_light.toDomElement().__shadow.querySelector('.window-title-button__close');
          const foregroundColor = window.getComputedStyle(closeButton).getPropertyValue('color');
          chai.expect(foregroundColor).to.equal('rgba(0, 0, 0, 0)');
        });
      });

      describe('minimize button', () => {
        it.skip('has correct position', () => {
          const minimizeButton = mac_light.toDomElement().__shadow.querySelector('.window-title-button__minimize');
          chai.expect(minimizeButton.offsetLeft).to.equal(24);
          // TODO: This assertion breaks in CI
          chai.expect(minimizeButton.offsetTop).to.equal(14);
        });

        it('has correct background color', () => {
          const minimizeButton = mac_light.toDomElement().__shadow.querySelector('.window-title-button__minimize');
          const backgroundColor = window.getComputedStyle(minimizeButton).getPropertyValue('background-color');
          chai.expect(backgroundColor).to.equal('rgb(237, 192, 74)');
        });

        it('has correct foreground color', () => {
          const minimizeButton = mac_light.toDomElement().__shadow.querySelector('.window-title-button__minimize');
          const foregroundColor = window.getComputedStyle(minimizeButton).getPropertyValue('color');
          chai.expect(foregroundColor).to.equal('rgba(0, 0, 0, 0)');
        });
      });

      describe('maximize button', () => {
        it.skip('has correct position', () => {
          const maximizeButton = mac_light.toDomElement().__shadow.querySelector('.window-title-button__maximize');
          chai.expect(maximizeButton.offsetLeft).to.equal(46);
          // TODO: This assertion breaks in CI
          chai.expect(maximizeButton.offsetTop).to.equal(14);
        });

        it('has correct background color', () => {
          const maximizeButton = mac_light.toDomElement().__shadow.querySelector('.window-title-button__maximize');
          const backgroundColor = window.getComputedStyle(maximizeButton).getPropertyValue('background-color');
          chai.expect(backgroundColor).to.equal('rgb(151, 210, 114)');
        });

        it('has correct foreground color', () => {
          const minimizeButton = mac_light.toDomElement().__shadow.querySelector('.window-title-button__minimize');
          const foregroundColor = window.getComputedStyle(minimizeButton).getPropertyValue('color');
          chai.expect(foregroundColor).to.equal('rgba(0, 0, 0, 0)');
        });
      });

      describe('window title bar', () => {
        it('has correct height', () => {
          const titleBar = mac_light.toDomElement().__shadow.querySelector('.window-title-bar');
          const height = window.getComputedStyle(titleBar).getPropertyValue('height');
          chai.expect(height).to.equal('40px');
        });

        it('has correct background color', () => {
          const titleBar = mac_light.toDomElement().__shadow.querySelector('.window-title-bar');
          const backgroundColor = window.getComputedStyle(titleBar).getPropertyValue('background-color');
          chai.expect(backgroundColor).to.equal('rgb(238, 241, 245)');
        });

        it('has correct foreground color', () => {
          const titleBar = mac_light.toDomElement().__shadow.querySelector('.window-title-bar');
          const foregroundColor = window.getComputedStyle(titleBar).getPropertyValue('color');
          chai.expect(foregroundColor).to.equal('rgb(135, 130, 125)');
        });
      });

      describe('window content slot wrapper', () => {
        it('has correct spacing left', () => {
          const slotWrapper = mac_light.toDomElement().__shadow.querySelector('.window-content-slot-wrapper');
          const paddingLeft = window.getComputedStyle(slotWrapper).getPropertyValue('padding-left');
          chai.expect(paddingLeft).to.equal('16px');
        });

        it('has correct spacing right', () => {
          const slotWrapper = mac_light.toDomElement().__shadow.querySelector('.window-content-slot-wrapper');
          const paddingRight = window.getComputedStyle(slotWrapper).getPropertyValue('padding-right');
          chai.expect(paddingRight).to.equal('16px');
        });

        it('has correct spacing top', () => {
          const slotWrapper = mac_light.toDomElement().__shadow.querySelector('.window-content-slot-wrapper');
          const paddingTop = window.getComputedStyle(slotWrapper).getPropertyValue('padding-top');
          chai.expect(paddingTop).to.equal('0px');
        });

        it('has correct spacing bottom', () => {
          const slotWrapper = mac_light.toDomElement().__shadow.querySelector('.window-content-slot-wrapper');
          const paddingBottom = window.getComputedStyle(slotWrapper).getPropertyValue('padding-bottom');
          chai.expect(paddingBottom).to.equal('8px');
        });

        it('has correct background color', () => {
          const slotWrapper = mac_light.toDomElement().__shadow.querySelector('.window-content-slot-wrapper');
          const backgroundColor = window.getComputedStyle(slotWrapper).getPropertyValue('background-color');
          chai.expect(backgroundColor).to.equal('rgb(238, 241, 245)');
        });

        it('has correct foreground color', () => {
          const slotWrapper = mac_light.toDomElement().__shadow.querySelector('.window-content-slot-wrapper');
          const foregroundColor = window.getComputedStyle(slotWrapper).getPropertyValue('color');
          chai.expect(foregroundColor).to.equal('rgb(135, 130, 125)');
        });
      });
    });

    describe('dark theme', () => {
      describe('close button', () => {
        it.skip('has correct position', () => {
          const closeButton = mac_dark.toDomElement().__shadow.querySelector('.window-title-button__close');
          chai.expect(closeButton.offsetLeft).to.equal(3);
          // TODO: This assertion breaks in CI
          chai.expect(closeButton.offsetTop).to.equal(14);
        });

        it('has correct background color', () => {
          const closeButton = mac_dark.toDomElement().__shadow.querySelector('.window-title-button__close');
          const backgroundColor = window.getComputedStyle(closeButton).getPropertyValue('background-color');
          chai.expect(backgroundColor).to.equal('rgb(239, 83, 74)');
        });

        it('has correct foreground color', () => {
          const closeButton = mac_dark.toDomElement().__shadow.querySelector('.window-title-button__close');
          const foregroundColor = window.getComputedStyle(closeButton).getPropertyValue('color');
          chai.expect(foregroundColor).to.equal('rgba(0, 0, 0, 0)');
        });
      });

      describe('minimize button', () => {
        it.skip('has correct position', () => {
          const minimizeButton = mac_dark.toDomElement().__shadow.querySelector('.window-title-button__minimize');
          chai.expect(minimizeButton.offsetLeft).to.equal(24);
          // TODO: This assertion breaks in CI
          chai.expect(minimizeButton.offsetTop).to.equal(14);
        });

        it('has correct background color', () => {
          const minimizeButton = mac_dark.toDomElement().__shadow.querySelector('.window-title-button__minimize');
          const backgroundColor = window.getComputedStyle(minimizeButton).getPropertyValue('background-color');
          chai.expect(backgroundColor).to.equal('rgb(237, 192, 74)');
        });

        it('has correct foreground color', () => {
          const minimizeButton = mac_dark.toDomElement().__shadow.querySelector('.window-title-button__minimize');
          const foregroundColor = window.getComputedStyle(minimizeButton).getPropertyValue('color');
          chai.expect(foregroundColor).to.equal('rgba(0, 0, 0, 0)');
        });
      });

      describe('maximize button', () => {
        it.skip('has correct position', () => {
          const maximizeButton = mac_dark.toDomElement().__shadow.querySelector('.window-title-button__maximize');
          chai.expect(maximizeButton.offsetLeft).to.equal(46);
          // TODO: This assertion breaks in CI
          chai.expect(maximizeButton.offsetTop).to.equal(14);
        });

        it('has correct background color', () => {
          const maximizeButton = mac_dark.toDomElement().__shadow.querySelector('.window-title-button__maximize');
          const backgroundColor = window.getComputedStyle(maximizeButton).getPropertyValue('background-color');
          chai.expect(backgroundColor).to.equal('rgb(151, 210, 114)');
        });

        it('has correct foreground color', () => {
          const minimizeButton = mac_dark.toDomElement().__shadow.querySelector('.window-title-button__minimize');
          const foregroundColor = window.getComputedStyle(minimizeButton).getPropertyValue('color');
          chai.expect(foregroundColor).to.equal('rgba(0, 0, 0, 0)');
        });
      });

      describe('window title bar', () => {
        it('has correct height', () => {
          const titleBar = mac_dark.toDomElement().__shadow.querySelector('.window-title-bar');
          const height = window.getComputedStyle(titleBar).getPropertyValue('height');
          chai.expect(height).to.equal('40px');
        });

        it('has correct background color', () => {
          const titleBar = mac_dark.toDomElement().__shadow.querySelector('.window-title-bar');
          const backgroundColor = window.getComputedStyle(titleBar).getPropertyValue('background-color');
          chai.expect(backgroundColor).to.equal('rgb(52, 58, 70)');
        });

        it('has correct foreground color', () => {
          const titleBar = mac_dark.toDomElement().__shadow.querySelector('.window-title-bar');
          const foregroundColor = window.getComputedStyle(titleBar).getPropertyValue('color');
          chai.expect(foregroundColor).to.equal('rgb(255, 255, 255)');
        });
      });

      describe('window content slot wrapper', () => {
        it('has correct spacing left', () => {
          const slotWrapper = mac_dark.toDomElement().__shadow.querySelector('.window-content-slot-wrapper');
          const paddingLeft = window.getComputedStyle(slotWrapper).getPropertyValue('padding-left');
          chai.expect(paddingLeft).to.equal('16px');
        });

        it('has correct spacing right', () => {
          const slotWrapper = mac_dark.toDomElement().__shadow.querySelector('.window-content-slot-wrapper');
          const paddingRight = window.getComputedStyle(slotWrapper).getPropertyValue('padding-right');
          chai.expect(paddingRight).to.equal('16px');
        });

        it('has correct spacing top', () => {
          const slotWrapper = mac_dark.toDomElement().__shadow.querySelector('.window-content-slot-wrapper');
          const paddingTop = window.getComputedStyle(slotWrapper).getPropertyValue('padding-top');
          chai.expect(paddingTop).to.equal('0px');
        });

        it('has correct spacing bottom', () => {
          const slotWrapper = mac_dark.toDomElement().__shadow.querySelector('.window-content-slot-wrapper');
          const paddingBottom = window.getComputedStyle(slotWrapper).getPropertyValue('padding-bottom');
          chai.expect(paddingBottom).to.equal('8px');
        });

        it('has correct background color', () => {
          const slotWrapper = mac_dark.toDomElement().__shadow.querySelector('.window-content-slot-wrapper');
          const backgroundColor = window.getComputedStyle(slotWrapper).getPropertyValue('background-color');
          chai.expect(backgroundColor).to.equal('rgb(52, 58, 70)');
        });

        it('has correct foreground color', () => {
          const slotWrapper = mac_dark.toDomElement().__shadow.querySelector('.window-content-slot-wrapper');
          const foregroundColor = window.getComputedStyle(slotWrapper).getPropertyValue('color');
          chai.expect(foregroundColor).to.equal('rgb(255, 255, 255)');
        });
      });
    });
  });

  describe('win-xp os theme', () => {
    describe('default theme', () => {
      it('is equal to winxp os theme light', () => {
        assertWindowStyleEqual(winxp_default, winxp_light);
      });
    });

    describe('light theme', () => {
      it('is equal to winxp os theme default', () => {
        assertWindowStyleEqual(winxp_light, winxp_default);
      });

      describe('close button', () => {
        it.skip('has correct position', () => {
          const closeButton = winxp_light.toDomElement().__shadow.querySelector('.window-title-button__close');
          chai.expect(closeButton.offsetLeft).to.equal(64);
          // TODO: This assertion breaks in CI
          chai.expect(closeButton.offsetTop).to.equal(14);
        });

        it('has correct background color', () => {
          const closeButton = winxp_light.toDomElement().__shadow.querySelector('.window-title-button__close');
          const backgroundColor = window.getComputedStyle(closeButton).getPropertyValue('background-color');
          chai.expect(backgroundColor).to.equal('rgb(239, 83, 74)');
        });

        it('has correct foreground color', () => {
          const closeButton = winxp_light.toDomElement().__shadow.querySelector('.window-title-button__close');
          const foregroundColor = window.getComputedStyle(closeButton).getPropertyValue('color');
          chai.expect(foregroundColor).to.equal('rgb(255, 255, 255)');
        });
      });

      describe('minimize button', () => {
        it.skip('has correct position', () => {
          const minimizeButton = winxp_light.toDomElement().__shadow.querySelector('.window-title-button__minimize');
          chai.expect(minimizeButton.offsetLeft).to.equal(2);
          // TODO: This assertion breaks in CI
          chai.expect(minimizeButton.offsetTop).to.equal(14);
        });

        it('has correct background color', () => {
          const minimizeButton = winxp_light.toDomElement().__shadow.querySelector('.window-title-button__minimize');
          const backgroundColor = window.getComputedStyle(minimizeButton).getPropertyValue('background-color');
          chai.expect(backgroundColor).to.equal('rgb(44, 106, 246)');
        });

        it('has correct foreground color', () => {
          const minimizeButton = winxp_light.toDomElement().__shadow.querySelector('.window-title-button__minimize');
          const foregroundColor = window.getComputedStyle(minimizeButton).getPropertyValue('color');
          chai.expect(foregroundColor).to.equal('rgb(255, 255, 255)');
        });
      });

      describe('maximize button', () => {
        it.skip('has correct position', () => {
          const maximizeButton = winxp_light.toDomElement().__shadow.querySelector('.window-title-button__maximize');
          chai.expect(maximizeButton.offsetLeft).to.equal(33);
          // TODO: This assertion breaks in CI
          chai.expect(maximizeButton.offsetTop).to.equal(14);
        });

        it('has correct background color', () => {
          const maximizeButton = winxp_light.toDomElement().__shadow.querySelector('.window-title-button__maximize');
          const backgroundColor = window.getComputedStyle(maximizeButton).getPropertyValue('background-color');
          chai.expect(backgroundColor).to.equal('rgb(44, 106, 246)');
        });

        it('has correct foreground color', () => {
          const minimizeButton = winxp_light.toDomElement().__shadow.querySelector('.window-title-button__minimize');
          const foregroundColor = window.getComputedStyle(minimizeButton).getPropertyValue('color');
          chai.expect(foregroundColor).to.equal('rgb(255, 255, 255)');
        });
      });

      describe('window title bar', () => {
        it('has correct height', () => {
          const titleBar = winxp_light.toDomElement().__shadow.querySelector('.window-title-bar');
          const height = window.getComputedStyle(titleBar).getPropertyValue('height');
          chai.expect(height).to.equal('40px');
        });

        it('has correct background color', () => {
          const titleBar = winxp_light.toDomElement().__shadow.querySelector('.window-title-bar');
          const backgroundImage = window.getComputedStyle(titleBar).getPropertyValue('background-image');
          const backgroundColor = window.getComputedStyle(titleBar).getPropertyValue('background-color');
          chai.expect(backgroundImage).to.equal('linear-gradient(rgb(48, 118, 222) 0%, rgb(48, 147, 255) 2%, rgb(2, 82, 227) 20%, rgb(5, 106, 255) 94%, rgb(15, 70, 192) 100%)');
          chai.expect(backgroundColor).to.equal('rgba(0, 0, 0, 0)');
        });

        it('has correct foreground color', () => {
          const titleBar = winxp_light.toDomElement().__shadow.querySelector('.window-title-bar');
          const foregroundColor = window.getComputedStyle(titleBar).getPropertyValue('color');
          chai.expect(foregroundColor).to.equal('rgb(255, 255, 255)');
        });
      });

      describe('window content slot wrapper', () => {
        it('has correct spacing left', () => {
          const slotWrapper = winxp_light.toDomElement().__shadow.querySelector('.window-content-slot-wrapper');
          const paddingLeft = window.getComputedStyle(slotWrapper).getPropertyValue('padding-left');
          chai.expect(paddingLeft).to.equal('16px');
        });

        it('has correct spacing right', () => {
          const slotWrapper = winxp_light.toDomElement().__shadow.querySelector('.window-content-slot-wrapper');
          const paddingRight = window.getComputedStyle(slotWrapper).getPropertyValue('padding-right');
          chai.expect(paddingRight).to.equal('16px');
        });

        it('has correct spacing top', () => {
          const slotWrapper = winxp_light.toDomElement().__shadow.querySelector('.window-content-slot-wrapper');
          const paddingTop = window.getComputedStyle(slotWrapper).getPropertyValue('padding-top');
          chai.expect(paddingTop).to.equal('8px');
        });

        describe('when minimized', () => {
          it('has correct spacing top', () => {
            winxp_light.toDomElement().windowState = 'minimized';
            const slotWrapper = winxp_light.toDomElement().__shadow.querySelector('.window-content-slot-wrapper');
            const paddingTop = window.getComputedStyle(slotWrapper).getPropertyValue('padding-top');
            chai.expect(paddingTop).to.equal('0px');
          });
        });

        it('has correct spacing bottom', () => {
          const slotWrapper = winxp_light.toDomElement().__shadow.querySelector('.window-content-slot-wrapper');
          const paddingBottom = window.getComputedStyle(slotWrapper).getPropertyValue('padding-bottom');
          chai.expect(paddingBottom).to.equal('8px');
        });

        it('has correct background color', () => {
          const slotWrapper = winxp_light.toDomElement().__shadow.querySelector('.window-content-slot-wrapper');
          const backgroundColor = window.getComputedStyle(slotWrapper).getPropertyValue('background-color');
          chai.expect(backgroundColor).to.equal('rgb(235, 232, 215)');
        });

        it('has correct foreground color', () => {
          const slotWrapper = winxp_light.toDomElement().__shadow.querySelector('.window-content-slot-wrapper');
          const foregroundColor = window.getComputedStyle(slotWrapper).getPropertyValue('color');
          chai.expect(foregroundColor).to.equal('rgb(0, 0, 0)');
        });
      });
    });

    describe('dark theme', () => {
      describe('close button', () => {
        it.skip('has correct position', () => {
          const closeButton = winxp_dark.toDomElement().__shadow.querySelector('.window-title-button__close');
          chai.expect(closeButton.offsetLeft).to.equal(64);
          // TODO: This assertion breaks in CI
          chai.expect(closeButton.offsetTop).to.equal(14);
        });

        it('has correct background color', () => {
          const closeButton = winxp_dark.toDomElement().__shadow.querySelector('.window-title-button__close');
          const backgroundColor = window.getComputedStyle(closeButton).getPropertyValue('background-color');
          chai.expect(backgroundColor).to.equal('rgb(239, 83, 74)');
        });

        it('has correct foreground color', () => {
          const closeButton = winxp_dark.toDomElement().__shadow.querySelector('.window-title-button__close');
          const foregroundColor = window.getComputedStyle(closeButton).getPropertyValue('color');
          chai.expect(foregroundColor).to.equal('rgb(255, 255, 255)');
        });
      });

      describe('minimize button', () => {
        it.skip('has correct position', () => {
          const minimizeButton = winxp_dark.toDomElement().__shadow.querySelector('.window-title-button__minimize');
          chai.expect(minimizeButton.offsetLeft).to.equal(2);
          // TODO: This assertion breaks in CI
          chai.expect(minimizeButton.offsetTop).to.equal(14);
        });

        it('has correct background color', () => {
          const minimizeButton = winxp_dark.toDomElement().__shadow.querySelector('.window-title-button__minimize');
          const backgroundColor = window.getComputedStyle(minimizeButton).getPropertyValue('background-color');
          chai.expect(backgroundColor).to.equal('rgb(212, 210, 224)');
        });

        it('has correct foreground color', () => {
          const minimizeButton = winxp_dark.toDomElement().__shadow.querySelector('.window-title-button__minimize');
          const foregroundColor = window.getComputedStyle(minimizeButton).getPropertyValue('color');
          chai.expect(foregroundColor).to.equal('rgb(79, 74, 89)');
        });
      });

      describe('maximize button', () => {
        it.skip('has correct position', () => {
          const maximizeButton = winxp_dark.toDomElement().__shadow.querySelector('.window-title-button__maximize');
          chai.expect(maximizeButton.offsetLeft).to.equal(33);
          // TODO: This assertion breaks in CI
          chai.expect(maximizeButton.offsetTop).to.equal(14);
        });

        it('has correct background color', () => {
          const maximizeButton = winxp_dark.toDomElement().__shadow.querySelector('.window-title-button__maximize');
          const backgroundColor = window.getComputedStyle(maximizeButton).getPropertyValue('background-color');
          chai.expect(backgroundColor).to.equal('rgb(212, 210, 224)');
        });

        it('has correct foreground color', () => {
          const minimizeButton = winxp_dark.toDomElement().__shadow.querySelector('.window-title-button__minimize');
          const foregroundColor = window.getComputedStyle(minimizeButton).getPropertyValue('color');
          chai.expect(foregroundColor).to.equal('rgb(79, 74, 89)');
        });
      });

      describe('window title bar', () => {
        it('has correct height', () => {
          const titleBar = winxp_dark.toDomElement().__shadow.querySelector('.window-title-bar');
          const height = window.getComputedStyle(titleBar).getPropertyValue('height');
          chai.expect(height).to.equal('40px');
        });

        it('has correct background color', () => {
          const titleBar = winxp_dark.toDomElement().__shadow.querySelector('.window-title-bar');
          const backgroundImage = window.getComputedStyle(titleBar).getPropertyValue('background-image');
          const backgroundColor = window.getComputedStyle(titleBar).getPropertyValue('background-color');
          chai.expect(backgroundImage).to.equal('linear-gradient(rgb(134, 133, 139) 0%, rgb(239, 238, 241) 2%, rgb(166, 165, 186) 20%, rgb(252, 253, 255) 94%, rgb(132, 132, 141) 100%)');
          chai.expect(backgroundColor).to.equal('rgba(0, 0, 0, 0)');
        });

        it('has correct foreground color', () => {
          const titleBar = winxp_dark.toDomElement().__shadow.querySelector('.window-title-bar');
          const foregroundColor = window.getComputedStyle(titleBar).getPropertyValue('color');
          chai.expect(foregroundColor).to.equal('rgb(0, 0, 0)');
        });
      });

      describe('window content slot wrapper', () => {
        it('has correct spacing left', () => {
          const slotWrapper = winxp_dark.toDomElement().__shadow.querySelector('.window-content-slot-wrapper');
          const paddingLeft = window.getComputedStyle(slotWrapper).getPropertyValue('padding-left');
          chai.expect(paddingLeft).to.equal('16px');
        });

        it('has correct spacing right', () => {
          const slotWrapper = winxp_dark.toDomElement().__shadow.querySelector('.window-content-slot-wrapper');
          const paddingRight = window.getComputedStyle(slotWrapper).getPropertyValue('padding-right');
          chai.expect(paddingRight).to.equal('16px');
        });

        it('has correct spacing top', () => {
          const slotWrapper = winxp_dark.toDomElement().__shadow.querySelector('.window-content-slot-wrapper');
          const paddingTop = window.getComputedStyle(slotWrapper).getPropertyValue('padding-top');
          chai.expect(paddingTop).to.equal('8px');
        });

        describe('when minimized', () => {
          it('has correct spacing top', () => {
            winxp_dark.toDomElement().windowState = 'minimized';
            const slotWrapper = winxp_dark.toDomElement().__shadow.querySelector('.window-content-slot-wrapper');
            const paddingTop = window.getComputedStyle(slotWrapper).getPropertyValue('padding-top');
            chai.expect(paddingTop).to.equal('0px');
          });
        });

        it('has correct spacing bottom', () => {
          const slotWrapper = winxp_dark.toDomElement().__shadow.querySelector('.window-content-slot-wrapper');
          const paddingBottom = window.getComputedStyle(slotWrapper).getPropertyValue('padding-bottom');
          chai.expect(paddingBottom).to.equal('8px');
        });

        it('has correct background color', () => {
          const slotWrapper = winxp_dark.toDomElement().__shadow.querySelector('.window-content-slot-wrapper');
          const backgroundColor = window.getComputedStyle(slotWrapper).getPropertyValue('background-color');
          chai.expect(backgroundColor).to.equal('rgb(235, 232, 215)');
        });

        it('has correct foreground color', () => {
          const slotWrapper = winxp_dark.toDomElement().__shadow.querySelector('.window-content-slot-wrapper');
          const foregroundColor = window.getComputedStyle(slotWrapper).getPropertyValue('color');
          chai.expect(foregroundColor).to.equal('rgb(0, 0, 0)');
        });
      });
    });
  });

  describe('win-7 theme', () => {
    describe('default theme', () => {
      it('matches window-state default theme', () => {
        assertWindowStyleEqual(win7_default, win7_light);
      });
    });

    describe('light theme', () => {
      describe('host', () => {
        it('has the correct border color', () => {
          const host = win7_light.toDomElement();
          const borderTopColor = window.getComputedStyle(host).getPropertyValue('border-bottom-color');
          const borderRightColor = window.getComputedStyle(host).getPropertyValue('border-right-color');
          const borderBottomColor = window.getComputedStyle(host).getPropertyValue('border-bottom-color');
          const borderLeftColor = window.getComputedStyle(host).getPropertyValue('border-left-color');
          chai.expect(borderTopColor).to.equal('rgb(36, 70, 103)');
          chai.expect(borderRightColor).to.equal('rgb(36, 70, 103)');
          chai.expect(borderBottomColor).to.equal('rgb(36, 70, 103)');
          chai.expect(borderLeftColor).to.equal('rgb(36, 70, 103)');
        });
      });

      describe('window-wrapper', () => {
        it('has the correct background color', () => {
          const windowWrapper = win7_light.toDomElement().__shadow.querySelector('.window-wrapper');
          const backgroundColor = window.getComputedStyle(windowWrapper).getPropertyValue('background-color');
          chai.expect(backgroundColor).to.equal('rgba(161, 187, 215, 0.15)');
        });
      });

      describe('window title button', () => {
        it('has the correct font color', () => {
          const windowTitleButtons = win7_light.toDomElement().__shadow.querySelectorAll('.window-title-button:not(.window-title-button__close)');
          windowTitleButtons.forEach((windowTitleButton) => {
            const backgroundColor = window.getComputedStyle(windowTitleButton, ':before').getPropertyValue('background-color');
            chai.expect(backgroundColor).to.equal('rgb(93, 97, 113)');
          });
        });
      });
    });

    describe('dark theme', () => {
      describe('host', () => {
        it('has the correct border color', () => {
          const host = win7_dark.toDomElement();
          const borderTopColor = window.getComputedStyle(host).getPropertyValue('border-bottom-color');
          const borderRightColor = window.getComputedStyle(host).getPropertyValue('border-right-color');
          const borderBottomColor = window.getComputedStyle(host).getPropertyValue('border-bottom-color');
          const borderLeftColor = window.getComputedStyle(host).getPropertyValue('border-left-color');
          chai.expect(borderTopColor).to.equal('rgb(82, 82, 82)');
          chai.expect(borderRightColor).to.equal('rgb(82, 82, 82)');
          chai.expect(borderBottomColor).to.equal('rgb(82, 82, 82)');
          chai.expect(borderLeftColor).to.equal('rgb(82, 82, 82)');
        });
      });

      describe('window-wrapper', () => {
        it('has the correct background color', () => {
          const windowWrapper = win7_dark.toDomElement().__shadow.querySelector('.window-wrapper');
          const backgroundColor = window.getComputedStyle(windowWrapper).getPropertyValue('background-color');
          chai.expect(backgroundColor).to.equal('rgba(0, 0, 0, 0.35)');
        });
      });

      describe('window title button', () => {
        it('has the correct background color', () => {
          const windowTitleButtons = win7_dark.toDomElement().__shadow.querySelectorAll('.window-title-button:not(.window-title-button__close)');
          windowTitleButtons.forEach((windowTitleButton) => {
            const backgroundColor = window.getComputedStyle(windowTitleButton, ':before').getPropertyValue('background-color');
            chai.expect(backgroundColor).to.equal('rgb(93, 97, 113)');
          });
        });
      });
    });
  });
});
