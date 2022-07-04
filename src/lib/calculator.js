module.exports.sum = (a, b) => {
  const int1 = parseInt(a, 10);
  const int2 = parseInt(b, 10);

  if (Number.isNaN(int1) || Number.isNaN(int2)) {
    throw new Error("Arguments must be numbers");
  }

  return +a + +b;
};
