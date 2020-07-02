import { maxBy } from 'lodash';
import in_bound from './in_bound';

function transform_attr ({ attr, cls_count, total, smooth }) {
  return Object.keys(attr).reduce((acc, k) => {
    acc[k] = attr[k] * 1.0 / (cls_count + (smooth * total));
    return acc;
  }, {})
}

export function create_predictor ({ summary, total, smooth }) {
  console.log(summary);
  const classes = Object.keys(summary)
  const modified_summary = classes.reduce((acc, cls) => {
    let cls_summary = summary[cls]
    let { count, attributes } = cls_summary;
    let _attrs = {};
    Object.keys(attributes).forEach(attr_key => {
      const attr = attributes[attr_key];
      _attrs[attr_key] = transform_attr({ 
        attr, 
        cls_count: count, 
        total, 
        smooth 
      });
    });
    return {
      ...acc,
      [cls]: { 
        prob: count * 1.0 / total,
        attributes: _attrs 
      }
    }
  }, {});

  return function (input) {
    console.log(classes);
    return classes
      .map(c => {
        const attributes = modified_summary[c].attributes;
        const attr_keys = Object.keys(attributes);
        
        const attr_product = attr_keys
          .map(attr_key => attributes[attr_key][input[attr_key]])
          .reduce((acc, curr) => acc * curr, 1);

        return {
          cls: c,
          prob: attr_product * modified_summary[c].prob
        };
      })
      .reduce((acc, curr) => {
        console.log(curr);
        if (curr.prob > acc.prob) return curr;
        return acc;
      }, { cls: -1, prob: -1 })
  }
}
