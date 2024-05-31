import data from '../inventory.json' assert { type: 'json' }
import printReceipt from './receipt.js'
import getOrderSummary from './summary.js'

const { inventory } = data

class Basket {
  constructor(contentLimit = 5) {
    this.contents = []
    this.contentLimit = contentLimit
  }

  addItem(SKU) {
    if (this.contents.length >= this.contentLimit) {
      return 'Sorry, your basket is full'
    }
    const itemToAdd = inventory.find((item) => item.sku === SKU)
    this.contents.push(itemToAdd)
  }

  removeItem(SKU) {
    const itemToRemove = this.contents.find((item) => item.sku === SKU)
    if (itemToRemove) {
      const index = this.contents.indexOf(itemToRemove)
      this.contents.splice(index, 1)
    } else {
      return 'Your basket does not contain that item'
    }
  }

  checkPrice(SKU) {
    const item = inventory.find((item) => item.sku === SKU)
    return Number(item.price)
  }

  checkOut() {
    let totalPrice = 0
    this.contents.forEach((item) => {
      totalPrice += Number(item.price)
    })
    return totalPrice
  }

  orderSummary() {
    return getOrderSummary(this.contents)
  }

  getReceipt() {
    const summary = this.orderSummary()
    printReceipt(summary)
  }
}



export default Basket
