import dayjs from 'dayjs';

export const getToday8 = (date?: Date) => {
  return dayjs(date ? date : new Date()).format('YYYYMMDD');
};

export const getFormatString = (date: Date = new Date(), format: string) => {
  return dayjs(date).format(format);
};

export const getBeforeMonth = (month: number) => {
  return dayjs()
    .add(-1 * month, 'month')
    .toDate();
};

//n개월치 날짜 나열하기
export const enumerateDaysFromNMonths = (
  n: number,
  format: string,
): {
  date: string;
  day: number;
  month: string;
  count: number;
}[] => {
  const endDate = dayjs().endOf('week');
  const startDate = dayjs().subtract(n, 'month').startOf('week');
  const dates = [];
  let now = startDate;
  while (now.isBefore(endDate) || now.isSame(endDate)) {
    const copyNow = now;
    const day = copyNow.day();
    const month = copyNow.format('MMM');
    const monthAgo1Week = copyNow.add(-7, 'days').format('MMM');
    dates.push({
      date: now.format(format),
      day,
      month: day === 0 && month !== monthAgo1Week ? month : '',
      count: 0,
    });
    now = now.add(1, 'days');
  }
  return dates;
};
