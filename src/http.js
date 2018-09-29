import axios from 'axios'

// create a new axios instance
const instance = axios.create({
  baseURL: 'http://physiks.local/api/frontend/'
})

export default instance
