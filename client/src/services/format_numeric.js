import in_bound from './in_bound.js';

export default function format_numeric (criteria, value) {
  const r = criteria.ranges.find(r => in_bound(r, value));
  return r.value;
}