import axios from './axios';

export default async function rows (id, item) {
  await axios.put(`/api/data/${id}`, item);
}
