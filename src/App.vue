<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style scoped>
* {
  display: flex;
}
#app {
  flex: 1;
}
</style>
