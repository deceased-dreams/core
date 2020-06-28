import BaseCriteria from './base_criteria';

export type Option = {
  value: string;
  label: string;
}

export default interface CategorialCriteria extends BaseCriteria {
  kind: 'categorial';
  options: Option[];
}
