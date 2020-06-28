import axios from './axios';

export default async function rows (item) {
  const resp = await axios.post('/api/data', item);
  return resp.data;
}