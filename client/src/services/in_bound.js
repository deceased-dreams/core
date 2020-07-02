export default function in_bound (range, value) {
  // Lower bound
  let lower_bound_ok = false;
  let upper_bound_ok = false;

  if (range.lower_bound !== undefined && range.min !== undefined) {
    if (range.lower_bound == '<') {
      if (range.min < value) {
        lower_bound_ok = true;
      }
    } else {
      if (range.min <= value) {
        lower_bound_ok = true;
      }
    }
  } else {
    lower_bound_ok = true;
  }

  if (range.upper_bound !== undefined && range.max !== undefined) {
    if (range.upper_bound == '<') {
      if (value < range.max) {
        upper_bound_ok = true;
      }
    } else {
      if (value <= range.max) {
        upper_bound_ok = true;
      }
    }
  } else {
    upper_bound_ok = true;
  }

  return lower_bound_ok && upper_bound_ok;
}