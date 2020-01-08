<template>
  <div class="header">
    <!-- 折叠按钮 -->
    <div class="collapse-btn" @click="collapseChage">
      <el-tooltip effect="dark" :content="collapse?`展开侧边栏`:`折叠侧边栏`" placement="bottom">
        <i :class="[collapse?'el-icon-d-arrow-right':'el-icon-d-arrow-left']"></i>
      </el-tooltip>
    </div>
    <div class="logo">洁时代家政服务项目管理信息平台</div>
    <div class="header-right">
      <div class="header-user-control">
        <!-- 全屏显示 -->
        <div class="btn-fullscreen" @click="fullScreen">
          <el-tooltip effect="dark" :content="fullscreen?`取消全屏`:`全屏`" placement="bottom">
            <i class="el-icon-rank"></i>
          </el-tooltip>
        </div>
        <!-- 消息中心 -->
        <div class="message-tips">
          <el-tooltip effect="dark" :content="message?`有${message}条未读消息`:`消息中心`" placement="bottom">
            <router-link to="/message">
              <i class="el-icon-bell"></i>
            </router-link>
          </el-tooltip>
          <!-- 若有消息，则红点提示 -->
          <span class="message-tips-badge" v-if="message"></span>
        </div>
        <!-- 用户头像 -->
        <div class="user-avatar"><img src="../assets/img/img.jpg"></div>
        <!-- 用户名下拉菜单 -->
        <el-dropdown class="user-name" trigger="click" @command="handleCommand">
                    <span class="el-dropdown-link">
                        {{username}} <i class="el-icon-caret-bottom"></i>
                    </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item divided  command="loginout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
import bus from './bus'
export default {
  name: 'Header',
  data () {
    return {
      collapse: false,
      fullscreen: false,
      message: 1
    }
  },
  computed: {
    username () {
      let username = sessionStorage.getItem('save_username')
      return username || this.name
    }
  },
  methods: {
    // 侧边栏折叠
    collapseChage () {
      this.collapse = !this.collapse
      bus.$emit('collapse', this.collapse)
    },
    // 全屏事件
    fullScreen () {
      const docElement = document.documentElement
      if (this.fullscreen) {
        if (document.exitFullscreen) {
          document.exitFullscreen()
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen()
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen()
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen()
        }
      } else {
        if (docElement.requestFullscreen) {
          docElement.requestFullscreen()
        } else if (docElement.webkitRequestFullScreen) {
          docElement.webkitRequestFullScreen()
        } else if (docElement.mozRequestFullScreen) {
          docElement.mozRequestFullScreen()
        } else if (docElement.msRequestFullscreen) {
          // IE11
          docElement.msRequestFullscreen()
        }
      }
      this.fullscreen = !this.fullscreen
    },
    // 用户名下拉菜单选择事件
    handleCommand (command) {
      if (command === 'loginout') {
        // localStorage.removeItem('save_username')
        sessionStorage.removeItem('save_username')
        this.$router.push('/login')
      }
    }
  },
  mounted () {
    if (document.body.clientWidth < 1500) {
      this.collapseChage()
    }
  }
}
</script>

<style scoped lang="less">
  .header {
    position: relative;
    box-sizing: border-box;
    width: 100%;
    height: 70px;
    font-size: 22px;
    color: #fff;
    background-color: #283c50;
  }
  .collapse-btn {
    float: left;
    padding: 0 21px;
    width:40px;
    cursor: pointer;
    line-height: 70px;
  }
  .header .tips {
    float: left;
    line-height: 70px;
    font-size: 15px;
  }
  .header .hide-tips {
    display:none;
  }
  .header .logo{
    float: left;
    line-height: 70px;
  }
  .header .header-right{
    float: right;
    padding-right: 50px;
  }
  .header-user-control{
    display: flex;
    height: 70px;
    align-items: center;
  }
  .message-tips, .btn-fullscreen{
    position: relative;
    width: 30px;
    height: 30px;
    text-align: center;
    border-radius: 15px;
    cursor: pointer;
  }
  .btn-fullscreen{
    transform: rotate(45deg);
    margin-right: 5px;
    font-size: 24px;
  }
  .message-tips .el-icon-bell{
    color: #fff;
  }
  .message-tips-badge{
    position: absolute;
    right: 0;
    top: -2px;
    width: 8px;
    height: 8px;
    border-radius: 4px;
    background: #f56c6c;
    color: #fff;
  }
  .user-avatar{
    margin-left: 20px;
    cursor: pointer;
  }
  .user-avatar img{
    display: block;
    width:40px;
    height:40px;
    border-radius: 50%;
  }
  .el-dropdown-link{
    color: #fff;
    cursor: pointer;
  }
  .user-name{
    margin-left: 10px;
  }
</style>
