import * as React from 'react';

export interface IAfterTimeoutProps {
  ms?: number;
}

export const AfterTimeout: React.FC<IAfterTimeoutProps> = ({ms = 200, children}) => {
  const [ready, setReady] = React.useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setReady(true);
    }, ms);

    return () => {
      clearTimeout(timer);
    };
  }, [ms]);

  return ready ? children : null;
};
