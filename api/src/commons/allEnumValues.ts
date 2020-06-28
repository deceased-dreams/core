export function allEnumValues(x: any): string[] {
  return Object.keys(x).map(k => x[k]);
}
