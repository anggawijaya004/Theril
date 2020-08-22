<template>
  <div>
    <h1>{{ room }}</h1>
    <button class="bg-blue-900 text-gray-100 p-2" @click="startGame">
      START GAME
    </button>
  </div>
</template>

<script>
import socket from "../config/socket.js";

export default {
  name: "Room",
  data: function() {
    return {
      room: {},
    };
  },
  created: function() {
    socket.on("room-detail", (room) => {
      this.room = room;
    });
    socket.on("gas-game", (data, game) => {
      this.$router.push(`/game/${this.data.name}`);
    })
  },
  methods: {
    startGame() {
      socket.emit("start-game", this.room);
      this.$router.push(`/game/${this.room.name}`);
    },
  },
};
</script>

<style></style>
