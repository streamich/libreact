import {Component} from 'react';

export interface IMediaSensorProps {
  matches?: boolean;
  query: string;
  children?: (match: boolean) => React.ReactElement<any>;
}

export interface IMediaSensorState {
  matches: boolean;
}

export class MediaSensor extends Component<IMediaSensorProps, IMediaSensorState> {
  mql: MediaQueryList;
  state: IMediaSensorState;

  constructor (props, context) {
    super(props, context);

    this.state = {
      matches: props.matches || false
    };

    this.updateQuery();
  }

  componentDidMount () {
    this.updateQuery();
  }

  componentDidUpdate (props) {
    if (props.query !== this.props.query) {
      this.updateQuery();
    }
  }

  componentWillUnmount () {
    this.removeListener();
  }

  onMediaChange = (mediaQueryList) => {
    this.setState({
      matches: !!mediaQueryList.matches
    });
  };

  updateQuery () {
    if (typeof window !== 'object') {
      return;
    }

    const {query} = this.props;

    this.mql = window.matchMedia(query);

    this.setState({
      matches: !!this.mql.matches
    });

    this.mql.addListener(this.onMediaChange);
  }

  removeListener () {
    if (this.mql) {
      this.mql.removeListener(this.onMediaChange);
    }
  }

  render () {
    const {children} = this.props;
    const {matches} = this.state;

    return children(matches);
  }
}
