import {createElement as h} from 'react';
import {storiesOf} from '@storybook/react';
import {createGoogleAuthContext} from '..';
// import ShowDocs from '../../../.storybook/ShowDocs'

const clientId = '305188012168-htfit0k0u4vegn0f6hn10rcqoj1m77ca.apps.googleusercontent.com';
const ctx1 = createGoogleAuthContext(clientId);

storiesOf('Context/GoogleAuthButton', module)
  // .add('Documentation', () => h(ShowDocs, {md: require('../../../docs/en/GoogleAuthButton.md')}))
  .add('Default', () =>
    <ctx1.Provider>
      <ctx1.Consumer>{({signIn}) =>
        <button onClick={signIn}>Sign in with Google!</button>
      }</ctx1.Consumer>
    </ctx1.Provider>
  );
