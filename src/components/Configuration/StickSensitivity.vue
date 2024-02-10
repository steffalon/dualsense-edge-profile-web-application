<script setup lang="ts">
import {JoystickProfileId} from "../../enum/JoystickProfileId";
import Joystick from "../../model/Joystick";
import {PS5_JOYSTICK_CURVE} from "../../helper/bytesToProfile";
import {onMounted, ref, inject, onUnmounted} from "vue";
import type {Ref} from "vue";

const props = defineProps({
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
const leftStickCurveCanvas: Ref<HTMLCanvasElement | undefined> = ref();
const rightStickCurveCanvas: Ref<HTMLCanvasElement | undefined> = ref();
const rightJoystickRange = ref();

const edgeHIDController: Ref<HIDDevice> = inject('HIDController')!;

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

const drawCurve = (ctx: CanvasRenderingContext2D, joystick: Joystick, testProgress: number) => {

  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  const rows = 4;
  const cols = 4;

  const cellWidth = ctx.canvas.width / cols;
  const cellHeight = ctx.canvas.height / rows;

  ctx.strokeStyle = '#000000';

  // If dark mode
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    ctx.strokeStyle = '#ffffff';
  }

  ctx.lineWidth = 0.1;

  // Draw the grid
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      const x = i * cellWidth;
      const y = j * cellHeight;
      ctx.strokeRect(x, y, cellWidth, cellHeight);
    }
  }

  ctx.beginPath();
  ctx.moveTo(0, ctx.canvas.height);
  ctx.lineWidth = 2;

  for (let i = 0; i < joystick.getModifier() - 1; i++) {
    ctx.lineTo((joystick.getCurveValues()[i + i] / 255) * ctx.canvas.width, ctx.canvas.height - (joystick.getCurveValues()[i+i+1] / 255) * ctx.canvas.height);
  }
  ctx.lineTo(ctx.canvas.width,0);
  ctx.stroke();
  ctx.closePath();
  ctx.beginPath();
  // If darkmode
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    ctx.fillStyle = 'rgba(242,95,76,0.5)';
  } else {
    ctx.fillStyle = 'rgba(64,142,198,0.5)';
  }
  ctx.fillRect(0, 0, (testProgress * 2 / 255) * ctx.canvas.width, ctx.canvas.height);
  ctx.stroke();
  ctx.closePath();
}

const readInput = (e: HIDInputReportEvent) => {
  const inputStream = new Uint8Array(e.data.buffer);
  let maxInputLeft = Math.max(inputStream[0], inputStream[1]) - 128;
  let maxInputRight = Math.max(inputStream[2], inputStream[3]) - 128;
  drawCurve(leftStickCurveCanvas.value!.getContext('2d')!, props.leftJoystick, maxInputLeft);
  drawCurve(rightStickCurveCanvas.value!.getContext('2d')!, props.rightJoystick, maxInputRight);
}

onMounted(() => {
  edgeHIDController.value.addEventListener('inputreport', readInput);
});

onUnmounted(() => {
  edgeHIDController.value.removeEventListener('inputreport', readInput);
});

</script>
<template>
  <section>
    <span class="note">Note: Changing curve values will not be applied immediately. Save your changes first in order to test them.</span>
    <h3>Left stick</h3>
    <div class="canvasContainer">
      <canvas ref="leftStickCurveCanvas" class="curve"></canvas>
    </div>
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
           @input="e => changeJoyStickIndex(leftJoystick, e)"
           :value="getCurrentCurve(leftJoystick)"
           min="0"
           max="10"
           :disabled="leftJoystick.getProfileId() === JoystickProfileId.DEFAULT"
           ref="leftJoystickRange"
    >
  </section>
  <section>
    <h3>Right stick</h3>
    <div class="canvasContainer">
      <canvas ref="rightStickCurveCanvas" class="curve"></canvas>
    </div>
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
           @input="(e: any) => changeJoyStickIndex(rightJoystick, e)"
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
.note {
  margin-top: 21px;
  display: block;
}
.canvasContainer {
  width: 520px;
  height: 255px;
  resize: both;
  overflow: hidden;
  border: 1px solid white;
}
.curve {
  width: 100%;
  height: 100%;
  display: block;
}
</style>