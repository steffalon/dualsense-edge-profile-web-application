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
    <p class="label">{{ profile.getLabel() }}</p>
    <div>
      <slot/>
    </div>
  </section>
</template>

<style scoped>
.item {
  display: flex;
  justify-content: space-between;
  padding: 0 12px;
  cursor: pointer;
  align-items: center;
}

.item:hover {
  background-color: #80aac9;
}

p {
  padding: 0;
}

.label {
  font-weight: 600;
}

@media (prefers-color-scheme: dark) {
  .item {
    color: #fffffe;
  }
  .item:hover {
    background-color: rgba(147, 97, 97, 0.34);
  }
}
</style>