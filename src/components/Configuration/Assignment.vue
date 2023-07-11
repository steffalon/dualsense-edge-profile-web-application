<script setup lang="ts">
</script>
<template>
  <section class="controller-front">
    <span style="left: 386px; top: 180px" class="circle-button" id="circle"></span>
    <span style="left: 332px; top: 180px" class="circle-button" id="square"></span>
    <span style="left: 359px; top: 207px" class="circle-button" id="cross"></span>
    <span style="left: 359px; top: 155px" class="circle-button" id="triangle"></span>

    <span style="left: 173px; top: 218px" class="circle-joystick" id="left_joystick"></span>
    <span style="left: 292px; top: 218px" class="circle-joystick" id="right_joystick"></span>


    <section class="select-popup">
      <p>Button: []</p>
      <select>
        <option>X</option>
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
  background-color: yellow;
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
  left: 426px; top: 180px
}
</style>