const { queryString } = require('./queryString');

describe('Object to queryString', () => {
  it('should create a valid query string when an object is provided', () => {
    const obj = {
      name: 'Fabio',
      profession: 'Developer',
    };

    expect(queryString(obj)).toBe('name=Fabio&profession=Developer');
  });
});

// describe('Query string object'), function() {}
