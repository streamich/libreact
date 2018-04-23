import {Parallax} from '..';
import {h} from '../../util';

const StoryParallax1 = () => {
  return (
    <div>
      <div style={{
        width: 300,
        height: 1e3,
        border: '1px solid tomato'
      }} />

      <Parallax onChange={(data) => console.log(data)}>{(state) =>
        <pre style={{marginTop: state.value * 300, border: '1px solid black', height: 300}}>{JSON.stringify(state, null, 4)}</pre>
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
