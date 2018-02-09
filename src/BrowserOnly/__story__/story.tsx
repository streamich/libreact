import {Component, createElement as h} from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {linkTo} from '@storybook/addon-links';
import {BrowserOnly} from '..';
import ShowDocs from '../../../.storybook/ShowDocs'

storiesOf('Boundaries/BrowserOnly', module)
  .add('Documentation', () => h(ShowDocs, {md: require('../../../docs/en/BrowserOnly.md')}))
  .add('Basic example', () =>
    <BrowserOnly>
      <div>
        This should be visible only in a browser.
      </div>
    </BrowserOnly>
  );
