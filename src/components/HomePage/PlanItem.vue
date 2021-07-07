<template>
  <section id="PlanItem">
    <section :style="{ flexDirection: 'column' }">
      <section class="time-container">
        <span>{{ item.id }}</span>

        <span :style="{ marginLeft: '.5rem' }"
          >{{ item.beginTime }} ～ [{{ item.elapsedTime }}]分
        </span>

        <span :style="{ marginLeft: '1rem' }">{{ item.icon }}</span>
      </section>

      <h4 :style="{ margin: 0 }">{{ item.title }}</h4>
    </section>

    <section :style="{ flexDirection: 'column' }">
      <div>
        <b>{{ item.overview }}</b>
      </div>

      <div :style="{ fontSize: '14px' }">{{ item.body }}</div>
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
#PlanItem {
  flex: 1;
  justify-content: space-between;
}
.time-container {
  align-items: center;
}
</style>
