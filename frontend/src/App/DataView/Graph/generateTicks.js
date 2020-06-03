import dayjs from 'dayjs';

export const generateTicksY = (ticksAmount, minVal, maxVal) => {
  const min = Math.floor(minVal);
  const max = Math.ceil(maxVal);
  const diff = max - min;

  const increment = parseInt(diff / ticksAmount, 10) || 1;

  const ticks = [];
  for (let i = min; i <= max; i += increment) {
    ticks.push(i);
  }
  return ticks;
};

export const generateTicksX = (ticksAmount, minVal, maxVal) => {
  let minDate = dayjs(minVal);
  const maxDate = dayjs(maxVal);

  let daysDiff = maxDate.diff(minDate, 'day');

  if (daysDiff < 2) {
    return [minVal, maxVal];
  }

  if (daysDiff > 1 && minDate.hour() >= 12) {
    minDate = minDate.hour(12).minute(0).second(0).add(1, 'day');
    daysDiff = maxDate.diff(minDate, 'day');
  }

  const ticksNum = (daysDiff < ticksAmount ? daysDiff : ticksAmount) || 1;
  const increment = parseInt(daysDiff / ticksNum, 10) || 1;

  const ticks = [];
  for (
    let i = 0;
    maxDate.isAfter(minDate.hour(12).minute(0).second(0).add(i, 'day'));
    i += increment
  ) {
    const newDate = minDate.hour(12).minute(0).second(0).add(i, 'day');
    ticks.push(newDate);
  }

  const timestamps = ticks.map((tick) => tick.unix() * 1000);
  return timestamps;
};
