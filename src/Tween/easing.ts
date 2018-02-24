export type TEasing = (time: number) => number;

export interface IEasingMap {
  linear: TEasing;
  quadratic: TEasing;
  cubic: TEasing;
  elastic: TEasing;
  circ: TEasing;
  inQuad: TEasing;
  outQuad: TEasing;
  inOutQuad: TEasing;
  inCubic: TEasing;
  outCubic: TEasing;
  inOutCubic: TEasing;
  inQuart: TEasing;
  outQuart: TEasing;
  inOutQuart: TEasing;
  inQuint: TEasing;
  outQuint: TEasing;
  inOutQuint: TEasing;
}

export const easing: IEasingMap = {
  // no easing, no acceleration
  linear: (t) => t,

  // Accelerates fast, then slows quickly towards end.
  quadratic: (t) => t * (-(t * t) * t + 4 * t * t - 6 * t + 4),

  // Overshoots over 1 and then returns to 1 towards end.
  cubic: (t) => t * (4 * t * t - 9 * t + 6),

  // Overshoots over 1 multiple times - wiggles around 1.
  elastic: (t) => t * (33 * t * t * t * t - 106 * t * t * t + 126 * t * t - 67 * t + 15),

  // Commonly known as 'easeOutCirc'. Moves VERY fast at the beginning and
  // then quickly slows down in the middle. This tween can actually be used
  // in continues transition where target value change all the time,
  // because if very quick start, it hides the jitter between target value changes.
  circ: (t) => Math.sqrt(1 - (t = t - 1) * t),

  // Accelerating from zero velocity
  inQuad: (t) => t * t,

  // Decelerating to zero velocity
  outQuad: (t) => t * (2 - t),

  // Acceleration until halfway, then deceleration
  inOutQuad: (t) => t <.5 ? 2 * t * t : -1 + (4 - 2 * t) * t,

  // Accelerating from zero velocity
  inCubic: (t) => t * t * t,

  // Decelerating to zero velocity
  outCubic: (t) => (--t) * t * t + 1,

  // Acceleration until halfway, then deceleration
  inOutCubic: (t) => t <.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,

  // Accelerating from zero velocity
  inQuart: (t) => t * t * t * t,

  // Decelerating to zero velocity
  outQuart: (t) => 1 - (--t) * t * t * t,

  // Acceleration until halfway, then deceleration
  inOutQuart: (t) => t <.5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t,

  // Accelerating from zero velocity
  inQuint: (t) => t * t * t * t * t,

  // Decelerating to zero velocity
  outQuint: (t) => 1 + (--t) * t * t * t * t,

  // Acceleration until halfway, then deceleration
  inOutQuint: (t) => t < .5 ? 16 * t * t * t * t * t : 1 + 16 * (--t) * t * t * t * t,
};
