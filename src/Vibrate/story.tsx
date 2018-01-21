import {Component, createElement as h} from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {linkTo} from '@storybook/addon-links';
import {Vibrate} from '.';

storiesOf('Generators/Vibrate', module)
  .add('single', () =>
    <div>
      <Vibrate ms={200} />
      <pre style={{fontFamily: 'monospace'}}>
        {'<Vibrate ms={200} />'}
      </pre>
    </div>
  )
  .add('sequence', () =>
    <div>
      <Vibrate ms={[100, 100, 100, 100, 100]} />
      <pre style={{fontFamily: 'monospace'}}>
        {'<Vibrate ms={[100, 100, 100, 100, 100]} />'}
      </pre>
    </div>
  );
