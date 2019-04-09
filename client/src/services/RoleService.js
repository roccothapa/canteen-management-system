import Api from '@/services/Api'

export default {
  roles () {
    return Api().get('/roles')
  }
}
