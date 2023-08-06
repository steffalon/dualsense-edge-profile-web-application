<script setup lang="ts">
import Profile from "../../model/Profile";

defineProps({
  profile: {
    type: Profile,
    required: true,
  }
});
defineEmits([
  'selected-profile'
]);

</script>
<template>
  <section class="item" @click="$emit('selected-profile', profile)">
    <p>{{ profile.getLabel() }}</p>
    <slot/>
  </section>
</template>

<style scoped>
.item {
  display: flex;
  justify-content: space-between;
  padding: 0 12px;
  cursor: pointer;
}

.item:hover {
  background-color: #80aac9;
}

p {
  padding: 0;
}
</style>