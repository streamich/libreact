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

  onMediaChange = (mediaQueryList) => {
    this.setState({
      matches: !!mediaQueryList.matches
    });
  };

  updateQuery () {
    const {query} = this.props;

    this.mql = window.matchMedia(query);
    this.mql.addListener(this.onMediaChange);
  }

  render () {
    const {children} = this.props;
    const {matches} = this.state;

    return children(matches);
  }
}
