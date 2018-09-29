export type GoogleAPI = any;

let gapiCache: GoogleAPI;

export const getGapi = async (): Promise<GoogleAPI> => {
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

export const getGapiAuth2 = async (): Promise<any> => {
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

let GoogleAuthCache;

export const getGapiAuthInstance = async (client_id: string) => {
    if (GoogleAuthCache) {
        return GoogleAuthCache;
    }

    const gapiAuth2 = await getGapiAuth2();

    GoogleAuthCache = await gapiAuth2.init({client_id});

    return GoogleAuthCache;
};
