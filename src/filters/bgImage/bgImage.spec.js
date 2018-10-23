import { expect } from 'chai';
import bgImageFilter from './index';

describe('bgImage Filter', () => {
    it('create style o object', () => {
        const url = 'http://via.placeholder.com/400x400';
        const style = bgImageFilter(url);

        expect(style['background-image']).to.be.equal(`url(${ url })`);
    });
});
