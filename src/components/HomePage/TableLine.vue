<template>
  <section id="TableLine">
    <section
      class="container"
      :style="{
        backgroundColor: 'silver',
        borderTopWidth: item.id === 1 ? '.1rem' : 0,
        flex: 1
      }"
    >
      <span
        ><b>{{ item.lesson }}</b></span
      >
    </section>

    <section
      class="container"
      :style="{
        backgroundColor: '#fff',
        borderLeftWidth: 0,
        borderTopWidth: item.id === 1 ? '.1rem' : 0,
        flex: 3
      }"
    >
      <span>{{ item.content }}</span>
    </section>
  </section>
</template>

<script>
export default {
  props: ["item"]
};
</script>

<style scoped>
* {
  display: flex;
}
.container {
  align-items: center;
  border: 0.1rem solid gray;
  height: 2rem;
  padding: 1rem;
}
</style>
