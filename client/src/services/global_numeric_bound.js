export default function (crit) {
  if (!crit || crit.kind != 'numeric') {
    throw new Error('criteria invalid');
  }

  if (!crit.ranges && crit.ranges.length < 2) {
    throw new Error('ranges invalid');
  }

  let min = undefined;
  let max = undefined;
  let first = crit.ranges[0];
  let last = crit.ranges[crit.ranges.length - 1];
  if (first.min !== undefined) {
    min = first.min;
  }
  if (last.max !== undefined) {
    max = last.max;
  }

  return { min, max };
}