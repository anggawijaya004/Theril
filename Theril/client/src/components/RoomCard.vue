<template>
  <div>
    <div class="w-1/3 border">
      <h2 class="text-gray-900 text-xl">{{room.name}}</h2>
      <button @click="joinRoom">JOIN ROOM</button>
    </div>
  </div>
</template>

<script>
export default {
      name:'RoomCard',
      props:['room'],
      methods: {
            joinRoom() {
                  this.$store.commit('JOIN_ROOM',this.room.name)
                  this.$router.push(`/room/${this.room.name}`)
            }
      }
}
</script>

<style>
</style>