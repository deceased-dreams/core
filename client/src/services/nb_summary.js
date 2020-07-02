import axios from './axios';

export default async function () {
  const resp = await axios.get('/api/nb/summary');
  return resp.data;
}
