export const noop = () => {};

export const idx = (obj, accessor) => {
  try {
    return accessor(obj);
  } catch (error) {
    return undefined;
  }
};
