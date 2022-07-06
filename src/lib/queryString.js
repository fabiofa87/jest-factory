const keyValueToString = ([key, value]) => {
  if (typeof value === 'object' && !Array.isArray(value)) {
    throw new Error('Objects are not allowed as values');
  }
  return `${key}=${value}`;
};

export function queryString(obj) {
  return Object.entries(obj).map(keyValueToString).join('&');
}

export function parseString(string) {
  return Object.fromEntries(
    string.split('&').map(item => {
      let [key, value] = item.split('=');

      if (value.indexOf(',') > 1) {
        value = value.split(',');
      }

      return [key, value];
    }),
  );
}
