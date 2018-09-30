import {h} from '../util';
import {Component, createContext} from 'react';
import {getGapiAuthInstance} from './gapi';

export interface IGoogleAuthProviderProps {
  children;
}

export interface IGoogleAuthProviderState {
  loading?: boolean;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
  user: any | null;
}

export interface IGoogleAuthConsumerProps {
  children: (state: IGoogleAuthProviderState) => React.ReactNode;
}

export const createGoogleAuthContext = (clientId: string) => {
  const context = createContext({});

  let googleAuth;
  const getAuthInstance = async () => {
    if (!googleAuth) {
      googleAuth = await getGapiAuthInstance(clientId);
    }

    return googleAuth;
  };

  class Provider extends Component<IGoogleAuthProviderProps, IGoogleAuthProviderState> {
    state: IGoogleAuthProviderState = {
      signIn: async () => {
        const googleAuth = await getAuthInstance();
        await googleAuth.signIn();
      },
      signOut: async () => {
        const googleAuth = await getAuthInstance();
        await googleAuth.signOut();
      },
      user: null,
    };

    render () {
      return h(context.Provider, {value: this.state}, this.props.children);
    }
  }

  return {
    Provider,
    Consumer: context.Consumer as React.SFC<IGoogleAuthConsumerProps>,
  };
};
