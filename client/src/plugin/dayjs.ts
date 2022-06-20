import dayjs from 'dayjs';

export const isToday = (dateString: string) => {
  console.log(
    { dateString },
    dayjs(new Date()).format('YYYY-MM-DD'),
    dateString === dayjs(new Date()).format('YYYY-MM-DD'),
  );
  return dateString === dayjs(new Date()).format('YYYY-MM-DD');
};

export const enumerateDaysFromNMonths = (n: number) => {
  const endDate = dayjs().endOf('week');
  const startDate = dayjs().subtract(n, 'month').startOf('week');
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

export const getStrByMs = (ms: number) => dayjs(new Date(ms)).format('YYYY-MM-DD');
export const getlocaleStr = (ms: number) => new Date(ms).toLocaleString();

export default dayjs;
