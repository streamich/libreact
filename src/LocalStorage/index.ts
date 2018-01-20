import {Component} from 'react';
import {noop} from '../util';
import * as debounce from 'throttle-debounce/debounce';

export interface ILocalStorageProps {
  name: string;
  data: any;
  persist?: boolean;
  onMount?: (data) => void;
  debounce?: number;
}

export class LocalStorage extends Component<ILocalStorageProps, any> {
  static defaultProps = {
    onMount: noop,
    debounce: 200
  };

  componentDidMount () {
    const {name} = this.props;
    const json = localStorage[name];

    if (typeof json === 'string') {
      try {
        const data = JSON.parse(json);

        this.props.onMount(data);
      } catch {}
    }
    this.put();
  }

  componentDidUpdate (props) {
    if (props.name !== this.props.name) {
      this.remove();
      this.put();
    } else {
      try {
        const newJson = JSON.stringify(this.props.data);

        if (JSON.stringify(props.data) !== newJson) {
          this.put(newJson);
        }
      } catch {}
    }
  }

  componentWillUnmount () {
    this.remove();
  }

  put = debounce(this.props.debounce, (rawData?: string) => {
    const {name, data} = this.props;

    try {
      if (!rawData) {
        rawData = JSON.stringify(data);
      }

      localStorage[String(name)] = rawData;
    } catch (error) {

    }
  });

  remove (name = this.props.name) {
    if (!this.props.persist) {
      delete localStorage[name];
    }
  }

  render () {
    return null;
  }
}
