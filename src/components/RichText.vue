<template>
  <div class="rich-text">
    <editor v-model="myValue" :init="init" :disabled="disabled" @onClick="onClick"></editor>
  </div>
</template>

<script>
import tinymce from 'tinymce/tinymce' // init
import 'tinymce/themes/silver'
import 'tinymce/icons/default/icons' // 解决icons.js报错
import Editor from '@tinymce/tinymce-vue' // 组件化
import 'tinymce/plugins/link'
import 'tinymce/plugins/image' // 插入图片
import 'tinymce/plugins/imagetools' // 插入图片工具
import 'tinymce/plugins/media'// 插入视频插件
import 'tinymce/plugins/table'// 插入表格插件
import 'tinymce/plugins/lists'// 列表插件
import 'tinymce/plugins/wordcount'// 字数统计插件
export default {
  name: 'RichText',
  components: {
    Editor
  },
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    height: {
      type: String,
      default: '300'
    },
    value: {
      type: String,
      default: ''
    },
    plugins: {
      type: [String, Array],
      default: 'lists image imagetools link media table wordcount'
    },
    toolbar: {
      type: [String, Array],
      default: 'undo redo |  formatselect | bold italic forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | lists link image media table | removeformat'
    }
  },
  data: function () {
    return {
      init: {
        language_url: '/static/tinymce/zh_CN.js',
        language: 'zh_CN',
        skin_url: '/static/tinymce/skins/ui/oxide',
        content_css: `/static/tinymce/skins/content/default/content.css`,
        height: this.height,
        plugins: this.plugins,
        toolbar: this.toolbar,
        branding: false,
        menubar: false,
        file_picker_types: 'image',
        file_picker_callback: function (callback, value, meta) {
          var input = document.createElement('input')
          input.setAttribute('type', 'file')
          input.setAttribute('accept', 'image/*')
          input.onchange = function () {
            var file = this.files[0]
            var reader = new FileReader()
            reader.onload = function () {
              var id = 'blobid' + (new Date()).getTime()
              var blobCache = tinymce.activeEditor.editorUpload.blobCache
              var base64 = reader.result.split(',')[1]
              var blobInfo = blobCache.create(id, file, base64)
              blobCache.add(blobInfo)
              callback(blobInfo.blobUri(), { title: file.name })
            }
            reader.readAsDataURL(file)
          }
          input.click()
        }
      },
      content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
      myValue: this.value
    }
  },
  methods: {
    onClick (e) {
      this.$emit('onClick', e, tinymce)
    }
  },
  mounted () {
    tinymce.init({
    })
  }
}
</script>

<style scoped>
  #myToolBar {
    height: 150px;
  }

</style>
