import * as React from 'react';
import {h} from '../util';
import {
  getGapiAuthInstance,
  GApiAuth2InitOptions,
  GApiAuth2Instance,
  GApiAuth2InstanceIsSignedInListener,
  GApiAuth2InstanceCurrentUserListener,
  GApiAuth2User
} from './gapi';

export interface IGoogleAuthProviderProps {
  children;
}

export interface IGoogleAuthProviderState {
  loading: boolean;
  signIn: () => Promise<GApiAuth2User>;
  signOut: () => Promise<void>;
  user: GApiAuth2User | null;
  isSignedIn: boolean;
}

export interface IGoogleAuthConsumerProps {
  children: (state: IGoogleAuthProviderState) => React.ReactNode;
}

export interface IProvider extends React.Component<IGoogleAuthProviderProps, IGoogleAuthProviderState> {
}

/**
 * @param clientId Google App client ID.
 * @param scope Scopes as a comma separated string.
 */
export const createGoogleAuthContext = (options: GApiAuth2InitOptions) => {
  const context = React.createContext({});
  const googleAuthPromise = getGapiAuthInstance(options);
  let googleAuthInstance: GApiAuth2Instance | undefined;
  let isSignedInListener: GApiAuth2InstanceIsSignedInListener | undefined;
  let currentUserListener: GApiAuth2InstanceCurrentUserListener | undefined;

  googleAuthPromise.then((instance) => {
    googleAuthInstance = instance;
    googleAuthInstance.isSignedIn.listen((isSignedIn) => {
      if (isSignedInListener) isSignedInListener(isSignedIn);
    });
    googleAuthInstance.currentUser.listen((user) => {
      if (currentUserListener) currentUserListener(user);
    });
  }, console.error);

  class Provider extends React.Component<IGoogleAuthProviderProps, IGoogleAuthProviderState> implements IProvider {
    signIn = async (): Promise<GApiAuth2User> => {
      if (!googleAuthInstance) {
        googleAuthInstance = await googleAuthPromise;
      }

      return await googleAuthInstance.signIn();
    };

    signOut = async (): Promise<void> => {
      if (!googleAuthInstance) {
        googleAuthInstance = await googleAuthPromise;
      }

      await googleAuthInstance.signOut();
    };

    onIsSignedIn: GApiAuth2InstanceIsSignedInListener = (isSignedIn) => {
      if (isSignedIn) {
        // Don't do anything here, because this case will be handled by
        // this.onCurrentUser method. To prevent double re-render.
      } else {
        this.setState({
          isSignedIn: false,
          user: null,
        });
      }
    };

    onCurrentUser: GApiAuth2InstanceCurrentUserListener = (user) => {
      // Only handle the case when user signs in. The other case should
      // be handled by this.onIsSignedIn. To prevent double re-render.
      if (user.isSignedIn()) {
        this.setState({
          isSignedIn: true,
          user
        });
      }
    };

    state: IGoogleAuthProviderState = {
      loading: !googleAuthInstance,
      signIn: this.signIn,
      signOut: this.signOut,
      user: null,
      isSignedIn: false,
    };

    async componentDidMount () {
      if (!googleAuthInstance) {
        googleAuthInstance = await googleAuthPromise;
      }

      isSignedInListener = this.onIsSignedIn;
      currentUserListener = this.onCurrentUser;

      const isSignedIn = googleAuthInstance.isSignedIn.get();

      this.setState({
        loading: false,
        isSignedIn,
        user: isSignedIn ? googleAuthInstance.currentUser.get() : null,
      });
    }

    componentWillUnmount () {
      if (isSignedInListener === this.onIsSignedIn)
        isSignedInListener = undefined;
      if (currentUserListener === this.onCurrentUser)
        currentUserListener = undefined;
    }

    render () {
      return h(context.Provider, {value: this.state}, this.props.children);
    }
  }

  return {
    Provider: Provider as React.ComponentClass<IGoogleAuthProviderProps, IGoogleAuthProviderState>,
    Consumer: context.Consumer as React.SFC<IGoogleAuthConsumerProps>,
  };
};
