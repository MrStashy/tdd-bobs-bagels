import Basket from '../src/basket.js'
import 'jasmine-expect'

describe('Bagel basket', () => {
  it('should be able to have new items added', () => {
    const basket = new Basket()
    basket.addItem('BGLO')

    expect(basket.contents.length).toEqual(1)
  })

  it('should be able to have several new items added (some of which being the same)', () => {
    const basket = new Basket()
    basket.addItem('BGLO')
    basket.addItem('BGLO')
    basket.addItem('BGLS')

    expect(basket.contents.length).toEqual(3)
  })

  it('should be able to have items removed', () => {
    const basket = new Basket()
    basket.addItem('BGLO')
    basket.addItem('BGLS')
    basket.removeItem('BGLS')

    expect(basket.contents[0].sku).toEqual('BGLO')
  })

  it('should only accept items upto the content limit', () => {
    const basket = new Basket()
    basket.addItem('BGLO')
    basket.addItem('BGLS')
    basket.addItem('BGLP')
    basket.addItem('BGLS')
    basket.addItem('COF')
    
    expect(basket.addItem('BGSE')).toEqual('Sorry, your basket is full')
  })

  it('should accept adjustments to the default content limit', () => {
    const basket = new Basket(6)

    basket.addItem('BGLO')
    basket.addItem('BGLS')
    basket.addItem('BGLP')
    basket.addItem('BGLS')
    basket.addItem('COF')
    basket.addItem('BGSE')
  
    expect(basket.contents.length).toEqual(6)
  })
})
