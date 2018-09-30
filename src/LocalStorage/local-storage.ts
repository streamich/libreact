export const get = (key: string) => localStorage[key];
export const set = (key: string, value: string) => localStorage[key] = value;
export const del = (key: string) => {
  delete localStorage[key];
};
