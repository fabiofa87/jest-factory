import find from 'lodash/find';
import remove from 'lodash/remove';

export default class Cart {
  items = [];
  getTotal() {
    return this.items.reduce(
      (acc, item) => acc + item.quantity * item.product.price,
      0,
    );
  }
  add(item) {
    const findItem = { product: item.product };
    if (find(this.items, findItem)) {
      remove(this.items, findItem);
    }
    this.items.push(item);
  }
  remove(product) {}
  summary() {}
  checkout() {}
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
