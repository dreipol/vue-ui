import { expect } from 'chai'
import srcsetFilter from '.'

describe('Filter srcset', () => {
  it('srcset with one image', () => {
    const urls = ['foo']
    const srcset = srcsetFilter(urls)

    expect(srcset).to.be.equal('')
  })

  it('srcset with two images', () => {
    const urls = ['bar', 'baz']
    const srcset = srcsetFilter(urls)

    expect(srcset).to.be.equal('bar 1x, baz 2x')
  })

  it('srcset with three images', () => {
    const urls = ['qux', 'quux', 'quuz']
    const srcset = srcsetFilter(urls)

    expect(srcset).to.be.equal('qux 1x, quux 2x, quuz 3x')
  })
})
