<template>
    <div>
        <form @submit.prevent="handleLogin">
  <div class="form-group">
    <label for="exampleInputEmail1">Email address</label>
    <input type="email" v-model="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
    <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
  </div>
  <div class="form-group">
    <label for="exampleInputPassword1">Password</label>
    <input type="password" v-model="password" class="form-control" id="exampleInputPassword1">
  </div>
  <button type="submit" class="btn btn-primary">Submit</button>
</form>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'Login',
  data: () => ({
    email: '',
    password: ''
  }),
  methods: {
    ...mapActions({ authLogin: 'auth/authLogin' }
    ),
    handleLogin () {
      this.authLogin({
        email: this.email,
        password: this.password
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
