<template>
  <div id="app">
    <GameChest />
  </div>
</template>

<script>
import GameChest from "./components/GameChest.vue";

export default {
  name: "App",
  components: {
    GameChest,
  },
};
</script>
<style lang="scss" src="../src/assets/scss/main.scss"></style>
