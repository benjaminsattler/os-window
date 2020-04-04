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

describe('maximize button', () => {
  describe('when non interactive', () => {
    it('does not change the window-state property', () => {
      sut.windowState = 'minimized';
      const maximizeButton = sut.shadow.querySelector('.window-title-button__maximize');
      maximizeButton.click();
      chai.expect(sut.getAttribute('window-state')).to.equal('minimized');
    });

    it('does not change the windowState attribute', () => {
      sut.windowState = 'minimized';
      const maximizeButton = sut.shadow.querySelector('.window-title-button__maximize');
      maximizeButton.click();
      chai.expect(sut.windowState).to.equal('minimized');
    });
  });

  describe('when interactive', () => {
    it('changes the window-state property', () => {
      sut.interactive = true;
      sut.windowState = 'minimized';
      const maximizeButton = sut.shadow.querySelector('.window-title-button__maximize');
      maximizeButton.click();
      chai.expect(sut.getAttribute('window-state')).to.equal('maximized');
    });

    it('changes the windowState attribute', () => {
      sut.interactive = true;
      sut.windowState = 'minimized';
      const maximizeButton = sut.shadow.querySelector('.window-title-button__maximize');
      maximizeButton.click();
      chai.expect(sut.windowState).to.equal('maximized');
    });

    it('maximizes the minimized window', () => {
      sut.interactive = true;
      sut.windowState = 'minimized';
      const maximizeButton = sut.shadow.querySelector('.window-title-button__maximize');
      maximizeButton.click();
      const slotWrapper = sut.shadow.querySelector('.window-content-slot-wrapper');
      const slotWrapperHeight = window.getComputedStyle(slotWrapper).height;
      chai.expect(slotWrapperHeight).to.not.equal('0px');
    });
  });
});

describe('minimize button', () => {
  describe('when non interactive', () => {
    it('does not change the window-state property', () => {
      sut.windowState = 'maximized';
      const minimizeButton = sut.shadow.querySelector('.window-title-button__minimize');
      minimizeButton.click();
      chai.expect(sut.getAttribute('window-state')).to.equal('maximized');
    });

    it('does not change the windowState attribute', () => {
      sut.windowState = 'maximized';
      const minimizeButton = sut.shadow.querySelector('.window-title-button__minimize');
      minimizeButton.click();
      chai.expect(sut.windowState).to.equal('maximized');
    });
  });

  describe('when interactive', () => {
    it('changes the window-state property', () => {
      sut.interactive = true;
      sut.windowState = 'maximized';
      const minimizeButton = sut.shadow.querySelector('.window-title-button__minimize');
      minimizeButton.click();
      chai.expect(sut.getAttribute('window-state')).to.equal('minimized');
    });

    it('changes the windowState attribute', () => {
      sut.interactive = true;
      sut.windowState = 'maximized';
      const minimizeButton = sut.shadow.querySelector('.window-title-button__minimize');
      minimizeButton.click();
      chai.expect(sut.windowState).to.equal('minimized');
    });

    it('minimizes the maximized window', () => {
      sut.interactive = true;
      sut.windowState = 'maximized';
      const minimizeButton = sut.shadow.querySelector('.window-title-button__minimize');
      minimizeButton.click();
      const slotWrapper = sut.shadow.querySelector('.window-content-slot-wrapper');
      const slotWrapperHeight = window.getComputedStyle(slotWrapper).height;
      chai.expect(slotWrapperHeight).to.equal('0px');
    });
  });
});
