<script setup lang="ts">
import Profile from "./Profile.vue";

import ProfileModel from "../../model/Profile";
import LocalIndexDB from "../../model/LocalIndexDB";
import {assembleBlankProfile, getProfileButtonSelector} from "../../helper/profileTools";
import {inject, ref} from "vue";
import type {Ref} from "vue";
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
const hidController = inject('HIDController') as Ref<HIDDevice>;
const getProfiles = inject('getProfiles') as Function;

db.getAll().then((profiles: Array<ProfileModel>) => savedProfiles.value = profiles.map((profileEntry: any) => {

  const joystickLeft = new Joystick(PS5_JOYSTICK_CURVE[profileEntry.leftJoystick.profileId].getProfileId(), profileEntry.leftJoystick.adjustments, PS5_JOYSTICK_CURVE[profileEntry.leftJoystick.profileId].getModifier());
  const joystickRight = new Joystick(PS5_JOYSTICK_CURVE[profileEntry.rightJoystick.profileId].getProfileId(), profileEntry.rightJoystick.adjustments, PS5_JOYSTICK_CURVE[profileEntry.rightJoystick.profileId].getModifier());

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

const clearProfileFromControllerMemory = async (profile: ProfileModel, position: number) => {

  if (confirm(`Are you sure you want to clear ${profile.getLabel()} from the controller memory?`) &&
      hidController.value) {
    const bytes = new Uint8Array(64);
    bytes[1] = 1 + position;
    await hidController.value?.sendFeatureReport(0x68, bytes.slice(1, bytes.length));
    getProfiles();
  }
}

const createNewProfile = () => {
  let name = prompt("New profile name");
  if (name) {
    const profile = assembleBlankProfile(name);
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
                 v-for="(profile, i) in profiles.slice(1)"
                 :profile="profile">
          <div class="profile-right">
            <span class="button-combination">
              <span class="fn-button">FN</span>
              <img class="action-button" :src="getProfileButtonSelector((profile as ProfileModel).getProfileButtonSelector())" alt="button">
            </span>
            <button class="clear-button" @click="$event.stopPropagation(); clearProfileFromControllerMemory(profile, i)">
              Clear
            </button>
          </div>
        </Profile>
      </section>
      <section class="profiles saved">
        <Profile @selected-profile="(selectedProfile) => $emit('selected-profile', selectedProfile, true)"
                 v-for="profile in savedProfiles"
                 :profile="profile">
          <button class="profile-delete-button" @click="deleteProfileConfirm(profile)">Delete</button>
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
  background-color: #faae2b;
  color: #00473e;
}

.saved {
  border-top: 1px solid black;
}

.profile-delete-button {
  all: unset;
  cursor: pointer;
  font-weight: bold;
}

.button-combination {
  display: flex;
  gap: 12px;
  padding: 8px 0;
}

.fn-button {
  width: 30px;
  text-align: center;
  height: 20px;
  background-color: #0f0f10;
  color: #a4aaad;
  padding: 2px;
  border-radius: 4px;
}

.action-button {
  width: 24px;
  height: 24px;
}

.clear-button {
  all: unset;
  cursor: pointer;
  font-weight: bold;
  border: 1px solid #ffffff;
  margin-bottom: 10px;
  padding: 5px 12px;
}

.clear-button:hover {
  background-color: #fffffe;
}

@media (prefers-color-scheme: dark) {
  .overview {
    background-color: #f25f4c;
  }

  .create-new-profile button {
    background-color: #ff8906;
    font-weight: bold;
    color: #fffffe;
  }

  .saved {
    border-top: 1px solid #fffffe;
  }

  .clear-button:hover {
    background-color: #0f0f10;
  }
}
</style>