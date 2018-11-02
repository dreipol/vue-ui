import { expect } from 'chai';
import bgImageFilter from './index';

describe('bgImage filter', () => {
    it('Create style object', () => {
        const url = 'foo';
        const style = bgImageFilter(url);

        expect(style['background-image']).to.be.equal(`url(foo)`);
    });
});
