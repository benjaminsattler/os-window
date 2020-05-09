let sutContainer;
let sut;

beforeEach(() => {
  sutContainer = document.createElement('div');
  document.body.appendChild(sutContainer);
  sut = document.createElement('os-window');
  sutContainer.appendChild(sut);
});

afterEach(() => {
  sutContainer.innerHTML = '';
  sut = undefined;
  document.body.removeChild(sutContainer);
  sutContainer = undefined;
});

describe('a11y', () => {
  describe('window-wrapper', () => {
    it('denotes dialog role', () => {
      const shadowDom = sut.__shadow;
      chai.expect(shadowDom.querySelector('.window-wrapper').hasAttribute('aria-role')).to.equal(true);
      chai.expect(shadowDom.querySelector('.window-wrapper').getAttribute('aria-role')).to.equal('dialog');
    });

    describe('when interactive', () => {
      it('can receive keyboard focus', () => {
        sut.interactive = true;
        const shadowDom = sut.__shadow;
        chai.expect(shadowDom.querySelector('.window-wrapper').hasAttribute('tabindex')).to.equal(true);
        chai.expect(shadowDom.querySelector('.window-wrapper').getAttribute('tabindex')).to.equal('-1');
      });
    });

    describe('when interactive', () => {
      it('cannot receive keyboard focus', () => {
        sut.interactive = false;
        const shadowDom = sut.__shadow;
        chai.expect(shadowDom.querySelector('.window-wrapper').hasAttribute('tabindex')).to.equal(false);
      });
    });

    it('is labelled by window title', () => {
      const shadowDom = sut.__shadow;
      chai.expect(shadowDom.querySelector('.window-wrapper').getAttribute('aria-labelledby')).to.equal('window-title-text');
    });

    it('is described by window slot', () => {
      const shadowDom = sut.__shadow;
      chai.expect(shadowDom.querySelector('.window-wrapper').getAttribute('aria-describedby')).to.equal('window-content-slot-wrapper');
    });
  });

  describe('close button', () => {
    it('denotes the correct label', () => {
      const shadowDom = sut.__shadow;
      chai.expect(shadowDom.querySelector('.window-title-button__close').getAttribute('aria-labelledby')).to.equal('window-title-button-close-label');
    });

    describe('for a maximized window', () => {
      it('correctly denotes the pressed state', () => {
        const shadowDom = sut.__shadow;
        chai.expect(shadowDom.querySelector('.window-title-button__close').getAttribute('aria-pressed')).to.equal('false');
      });
    });

    describe('for a minimized window', () => {
      it('correctly denotes the pressed state', () => {
        const shadowDom = sut.__shadow;
        sut.windowState = 'minimized';
        chai.expect(shadowDom.querySelector('.window-title-button__close').getAttribute('aria-pressed')).to.equal('false');
      });
    });
  });

  describe('minimize button', () => {
    it('denotes the correct label', () => {
      const shadowDom = sut.__shadow;
      chai.expect(shadowDom.querySelector('.window-title-button__minimize').getAttribute('aria-labelledby')).to.equal('window-title-button-minimize-label');
    });

    it('denotes the correct controlled element', () => {
      const shadowDom = sut.__shadow;
      chai.expect(shadowDom.querySelector('.window-title-button__minimize').getAttribute('aria-controls')).to.equal('window-content-slot-wrapper');
    });

    it('denotes the correct label element', () => {
      const shadowDom = sut.__shadow;
      chai.expect(shadowDom.querySelector('.window-title-button__minimize').getAttribute('aria-labelledby')).to.equal('window-title-button-minimize-label');
    });

    describe('for a maximized window', () => {
      it('correctly denotes the pressed state', () => {
        const shadowDom = sut.__shadow;
        chai.expect(shadowDom.querySelector('.window-title-button__minimize').getAttribute('aria-pressed')).to.equal('false');
      });

      describe('after the window state has been changed once', () => {
        it('correctly denotes the pressed state', () => {
          const shadowDom = sut.__shadow;
          sut.windowState = 'minimized';
          sut.windowState = 'maximized';
          chai.expect(shadowDom.querySelector('.window-title-button__minimize').getAttribute('aria-pressed')).to.equal('false');
        });
      });
    });

    describe('for a minimized window', () => {
      it('correctly denotes the pressed state', () => {
        const shadowDom = sut.__shadow;
        sut.windowState = 'minimized';
        chai.expect(shadowDom.querySelector('.window-title-button__minimize').getAttribute('aria-pressed')).to.equal('true');
      });

      describe('after the window state has been changed once', () => {
        it('correctly denotes the pressed state', () => {
          const shadowDom = sut.__shadow;
          sut.windowState = 'minimized';
          sut.windowState = 'maximized';
          sut.windowState = 'minimized';
          chai.expect(shadowDom.querySelector('.window-title-button__minimize').getAttribute('aria-pressed')).to.equal('true');
        });
      });
    });
  });

  describe('maximize button', () => {
    it('denotes the correct label', () => {
      const shadowDom = sut.__shadow;
      chai.expect(shadowDom.querySelector('.window-title-button__maximize').getAttribute('aria-labelledby')).to.equal('window-title-button-maximize-label');
    });

    it('denotes the correct controlled element', () => {
      const shadowDom = sut.__shadow;
      chai.expect(shadowDom.querySelector('.window-title-button__maximize').getAttribute('aria-controls')).to.equal('window-content-slot-wrapper');
    });

    it('denotes the correct label element', () => {
      const shadowDom = sut.__shadow;
      chai.expect(shadowDom.querySelector('.window-title-button__maximize').getAttribute('aria-labelledby')).to.equal('window-title-button-maximize-label');
    });


    describe('for a maximized window', () => {
      it('correctly denotes the pressed state', () => {
        const shadowDom = sut.__shadow;
        chai.expect(shadowDom.querySelector('.window-title-button__maximize').getAttribute('aria-pressed')).to.equal('true');
      });

      describe('after the window state has been changed once', () => {
        it('correctly denotes the pressed state', () => {
          const shadowDom = sut.__shadow;
          sut.windowState = 'minimized';
          sut.windowState = 'maximized';
          chai.expect(shadowDom.querySelector('.window-title-button__maximize').getAttribute('aria-pressed')).to.equal('true');
        });
      });
    });

    describe('for a minimized window', () => {
      it('correctly denotes the pressed state', () => {
        const shadowDom = sut.__shadow;
        sut.windowState = 'minimized';
        chai.expect(shadowDom.querySelector('.window-title-button__maximize').getAttribute('aria-pressed')).to.equal('false');
      });

      describe('after the window state has been changed once', () => {
        it('correctly denotes the pressed state', () => {
          const shadowDom = sut.__shadow;
          sut.windowState = 'minimized';
          sut.windowState = 'maximized';
          sut.windowState = 'minimized';
          chai.expect(shadowDom.querySelector('.window-title-button__maximize').getAttribute('aria-pressed')).to.equal('false');
        });
      });
    });
  });
});
