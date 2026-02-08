export const unitToPx = (val, unit) => {
  const num = parseFloat(val) || 0;
  if (unit === 'cm') return num * 37.795;
  if (unit === 'in') return num * 96;
  return num; // px
};