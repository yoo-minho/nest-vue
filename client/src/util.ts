export const openUrl = (url: string) => window.open(url);
export const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));
export const pipe =
  (...funcs: any[]) =>
  (v: any) =>
    funcs.reduce((res, func) => func(res), v);
