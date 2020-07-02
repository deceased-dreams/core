import axios from 'axios'

export const BASE_URL = process.env.NODE_ENV == 'development' 
  ? 'http://localhost:3000'
  : 'https://deceased-dreams.herokuapp.com';
export default axios.create({
  baseURL: BASE_URL
})
