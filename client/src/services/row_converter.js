import in_bound from './in_bound';

export default function create_row_converter (criteria) {
  return function (row) {
    let result = {};
    criteria.forEach(c => {
      if (c.kind == 'numeric') {
        const r = c.ranges.find(r => in_bound(r, row[c.key]))
        if (!r) {
          throw new Error(`unknown range for value: ${row[c.key]}`);
        }
        result[c.key] = r.value;
      } else if (c.kind == 'categorial') {
        result[c.key] = row[c.key]
      } else {
        throw new Error(`unknown criteria type: ${c.kind}`);
      }
    })
    return result;
  }
}