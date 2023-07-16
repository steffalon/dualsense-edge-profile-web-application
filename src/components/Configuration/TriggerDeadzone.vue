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
    <p>Min:</p><input type="range" :value="leftTrigger.getMin()" @change="e => leftTrigger.setMin(e.target.value)" min="0" max="255">
    <p>Max:</p><input type="range" :value="leftTrigger.getMax()" @change="e => leftTrigger.setMax(e.target.value)" min="0" max="255">
  </section>
  <section>
    <h3>Right trigger</h3>
    <p>Min:</p><input type="range" :value="rightTrigger.getMin()" @change="e => rightTrigger.setMin(e.target.value)" min="0" max="255">
    <p>Max:</p><input type="range" :value="rightTrigger.getMax()" @change="e => rightTrigger.setMax(e.target.value)" min="0" max="255">
  </section>
</template>