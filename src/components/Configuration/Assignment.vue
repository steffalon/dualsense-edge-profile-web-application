<script setup lang="ts">

import {ref} from "vue";
import {Button, ButtonIndex} from "../../enum/Button";
import ButtonMapping from "../../model/ButtonMapping";

const props = defineProps({
  buttonMappping: {
    type: ButtonMapping,
    required: true,
  },
});

const buttonLabels = Object.keys(Button).filter(key => isNaN(Number(key)));

const select_popup = ref();

const selectedButtonOriginalValue = ref();
const selectedButtonAssignedValue = ref();

const updateButton = (e: Event) => {
  //@ts-ignore
  const element: any = e.target;

  const buttons = props.buttonMappping?.getButtons();

  const value = Number(element.value);

  selectedButtonAssignedValue.value = value;
  buttons[selectedButtonOriginalValue.value] = value;

  props.buttonMappping.setButtons(buttons);
}

const scanSelected = (e: Event) => {

  const element: any = e.target;

  if (element.id === "select-popup-close" || element.id === "controller") {
    select_popup.value.style.display = "none";
    return;
  }

  //@ts-ignore
  if (element.id === "select-popup" || element.parentElement.id === "select-popup") {
    return;
  }

  const original: number = Number(element.dataset.original);

  selectedButtonOriginalValue.value = original;

  selectedButtonAssignedValue.value = Number(Object.values(props.buttonMappping?.getButtons())[original]);

  select_popup.value.style.display = "block";

  //@ts-ignore
  select_popup.value.style.left = (e.pageX - e.currentTarget.offsetLeft) + 'px';
  //@ts-ignore
  select_popup.value.style.top = (e.pageY - e.currentTarget.offsetTop) + 'px';
}
</script>
<template>
  <section class="controller-front" id="controller" @click="e => scanSelected(e)">
    <span style="left: 386px; top: 180px" :data-original="Button.CIRCLE" class="interactable circle-button"
          id="circle"></span>
    <span style="left: 332px; top: 180px" :data-original="Button.SQUARE" class="interactable circle-button"
          id="square"></span>
    <span style="left: 359px; top: 207px" :data-original="Button.CROSS" class="interactable circle-button"
          id="cross"></span>
    <span style="left: 359px; top: 155px" :data-original="Button.TRIANGLE" class="interactable circle-button"
          id="triangle"></span>

    <span style="left: 109px; top: 182px;" :data-original="Button.LEFT" class="interactable dpad-button"
          id="dpad_left"></span>
    <span style="left: 126.5px; top: 199px; rotate: 270deg" :data-original="Button.DOWN"
          class="interactable dpad-button" id="dpad_bottom"></span>
    <span style="left: 144px; top: 182px; rotate: 180deg" :data-original="Button.RIGHT"
          class="interactable dpad-button" id="dpad_right"></span>
    <span style="left: 126.5px; top: 166px; rotate: 90deg" :data-original="Button.UP"
          class="interactable dpad-button" id="dpad_top"></span>

    <span style="left: 173px; top: 218px" :data-original="Button.L3" class="interactable circle-joystick"
          id="left_joystick"></span>
    <span style="left: 292px; top: 218px" :data-original="Button.R3" class="interactable circle-joystick"
          id="right_joystick"></span>

    <span style="left: 112px; top: 115px" :data-original="Button.L1" class="interactable left_1"
          id="left_1"></span>
    <span style="left: 348px; top: 115px" :data-original="Button.R1" class="interactable right_1"
          id="right_1"></span>

    <span style="left: 104px; top: 64px" :data-original="Button.L2" class="interactable left_2"
          id="left_2"></span>
    <span style="left: 356px; top: 64px" :data-original="Button.R2" class="interactable right_2"
          id="right_2"></span>

    <!--    <span style="left: 164px; top: 146px" class="interactable create_button" id="create_button"></span>-->

    <!--    <span style="left: 336px; top: 146px" :data-original="BUTTON_INDEX_MAP.OPTIONS" class="interactable options_button"-->
    <!--          id="options_button"></span>-->

    <!--    <span style="left: 181px; top: 135px" :data-original="BUTTON_INDEX_MAP.TOUCHPAD" class="interactable trackpad"-->
    <!--          id="trackpad"></span>-->

    <!--    <span style="left: 244px; top: 229px" class="interactable circle-button" id="ps_button"></span>-->

    <span style="left: 198px; top: 310px" :data-original="ButtonIndex.PADDLE_LEFT" class="interactable paddle_left"
          id="paddle_left"></span>
    <span style="left: 301px; top: 310px" :data-original="ButtonIndex.PADDLE_RIGHT"
          class="interactable paddle_right" id="paddle_right"></span>

    <section id="select-popup" ref="select_popup" class="select-popup">
      <button class="select-popup-close" id="select-popup-close">x</button>
      <p>Button: <span class="button-identifier-original">{{ ButtonIndex[selectedButtonOriginalValue] }}</span></p>
      <label for="assignment">Assigned:</label>
      <select id="assignment" @change="(e: any) => updateButton(e)">
        <option v-for="button in buttonLabels"
                :value="Button[button as any]"
                :selected="selectedButtonAssignedValue === Button[button as any]">
          {{ button }}
        </option>
        <option v-if="Number(selectedButtonOriginalValue) === 14 || Number(selectedButtonOriginalValue) === 15"
                :value="Number(selectedButtonOriginalValue)"
                :selected="selectedButtonAssignedValue === selectedButtonOriginalValue">
          {{ ButtonIndex[selectedButtonOriginalValue] }}
        </option>
      </select>
    </section>
  </section>
</template>
<style scoped>
.controller-front {
  width: 512px;
  height: 512px;
  max-width: 80%;
  display: block;
  margin: 50px auto 0 auto;
  background-image: url("../../assets/edge-front.png");
  background-size: cover;
  position: relative;
}

.circle-button {
  width: 25px;
  height: 25px;
  border-radius: 50%;
  display: block;
  position: absolute;
}

.circle-joystick {
  width: 47px;
  height: 47px;
  border-radius: 50%;
  display: block;
  position: absolute;
}

.select-popup {
  position: absolute;
  width: 115px;
  padding: 10px 20px;
  color: #00473e;
  box-shadow: 3px 5px 12px 2px rgba(0, 0, 0, 0.15);
  background-color: #FFFFFF;
  display: none;
}

.select-popup-close {
  all: unset;
  font-size: 1.4em;
  padding: 2px;
  font-weight: bold;
  cursor: pointer;
  width: 20px;
  text-align: center;
  position: absolute;
  right: 0;
  top: 0;
}

.dpad-button {
  width: 28px;
  height: 21px;
  display: block;
  position: absolute;
  clip-path: polygon(0% 0%, 63% 0%, 100% 50%, 63% 100%, 0% 100%);
  border-radius: 5px;
}

.left_1 {
  width: 52px;
  height: 26px;
  display: block;
  border-radius: 6px 6px 20px 20px;
  position: absolute;
  rotate: 350deg;
}

.right_1 {
  width: 52px;
  height: 26px;
  display: block;
  border-radius: 6px 6px 20px 20px;
  position: absolute;
  rotate: 10deg;
}

.left_2 {
  width: 52px;
  height: 46px;
  display: block;
  border-radius: 25px 25px 6px 6px;
  position: absolute;
  rotate: 350deg;
}

.right_2 {
  width: 52px;
  height: 46px;
  display: block;
  border-radius: 25px 25px 6px 6px;
  position: absolute;
  rotate: 10deg;
}

.create_button {
  width: 12px;
  height: 22px;
  display: block;
  position: absolute;
  border-radius: 6px;
  rotate: 350deg;
}

.options_button {
  width: 12px;
  height: 22px;
  display: block;
  position: absolute;
  border-radius: 6px;
  rotate: 10deg;
}

.trackpad {
  width: 150px;
  height: 72px;
  position: absolute;
  clip-path: polygon(0 0, 100% 0, 90% 100%, 10% 100%);
  border-radius: 0 0 35px 35px;
}

.paddle_left {
  width: 17px;
  height: 42px;
  display: block;
  position: absolute;
  border-radius: 8px 8px 35px 8px;
  rotate: 350deg;
}

.paddle_right {
  width: 17px;
  height: 42px;
  display: block;
  position: absolute;
  border-radius: 8px 8px 8px 35px;
  rotate: 10deg;
}

.interactable {
  background-color: #faae2b;
  cursor: pointer;
}

.interactable:hover {
  background-color: #fa5246;
}

.button-identifier-original {
  font-weight: bold;
}

@media (prefers-color-scheme: dark) {
  .interactable:hover {
    background-color: #f25f4c;
  }
  .interactable {
    background-color: #ff8906;
  }
  .select-popup {
    background-color: #f25f4c;
    border: 1px solid #ffffff;
    color: #fffffe;
  }
}
</style>