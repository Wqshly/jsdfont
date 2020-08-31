<template>
  <div>
    <el-form style="background-color: #FFFFFF;overflow:auto;">
      <div class="title">
        <p>添&nbsp;加&nbsp;文&nbsp;章</p>
      </div>
      <el-card style="height: 700px;margin: 15px;">
        <quill-editor ref="myQuillEditor" v-model="content" style="height: 600px;" :options="editorOption"/>
      </el-card>
      <el-form-item style="padding-top: 15px;padding-bottom: 10px">
        <el-button style="float: right; margin-right: 10px;width: 100px;" type="primary" @click="submit">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

export default {
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
  }
</style>
