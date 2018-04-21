import {Parallax} from '..';
import {h} from '../../util';

const StoryParallax1 = ({onChange}) => {
  return (
    <div>
      <div style={{
        width: 300,
        height: 1e3,
        border: '1px solid tomato'
      }} />

      <Parallax onChange={onChange}>{(state) =>
        <pre>{JSON.stringify(state, null, 4)}</pre>
      }</Parallax>

      <div style={{
        width: 300,
        height: 1e3,
        border: '1px solid tomato'
      }} />
    </div>
  );
};

export default StoryParallax1;
