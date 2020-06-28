import S from 'fluent-schema'

const RangeSchema = S.object()
  .prop('min', S.number())
  .prop('max', S.number())
  .prop('lower_bound', S.enum(['<', '<=']))
  .prop('upper_bound', S.enum(['<', '<=']))
  .prop('value', S.number().required())

export const NumericCriteriaSchema = S.object()
  .prop('kind', S.enum(['numeric']).required())
  .prop('label', S.string().required())
  .prop('key', S.string().required())
  .prop('ranges', S.array().items(RangeSchema).required().minItems(2));

const OptionSchema = S.object()
  .prop('label', S.string().required())
  .prop('value', S.string().required())

export const CategorialCriteriaSchema = S.object()
  .prop('kind', S.enum(['categorial']).required())
  .prop('label', S.string().required())
  .prop('key', S.string().required())
  .prop('options', S.array().items(OptionSchema).minItems(2));

export const CriteriaSchema = S.object()
  .anyOf([
    CategorialCriteriaSchema,
    NumericCriteriaSchema
  ])
