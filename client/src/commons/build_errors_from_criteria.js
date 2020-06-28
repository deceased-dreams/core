export default function (criteria, value) {
  return criteria.reduce((prev, curr) => {
    const v = value[curr.key];
    prev[curr.key] = (v == null || v == undefined) 
      ? `${curr.label} invalid`
      : null;
    return prev;
  }, {});
}
