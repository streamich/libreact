export {View} from '../View';

export interface IWidthQueryProps {
  width: number,
}

export const WidthQuery: React.SFC<IWidthQueryProps> = ({width, children}) => {
  if (process.env.NODE_ENV !== 'production') {
    if (!Array.isArray(children)) {
      throw new TypeError('<WidthQuery/> expects multiple <View/> children.');
    }
  }

  for (const child of children as any) {
    const {maxWidth = Infinity, minWidth = 0} = child.props;

    if (maxWidth > width && minWidth <= width) {
      return child;
    }

    if (maxWidth === Infinity && width === Infinity) {
      return child;
    }
  }

  return null;
};
