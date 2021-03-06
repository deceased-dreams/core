import BaseCriteria from './base_criteria';

export type Bound = '<' | '<=' | undefined;

export interface Range {
  min?: number;
  max?: number;
  lower_bound: Bound;
  upper_bound: Bound;
  value: number;
}

export default interface NumericCriteria extends BaseCriteria {
  kind: 'numeric';
  min: number | undefined;
  max: number | undefined;
  ranges: Range[];
}


export function in_bound (range: Range, value: number) {
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