import { queryString, parseString } from './queryString';

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

describe('Query string to object', () => {
  it('should convert querystring to object', () => {
    const queryString = 'name=Fabio&profession=Developer';
    expect(parseString(queryString)).toEqual({
      name: 'Fabio',
      profession: 'Developer',
    });
  });
  it('should convert a query string of a single key-value to object', () => {
    const queryString = 'name=Fabio';
    expect(parseString(queryString)).toEqual({
      name: 'Fabio',
    });
  });
  it('should convert query string to an object taking care of comma separated values', () => {
    const queryString = 'name=Fabio&hobbies=Programming,Sports';
    expect(parseString(queryString)).toEqual({
      name: 'Fabio',
      hobbies: ['Programming', 'Sports'],
    });
  });
});
