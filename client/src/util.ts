type ConvertFunction = (x: string) => string;

export const openUrl = (url: string) => window.open(url);
const timeout = 500;
export const delay = (delay = timeout) => new Promise((res) => setTimeout(res, delay));
export const pipe =
  (...funcs: ConvertFunction[]) =>
  (v: string) =>
    funcs.reduce((res, func) => func(res), v);
