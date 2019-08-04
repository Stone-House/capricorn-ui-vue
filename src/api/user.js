import axios from './index'

export default {
  login(name, password) {
    return axios.post("/api/v1/users/login", {name, password})
  },

  getUserInfo() {
    return axios.post("/api/v1/users/getUserInfo")    
  },

  createuser(data) {
    return axios.post('/api/v1/users', data)
  }
}