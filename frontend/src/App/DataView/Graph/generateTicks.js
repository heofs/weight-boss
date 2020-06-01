import dayjs from 'dayjs';

export const generateTicksY = (resolution, minVal, maxVal) => {
  const ticks = [];
  const min = parseInt(minVal, 10);
  const max = parseInt(maxVal, 10);
  const diff = max - min;

  const increment = parseInt(diff / resolution, 10);
  const incNum = increment || 1;

  for (let i = min; i <= max; i += incNum) {
    ticks.push(i);
  }
  return ticks;
};

export const generateTicksX = (resolution, minVal, maxVal) => {
  const minDate = dayjs(minVal);
  const maxDate = dayjs(maxVal);

  const daysDiff = maxDate.diff(minDate, 'day');
  const ticksNum = (daysDiff < resolution ? daysDiff : resolution) || 1;

  const min = parseInt(minVal, 10);
  const max = parseInt(maxVal, 10);
  const diff = max - min;

  const increment = parseInt(diff / ticksNum, 10);
  const incNum = increment || 1;

  const ticks = [];
  for (let i = min; i <= max; i += incNum) {
    ticks.push(i);
  }
  return ticks;
};
