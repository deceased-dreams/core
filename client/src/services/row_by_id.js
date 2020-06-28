import axios from './axios';

export default async function rows (id) {
  const resp = await axios.get(`/api/data/${id}`);
  return resp.data;
}