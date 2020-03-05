<template>
  <div id="app" class="fill-contain">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  methods: {
    // getLocation () {
    //   const map = new AMap.Map('container', {
    //     resizeEnable: true
    //   })
    // }
  }
}
</script>

<style lang="less">
  @import "style/common";
  @import "assets/icon/iconfont.css";
</style>
