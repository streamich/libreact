const isStatelessComponent = (Comp) => {
  if (typeof Comp !== 'function') {
    return false;
  }

  return !Comp.prototype || (Comp instanceof Function);
};

export default isStatelessComponent;
