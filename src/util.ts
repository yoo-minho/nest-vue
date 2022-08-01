export function jsonParse(v: string) {
  try {
    return JSON.parse(v);
  } catch (e) {
    return v;
  }
}
