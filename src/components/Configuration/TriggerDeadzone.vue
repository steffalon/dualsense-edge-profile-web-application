<script setup lang="ts">
import Trigger from "../../model/Trigger.ts";

defineProps({
  leftTrigger: {
    type: Trigger,
    required: true,
  },
  rightTrigger: {
    type: Trigger,
    required: true,
  },
});
</script>
<template>
  <section>
    <h3>Left trigger</h3>
    <p>Min:</p><input type="range" :value="leftTrigger.getMin()" @change="(e: any) => leftTrigger.setMin(e.target.value)" min="0" max="255">
    <p>Max:</p><input type="range" :value="leftTrigger.getMax()" @change="(e: any) => leftTrigger.setMax(e.target.value)" min="0" max="255">
  </section>
  <section>
    <h3>Right trigger</h3>
    <p>Min:</p><input type="range" :value="rightTrigger.getMin()" @change="(e: any) => rightTrigger.setMin(e.target.value)" min="0" max="255">
    <p>Max:</p><input type="range" :value="rightTrigger.getMax()" @change="(e: any) => rightTrigger.setMax(e.target.value)" min="0" max="255">
  </section>
</template>
<style scoped>
input[type="range"] {
  width: 300px;
}
h3, p {
  color: #00473e;
}
@media (prefers-color-scheme: dark) {
  h3, p {
    color: #fffffe;
  }
}
</style>