import axios from 'axios'

// create a new axios instance
const instance = axios.create({
  baseURL: 'http://physiks.local/api/frontend/'
})

if (localStorage.getItem('user.token')) {
  instance.defaults.headers.common['Content-Type'] = 'application/json'
  instance.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('user.token')
}

export default instance
