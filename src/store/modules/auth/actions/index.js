import axios from 'axios'
import router from '../../../../router/index'
export default {
  authLogin ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios.post(`${process.env.VUE_APP_BASE_URL}/api/v1/users/login`, payload)
        .then((res) => {
          console.log(res)
          commit('setUserLogin', res.data.result)
          router.push({ name: 'Room' })
          resolve(res.data.result)
        })
        .catch((err) => {
          reject(err)
        })
    })
  },
  interceptorsResponse (context) {
    axios.interceptors.response.use(function (response) {
      return response
    }, function (error) {
      console.log(error.response.data.result.message)
      if (error.response.status === 401) {
        console.log(error.response)
        if (error.response.data.result.message === 'invalid token') {
          context.commit('setToken', null)
          localStorage.removeItem('token')
          router.push('/login')
          alert('maaf anda tidak boleh merubah token dengan sendirinya')
        } else if (error.response.data.result.message === 'token expired') {
          context.commit('setToken', null)
          localStorage.removeItem('token')
          router.push('/login')
          alert('maaf session habis silahkan login kembali')
        }
      }
      return Promise.reject(error)
    })
  },
  interceptorsRequest (context) {
    axios.interceptors.request.use(function (config) {
      // Do something before request is sent
      config.headers.Authorization = `Bearer ${context.state.token}`
      return config
    }, function (error) {
      // Do something with request error
      return Promise.reject(error)
    })
  }
}
