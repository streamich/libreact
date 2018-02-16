const keyList = Object.keys;
const hasProp = Object.prototype.hasOwnProperty;

const shallowEqual: (a, b) => boolean = (a, b) => {
  if (a === b) return true;
  if (!a || !b) return false;
  if (!(a instanceof Object) || !(b instanceof Object)) return false;

  const keys = keyList(a);
  const length = keys.length;

  for (let i = 0; i < length; i++)
    if (!(keys[i] in b)) return false;

  for (let i = 0; i < length; i++)
    if (a[keys[i]] !== b[keys[i]]) return false;

  return length === keyList(b).length;
}

export default