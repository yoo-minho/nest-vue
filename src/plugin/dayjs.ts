import * as dayjs from 'dayjs';

export const isToday8 = () => {
  return dayjs(new Date()).format('YYYYMMDD');
};
