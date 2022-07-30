import * as dayjs from 'dayjs';

export const getToday8 = () => {
  return dayjs(new Date()).format('YYYYMMDD');
};
