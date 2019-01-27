import {h} from '../../util';

const StoryViewportSensorConf = ({sensor: Sensor, onChange, threshold, margin=[0, 0, 0, 0]}) => {
  return (
    <div>
      <div style={{
        width: 300,
        height: 1e3,
        border: '1px solid tomato'
      }} />

      <Sensor
        threshold={threshold}
        margin={margin}
        onChange={onChange}
        poll={0}
      >{(state) =>
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

export default StoryViewportSensorConf;
