import {Parallax} from '..';
import {h} from '../../util';

const Card = ({value}) => {
  return (
    <div>
      <div
        style={{
          background: 'black',
          minHeight: 400
        }}
      >
        header
      </div>
      <div>
        <div style={{
          background: 'white',
          margin: `${-40 + -40 * value}px 20px 0`,
          minHeight: '300px',
          position: 'relative',
        }}>
          content...
          <div
            style={{
              width: 64,
              height: 64,
              border: '1px solid red',
              transition: 'bottom 0.3s, left 0.3s, opacity 0.3s',
              bottom: value > .6 ? '50px' : '-70px',
              left: value > .6 ? '100px' : '-70px',
              opacity: value > .6 ? 1 : 0,
              position: 'absolute',
            }}
          >
            icon
          </div>
        </div>
      </div>
    </div>
  );
};

const StoryParallax2 = () => {
  return (
    <div>
      <div style={{
        width: 300,
        height: 1e3,
        border: '1px solid tomato'
      }} />

      <Parallax onChange={(data) => console.log('value', data.value)}>{({value}) =>
        <div>
          <Card value={value} />
        </div>
      }</Parallax>

      <div style={{
        width: 300,
        height: 1e3,
        border: '1px solid tomato'
      }} />
    </div>
  );
};

export default StoryParallax2;
