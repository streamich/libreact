import {createElement as h} from 'react';
import {storiesOf} from '@storybook/react';
import {BrowserOnly} from '..';
import ShowDocs from '../../ShowDocs'

storiesOf('Boundaries/BrowserOnly', module)
  .add('Documentation', () => h(ShowDocs, {md: require('../../../docs/en/BrowserOnly.md')}))
  .add('Basic example', () =>
    <BrowserOnly>
      <div>
        This should be visible only in a browser.
      </div>
    </BrowserOnly>
  );
