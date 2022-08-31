import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Days } from '../types/common';

dayjs.extend(relativeTime);

export const getDateString = (dateStr: Date) => dayjs(dateStr).format('YYYY-MM-DD HH:mm (ddd)');
export const getAgoString = (dateStr: Date) => dayjs(dateStr).fromNow();

export const isTodayByDate = (v: Date) => dayjs(v).format('YYYYMMDD') === dayjs(new Date()).format('YYYYMMDD');
export const isToday = (dateString: string) => dateString === dayjs(new Date()).format('YYYY-MM-DD');
export const getDateStringByMs = (ms: number) => dayjs(new Date(ms)).format('YYYY-MM-DD');
export const getAgoStringByMs = (ms: number) => dayjs(new Date(ms)).fromNow();
export const getlocaleStr = (ms: number) => new Date(ms).toLocaleString();

export const enumerateDaysFromNMonths = (n: number): Days[] => {
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
      date: now.format('YYYY-MM-DD'),
      day: day,
      month: day === 0 && month !== monthAgo1Week ? month : '',
    });
    now = now.add(1, 'days');
  }
  return dates;
};
