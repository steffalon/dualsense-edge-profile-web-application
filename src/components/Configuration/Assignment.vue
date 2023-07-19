<script setup lang="ts">

import {ref} from "vue";
import {Button} from "../../enum/Button.ts";

const props = defineProps({
  buttons: {
    type: Array<Button>,
    required: true,
  },
});

const select_popup = ref();

const scanSelected = (e: Event) => {
  //@ts-ignore
  const element: Element = e.target;

  if (element.id === "select-popup-close" || element.id === "controller") {
    select_popup.value.style.display = "none";
    return;
  }

  //@ts-ignore
  if (element.id === "select-popup" || element.parentElement.id === "select-popup") {
    return;
  }

  select_popup.value.style.display = "block";

  //@ts-ignore
  select_popup.value.style.left = (e.pageX - e.currentTarget.offsetLeft) + 'px';
  //@ts-ignore
  select_popup.value.style.top = (e.pageY - e.currentTarget.offsetTop) + 'px';
}
</script>
<template>
  <section class="controller-front" id="controller" @click="e => scanSelected(e)">
    <span style="left: 386px; top: 180px" class="interactable circle-button" id="circle"></span>
    <span style="left: 332px; top: 180px" class="interactable circle-button" id="square"></span>
    <span style="left: 359px; top: 207px" class="interactable circle-button" id="cross"></span>
    <span style="left: 359px; top: 155px" class="interactable circle-button" id="triangle"></span>

    <span style="left: 109px; top: 182px;" class="interactable dpad-button" id="dpad_left"></span>
    <span style="left: 126.5px; top: 199px; rotate: 270deg" class="interactable dpad-button" id="dpad_bottom"></span>
    <span style="left: 144px; top: 182px; rotate: 180deg" class="interactable dpad-button" id="dpad_right"></span>
    <span style="left: 126.5px; top: 166px; rotate: 90deg" class="interactable dpad-button" id="dpad_top"></span>

    <span style="left: 173px; top: 218px" class="interactable circle-joystick" id="left_joystick"></span>
    <span style="left: 292px; top: 218px" class="interactable circle-joystick" id="right_joystick"></span>

    <span style="left: 112px; top: 115px" class="interactable left_1" id="left_1"></span>
    <span style="left: 348px; top: 115px" class="interactable right_1" id="right_1"></span>

    <span style="left: 104px; top: 64px" class="interactable left_2" id="left_2"></span>
    <span style="left: 356px; top: 64px" class="interactable right_2" id="right_2"></span>

    <span style="left: 164px; top: 146px" class="interactable create_button" id="create_button"></span>
    <span style="left: 336px; top: 146px" class="interactable options_button" id="options_button"></span>

    <span style="left: 181px; top: 135px" class="interactable trackpad" id="trackpad"></span>

    <span style="left: 244px; top: 229px" class="interactable circle-button" id="ps_button"></span>

    <span style="left: 198px; top: 310px" class="interactable paddle_left" id="paddle_left"></span>
    <span style="left: 301px; top: 310px" class="interactable paddle_right" id="paddle_right"></span>

    <section id="select-popup" ref="select_popup" class="select-popup">
      <button class="select-popup-close" id="select-popup-close">x</button>
      <p>Button: []</p>
      <select>
        <option v-for="button in Object.keys(Button)">{{button}}</option>
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
  background-color: black;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  display: block;
  position: absolute;
}

.circle-joystick {
  background-color: black;
  width: 47px;
  height: 47px;
  border-radius: 50%;
  display: block;
  position: absolute;
}

.select-popup {
  position: absolute;
  width: 75px;
  padding: 10px 20px;
  border-radius: 5px;
  box-shadow: 3px 5px 12px 2px rgba(0, 0, 0, 0.15);
  background-color: #FFFFFF;
  display: none;
}

.select-popup-close {
  text-align: right;
  position: absolute;
  right: 0;
  top: 0;
}

.dpad-button {
  background-color: black;
  width: 28px;
  height: 21px;
  display: block;
  position: absolute;
  clip-path: polygon(0% 0%, 63% 0%, 100% 50%, 63% 100%, 0% 100%);
  border-radius: 5px;
}

.left_1 {
  background-color: black;
  width: 52px;
  height: 26px;
  display: block;
  border-radius: 6px 6px 20px 20px;
  position: absolute;
  rotate: 350deg;
}

.right_1 {
  background-color: black;
  width: 52px;
  height: 26px;
  display: block;
  border-radius: 6px 6px 20px 20px;
  position: absolute;
  rotate: 10deg;
}

.left_2 {
  background-color: black;
  width: 52px;
  height: 46px;
  display: block;
  border-radius: 25px 25px 6px 6px;
  position: absolute;
  rotate: 350deg;
}

.right_2 {
  background-color: black;
  width: 52px;
  height: 46px;
  display: block;
  border-radius: 25px 25px 6px 6px;
  position: absolute;
  rotate: 10deg;
}

.create_button {
  background-color: black;
  width: 12px;
  height: 22px;
  display: block;
  position: absolute;
  border-radius: 6px;
  rotate: 350deg;
}

.options_button {
  background-color: black;
  width: 12px;
  height: 22px;
  display: block;
  position: absolute;
  border-radius: 6px;
  rotate: 10deg;
}

.trackpad {
  background-color: rgba(0, 0, 0, .7);
  width: 150px;
  height: 72px;
  position: absolute;
  clip-path: polygon(0 0, 100% 0, 90% 100%, 10% 100%);
  border-radius: 0 0 35px 35px;
}

.paddle_left {
  background-color: black;
  width: 17px;
  height: 42px;
  display: block;
  position: absolute;
  border-radius: 8px 8px 35px 8px;
  rotate: 350deg;
}

.paddle_right {
  background-color: black;
  width: 17px;
  height: 42px;
  display: block;
  position: absolute;
  border-radius: 8px 8px 8px 35px;
  rotate: 10deg;
}

.interactable:hover {
  background-color: yellow;
}
</style>