import {createElement as h} from 'react';
import {storiesOf} from '@storybook/react';
import {createGoogleAuthContext} from '..';
import ShowDocs from '../../ShowDocs'

const clientId = '305188012168-htfit0k0u4vegn0f6hn10rcqoj1m77ca.apps.googleusercontent.com';
const options = {
  client_id: clientId,
};
const ctx1 = createGoogleAuthContext(options);

storiesOf('Context/GoogleAuthButton', module)
  .add('Documentation', () => h(ShowDocs, {md: require('../../../docs/en/GoogleAuth.md')}))
  .add('Default', () =>
    <ctx1.Provider>
      <ctx1.Consumer>{({loading, signIn, signOut, isSignedIn, user}) => {
        if (loading) {
          return 'Loading...';
        }
        console.log('user', user);
        return (
          <div>
            <button onClick={isSignedIn ? signOut : signIn}>
              {isSignedIn ? 'Log out' : 'Sign in with Google!'}
            </button>
            <div>Is signed in: {isSignedIn ? 'true' : 'false'}</div>
            {user &&
              <div>
                <div>Name: {user.getBasicProfile().getName()}</div>
                <div>JWT: {user.getAuthResponse().id_token}</div>
              </div>
            }
          </div>
        );
      }}</ctx1.Consumer>
    </ctx1.Provider>
  );
