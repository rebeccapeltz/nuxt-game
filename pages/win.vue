<template>
  <div>
    <unicorn></unicorn>
    <!-- <img src="~/assets/unicorn.png" alt="unicorn" id="unicorn"  />
    <canvas></canvas>
    <div class="message">
      <p>It all begins with a shooting star</p>
      <p>You found me and now I'm free</p>
      <p>Do you want to go for a ride?</p>
    </div> -->
  </div>
</template>

<script>


import unicorn from "~/components/Unicorn.vue";

export default {
  components: {
    unicorn
  },
  mounted: function(){
    // init()
  }
};
</script>

<style>


</style>
