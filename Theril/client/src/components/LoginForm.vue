<template>
  <div>
    <form class="flex flex-col" @submit="login">
      <input
        class="w-1/2 mx-auto border bg-gray-200 focus:outline-none"
        type="text"
        v-model="nameInput"
        :placeholder="nameInput"
      />
      <br />
      <input class="px-2 py-1 bg-gray-300 font-bold" type="submit" value="Login" />
    </form>
  </div>
</template>

<script>
import socket from '../config/socket.js'
export default {
      name: 'LoginForm',
      data: function () {
            return {
                  nameInput: ''
            }
      },
      methods: {
        login (event) {
          event.preventDefault();
          socket.emit('submit-username',this.nameInput)
          localStorage.setItem('theril-username',this.nameInput)
          this.nameInput = ''
          this.$router.push({name: 'Lobby'})
        }
      }
}
</script>

<style>
</style>