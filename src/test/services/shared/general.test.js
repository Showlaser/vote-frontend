import {
  getDifferenceBetweenTwoDatesInMinutesAndSecondsString,
  getRgbStringFromPoint,
  stringIsEmpty,
  toCamelCase,
} from "services/shared/general";

test("string is empty test", () => {
  const emptyString = "";
  const undefinedString = undefined;
  const nullString = null;

  expect(stringIsEmpty(emptyString)).toBe(true);
  expect(stringIsEmpty(undefinedString)).toBe(true);
  expect(stringIsEmpty(nullString)).toBe(true);
});

test("get mapped rgb string from point test", () => {
  const point = {
    redLaserPowerPwm: 255,
    greenLaserPowerPwm: 100,
    blueLaserPowerPwm: 80,
  };

  const rgbString = getRgbStringFromPoint(point);
  expect(rgbString).toBe("rgb(255,100,80)");
});

test("get difference between two dates in minutes and seconds string test", () => {
  const dateNow = new Date();
  let expirationDate = new Date();
  expirationDate = new Date(expirationDate.getTime() + 600000);
  const differenceString =
    getDifferenceBetweenTwoDatesInMinutesAndSecondsString(
      expirationDate,
      dateNow
    );
  expect(differenceString).toBe("10 : 00");
});

test("get difference between two dates in minutes and seconds string vote ended test", () => {
  const dateNow = new Date();
  const differenceString =
    getDifferenceBetweenTwoDatesInMinutesAndSecondsString(dateNow, dateNow);
  expect(differenceString).toBe("Voting ended!");
});
