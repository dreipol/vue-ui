import bgImageFilter from './';
import { expect } from 'chai';

describe('Filter bgImage', () => {
    it('Create style object', () => {
        const url = 'foo';
        const style = bgImageFilter(url);

        expect(style['background-image']).to.be.equal(`url(foo)`);
    });
});
