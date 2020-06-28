import axios from './axios';

export default async function rows ({ skip, take, keyword }) {
  const resp = await axios.get('/api/data', {
    params: {
      skip,
      take,
      keyword
    }
  });
  return resp.data;
}