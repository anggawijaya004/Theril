<template>
  <div class="w-full home">
    <h1>Lobby {{username}}</h1>
    <div class="flex flex-wrap">
      <RoomCard v-for="(room,idx) in rooms" :key="idx" :room="room" />
    </div>
    <form @submit="createRoom">
      <input type="text" v-model="roomInput" />
      <button type="submit">CREATE ROOM</button>
    </form>
    <ChatMenu :username="username" :id="id" />
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import socket from '../config/socket.js'
import {mapGetters} from 'vuex'
import ChatMenu from '@/components/ChatMenu.vue'
import RoomCard from '@/components/RoomCard.vue'

export default {
  name: 'Home',
  components: {
    ChatMenu,
    RoomCard
  },
  data: function () {
    return {
    roomInput: '',
    id: '',
    rooms: []
    }
  },
  methods: {
    createRoom(event) {
      event.preventDefault()
      const payload = {
        roomName:this.roomInput
      }
      socket.emit('create-room', payload)
      this.roomInput = ''
    }
  },
  computed: mapGetters(['username']),
  created : function() {
    socket.on('connect', () => {
      console.log(socket.id)
      this.id = socket.id
    console.log('Connected to server.')
    this.username = localStorage.getItem('theril-username')
  })
    socket.on('emit-username', (usernames) => {
      const user = usernames.filter(username => username.id === socket.id)
      this.$store.commit('SET_USERNAME',user[0].name)
    })
    socket.emit('get-all-room')
    socket.on('get-list-room', (data) => {
      this.rooms = data
    })

        socket.on('updated-room', (data) => {
      this.rooms = data
    })
  }
}
</script>
