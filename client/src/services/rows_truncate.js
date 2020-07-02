import axios from './axios';

export default async function () {
  await axios.delete('/api/data/');
}
