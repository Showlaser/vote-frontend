import { normalise } from "services/shared/math";

test("normalise test", () => {
  const value = 250;
  const min = 0;
  const max = 500;

  const returnValue = normalise(value, min, max);
  expect(returnValue).toBe(50);
});
