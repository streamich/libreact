export interface TRouteMatchResult {
  length: number; // Length how many characters to truncate from route.
  matches?: RegExpMatchArray; // RegExp matches, if any.
}

export type TRouteMatcher = (route: string) => TRouteMatchResult;

export default function createMatcher (match: string | RegExp | TRouteMatcher, exact?: boolean): TRouteMatcher {
  if (typeof match === 'function') {
    return match;
  }

  let regex: RegExp;

  if (typeof match === 'string') {
    regex = new RegExp(`^(${match}${exact ? '$' : ''})`);
  } else {
    regex = match;
  }

  return (route: string) => {
    const matches = route.match(regex);

    if (!matches) {
      return null;
    }

    return {
      length: (matches && matches[1]) ? matches[1].length : 0,
      matches
    };
  };
}
