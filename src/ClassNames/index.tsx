import {Component} from 'react';
import {render} from 'react-universal-interface';

const equalSets = (a: any[], b: any[]) => {
  if (a.length !== b.length) {
    return false;
  }

  const A = [...a].sort();
  const B = [...b].sort();

  for (let i = 0; i < A.length; i++) {
    if (A[i] !== B[i]) {
      return false;
    }
  }

  return true;
};

export interface IClassNamesProps {
  el?: HTMLElement;
  list: string[],
  persist?: boolean;
}

export class ClassNames extends Component<IClassNamesProps, {}> {
  componentDidMount () {
    this.putList(this.props.list);
  }

  shouldComponentUpdate (props) {
    return !equalSets(props.list, this.props.list);
  }

  componentDidUpdate (props) {
    if (!props.persist) {
      this.removeList(props.list, props.el);
    }

    this.putList(this.props.list);
  }

  componentWillUnmount () {
    if (!this.props.persist) {
      this.removeList(this.props.list);
    }
  }

  putList (list: string[], el: HTMLElement = this.props.el || document.body) {
    for (const className of list) {
      el.classList.add(className);
    }
  }

  removeList (list: string[], el: HTMLElement = this.props.el || document.body) {
    for (const className of list) {
      el.classList.remove(className);
    }
  }

  render () {
    return render(this.props, null);
  }
}
