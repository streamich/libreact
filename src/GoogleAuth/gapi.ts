export interface GApi {
  load(what: 'auth2', callback: () => void);
  auth2: GApiAuth2;
}

export interface GApiAuth2InitOptions {
  client_id: string;
  scope?: string;
}

export interface GApiAuth2 {
  init(options: GApiAuth2InitOptions): Promise<GApiAuth2Instance>;
}

export type GApiAuth2InstanceIsSignedInListener = (isSignedIn: boolean) => void;
export type GApiAuth2InstanceCurrentUserListener = (isSignedIn: GApiAuth2User) => void;
export interface GApiAuth2Instance {
  signIn(): Promise<GApiAuth2User>;
  signOut(): Promise<void>;
  isSignedIn: {
    get(): boolean;
    listen(listener: GApiAuth2InstanceIsSignedInListener);
  };
  currentUser: {
    get(): GApiAuth2User;
    listen(listener: GApiAuth2InstanceCurrentUserListener);
  };
}

export interface GApiAuth2User {
  getId(): string;
  isSignedIn(): boolean;
  getHostedDomain(): string;
  getGrantedScopes(): string;
  getBasicProfile(): GApiAuth2BasicProfile;
  getAuthResponse(): GApiAuth2AuthResponse;
  reloadAuthResponse(): Promise<GApiAuth2AuthResponse>;
  hasGrantedScopes(scopes: string): boolean;
}

export interface GApiAuth2BasicProfile {
  getId(): string;
  getName(): string;
  getGivenName(): string;
  getFamilyName(): string;
  getImageUrl(): string;
  getEmail(): string;
}

export interface GApiAuth2AuthResponse {
  access_token: string;
  id_token: string;
  scope: string;
  expires_in: string;
  first_issued_at: string;
  expires_at: string;
}

let gapiCache: GApi;

export const getGapi = async (): Promise<GApi> => {
  if (gapiCache) {
    return gapiCache;
  }

  await new Promise(resolve => {
    const gapicallback = `__gapicb${Date.now().toString(36)}`;
    (window as any)[gapicallback] = () => {
      delete (window as any)[gapicallback];
      gapiCache = (window as any).gapi;
      resolve();
    };

    const script = document.createElement('script');

    script.src = 'https://apis.google.com/js/platform.js?onload=' + gapicallback;
    document.head.appendChild(script);
  });

  return gapiCache;
};

let gapiAuth2Cache;

export const getGapiAuth2 = async (): Promise<GApiAuth2> => {
  if (gapiAuth2Cache) {
    return gapiAuth2Cache;
  }

  const gapi = await getGapi();

  await new Promise(resolve => {
    gapi.load('auth2', () => {
      gapiAuth2Cache = gapi.auth2;
      resolve();
    });
  });

  return gapiAuth2Cache;
};

export const getGapiAuthInstance = async (options: GApiAuth2InitOptions) => {
  const gapiAuth2 = await getGapiAuth2();
  return await gapiAuth2.init(options);
};
