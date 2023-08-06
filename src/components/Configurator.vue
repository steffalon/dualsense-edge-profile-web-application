<script setup lang="ts">
import Profile from "../model/Profile";
import {Ref, ref, watch} from "vue";
import Assignment from "./Configuration/Assignment.vue";
import StickSensitivity from "./Configuration/StickSensitivity.vue";
import TriggerDeadzone from "./Configuration/TriggerDeadzone.vue";
import LocalIndexDB from "../model/LocalIndexDB";
import {inject} from "vue";

const props = defineProps({
  selectedProfile: Profile,
  isSavedProfile: Boolean
});

const emits = defineEmits([
  'save'
]);

const db: LocalIndexDB = inject('db') as LocalIndexDB;
let selectedTabIndex = ref(0);
let foundSavedProfiles: Ref<Array<any>> = ref([]);

const isActive = (i: number) => {
  return {active: selectedTabIndex.value === i};
}

const changeTabIndex = (i: number) => {
  selectedTabIndex.value = i;
}

let copyProfile = ref();

const applyExistingProfile = (e: any) => {
  db.get(e.target.value).then((foundProfile: any) => {
    console.log(foundProfile);
    copyProfile.value.setLabel(foundProfile.label);
    copyProfile.value.getLeftJoyStick().setProfileId(foundProfile.leftJoystick.profileId);
    copyProfile.value.getLeftJoyStick().setAdjustments(foundProfile.leftJoystick.adjustments);
    copyProfile.value.getLeftJoyStick().setCurveValues(foundProfile.leftJoystick.curveValues);
    copyProfile.value.getRightJoyStick().setProfileId(foundProfile.rightJoystick.profileId);
    copyProfile.value.getRightJoyStick().setAdjustments(foundProfile.rightJoystick.adjustments);
    copyProfile.value.getRightJoyStick().setCurveValues(foundProfile.rightJoystick.curveValues);
    copyProfile.value.getLeftTrigger().setMin(foundProfile.leftTrigger.min);
    copyProfile.value.getLeftTrigger().setMax(foundProfile.leftTrigger.max);
    copyProfile.value.getRightTrigger().setMin(foundProfile.rightTrigger.min);
    copyProfile.value.getRightTrigger().setMax(foundProfile.rightTrigger.max);
    copyProfile.value.getButtonMapping().setButtons(foundProfile.buttonMapping.buttons);
  });
}

const save = () => {
  console.log(copyProfile.value);
  if (props.isSavedProfile) {
    db.update(copyProfile.value);
    alert(`Profile "${copyProfile.value.getLabel()}" saved`);
    return;
  }
  return emits('save', copyProfile.value);
}

watch(props, data => {
  if (!props.isSavedProfile) {
    db.getAll().then((data: Array<Profile>) => {
      console.log(foundSavedProfiles);
      foundSavedProfiles.value = data;
    });
  }
  copyProfile.value = data.selectedProfile;
});
</script>
<template>
  <section v-if="copyProfile" class="configurator">
    <section class="configurator-top-header">
      <section>
        <h1 class="profile-name">Profile: <input :value="copyProfile.getLabel()"
                                                 @change="(e: any) => copyProfile.setLabel(e.target.value)"
                                                 type="text"></h1>
      </section>
      <section v-if="!props.isSavedProfile && foundSavedProfiles.length" class="apply-existing-profile">
        <label for="select-saved-profile">Apply existing profile</label>
        <select id="select-saved-profile" @change="applyExistingProfile">
          <option>Unselected</option>
          <option v-for="foundSavedProfile in foundSavedProfiles" :value="foundSavedProfile.id">
            {{ foundSavedProfile.label }}
          </option>
        </select>
      </section>
      <section>
        <button class="save-btn" @click="save()">Save</button>
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
  color: #00473e;
  border: 1px solid #00332c;
  text-align: center;
}

.tab.active {
  background-color: #faae2b;
}

.configurator-top-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
}

.apply-existing-profile {
  padding: 10px;
  border: 1px solid #00473e;
  margin-bottom: 10px;
}

.apply-existing-profile label {
  margin-bottom: 5px;
  display: block;
}

.apply-existing-profile select {
  display: block;
  width: 100%;
}

.save-btn {
  all: unset;
  padding: 10px;
  background-color: #408EC6;
  color: #fffffe;
  font-weight: bold;
  cursor: pointer;
  width: 75px;
  text-align: center;
}

.profile-name {
  color: #00473e;
}

@media (prefers-color-scheme: dark) {
  .configurator {
    color: #a7a9be;
    background-color: #0f0e17;
  }

  .profile-name {
    color: #fffffe;
  }

  .tab {
    color: #fffffe;
    border: 1px solid #fffffe;
  }

  .tab.active {
    background-color: #ff8906;
    font-weight: bold;
  }

  .save-btn {
    all: unset;
    padding: 10px;
    background-color: #f25f4c;
    color: #fffffe;
    font-weight: bold;
    cursor: pointer;
    width: 75px;
    text-align: center;
  }
  .apply-existing-profile {
    border: 1px solid #fffffe;
    color: #fffffe;
  }
}
</style>