import axios from './axios';
import global_numeric_bound from './global_numeric_bound';

export default async function all_criteria () {
  const resp = await axios.get('/api/criteria');
  return resp.data.map(c => {
    if (c.kind == 'numeric') {
      return { ...c, ...global_numeric_bound(c)}
    }
    return c
  });
}
