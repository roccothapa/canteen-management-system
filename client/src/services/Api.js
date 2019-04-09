import axios from 'axios'
import store from '@/store/store'
import Vue from 'vue'
import config from '../../config/app'

function errorResponseHandler (error) {
  // check for errorHandle config
  if (error.config.hasOwnProperty('errorHandle') && error.config.errorHandle === false) {
    return Promise.reject(error)
  }

  console.dir(error)
  // if has response show the error
  if (error.response) {
    switch (error.response.status) {
      case 400:
        if (Object.keys(error).length) {
          for (let err of error.response.data.error.details) {
            Vue.notify({
              group: 'foo',
              type: 'error',
              text: err.message
            })
          }
        }
        break
      case 403:
        Vue.notify({
          group: 'foo',
          type: 'error',
          text: error.response.data.error
        })
        break
      case 500:
        Vue.notify({
          group: 'foo',
          type: 'error',
          text: error
        })
        break
      default:
        Vue.notify({
          group: 'foo',
          type: 'error',
          text: error.response.data.toString()
        })
        break
    }
  }
}

export default () => {
  let axiosInstance = axios.create({
    baseURL: config.app_url,
    headers: {
      Authorization: `Bearer ${store.state.token}`
    }
  })

  axiosInstance.interceptors.response.use(
    response => response,
    errorResponseHandler
  )

  return axiosInstance
}
