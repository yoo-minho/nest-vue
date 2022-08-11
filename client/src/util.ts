export const openUrl = (url: string) => window.open(url);
const timeout = 500;
export const delay = () => new Promise((res) => setTimeout(res, timeout));
export const pipe =
  (...funcs: any[]) =>
  (v: any) =>
    funcs.reduce((res, func) => func(res), v);
