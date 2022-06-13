export function stringIsEmpty(str) {
  return str === undefined || str === "" || str === null;
}

export function getRgbStringFromPoint(point) {
  const { redLaserPowerPwm, greenLaserPowerPwm, blueLaserPowerPwm } = point;
  return `rgb(${redLaserPowerPwm},${greenLaserPowerPwm},${blueLaserPowerPwm})`;
}

export function getFormDataObject(event) {
  const formData = new FormData(event.target);
  var object = {};
  formData.forEach(function (value, key) {
    object[key] = value;
  });
  return object;
}

function toCamelCase(value) {
  var newO, origKey, newKey, value;
  if (value instanceof Array) {
    return value.map(function (value) {
      if (typeof value === "object") {
        value = toCamel(value);
      }
      return value;
    });
  } else {
    newO = {};
    for (origKey in value) {
      if (value.hasOwnProperty(origKey)) {
        newKey = (
          origKey.charAt(0).toLowerCase() + origKey.slice(1) || origKey
        ).toString();
        value = value[origKey];
        if (
          value instanceof Array ||
          (value !== null && value.constructor === Object)
        ) {
          value = toCamel(value);
        }
        newO[newKey] = value;
      }
    }
  }
  return newO;
}

export const getDifferenceBetweenTwoDatesInMinutesAndSecondsString = (
  expirationDate,
  dateNow
) => {
  const difference = expirationDate.getTime() - dateNow.getTime();
  if (difference <= 0) {
    return "Voting ended!";
  } else {
    let seconds = Math.floor(difference / 1000);
    let minutes = Math.floor(seconds / 60);

    minutes %= 60;
    seconds %= 60;

    return `${minutes < 10 ? "0" : ""}${minutes} : ${
      seconds < 10 ? "0" : ""
    }${seconds}`;
  }
};
