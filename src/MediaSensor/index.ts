import {Component, createElement as h} from 'react';

export interface IMediaSensorProps {
  query: string;
  children?: (match: boolean) => React.ReactElement<any>;
}

export interface IMediaSensorState {
  matches: boolean;
}

export class MediaSensor extends Component<IMediaSensorProps, IMediaSensorState> {
  mql: MediaQueryList;

  state: IMediaSensorState = {
    matches: false
  };

  constructor (props, context) {
    super(props, context);

    this.updateQuery();
  }

  componentDidMount () {
    this.updateQuery();
  }

  onMediaChange = (mediaQueryList) => {
    this.setState({
      matches: !!mediaQueryList.matches
    });
  };

  updateQuery () {
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
