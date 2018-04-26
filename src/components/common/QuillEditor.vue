<template>
  <div id="quillEditor" class="quillEditor">
    <section class="container">
      <div class="quill-editor"
           :content="content"
           @change="onEditorChange($event)"
           @blur="onEditorBlur($event)"
           @focus="onEditorFocus($event)"
           @ready="onEditorReady($event)"
           v-quill:myQuillEditor="editorOption">
      </div>
    </section>
  </div>
</template>

<script>
  export default {
    name:'quillEditor',
    props: ['editorData','editorFinish'],
    data () {
      return {
        content: '',
        editorOption: {
          modules: {
            toolbar: [
              ['bold', 'italic', 'underline', 'strike'], // 加粗、倾斜、下划线、删除线
              ['blockquote', 'code-block'], //块引用、代码块
              [{ 'header': 1 }, { 'header': 2 }], //标题1、标题2
              [{ 'list': 'ordered' }, { 'list': 'bullet' }], //ul ol
              [{ 'script': 'sub' }, { 'script': 'super' }],// 对数 平方
              [{ 'indent': '-1' }, { 'indent': '+1' }], //左右移动
              [{ 'direction': 'rtl' }], //方向
              [{ 'size': ['small', false, 'large', 'huge'] }], //字体大小
              [{ 'header': [1, 2, 3, 4, 5, 6, false] }], //标题
              [{ 'font': [] }],//字体
              [{ 'color': [] }, { 'background': [] }], //颜色
              [{ 'align': [] }], //对齐方式
              ['clean'], //清楚所有设置
              ['link', 'image', 'video'] //链接、图片、视频
            ],
            syntax: {
              highlight: text => hljs.highlightAuto(text).value
            }
          }
        }
      }
    },
    mounted() {
      console.log('app init, my quill insrance object is:', this.myQuillEditor)
      this.content = this.editorData || ''
    },
    methods: {
      onEditorBlur(editor) {
        console.log('失去焦点!', editor)
      },
      onEditorFocus(editor) {
        console.log('获得焦点!', editor)
      },
      onEditorReady(editor) {
        console.log('准备好了!', editor)
      },
      onEditorChange({ editor, html, text }) {
//        console.log('改变!', editor, html, text)
        this.content = html
        this.editorFinish && this.editorFinish(html,text)
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .container {
    width: 100%;
    margin: 0 auto;
    padding: 50px 0;
    .quill-editor {
      min-height: 200px;
      max-height: 400px;
      overflow-y: auto;
    }
  }
</style>
