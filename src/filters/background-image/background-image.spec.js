import { expect } from 'chai'
import backgroundImageFilter from '.'

describe('Filter backgroundImage', () => {
  it('Create style object', () => {
    const url = 'foo'
    const style = backgroundImageFilter(url)

    expect(style['background-image']).to.be.equal(`url(foo)`)
  })
})
