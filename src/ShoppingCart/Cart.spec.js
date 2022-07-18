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
  describe('special conditions to achieve discount', () => {
    it('should apply percentage discount when quantity above minimum is achieved', () => {
      const condition = {
        percentage: 30,
        minimum: 2,
      };

      cart.add({
        product,
        quantity: 3,
        condition,
      });

      expect(cart.getTotal().getAmount()).toEqual(99666);
    });
    it('should apply percentage discount when even quantities', () => {
      const condition = {
        quantity: 2,
      };

      cart.add({
        product,
        quantity: 4,
        condition,
      });

      expect(cart.getTotal().getAmount()).toEqual(66444);
    });
    it('should apply quantity discount for odd quantities', () => {
      const condition = {
        quantity: 2,
      };

      cart.add({
        product,
        quantity: 5,
        condition,
      });

      expect(cart.getTotal().getAmount()).toEqual(99666);
    });
    it('should NOT apply percentage discount when quantity is below or equals minimum', () => {
      const condition = {
        percentage: 30,
        minimum: 2,
      };

      cart.add({
        product,
        quantity: 2,
        condition,
      });

      expect(cart.getTotal().getAmount()).toEqual(66444);
    });
    it('should NOT apply percentage discount when condition is NOT met', () => {
      const condition = {
        quantity: 2,
      };

      cart.add({
        product,
        quantity: 1,
        condition,
      });

      expect(cart.getTotal().getAmount()).toEqual(33222);
    });
    it('should receive two or more conditions and determine/apply the best discount', () => {
      const condition = {
        percentage: 30,
        minimum: 2,
      };
      const condition2 = {
        quantity: 2,
      };

      cart.add({
        product,
        quantity: 5,
        condition: [condition, condition2],
      });

      expect(cart.getTotal().getAmount()).toEqual(99666);
    });
  });
});
