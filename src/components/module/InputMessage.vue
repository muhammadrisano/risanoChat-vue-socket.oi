<template>
<div class="input-group mb-3">
  <input type="text" class="form-control" ref="inputMsg" v-model="inputMsg" @keyup.enter="handleMessage" placeholder="Recipient's username" aria-label="Recipient's username" aria-describedby="button-addon2">
  <div class="input-group-append">
    <button class="btn btn-outline-secondary" @click="handleMessage" type="button" id="button-addon2">Button</button>
  </div>
</div>
</template>

<script>
export default {
  name: 'InputMessage',
  data: () => ({
    inputMsg: ''
  }),
  methods: {
    handleMessage () {
      this.$emit('input-message', { msg: this.inputMsg, dom: this.$refs.inputMsg })
    }
  }
}
</script>

<style scoped>

</style>
