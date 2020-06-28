import CategorialCriteria from './categorial_criteria';
import NumericCriteria, { in_bound } from './numeric_criteria';
import { Prop } from './data'
export { Prop, Data } from './data'

export type Criteria = CategorialCriteria | NumericCriteria;

export function create_validator (criterias: Criteria[]) {
  const keys = criterias.map(c => c.key);

  return (data: any) => {
    const prop_keys = Object.keys(data);
    const all_key_exists = keys.every(k => prop_keys.includes(k));
    if (!all_key_exists) {
      return {
        message: 'some key not exists in object',
        required_keys: keys
      }
    }
    const first_error = keys.find(prop_key => {
      const criteria = criterias.find(c => c.key == prop_key);
      const value = data[prop_key];
      if (criteria.kind == 'numeric') {
        const hit_range = criteria.ranges.find(range => in_bound(range, value as number));
        if (!hit_range) {
          return { prop_key, criteria };
        }
      } else {
        const hit_option = criteria.options.find(option => option.value == value);
        if (!hit_option) {
          return { prop_key, criteria };
        }
      }
      return false;
    });
    return first_error;
  }
}

export function mock (criterias: Criteria[]) {
  return (n: number) => {

  }
}
