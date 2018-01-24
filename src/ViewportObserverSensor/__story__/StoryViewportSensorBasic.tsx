import {h} from '../../util';

const StoryViewportSensorBasic = ({sensor: Sensor, onChange}) => {
  return (
    <div>
      <div style={{
        width: 300,
        height: 1e3,
        border: '1px solid tomato'
      }} />

      <Sensor threshold={1} onChange={onChange}>{(state) =>
        <pre>{JSON.stringify(state, null, 4)}</pre>
      }</Sensor>

      <div style={{
        width: 300,
        height: 1e3,
        border: '1px solid tomato'
      }} />
    </div>
  );
};

export default StoryViewportSensorBasic;
