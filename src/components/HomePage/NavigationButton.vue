<template>
  <section id="NavigationButton">
    <img :src="icon.path" height="32" width="32" alt="home" />
    <span class="title">{{ icon.title }}</span>
  </section>
</template>

<script>
export default { props: ["icon"] };
</script>

<style scoped>
* {
  display: flex;
}
#NavigationButton {
  align-items: center;
  flex-direction: column;
}
.title {
  color: #fff;
  font-size: 14px;
  margin-top: 0.5rem;
}
</style>
