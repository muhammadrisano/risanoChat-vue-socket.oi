<template>
    <div class="container-fluid">
        <h3>halaman Room</h3>
        <div class="row">
            <div class="col-md-4">
                <ul class="list-unstyled">
  <li class="media" v-for="friend in getListFriend" :key="friend.id" @click="handleSelectUser(Number(friend.senderId) !== Number(getIdUser) ? friend.senderId : friend.receiverId)">
    <img src="#" class="mr-3" alt="#">
    <div class="media-body">
      <h5 class="mt-0 mb-1">{{Number(friend.senderId) !== Number(getIdUser) ? friend.senderUser : friend.reciverUser}}</h5>
      <p>{{friend.messageBody}}</p>
    </div>
  </li>
</ul>
            </div>
            <div class="col-md-8">
                <div class="container-msg">
                     <ul class="list-group list-group-flush">
                    <li class="list-group-item" v-for="message in messages" :key="message.id">{{message.messageBody}}</li>
                </ul>
                </div>
                 <InputMessage v-show="userSelected" @input-message="handleSendMessage"/>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import InputMessage from '../../../components/module/InputMessage'

export default {
  name: 'Room',
  props: ['socket'],
  components: {
    InputMessage
  },
  data: () => ({
    messages: [],
    userSelected: null
  }),
  methods: {
    ...mapMutations({
      handleSendMsgFriend: 'auth/handleSendMsgFriend',
      handleReciverMsgFriend: 'auth/handleReciverMsgFriend'
    }),
    handleSelectUser (user) {
      this.userSelected = user
      this.socket.emit('getMessagePrivate', user, (data) => {
        if (!data.error) {
          this.messages = data.messages
        }
      })
    },
    handleSendMessage ({ msg, dom }) {
      this.socket.emit('sendMessage', { messageBody: msg, senderId: this.getIdUser, receiverId: this.userSelected }, (msg) => {
        dom.focus()
        dom.value = ''
        this.messages.push(msg)
        this.handleSendMsgFriend(msg)
      })
    }
  },
  computed: {
    ...mapGetters({
      getListFriend: 'auth/getListFriend',
      getIdUser: 'auth/getIdUser'
    })
  },
  mounted () {
    this.socket.on('receiverMsg', msg => {
      console.log(msg)
      if (this.userSelected === msg.senderId) {
        this.messages.push(msg)
      }
      this.handleReciverMsgFriend(msg)
    })
  }
}
</script>

<style lang="scss" scoped>
ul li.media{
        cursor: pointer;
    }
    .container-msg{
        height: calc(100vh - 150px);
        overflow: auto;
        margin-bottom: 30px;
    }
</style>
