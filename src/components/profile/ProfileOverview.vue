<script setup lang="ts">
import Profile from "./Profile.vue";

import ProfileModel from "../../model/Profile";
import LocalIndexDB from "../../model/LocalIndexDB";
import {assembleBlankProfile, getProfileButtonSelector} from "../../helper/profileTools";
import {inject, Ref, ref} from "vue";
import Joystick from "../../model/Joystick";
import Trigger from "../../model/Trigger";
import ButtonMapping from "../../model/ButtonMapping";
import {PS5_JOYSTICK_CURVE} from "../../helper/bytesToProfile";

defineProps({
  profiles: Array<ProfileModel>,
});

const savedProfiles: Ref<Array<ProfileModel>> = ref([]);

const emit = defineEmits(['selected-profile', 'delete-profile']);

const db: LocalIndexDB = inject('db') as LocalIndexDB;

db.getAll().then((profiles: Array<ProfileModel>) => savedProfiles.value = profiles.map((profileEntry: any) => {

  const joystickLeft = new Joystick(PS5_JOYSTICK_CURVE[profileEntry.leftJoystick.profileId].getProfileId(), profileEntry.leftJoystick.adjustments);
  const joystickRight = new Joystick(PS5_JOYSTICK_CURVE[profileEntry.rightJoystick.profileId].getProfileId(), profileEntry.rightJoystick.adjustments);

  joystickLeft.setCurveValues(profileEntry.leftJoystick.curveValues);
  joystickRight.setCurveValues(profileEntry.rightJoystick.curveValues);

  return new ProfileModel(
      profileEntry.id,
      profileEntry.label,
      joystickLeft,
      joystickRight,
      new Trigger(profileEntry.leftTrigger.min, profileEntry.leftTrigger.max),
      new Trigger(profileEntry.rightTrigger.min, profileEntry.rightTrigger.max),
      new ButtonMapping(profileEntry.buttonMapping.buttons)
  )
}));

const deleteProfileConfirm = (profile: ProfileModel) => {
  if (confirm(`Delete "${profile.getLabel()}"?`)) {
    db.delete(profile.getId());
    emit('selected-profile', null);
    savedProfiles.value = savedProfiles.value.filter((foundProfile: ProfileModel) => foundProfile.getId() !== profile.getId());
  }
}

const createNewProfile = () => {
  let name = prompt("New profile name");
  if (name) {
    const profile = assembleBlankProfile(name);
    console.log(profile);
    db.store(profile);
    savedProfiles.value.push(profile);
    emit('selected-profile', profile);
  }
}

</script>

<template>
  <section class="overview">
    <section>
      <section class="profiles" v-if="profiles">
        <Profile @selected-profile="(selectedProfile) => $emit('selected-profile', selectedProfile)"
                 v-for="profile in profiles"
                 :profile="profile">
          <p>{{ getProfileButtonSelector(profile.getProfileButtonSelector()) }}</p>
        </Profile>
      </section>
      <section class="profiles saved">
        <Profile @selected-profile="(selectedProfile) => $emit('selected-profile', selectedProfile, true)"
                 v-for="profile in savedProfiles"
                 :profile="profile">
          <button @click="deleteProfileConfirm(profile)">Delete</button>
        </Profile>
      </section>
    </section>
    <section class="create-new-profile">
      <button @click="createNewProfile()">
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

.saved {
  border-top: 1px solid black;
}
</style>