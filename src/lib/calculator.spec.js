const { sum } = require("./calculator");

it("should sum 2 and 2 and result must be 4", () => {
  expect(sum(2, 2)).toBe(4);
});

it("should sum 2 and 2 even its a string", () => {
  expect(sum("2", "2")).toBe(4);
});

it("should throw an error if arguments from method cannot be sum", () => {
  expect(() => sum("", "2")).toThrowError();
  expect(() => sum([2, 2])).toThrowError();
  expect(() => sum({})).toThrowError();
  expect(() => sum()).toThrowError();
});
