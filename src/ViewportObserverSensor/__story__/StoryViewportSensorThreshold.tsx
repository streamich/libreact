import {h} from '../../util';

const StoryViewportSensorThreshold = ({sensor: Sensor, onChange, threshold}) => {
  return (
    <div>
      <div style={{
        width: 300,
        height: 1e3,
        border: '1px solid tomato'
      }} />

      <Sensor threshold={threshold} onChange={onChange}>{(state) =>
        <div style={{
          width: 300,
          height: 300,
          border: '1px solid tomato',
          background: state.visible ? 'tomato' : 'white',
          margin: '30px 0'
        }}>
          <pre>{JSON.stringify(state, null, 4)}</pre>
        </div>
      }</Sensor>

      <div style={{
        width: 300,
        height: 1e3,
        border: '1px solid tomato'
      }} />
    </div>
  );
};

export default StoryViewportSensorThreshold;
