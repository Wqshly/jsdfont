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
        <div class="user-avatar">
          <el-image class="img" :src="imgUrl"></el-image>
        </div>
        <!-- 用户名下拉菜单 -->
        <el-dropdown class="user-name" trigger="click" @command="handleCommand">
                    <span class="el-dropdown-link">
                        {{username}} <i class="el-icon-caret-bottom"></i>
                    </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="changeImg">更换头像</el-dropdown-item>
            <el-dropdown-item divided command="loginOut">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
import ImgUpload from '@/components/ImgUpload'
import bus from '@/components/bus'

export default {
  components: {
    ImgUpload
  },
  name: 'Header',
  data () {
    return {
      collapse: false,
      fullscreen: false,
      message: 1,
      imgUrl: ''
    }
  },
  computed: {
    username () {
      let username = sessionStorage.getItem('save_username')
      return username || this.name
    }
  },
  methods: {
    async uploadPic (data) {
      this.$api.requestApi.post('/user/imageUpload/', data)
        .then(res => {
          this.registerForm.picLocation = res.data
          console.log(this.registerForm.picLocation)
        })
        .catch(err => {
          console.log(err)
        })
    },
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
      if (command === 'changeImg') {
      }
      if (command === 'loginOut') {
        sessionStorage.removeItem('save_user_id')
        sessionStorage.removeItem('save_username')
        this.$router.push('/login')
      }
    }
  },
  mounted () {
    if (document.body.clientWidth < 1500) {
      this.collapseChage()
    }
  },
  created () {
    let id = sessionStorage.getItem('save_user_id')
    let url = 'user/getImgUrl/' + id
    this.$api.requestApi.get(url).then(res => {
      this.imgUrl = res.data
    })
  }
}
</script>

<style scoped lang="less">
  @import "../style/style";
  .header {
    position: relative;
    box-sizing: border-box;
    width: 100%;
    height: 70px;
    font-size: 22px;
    color: #fff;
    border-radius: 5px;
    background: rgba(255, 255, 255, .2);
    box-shadow: 3px 3px 6px 3px rgba(0, 0, 0, .1);
  }

  .collapse-btn {
    float: left;
    padding: 0 21px;
    width: 40px;
    cursor: pointer;
    line-height: 70px;
  }

  .header .tips {
    float: left;
    line-height: 70px;
    font-size: 15px;
  }

  .header .hide-tips {
    display: none;
  }

  .header .logo {
    float: left;
    line-height: 70px;
  }

  .header .header-right {
    float: right;
    padding-right: 50px;
  }

  .header-user-control {
    display: flex;
    height: 70px;
    align-items: center;
  }

  .message-tips, .btn-fullscreen {
    position: relative;
    width: 30px;
    height: 30px;
    text-align: center;
    border-radius: 15px;
    cursor: pointer;
  }

  .btn-fullscreen {
    transform: rotate(45deg);
    margin-right: 5px;
    font-size: 24px;
  }

  .message-tips .el-icon-bell {
    color: #fff;
  }

  .message-tips-badge {
    position: absolute;
    right: 0;
    top: -2px;
    width: 8px;
    height: 8px;
    border-radius: 4px;
    background: #f56c6c;
    color: #fff;
  }

  .user-avatar {
    margin-left: 20px;
    cursor: pointer;
  }

  .user-avatar .img {
    display: block;
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }

  .el-dropdown-link {
    color: #fff;
    cursor: pointer;
  }

  .user-name {
    margin-left: 10px;
  }
</style>
