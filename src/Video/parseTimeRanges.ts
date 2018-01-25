const parseTimeRanges = (ranges) => {
  const result = [];
  let idx;

  for (idx = 0; idx < ranges.length; idx++) {
    result.push({
      start: ranges.start(idx),
      end: ranges.end(idx)
    });
  }

  return result;
};

export default parseTimeRanges;
