<template>
    <div>
        <router-view :socket="socket"/>
    </div>
</template>

<script>

import io from 'socket.io-client'
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'Main',
  data () {
    return {
      socket: io('http://localhost:4000')
    }
  },
  methods: {
    ...mapMutations({
      setListFriends: 'auth/setListFriend'
    }),
    setupLoging () {
      this.socket.emit('setupLogin', { id: this.getIdUser, token: localStorage.getItem('token') }, result => {
        console.log(result)
        if (result.error) {
          alert(result.msg)
        } else {
          this.setListFriends(result.listUser)
        }
      })
    }
  },
  computed: {
    ...mapGetters({
      getIdUser: 'auth/getIdUser',
      getListFriend: 'auth/getListFriend'
    })
  },
  mounted () {
    this.setupLoging()
    this.socket.on('test', (data) => {
      console.log(data)
    })
  },
  destroyed () {
    this.socket.disconnect()
  }
}
</script>

<style lang="scss" scoped>

</style>
