import Api from '@/services/Api'

export default {
  foods () {
    return Api().get('/foods')
  },
  search (query) {
    return Api().get('/foods/search', {
      params: {
        search: query
      }
    })
  },
  find (id) {
    return Api().get(`/food/${id}`)
  },
  store (food) {
    return Api().post('/food/store', food)
  },
  update (id, food) {
    return Api().put(`/food/${id}/update`, food)
  },
  delete (id) {
    return Api().delete(`/food/${id}/delete`)
  }
}
