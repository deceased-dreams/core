import axios from './axios';

export default async function rows (id) {
  await axios.delete(`/api/data/${id}`);
  return 'ok';
}