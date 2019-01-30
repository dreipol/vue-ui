import backgroundImageFilter from './';
import { expect } from 'chai';

describe('Filter backgroundImage', () => {
    it('Create style object', () => {
        const url = 'foo';
        const style = backgroundImageFilter(url);

        expect(style['background-image']).to.be.equal(`url(foo)`);
    });
});
