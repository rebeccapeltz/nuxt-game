<template>
  <div>
    <img v-show="true" src="~/assets/unicorn.png" alt="unicorn" id="unicorn" />
    <canvas></canvas>
    <div class="message">
      <p>It all begins with a shooting star</p>
      <p>You found me and now I'm free</p>
      <p>Do you want to go for a ride?</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>

<style>
@media only screen and (max-width: 768px) {
  .message {
    position: absolute;
    /* top: 16px; */
    bottom: 16px;
    right: 16px;
    padding: 8px 16px;
    background: white;
    color: hotpink;
    font-family: "Rye", cursive;
    font-size: 10px;
  }
}
@media only screen and (min-width: 768px) {
  .message {
    position: absolute;
    /* top: 16px; */
    bottom: 16px;
    right: 16px;
    padding: 8px 16px;
    background: white;
    color: purple;
    /* color: black; */
    font-family: "Rye", cursive;
    /* font-family: monospace; */
    font-size: 18px;
  }
}

/* font-family: 'Berkshire Swash', cursive;
font-family: 'Rye', cursive;
font-family: 'Knewave', cursive;
font-family: 'Spirax', cursive;
font-family: 'Megrim', cursive; */
</style>
