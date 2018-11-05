import bgImageFilter from './';
import { expect } from 'chai';

describe('bgImage filter', () => {
    it('Create style object', () => {
        const url = 'foo';
        const style = bgImageFilter(url);

        expect(style['background-image']).to.be.equal(`url(foo)`);
    });
});
