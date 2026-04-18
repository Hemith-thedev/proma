
const DAYS = Array.from({ length: 31 }, (_, i) => ({
  value: i + 1,
  label: (i + 1).toString(),
}));

const MONTHS = Array.from({ length: 12 }, (_, i) => ({
  value: i + 1,
  label: (i + 1).toString(),
}));

const YEARS = Array.from({ length: 10 }, (_, i) => {
  const year = new Date().getFullYear() - i;
  return {
    value: year,
    label: year.toString()
  }
});

export { DAYS, MONTHS, YEARS }; 