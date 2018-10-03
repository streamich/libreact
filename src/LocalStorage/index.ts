import {Component} from 'react';
import {get, set, del} from './local-storage';
import {debounce} from 'throttle-debounce';

export interface ILocalStorageProps {
  name: string;
  data: any;
  persist?: boolean;
  onMount?: (data) => void;
  debounce?: number;
}

export class LocalStorage extends Component<ILocalStorageProps, any> {
  static defaultProps = {
    debounce: 200
  };

  componentDidMount () {
    const {name, onMount} = this.props;

    if (onMount) {
      let json = '';

      try {
        json = get(name);
      } catch {
        json = 'null';
      }

      if (typeof json === 'string') {
        try {
          const data = JSON.parse(json);

          onMount(data);
        } catch {}
      }
    } else {
      this.put();
    }
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

      set(name, rawData);
    } catch {}
  });

  remove (name = this.props.name) {
    if (!this.props.persist) {
      try {
        del(name);
      } catch {}
    }
  }

  render () {
    return null;
  }
}
