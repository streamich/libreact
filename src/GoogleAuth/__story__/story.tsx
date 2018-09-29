import {createElement as h} from 'react';
import {storiesOf} from '@storybook/react';
import {GoogleAuthButton} from '..';
// import ShowDocs from '../../../.storybook/ShowDocs'

const clientId = '305188012168-htfit0k0u4vegn0f6hn10rcqoj1m77ca.apps.googleusercontent.com';

storiesOf('Context/GoogleAuthButton', module)
  // .add('Documentation', () => h(ShowDocs, {md: require('../../../docs/en/GoogleAuthButton.md')}))
  .add('Default', () =>
    <GoogleAuthButton clientId={clientId}>{(state) =>
      <button>Sign in with Google!</button>
    }</GoogleAuthButton>
  );
