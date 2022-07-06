import Cart from './Cart';

describe('Cart', () => {
  let cart;
  beforeEach(() => {
    cart = new Cart();
  });
  it('should return 0 when getTotal() is executed in new instance', () => {
    expect(cart.getTotal()).toEqual(0);
  });

  it('sould multiply quantity and price receive the total amount', () => {
    const item = {
      product: {
        title: 'Banana',
        price: 33222,
      },
      quantity: 2,
    };
    cart.add(item);

    expect(cart.getTotal()).toEqual(66444);
  });
});
