<template>
  <div class="fill-contain background-img">
    <v-head></v-head>
    <v-sidebar></v-sidebar>
    <div class="content-box" :class="{'content-collapse':collapse}">
      <div class="content-tags">
        <v-tags></v-tags>
      </div>
      <div class="content">
        <transition name="move" mode="out-in">
          <keep-alive :include="tagsList">
            <router-view></router-view>
          </keep-alive>
        </transition>
      </div>
    </div>
    <div style="min-height: 100%;margin-bottom: -95px;"></div>
    <div class="main-footer">
      青岛洁时代&nbsp;&nbsp;山东科技大学校企合作项目&nbsp;&nbsp;&nbsp;&nbsp;
    </div>
  </div>
</template>

<script>
import vHead from './Header'
import vSidebar from './Sidebar'
import vTags from './Tags'
import bus from './bus'

export default {
  name: 'Main',
  data () {
    return {
      tagsList: [],
      collapse: false
    }
  },
  components: {
    vHead, vSidebar, vTags
  },
  created () {
    bus.$on('collapse', msg => {
      this.collapse = msg
    })
    // 只有在标签页列表里的页面才使用keep-alive，即关闭标签之后就不保存到内存中了。
    bus.$on('tags', msg => {
      let arr = []
      for (let i = 0, len = msg.length; i < len; i++) {
        msg[i].name && arr.push(msg[i].name)
      }
      this.tagsList = arr
    })
  }
}
</script>

<style lang="less" scoped>
  .background-img {
    background-image: url("../assets/img/register.jpg");
    //background-size: 100% 100%;
    background-attachment: fixed;
    background-repeat: no-repeat;
    background-size: cover;
  }
  .content-box {
    position: absolute;
    left: 250px;
    right: 0;
    top: 80px;
    bottom: 0;
    padding-bottom: 60px;
    -webkit-transition: left .3s ease-in-out;
    transition: left .3s ease-in-out;
  }

  .content {
    width: auto;
    height: 100%;
    padding: 10px 10px 0 10px;
    overflow-y: hidden;
    box-sizing: border-box;
  }

  .content-tags {
    padding: 0 10px;
  }

  .content-collapse {
    left: 65px;
  }

  .main-footer {
    border-radius: 5px;
    background: rgba(255, 255, 255, 0.8);
    color: #000;
    height: 25px;
    font-size: 13px;
    text-align: right;
  }
</style>
