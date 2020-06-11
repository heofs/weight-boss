import dayjs from 'dayjs';

import { generateTicksX, generateTicksY } from './generateTicks';

describe('generating graph ticks', () => {
  describe.only('X generator', () => {
    it.only('should return an array with only min and max date if daysDiff < 2', () => {
      const startDate = new Date(2020, 0, 1, 14, 0, 0).getTime();
      const endDate = new Date(2020, 0, 2, 9, 0, 0).getTime();
      const ticks = generateTicksX(3, startDate, endDate);
      expect(ticks).toEqual([startDate, endDate]);
    });

    it('should return an array when given values', () => {
      const startDate = new Date(2020, 0, 1, 14, 0, 0).getTime();
      const endDate = new Date(2020, 0, 20, 9, 0, 0).getTime();
      const ticks = generateTicksX(3, startDate, endDate);
      ticks.forEach((timestamp) => {
        console.log(dayjs(timestamp).format('YYYY-MM-DD - HH:mm'));
      });
      expect(ticks).toEqual([1577836800000, 1578384000000, 1578931200000]);
    });
  });
  // Should display correctly when only two dates. for example 1 jan and 2 jan

  describe('Y generator', () => {
    it('should return an array when given values', () => {
      const ticks = generateTicksY(3, 10, 12);
      expect(ticks).toEqual([10, 11, 12]);
    });
    it('should return an array of evenly distributed numbers', () => {
      const ticksAmount = 5;
      const ticks = generateTicksY(ticksAmount, 10, 20);
      expect(ticks).toEqual([10, 12, 14, 16, 18, 20]);
    });
    it('should only return whole numbers', () => {
      const ticksAmount = 10;
      const ticks = generateTicksY(ticksAmount, 10, 20);
      ticks.forEach((num) => {
        expect(num - Math.floor(num) === 0).toBeTruthy();
      });
    });
  });
});
