import { expect } from 'chai';
import srcsetFilter from './index';

describe('srcset Filter', () => {
    it('srcset with one image', () => {
        const urls = [
            'http://via.placeholder.com/400x400',
        ];
        const srcset = srcsetFilter(urls);

        expect(srcset).to.be.equal(``);
    });

    it('srcset with two images', () => {
        const urls = [
            'http://via.placeholder.com/400x400',
            'http://via.placeholder.com/800x800',
        ];
        const srcset = srcsetFilter(urls);

        expect(srcset).to.be.equal(`${ urls[0] } 1x, ${ urls[1] } 2x`);
    });

    it('srcset with three images', () => {
        const urls = [
            'http://via.placeholder.com/400x400',
            'http://via.placeholder.com/800x800',
            'http://via.placeholder.com/1600x1600',
        ];
        const srcset = srcsetFilter(urls);

        expect(srcset).to.be.equal(`${ urls[0] } 1x, ${ urls[1] } 2x, ${ urls[2] } 3x`);
    });
});
