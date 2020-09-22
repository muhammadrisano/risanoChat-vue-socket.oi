export default {
  setUserLogin (state, payload) {
    state.user = payload
    state.token = payload.token
    localStorage.setItem('token', payload.token)
    localStorage.setItem('id', payload.id)
  },
  setListFriend (state, payload) {
    state.listFriends = payload
  },
  handleSendMsgFriend (state, msg) {
    const indexFriend = state.listFriends.findIndex(item => item.receiverId === msg.receiverId || item.senderId === msg.receiverId)
    const listFriends = state.listFriends.splice(indexFriend, 1)[0]

    // console.log(listFriends)
    state.listFriends.unshift({ ...listFriends, ...msg })
  },
  handleReciverMsgFriend (state, msg) {
    const indexFriend = state.listFriends.findIndex(item => item.receiverId === msg.senderId || item.senderId === msg.senderId)
    const listFriends = state.listFriends.splice(indexFriend, 1)[0]

    // console.log(listFriends)
    state.listFriends.unshift({ ...listFriends, ...msg })
  }
}
