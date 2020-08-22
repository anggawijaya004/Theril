<template>
  <div class="height-full h-screen flex flex-col border">
    <div class="w-full">
      <h1 class="text-xl">CHAT</h1>
      <p class="font-normal align-left" v-for="(message,index) in allMessages" :key="index">
        <span class="font-bold">({{message.username}}):</span>
        {{message.text}}
      </p>
    </div>
    <div class="w-full">
      <form class="flex" @submit="sendMessage">
        <input
          class="w-11/12 border bg-gray-200 focus:outline-none"
          type="text"
          v-model="messageInput"
          :placeholder="messageInput"
        />
        <input class="px-2 py-1 bg-gray-300 font-bold" type="submit" value="Send" />
      </form>
    </div>
  </div>
</template>

<script>
import socket from '../config/socket.js'


export default {
      name: 'ChatMenu',
      data: function() {
            return {
                  user: {
                        id: '',
                        username: ''
                  },
                  messageInput: '',
                  allMessages: []
            }
      },
      props: ['username','id'],
      methods: {
            sendMessage: function (event) {
                  event.preventDefault();
                  const payload= {
                        username: this.username,
                        message: this.messageInput
                  }
                  socket.emit('sendMessage', payload)
            }
      },
      created: function () {
            socket.on('recieve', (message) => {
                  this.allMessages.push(message);
                  this.messageInput = '';
            })
      }
}
</script>

<style>
.height-full {
  min-height: 100vh;
}
</style>