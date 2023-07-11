<script setup lang="ts">
import ProfileOverview from "./components/profile/ProfileOverview.vue";
import Configurator from "./components/Configurator.vue";
import {Ref, ref} from "vue";
import {bytesArrayToProfile, profileToBytes} from "./helper/bytesToProfile";
import Profile from "./model/Profile";

let edgeHIDController: Ref<HIDDevice | undefined> = ref();

let profiles = ref();
let selectedProfile = ref();

const FILTERS = {
  vendorId: 0x054C, // Sony Interactive Entertainment
  productId: 0x0DF2 // DualSense Edge Wireless Controller
};

const getProfiles = async () => {
  if (edgeHIDController.value) {
    let profileCollector: Array<Array<Array<number>>> = [[]];
    let cIndex = 0;
    for (let i = 112; i < 124; i++) {
      if (cIndex % 3 === 0 && cIndex !== 0) {
        profileCollector.push([]);
      }
      let data: DataView = await edgeHIDController.value.receiveFeatureReport(i);
      profileCollector[profileCollector.length - 1].push(Array.from(new Uint8Array(data.buffer)));
      cIndex++;
    }
    let foundProfiles: Array<Profile> = [];
    profileCollector.forEach((profile: number[][]) => {
      foundProfiles.push(bytesArrayToProfile(profile));
    });
    profiles.value = foundProfiles;
  }
}

const getDevice = () => {
  navigator.hid.requestDevice({filters: [FILTERS]}).then(devices => {
    const controller = devices[0];

    controller.open().then(() => {
      edgeHIDController.value = controller;
      getProfiles();
    });
  });
}

navigator.hid.addEventListener("connect", ({device}) => {
  if (device.productId === FILTERS.productId && device.vendorId === FILTERS.vendorId) {
    device.open().then(() => {
      edgeHIDController.value = device;
      getProfiles();
    });
  }
});

navigator.hid.addEventListener("disconnect", ({device}) => {
  if (device.productId === FILTERS.productId && device.vendorId === FILTERS.vendorId) {
    edgeHIDController.value = undefined;
    selectedProfile.value = null;
    profiles.value = null;
  }
});

navigator.hid.getDevices().then(devices => {
  if (devices.length) {
    devices.forEach(device => {
      if (device.productId === FILTERS.productId && device.vendorId === FILTERS.vendorId) {
        device.open().then(() => {
          edgeHIDController.value = device;
          getProfiles();
        });
      }
    });
  }
});

const setSelectedProfile = (setSelectedProfile: Profile) => {
  selectedProfile.value = setSelectedProfile;
}

const saveProfile = (newProfile: Profile) => {
  if (edgeHIDController.value) {
    const bytesArray = profileToBytes(newProfile);

    //TODO make it possible to function using bluetooth instead of relying on USB protocol
    bytesArray.map(async bytes => {
      let ident = bytes[0];
      bytes = bytes.slice(1, bytes.length);
      await edgeHIDController.value?.sendFeatureReport(ident, bytes);
    })
  }
}

</script>

<template>
  <section v-if="!edgeHIDController">
    <h3>DualSense Edge controller not found!</h3>
    <p>Please (re)connect your controller.</p>
    <button @click="getDevice">Connect controller</button>
  </section>
  <section v-else class="container">
    <ProfileOverview @selected-profile="setSelectedProfile" :profiles="profiles" class="profile-overview"/>
    <Configurator @save="saveProfile" :selected-profile="selectedProfile" class="configurator"/>
  </section>
</template>

<style scoped>
.container {
  width: 100%;
  display: flex;
}

.profile-overview {
  width: 320px;
}

.configurator {
  flex: 1;
}
</style>
