<script setup lang="ts">
import {JoystickProfileId} from "../../enum/JoystickProfileId";
import Joystick from "../../model/Joystick";
import {PS5_JOYSTICK_CURVE} from "../../helper/bytesToProfile";
import {ref} from "vue";

defineProps({
  leftJoystick: {
    type: Joystick,
    required: true,
  },
  rightJoystick: {
    type: Joystick,
    required: true,
  },
});

const leftJoystickRange = ref();
const rightJoystickRange = ref();

const getCurrentCurve = (joystick: Joystick): number => {

  console.log(joystick.getCurveValues(), joystick.getProfileId());

  let indexCurve: number;

  for (indexCurve = 0; indexCurve < 10; indexCurve++) {
    let arrAdjustments = PS5_JOYSTICK_CURVE[joystick.getProfileId()].getAdjustments().map(curve => curve.getByIndex(indexCurve));
    if (arrAdjustments.toString() === joystick.getCurveValues().toString()) break;
  }

  return indexCurve;
}

const changeJoyStickIndex = (joystick: Joystick, event: Event) => {
  //@ts-ignore
  joystick.setCurveValues(PS5_JOYSTICK_CURVE[joystick.getProfileId()].getAdjustments().map(curve => curve.getByIndex(event.target.value)));
}

</script>
<template>
  <section>
    <h3>Left stick</h3>
    <select
        v-bind:value="leftJoystick.getProfileId()"
        @change="(e: any) => {
          leftJoystick.setProfileId(e.target.value);
          leftJoystick.setModifier(PS5_JOYSTICK_CURVE[e.target.value].getModifier());
          leftJoystickRange.disabled = Number(leftJoystick.getProfileId()) === JoystickProfileId.DEFAULT
      }"
    >
      <option :value="JoystickProfileId.DEFAULT">
        Default
      </option>
      <option :value="JoystickProfileId.QUICK">
        Quick
      </option>
      <option :value="JoystickProfileId.PRECISE">
        Precise
      </option>
      <option :value="JoystickProfileId.STEADY">
        Steady
      </option>
      <option :value="JoystickProfileId.DIGITAL">
        Digital
      </option>
      <option :value="JoystickProfileId.DYNAMIC">
        Dynamic
      </option>
    </select>
    <input type="range"
           @change="e => changeJoyStickIndex(leftJoystick, e)"
           :value="getCurrentCurve(leftJoystick)"
           min="0"
           max="10"
           :disabled="leftJoystick.getProfileId() === JoystickProfileId.DEFAULT"
           ref="leftJoystickRange"
    >
  </section>
  <section>
    <h3>Right stick</h3>
    <select
        v-bind:value="rightJoystick.getProfileId()"
        @change="(e: any) => {
          rightJoystick.setProfileId(e.target.value);
          rightJoystick.setModifier(PS5_JOYSTICK_CURVE[e.target.value].getModifier());
          rightJoystickRange.disabled = Number(rightJoystick.getProfileId()) === JoystickProfileId.DEFAULT
      }"
    >
      <option :value="JoystickProfileId.DEFAULT">
        Default
      </option>
      <option :value="JoystickProfileId.QUICK">
        Quick
      </option>
      <option :value="JoystickProfileId.PRECISE">
        Precise
      </option>
      <option :value="JoystickProfileId.STEADY">
        Steady
      </option>
      <option :value="JoystickProfileId.DIGITAL">
        Digital
      </option>
      <option :value="JoystickProfileId.DYNAMIC">
        Dynamic
      </option>
    </select>
    <input type="range"
           @change="(e: any) => changeJoyStickIndex(rightJoystick, e)"
           :value="getCurrentCurve(rightJoystick)"
           min="0"
           max="10"
           :disabled="rightJoystick.getProfileId() === JoystickProfileId.DEFAULT"
           ref="rightJoystickRange"
    >
  </section>
</template>
<style scoped>
input[type="range"] {
  width: 300px;
}
h3 {
  color: #00473e;
}
@media (prefers-color-scheme: dark) {
  h3 {
    color: #fffffe;
  }
}
</style>