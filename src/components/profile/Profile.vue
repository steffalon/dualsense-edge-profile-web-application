<script setup lang="ts">
import Profile from "../../model/Profile";
import {ProfileButtonSelector} from "../../enum/ProfileButtonSelector";

defineProps({
  profile: Profile
});
defineEmits([
  'selected-profile'
]);


const getProfileButtonSelector = (profileButtonSelector: ProfileButtonSelector) => {
  switch (profileButtonSelector) {
    case ProfileButtonSelector.FN_CIRCLE:
      return "FN + CIRCLE";
    case ProfileButtonSelector.FN_CROSS:
      return "FN + CROSS";
    case ProfileButtonSelector.FN_SQUARE:
      return "FN + SQUARE";
    case ProfileButtonSelector.FN_TRIANGLE:
      return "FN + TRIANGLE";
    case ProfileButtonSelector.UNASSIGNED:
      return "UNASSIGNED";
    default:
      return "UNKNOWN";
  }
}

</script>
<template>
  <section class="item" @click="$emit('selected-profile', profile)">
    <p>{{ profile.getLabel() }}</p>
    <p>{{ getProfileButtonSelector(profile.getProfileButtonSelector()) }}</p>
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