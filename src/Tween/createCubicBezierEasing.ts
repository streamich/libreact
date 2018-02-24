const createCubicBezierEasing = (x1, y1, x2, y2, p, i) => {
  const
    precision = p ? p : 1e-3,
    maxIterations = i ? i : 5,
    Cx = 3 * x1,
    Bx = 3 * (x2 - x1) - Cx,
    Bx2 = Bx * 2,
    Ax = 1 - Cx - Bx,
    Ax3 = Ax * 3,
    Cy = 3 * y1,
    By = 3 * (y2 - y1) - Cy,
    Ay = 1 - Cy - By;

  return (t) => {
      let x = t, i = 0, z;

      // Newton's root finding algorithm.
      for (; i < maxIterations; i++) {
          z = x * (Cx + x * (Bx + x * Ax)) - t;
          if (Math.abs(z) < precision) break;
          x = x - z / (Cx + x * (Bx2 + x * Ax3));
      }

      return x * (Cy + x * (By + x * Ay));
  }
};

export default createCubicBezierEasing;
