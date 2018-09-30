import {createElement as h} from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {Slider} from '..';
import ShowDocs from '../../ShowDocs';

storiesOf('UI/Slider', module)
  .add('Documentation', () => h(ShowDocs, {md: require('../../../docs/en/Slider.md')}))
  .add('Example', () =>
    <Slider
      onScrub={action('onScrub')}
      onScrubStart={action('onScrubStart')}
      onScrubStop={action('onScrubStop')}
    >{(state) =>
      <div style={{
        width: 800,
        height: 80,
        border: '1px solid tomato'
      }}>
        <pre style={{fontFamily: 'monospace'}}>
          {JSON.stringify(state, null, 4)}
        </pre>
      </div>
    }</Slider>
  )
  .add('Vertical', () =>
    <Slider
      onScrub={action('onScrub')}
      onScrubStart={action('onScrubStart')}
      onScrubStop={action('onScrubStop')}
      vertical={true}
      render={() => (
        <div style={{
          width: 15,
          height: 200,
          border: '1px solid tomato'
        }} />
      )}
    />
  )
  .add('Disabled', () =>
    <Slider
      disabled
      onScrub={action('onScrub')}
      onScrubStart={action('onScrubStart')}
      onScrubStop={action('onScrubStop')}
      vertical={true}
      render={() => (
        <div style={{
          width: 15,
          height: 200,
          border: '1px solid tomato'
        }} />
      )}
    />
  )
  .add('Simple children', () =>
    <Slider
      onScrub={action('onScrub')}
      onScrubStart={action('onScrubStart')}
      onScrubStop={action('onScrubStop')}
      vertical={true}
    >
      <div style={{
        width: 15,
        height: 200,
        border: '1px solid tomato'
      }} />
    </Slider>
  )
  .add('Reverse vertical', () =>
    <Slider
      onScrub={action('onScrub')}
      onScrubStart={action('onScrubStart')}
      onScrubStop={action('onScrubStop')}
      vertical={true}
      reverse
    >
      <div style={{
        width: 15,
        height: 200,
        border: '1px solid tomato'
      }} />
    </Slider>
  )
  .add('Reverse horizontal', () =>
    <Slider
      onScrub={action('onScrub')}
      onScrubStart={action('onScrubStart')}
      onScrubStop={action('onScrubStop')}
      reverse
    >
      <div style={{
        width: 200,
        height: 15,
        border: '1px solid tomato'
      }} />
    </Slider>
  )
  .add('Default position', () =>
    <Slider
      value={0.25}
      onScrub={action('onScrub')}
      onScrubStart={action('onScrubStart')}
      onScrubStop={action('onScrubStop')}
      reverse
    >{({value}) =>
      <div style={{
        width: 200,
        height: 15,
        border: '1px solid tomato'
      }}>
        {value}
      </div>
    }</Slider>
  );
