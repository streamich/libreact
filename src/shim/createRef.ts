export const createRef = () => {
  const ref: any = (el) => {
    ref.value = el;
  };

  return ref;
};
