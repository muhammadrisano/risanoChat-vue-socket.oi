export default {
  isLogin (state) {
    return state.token || localStorage.getItem('token')
  },
  getIdUser (state) {
    return state.user.id || Number(localStorage.getItem('id'))
  },
  getListFriend (state) {
    return state.listFriends
  }
}
