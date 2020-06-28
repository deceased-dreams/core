import axios from './axios';

export default async function all_criteria () {
  const resp = await axios.get('/api/criteria');
  return resp.data;
}
