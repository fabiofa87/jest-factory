import Cart from './Cart';

describe('Cart', () => {
  let cart;
  let product = {
    title: 'Banana',
    price: 33222,
  };
  let product2 = {
    title: 'Morango',
    price: 467484,
  };
  beforeEach(() => {
    cart = new Cart();
  });

  describe('getTotal()', () => {
    it('should return 0 when getTotal() is executed in new instance', () => {
      expect(cart.getTotal().getAmount()).toEqual(0);
    });

    it('sould multiply quantity and price receive the total amount', () => {
      const item = {
        product,
        quantity: 2,
      };
      cart.add(item);

      expect(cart.getTotal().getAmount()).toEqual(66444);
    });
    it('should ensure no more than one product exists at a time', () => {
      cart.add({
        product,
        quantity: 2,
      });
      cart.add({
        product,
        quantity: 1,
      });

      expect(cart.getTotal().getAmount()).toEqual(33222);
    });
    it('should update total when a product gets included and then removed', () => {
      cart.add({
        product,
        quantity: 2,
      });
      cart.add({
        product: product2,
        quantity: 1,
      });
      cart.remove(product);

      expect(cart.getTotal().getAmount()).toEqual(467484);
    });
  });
  describe('checkout()', () => {
    it('should return an object with the total and the list of items', () => {
      cart.add({
        product,
        quantity: 5,
      });
      cart.add({
        product: product2,
        quantity: 3,
      });

      expect(cart.checkout()).toMatchSnapshot();
    });
    it('should return an object with the total and the list of items when summary is called', () => {
      cart.add({
        product,
        quantity: 5,
      });
      cart.add({
        product: product2,
        quantity: 3,
      });

      expect(cart.summary()).toMatchSnapshot();
      expect(cart.getTotal().getAmount()).toBeGreaterThan(0);
    });
    it('should reset the cart when checkout() is called', () => {
      cart.add({
        product: product2,
        quantity: 3,
      });
      cart.checkout();
      expect(cart.getTotal().getAmount()).toEqual(0);
    });
  });
});
