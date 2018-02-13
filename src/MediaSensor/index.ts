import {Component} from 'react';
import {isClient} from '../util';
import faccToHoc from '../util/faccToHoc';
import renderProp from '../util/renderProp';

export interface IMediaSensorProps {
  matches?: boolean;
  query: string;
  children?: React.ReactElement<any> | ((match: boolean) => React.ReactElement<any>);
  render?: React.ReactElement<any> | ((match: boolean) => React.ReactElement<any>);
  comp?: React.StatelessComponent<IMediaSensorState> | React.ComponentClass<IMediaSensorState>;
  component?: React.StatelessComponent<IMediaSensorState> | React.ComponentClass<IMediaSensorState>;
}

export interface IMediaSensorState {
  matches: boolean;
}

export class MediaSensor extends Component<IMediaSensorProps, IMediaSensorState> {
  mql: MediaQueryList;
  state: IMediaSensorState;

  constructor (props, context) {
    super(props, context);

    if (isClient) {
      this.updateQuery();
      this.state = {
        matches: !!this.mql.matches
      };
    } else {
      this.state = {
        matches: props.matches || false
      };
    }
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
    this.removeListener();

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
    return renderProp(this.props, this.state);
  }
}

export const withMedia = faccToHoc(MediaSensor, 'media');
