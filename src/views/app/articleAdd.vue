<template>
  <div style="height: 100%">
    <el-form style="background-color: #FFFFFF;height: 100%;overflow:auto;padding-right: 30px;" label-width="100px">
      <div class="title">
        <p>添&nbsp;加&nbsp;文&nbsp;章</p>
      </div>
      <el-form-item label="正文标题:">
        <el-input></el-input>
      </el-form-item>
      <el-form-item label="简介:">
        <el-input></el-input>
      </el-form-item>
      <el-form-item label="正文图片:">
        <div class="avatar-uploader">
          <img-upload v-on:upload-pic="uploadPic"></img-upload>
        </div>
      </el-form-item>
      <el-form-item label="正文内容:">
        <el-card style="height: 700px;">
          <quill-editor ref="myQuillEditor" v-model="content" style="height: 600px;" :options="editorOption"/>
        </el-card>
      </el-form-item>
      <el-form-item style="padding-top: 15px;padding-bottom: 10px">
        <el-button style="float: right; margin-right: 10px;width: 100px;" type="primary" @click="submit">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import ImgUpload from '@/components/ImgUpload'

export default {
  components: {
    ImgUpload
  },
  name: 'articleAdd',
  data: function () {
    return {
      editorOption: {
        placeholder: '输入文章内容'
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .title {
    text-align: center;
    height: 50px;
    font-size: 28px;
    margin-top: 15px;
  }
</style>

<style lang="less">
  .avatar-uploader {
    float: left;
  }

  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  .avatar-uploader-icon {
    background: rgba(255, 255, 255, 0.5);
    border: 2px dashed #8c939d;
    font-size: 28px;
    color: #8c939d;
    width: 120px;
    height: 120px;
    line-height: 120px;
    text-align: center;
  }

  .avatar {
    width: 120px;
    height: 120px;
    display: block;
  }
</style>
