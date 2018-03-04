export const View = (props) => {
  const {children} = props;

  if (!children) {
    return null;
  }

  return typeof children === 'function' ? children(props) : children;
};
