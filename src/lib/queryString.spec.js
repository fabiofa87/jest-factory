const { queryString } = require('./queryString');

describe('Object to queryString', () => {
  it('should create a valid query string when an object is provided', () => {
    const obj = {
      name: 'Fabio',
      profession: 'Developer',
    };

    expect(queryString(obj)).toBe('name=Fabio&profession=Developer');
  });
  it('it sould create a valid query string even when an array is passed as value', () => {
    const obj = {
      name: 'Fabio',
      hobbies: ['Programming', 'Sports'],
    };
    expect(queryString(obj)).toBe('name=Fabio&hobbies=Programming,Sports');
  });
  it('it should throw an error even when an object is passed as value', () => {
    const obj = {
      name: 'Fabio',
      hobbies: {
        programming: 'JavaScript',
        sports: 'Football',
      },
    };
    expect(() => queryString(obj)).toThrowError();
  });
});
