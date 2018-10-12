<template>
  <div class="introduce" ref="md">
    <button class="btn" @touchstart="showMd" @click="showMd">?</button>
    <md class="markdown"></md>
    <div class="wrapper" @click="hideMd"></div>
  </div>
</template>

<script>
//import Md from '../intro.md'
export default {
  props: {
    mdfile: {
      type: String,
      required: true
    }
  },
  methods: {
    showMd() {
      this.$refs.md.classList.toggle('active')
    },
    hideMd() {
      this.$refs.md.classList.remove('active')
    }
  },
  created() {
    this.$options.components.md = () => import('../' + this.$props.mdfile);
  }
};
</script>

<style lang="stylus" scoped>
.introduce
  theme-dark= #35495E
  theme-green= #41B883
  position fixed
  top 10px
  left 10px
  z-index 100
  .wrapper
    visibility hidden
    position fixed
    top 0
    left 0
    width 100%
    height 100%
    transition background-color .5s, visibility .5s
  .btn
    position fixed
    top 10px
    left 10px
    z-index 100
    width 50px
    height @width
    border none
    outline none
    box-shadow 0 0 5px theme-dark
    background-color theme-green
    font-size 20px
    font-weight bolder
    line-height @font-size
    text-align center
    color white
    transition box-shadow .5s, transform .5s
    &:active
      box-shadow 0 0 15px theme-dark
    &:hover
      transform scale(1.2)
  .markdown
    visibility hidden
    opacity 0
    position fixed
    z-index 100
    left 50%
    top 50px
    width 800px
    height 70vh
    margin-left -(@width / 2)
    padding 20px
    background-color white
    overflow auto
    transition opacity .5s, visibility .5s
  &.active
    .wrapper
      visibility visible
      background-color rgba(100, 100, 100, .5)
    .markdown 
      visibility visible
      opacity 1
</style>

