<template>
  <div style="height: 100%;overflow: auto;background: #f5f5f5;">
    <div class="article-header">
      <div class="info-header"></div>
    </div>
    <el-form style="background: #f5f5f5;padding-right: 30px;padding-top: 100px" label-width="100px">
      <div class="title">
        <p>添&nbsp;加&nbsp;文&nbsp;章</p>
      </div>
      <el-form-item label="正文标题:">
        <el-input></el-input>
      </el-form-item>
      <el-form-item label="所属类别:">
        <el-select placeholder="请选择"></el-select>
      </el-form-item>
      <el-form-item label="作者:">
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
        <el-card>
          <editor id="tinymce" v-model="tinymceHtml" :init="editorInit"></editor>
        </el-card>
      </el-form-item>
      <el-form-item style="padding-top: 15px;padding-bottom: 10px">
        <el-button style="float: right; margin-right: 10px;width: 100px;" type="primary" @click="submit">提交</el-button>
        <el-button style="float: right; margin-right: 10px;width: 100px;" @click="preview">预览</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import ImgUpload from '@/components/ImgUpload'
import tinymce from 'tinymce/tinymce'
import 'tinymce/themes/silver'
import 'tinymce/icons/default/icons'
import Editor from '@tinymce/tinymce-vue'

export default {
  components: {
    ImgUpload,
    Editor
  },
  name: 'articleAdd',
  data: function () {
    return {
      editorOption: {
        placeholder: '输入文章内容'
      },
      articleForm: {

      },
      editorInit: {
        language_url: '/static/tinymce/zh_CN.js',
        language: 'zh_CN',
        skin_url: '/static/tinymce/skins/ui/oxide',
        content_css: `/static/tinymce/skins/content/default/content.css`,
        height: 300,
        branding: false,
        menubar: false
      }
    }
  },
  methods: {
    submit () {},
    preview () {}
  },
  mounted () {
    tinymce.init({})
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

  .article-header {
    right: 17px;
    display: block;
    position: absolute;
    box-sizing: border-box;
    width: 100%;
    height: 100px;
    font-size: 22px;
    color: #fff;
    border-radius: 5px;
    background: #FFFFFF;
    box-shadow: 3px 3px 6px 3px rgba(0, 0, 0, .1);
    z-index: 1;
  }

  .info-header {
    position: fixed;
    z-index: 2;
    width: 100%;
    top: 0;
    height: 60px;
    background-color: #fff;
    box-shadow: 0 1px 4px 0 rgba(238,238,238,0.5);
  }

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
