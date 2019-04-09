import Api from '@/services/Api'

export default {
  users () {
    return Api().get('/users')
  },
  getUser (id) {
    return Api().get(`/user/${id}`)
  },
  store (user) {
    return Api().post('/user/store', user)
  },
  update (id, user) {
    return Api().put(`/user/${id}/update`, user)
  },
  delete (id) {
    return Api().delete(`/user/${id}/delete`)
  }
}
