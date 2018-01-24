import {h} from '../../util';

const StoryViewportSensorHorizontal = ({sensor: Sensor, onChange}) => {
  return (
    <div style={{
      width: 1500,
      height: 500,
      border: '1px solid tomato'
    }}>
      <div style={{
        margin: '0 0 0 800px',
        border: '1px solid tomato',
        width: 200
      }}>
        <Sensor threshold={1} onChange={onChange}>{(state) =>
          <pre>{JSON.stringify(state, null, 4)}</pre>
        }</Sensor>
      </div>
    </div>
  );
};

export default StoryViewportSensorHorizontal;
