import { toast } from "react-toastify";

export const toastSubject = {
  apiBadRequest: {
    message: "The server could not process the send data",
    id: 1,
  },
  apiNotFound: {
    message: "The resource was not found",
    id: 2,
  },
  apiDuplication: {
    message: "An item with the same key already exists",
    id: 3,
  },
  apiException: {
    message: "An exception has occured on the API",
    id: 4,
  },
  apiNotModified: {
    message: "Data was not modified",
    id: 5,
  },
  apiUnavailable: {
    message: "Local API unavailable, start it",
    id: 6,
  },
  changesSaved: {
    message: "Changes saved",
    id: 7,
  },
  alreadyVoted: {
    message: "You already voted for this session",
    id: 8,
  },
  invalidJoinCode: {
    message: "The join code is not valid",
    id: 9,
  },
  NoSessionFound: {
    message: "No session with this join code was found",
    id: 10,
  },
};

const calculateAutoCloseTime = (text) => {
  const autoCloseTime = text.length * 100;
  return autoCloseTime > 3000 ? autoCloseTime : 3000;
};

export const showError = (subject) => {
  const { message, id } = subject;
  const time = calculateAutoCloseTime(message);
  toast.error(message, { toastId: id, autoClose: time });
};

export const showSuccess = (subject) => {
  const { message, id } = subject;
  const time = calculateAutoCloseTime(message);
  toast.success(message, { toastId: id, autoClose: time });
};

export const showWarning = (subject) => {
  const { message, id } = subject;
  const time = calculateAutoCloseTime(message);
  toast.warning(message, { toastId: id, autoClose: time });
};

export const showInfo = (subject) => {
  const { message, id } = subject;
  const time = calculateAutoCloseTime(message);
  toast.info(message, { toastId: id, autoClose: time });
};
