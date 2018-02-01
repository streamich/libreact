import {Component} from 'react';
import {h} from '../../util';
import {ExitSensor} from '..';

const Rectangle = ({exiting}: any) => {
  return (
    <div style={{
      width: 200,
      height: 200,
      background: 'tomato',
      transition: 'all 0.5s',
      opacity: exiting ? 0 : 1
    }} />
  );
};

const Circle = ({exiting}: any) => {
  return (
    <div style={{
      width: 200,
      height: 200,
      background: 'tomato',
      borderRadius: '100px',
      transition: 'all 0.5s',
      opacity: exiting ? 0 : 1
    }} />
  );
};

export class StoryExitSensorExample extends Component<any, any> {
  state = {
    shape: 'rectangle'
  };

  render () {
    const shape = this.state.shape === 'rectangle' ?
      <Rectangle key='rectangle' /> : <Circle key='circle' />;

    return (
      <div>
        <ExitSensor time={500}>
          {shape}
        </ExitSensor>
        <button onClick={() => this.setState({shape: 'rectangle'})}>Rectangle</button>
        <button onClick={() => this.setState({shape: 'circle'})}>Circle</button>
      </div>
    );
  }
}
