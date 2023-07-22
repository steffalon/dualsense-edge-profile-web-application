<script setup lang="ts">
import Profile from "../model/Profile";
import {ref, watch} from "vue";
import Assignment from "./Configuration/Assignment.vue";
import StickSensitivity from "./Configuration/StickSensitivity.vue";
import TriggerDeadzone from "./Configuration/TriggerDeadzone.vue";

const props = defineProps({
  selectedProfile: Profile
});

defineEmits([
  'save'
]);

let selectedTabIndex = ref(0);

const isActive = (i: number) => {
  return {active: selectedTabIndex.value === i};
}

const changeTabIndex = (i: number) => {
  selectedTabIndex.value = i;
}

let copyProfile = ref();

const save = () => {
  copyProfile.value.setLabel(model.label);
  console.log('saving!', copyProfile.value);
  return copyProfile.value;
}

let model = {
  label: ""
}

watch(props, data => {
  copyProfile.value = data.selectedProfile;
  model.label = copyProfile.value.getLabel();
});

</script>
<template>
  <section v-if="copyProfile" class="configurator">
    <section class="configurator-top-header">
      <h1>Profile: <input v-model="model.label" type="text"></h1>
      <section>
        <button @click="$emit('save', save())">Save</button>
      </section>
    </section>
    <section class="tabs">
      <span @click="changeTabIndex(0)" :class="isActive(0)" class="tab">Button Assignments</span>
      <span @click="changeTabIndex(1)" :class="isActive(1)" class="tab">Stick Sensitivity</span>
      <span @click="changeTabIndex(2)" :class="isActive(2)" class="tab">Trigger Deadzone</span>
      <span @click="changeTabIndex(3)" :class="isActive(3)" class="tab">Other</span>
    </section>
    <section class="configuration-setting-container">
      <Assignment
          v-if="isActive(0).active"
          :buttonMappping="copyProfile.getButtonMapping()"
      />
      <StickSensitivity
          v-if="isActive(1).active"
          :left-joystick="copyProfile.getLeftJoyStick()"
          :right-joystick="copyProfile.getRightJoyStick()"
      />
      <TriggerDeadzone
          v-if="isActive(2).active"
          :right-trigger="copyProfile.getRightTrigger()"
          :left-trigger="copyProfile.getLeftTrigger()"
      />
    </section>
  </section>
</template>

<style scoped>
.configurator {
  padding: 10px 20px;
}

.tabs {
  width: 100%;
  display: flex;
  justify-content: space-evenly;
}

.tab {
  padding: 10px 14px;
  width: 100%;
  cursor: pointer;
  border: 1px solid black;
  text-align: center;
}

.tab.active {
  background-color: #408EC6;
}

.configurator-top-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
}
</style>