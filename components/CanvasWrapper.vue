<template>
  <div class="my-canvas-wrapper">
    <canvas ref="my-canvas" width="500" height="400"></canvas>
    <slot></slot>
  </div>
</template>

<script>
export default {
  data() {

    return {
      // By creating the provider in the data property, it becomes reactive,
      // so child components will update when `context` changes.
      provider: {
        // This is the CanvasRenderingContext that children will draw to.
        context: null
      },
      drawParams:{
      CTX: null,
      WIDTH: 0,
      HEIGHT: 0,
      PI2: 2*Math.PI,
      GRAVITY: 0.125,
      COLOR_FADE: 0.01,
      COLORS = [
  '#9400D3',
  '#4B0082',
  '#0000FF',
  '#00FF00',
  '#FFFF00',
  '#FF7F00',
  '#FF0000'],
  RENDERER: null,
  PARTICLES:[],
  PARTICLE_COUNT: 40,
  UNICORN_IMAGE: null,
  UNICORN: null
      }
    }
  },

  // Allows any child component to `inject: ['provider']` and have access to it.
  provide () {
    return {
      provider: this.provider
    }
  },

  mounted () {
    // We can't access the rendering context until the canvas is mounted to the DOM.
    // Once we have it, provide it to all child components.
    this.provider.context = this.$refs['my-canvas'].getContext('2d')

    // Resize the canvas to fit its parent's width.
    // Normally you'd use a more flexible resize system.
    this.$refs['my-canvas'].width = this.$refs['my-canvas'].parentElement.clientWidth
    this.$refs['my-canvas'].height = this.$refs['my-canvas'].parentElement.clientHeight
  }
}
//  https://alligator.io/vuejs/vue-html5-canvas/
</script>
<style>
canvas {
  background-color: black;
}
</style>
