// MIN = Minimum expected value
// MAX = Maximium expected value
// Function to normalise the values (MIN / MAX could be integrated)
export const normalise = (value, min, max) =>
  ((value - min) * 100) / (max - min);
