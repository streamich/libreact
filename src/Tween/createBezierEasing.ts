const precision = 1e-3;
const maxIterations = 5;

const createBezierEasing = (x1, y1, x2, y2) => {
  const Cx = 3 * x1;
  const Bx = 3 * (x2 - x1) - Cx;
  const Bx2 = Bx * 2;
  const Ax = 1 - Cx - Bx;
  const Ax3 = Ax * 3;
  const Cy = 3 * y1;
  const By = 3 * (y2 - y1) - Cy;
  const Ay = 1 - Cy - By;

  return (t) => {
      let x = t;
      let i = 0;
      let z;

      // Newton's root finding algorithm.
      for (; i < maxIterations; i++) {
          z = x * (Cx + x * (Bx + x * Ax)) - t;
          if (Math.abs(z) < precision) {
            break;
          }
          x = x - z / (Cx + x * (Bx2 + x * Ax3));
      }

      return x * (Cy + x * (By + x * Ay));
  };
};

export default createBezierEasing;
