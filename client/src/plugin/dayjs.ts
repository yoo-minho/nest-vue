import dayjs from 'dayjs';

export const enumerateDaysFromNMonths = (n: number) => {
  const endDate = dayjs();
  const startDate = dayjs().add(-1 * n, 'month');
  const dates = [];
  let now = startDate;
  while (now.isBefore(endDate) || now.isSame(endDate)) {
    dates.push({
      date: now.format('YYYY-MM-DD'),
      day: now.day(),
    });
    now = now.add(1, 'days');
  }
  return dates;
};

export default dayjs;
