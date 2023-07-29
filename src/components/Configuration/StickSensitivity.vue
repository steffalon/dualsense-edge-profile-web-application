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
    <select @change="(e: any) => {
      leftJoystick.setProfileId(e.target.value);
      leftJoystickRange.disabled = Number(leftJoystick.getProfileId()) === JoystickProfileId.DEFAULT
    }">
      <option :selected="leftJoystick.getProfileId() === JoystickProfileId.DEFAULT" :value="JoystickProfileId.DEFAULT">
        Default
      </option>
      <option :selected="leftJoystick.getProfileId() === JoystickProfileId.QUICK" :value="JoystickProfileId.QUICK">
        Quick
      </option>
      <option :selected="leftJoystick.getProfileId() === JoystickProfileId.PRECISE" :value="JoystickProfileId.PRECISE">
        Precise
      </option>
      <option :selected="leftJoystick.getProfileId() === JoystickProfileId.STEADY" :value="JoystickProfileId.STEADY">
        Steady
      </option>
      <option :selected="leftJoystick.getProfileId() === JoystickProfileId.DIGITAL" :value="JoystickProfileId.DIGITAL">
        Digital
      </option>
      <option :selected="leftJoystick.getProfileId() === JoystickProfileId.DYNAMIC" :value="JoystickProfileId.DYNAMIC">
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
    <select @change="(e: any) => {
      rightJoystick.setProfileId(e.target?.value);
      rightJoystickRange.disabled = Number(rightJoystick.getProfileId()) === JoystickProfileId.DEFAULT
    }">
      <option :selected="rightJoystick.getProfileId() === JoystickProfileId.DEFAULT" :value="JoystickProfileId.DEFAULT">
        Default
      </option>
      <option :selected="rightJoystick.getProfileId() === JoystickProfileId.QUICK" :value="JoystickProfileId.QUICK">
        Quick
      </option>
      <option :selected="rightJoystick.getProfileId() === JoystickProfileId.PRECISE" :value="JoystickProfileId.PRECISE">
        Precise
      </option>
      <option :selected="rightJoystick.getProfileId() === JoystickProfileId.STEADY" :value="JoystickProfileId.STEADY">
        Steady
      </option>
      <option :selected="rightJoystick.getProfileId() === JoystickProfileId.DIGITAL" :value="JoystickProfileId.DIGITAL">
        Digital
      </option>
      <option :selected="rightJoystick.getProfileId() === JoystickProfileId.DYNAMIC" :value="JoystickProfileId.DYNAMIC">
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

</style>