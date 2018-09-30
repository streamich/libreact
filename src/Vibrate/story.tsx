import {createElement as h} from 'react';
import {storiesOf} from '@storybook/react';
import {Vibrate} from '.';
import ShowDocs from '../ShowDocs'

storiesOf('Generators/Vibrate', module)
  .add('Documentation', () => h(ShowDocs, {md: require('../../docs/en/Vibrate.md')}))
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
