const compose = (...functions) => {
  if (!functions.length) {
    return arg => arg;
  }

  if (functions.length === 1) {
    return functions[0];
  }

  return (...args2) => {
    let result = functions[functions.length - 1](...args2);

    for (let i = functions.length - 2; i >= 0; i--) {
      result = functions[i](result);
    }

    return result;
  };
};

export default compose;
