<template>
  <div class="div">
    <h1>{{ pemain }}</h1>
    <h2>LKXJFLSDKJFLSDKFJLSDK;FJKL;</h2>
  </div>
</template>

<script>
import socket from "../config/socket";
export default {
  data() {
    return {
      pemain,
    };
  },
  created: () => {
    socket.on("gas-game", (data) => {
      console.log(data, "-------------------------gas ga?");
      this.pemain = data;
    });
  },
};
</script>

<style></style>
