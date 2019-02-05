import * as React from 'react';

const h = React.createElement;

const defaultRenderRow = cells => h('tr', null, ...cells);

export interface Props extends React.AllHTMLAttributes<any> {
  cols?: number;
  renderRow?: (cells: React.ReactElement<any>[]) => React.ReactElement<any>;
}

export const ListTable: React.SFC<Props> = ({cols, renderRow, children, ...rest}) => {
  const list = React.Children.toArray(children);
  const rows: React.ReactElement<any>[] = [];
  const length = list.length;
  const rowLength = Math.ceil(length / cols);

  let i = 0;
  for (let m = 0; m < rowLength; m++) {
    const cells: React.ReactElement<any>[] = [];
    for (let n = 0; n < cols; n++) {
      cells.push(h('td', null, i < length ? list[i] : null));
      i++;
    }
    rows.push(renderRow(cells));
  }

  return h('table', rest, h('tbody', null,
    ...rows,
  ));
};

ListTable.defaultProps = {
  cols: 3,
  renderRow: defaultRenderRow,
};
