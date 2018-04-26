<template>
  <div id="testQuillEditor" class="testQuillEditor">
    <QuillEditor :editorData="content" :editorFinish="contentHandle"></QuillEditor>
  </div>
</template>

<script>
  import QuillEditor from '@/components/common/QuillEditor'
  export default {
    name:'testQuillEditor',
    components: {
      QuillEditor
    },
    data () {
      return {
        content:'hello world'
      }
    },
    methods: {
      contentHandle(html,text){
        console.log(html,text)
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .testQuillEditor {
    width: 50%;
    margin: 0 auto;
  }
</style>
