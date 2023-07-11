<script setup lang="ts">
import Profile from "./Profile.vue";

import ProfileModel from "../../model/Profile";

defineProps({
  profiles: Array<ProfileModel>
});

defineEmits(['selected-profile']);

</script>

<template>
  <section class="overview">
    <section class="profiles" v-if="profiles">
      <Profile @selected-profile="(selectedProfile) => $emit('selected-profile', selectedProfile)"
               v-for="profile in profiles"
               :profile="profile"/>
    </section>
    <section class="create-new-profile">
      <button>
        + Create new profile
      </button>
    </section>
  </section>
</template>

<style scoped>
.overview {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #408EC6;
}

.create-new-profile button {
  cursor: pointer;
  width: 100%;
  height: 50px;
  border: 0;
  background-color: #c0c0c0;
}

.create-new-profile button:hover {

}

.selected {
  display: none;
}
</style>