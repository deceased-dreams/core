export default function (obj) {
  if (!obj) {
    return false;
  }
  for (let key in obj) {
    if (obj[key] != null) return false;
  }
  return true;
}