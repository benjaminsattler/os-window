import OsWindow from '../../src/OsWindow/OsWindow.js';

import * as chai from 'chai';

describe('OsWindow', () => {
    describe('set theme', () => {
        it('changes the theme', () => {
            const sut = new OsWindow();
            sut.theme = 'dark';
            chai.expect(sut.theme).to.equal('dark');
            sut.theme = 'light';
            chat.expect(sut.theme).to.equal('light');
        });
    });
});
