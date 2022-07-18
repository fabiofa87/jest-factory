import find from 'lodash/find';
import remove from 'lodash/remove';
import Dinero from 'dinero.js';
import { calculateDiscount } from '../lib/discount.utils';

const Money = Dinero;

Money.defaultCurrency = 'BRL';
Money.defaultPrecision = 2;

export default class Cart {
  items = [];

  getTotal() {
    return this.items.reduce((acc, { quantity, condition, product }) => {
      const amount = Money({
        amount: quantity * product.price,
      });
      let discount = Money({ amount: 0 });

      if (condition) {
        discount = calculateDiscount(amount, quantity, condition);
      }

      return acc.add(amount).subtract(discount);
    }, Money({ amount: 0 }));
  }

  add(item) {
    const findItem = { product: item.product };
    if (find(this.items, findItem)) {
      remove(this.items, findItem);
    }
    this.items.push(item);
  }
  remove(product) {
    remove(this.items, { product });
  }

  summary() {
    const total = this.getTotal();
    const items = this.items;
    const formatted = total.toFormat('$0,0.00');

    return {
      total,
      formatted,
      items,
    };
  }
  checkout() {
    const { total, items } = this.summary();

    this.items = [];

    return {
      total: total.getAmount(),
      items,
    };
  }
}

const cart = new Cart();

const product = {
  title: '',
  price: '',
};

const item = {
  quantity: 2,
  product,
};

cart.add(item);
cart.remove(product);
cart.getTotal();
cart.summary();
cart.checkout();
