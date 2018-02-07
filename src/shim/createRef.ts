const shimCreateRef = (React) => {
  if (typeof React.createRef !== 'function') {
    React.createRef = () => {
      const ref: any = (el) => {
        ref.value = el;
      };

      return ref;
    };
  }
};

export default shimCreateRef;
