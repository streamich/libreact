export type TRouteMatchResult = RegExpMatchArray | string[];

export type TRouteMatcher = (route: string) => TRouteMatchResult;

export default function createMatcher (match: string | RegExp | TRouteMatcher, exact?: boolean): TRouteMatcher {
  if (typeof match === 'function') {
    return match;
  }

  let regex = typeof match === 'string'
    ? new RegExp(`^(${match}${exact ? '$' : ''})`)
    : match;

  return (route: string) => route.match(regex);
}
