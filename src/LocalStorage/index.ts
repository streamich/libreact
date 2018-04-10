import {Component} from 'react';
const debounce = require('throttle-debounce/debounce');

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
        json = localStorage[name];
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

      localStorage[String(name)] = rawData;
    } catch {}
  });

  remove (name = this.props.name) {
    if (!this.props.persist) {
      try {
        delete localStorage[name];
      } catch {}
    }
  }

  render () {
    return null;
  }
}
