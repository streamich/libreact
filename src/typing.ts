export interface IUniversalInterfaceProps<TData> {
  children?: ((data: TData) => React.ReactNode) | React.ReactNode | any;
  render?: (data: TData) => React.ReactNode;
  comp?: React.ComponentClass<TData> | React.SFC<TData>;
  component?: React.ComponentClass<TData> | React.SFC<TData>;
}
