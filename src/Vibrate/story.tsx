import {Component, createElement as h} from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {linkTo} from '@storybook/addon-links';
import {Vibrate} from '.';
import ShowDocs from '../../.storybook/ShowDocs'

storiesOf('Generators/Vibrate', module)
  .add('Documentation', () => h(ShowDocs, {name: 'SizeSensor'}))
  .add('One beep', () =>
    <div>
      <Vibrate ms={200} />
      <pre style={{fontFamily: 'monospace'}}>
        {'<Vibrate ms={200} />'}
      </pre>
    </div>
  )
  .add('Sequence', () =>
    <div>
      <Vibrate ms={[100, 100, 100, 100, 100]} />
      <pre style={{fontFamily: 'monospace'}}>
        {'<Vibrate ms={[100, 100, 100, 100, 100]} />'}
      </pre>
    </div>
  );
