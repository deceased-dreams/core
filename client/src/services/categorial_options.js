export default function (crit) {
  if (!crit || crit.kind != 'categorial') {
    throw new Error('criteria invalid');
  }

  if (!crit.options) {
    throw new Error('options invalid');
  }
}