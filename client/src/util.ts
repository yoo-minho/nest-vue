export const openUrl = (url: string) => window.open(url);
export const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));
