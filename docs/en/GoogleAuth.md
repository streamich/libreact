# Google Sign-in for Websites

React wrapper for [Google Sign-In for Websites](https://developers.google.com/identity/sign-in/web/).


## Usage

First use `createGoogleAuthContext` to create your context components. You need to obtain Google
app `client_id` from [here](https://developers.google.com/identity/sign-in/web/sign-in#before_you_begin).

Then wrap your entire app with `<Provider>` component and anywhere in your app use the `<Consumer>` component.

```js
import {createGoogleAuthContext} from 'libreact/lib/GoogleAuth';

const {Provider, Conumer} = createGoogleAuthContext({
  client_id: 'xxxxxxxx-yyyyyyyyyyyyyyyy.apps.googleusercontent.com',
});

<Provider>
  <Consumer>{({loading, signIn, signOut, isSignedIn, user}) => {
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
  }}</Consumer>
</Provider>
```
