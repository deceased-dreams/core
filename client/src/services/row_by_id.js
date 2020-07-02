import axios from './axios';

export default async function rows (id) {
  const resp = await axios.get(`/api/data/${id}`);
  console.log(resp.data);
  return resp.data;
}