<template>
  <div class="web-container">
    <el-amap vid="amap" :plugin="plugin" class="amap-demo" :center="center">
    </el-amap>
    <div class="toolbar">
        <span v-if="loaded">
          location: lng = {{ lng }} lat = {{ lat }}
        </span>
      <span v-else>正在定位</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'vehicleUserLocation',
  data () {
    return {
      center: [121.59996, 31.197646],
      zoom: 12,
      // position: [121.5273285, 31.21515044],
      icon: '/huoche.png',
      events: {
        init (o) {
          console.log(o.getCenter())
        },
        zoomchange: (e) => {
          console.log(e)
        },
        zoomend: (e) => {
          // 获取当前缩放zoom值
          console.log(this.$refs.map.$$getInstance().getZoom())
          console.log(e)
        },
        click: e => {
          alert('map clicked')
        }
      },
      markers: [
        {
          position: [121.5273285, 31.41515044]
        },
        {
          position: [121.5273286, 31.31515045]
        }
      ],
      // 使用其他组件
      plugin: [
        {
          pName: 'Scale',
          events: {
            init (instance) {
              console.log(instance)
            }
          }
        },
        {
          pName: 'ToolBar',
          events: {
            init (instance) {
              console.log(instance)
            }
          }
        }
      ]
    }
  }
}
</script>

<style scoped>
  .web-container {
    width: 100%;
    height: 100%;
  }

</style>
