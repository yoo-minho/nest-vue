export function minifyStr(txt = '', n: number) {
  if (txt.length <= n) return txt;
  return txt.substring(0, n);
}
