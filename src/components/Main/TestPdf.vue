<template>
  <div class="pdfDialog" id="pdfDialog">

    <el-button type="text" @click="dialogVisible = true">点击打开 Dialog</el-button>

    <el-dialog
      title="pdf 弹窗"
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="handleClose"
    >
      <div>


        <el-button @click="enlargeHandle">+</el-button>
        <el-button @click="narrowHandle">-</el-button>
        <el-button @click="coverHandle">全屏</el-button>
        <el-button @click="rotateHandle">旋转</el-button>
        <el-button>下载</el-button>
        <el-button @click="$refs.myPdfComponent.print()">打印</el-button>
        <div>
          <!--{{currentPage}} / {{pageCount}}-->
          共 {{pageCount}} 页
        </div>
        <div
          style="max-height:400px;overflow-y: scroll;display: flex;flex-direction: column;align-items: center;background-color: #2c3e50;"
        >
          <pdf
            v-for="i in numPages"
            :key="i"
            :src="src"
            :style="{display: 'inline-block', width: width+'%',margin:'10px'}"
            :page="i"
            :rotate="rotateValue"
            @num-pages="pageCount = $event"
            @page-loaded="currentPage = $event"
          ></pdf>
          <pdf
            :src="src"
            ref="myPdfComponent"
            :style="{display: 'none'}"
          ></pdf>
        </div>

      </div>
    </el-dialog>
  </div>
</template>

<script>

  import pdf from 'vue-pdf'
  export default {
    name: 'pdfDialog',
    components: {
      pdf
    },
    data() {
      return {
        pageCount: 0,
        currentPage: 0,
        src: '',
        numPages: undefined,
        width:50,
        rotateValue:0,


        dialogVisible: false
      }
    },
    created(){
      const loadingTask = pdf.createLoadingTask('../../../static/test1.pdf');
      this.src=loadingTask
    },
    mounted() {

      this.src.then(pdf => {

        this.numPages = pdf.numPages;
      });
    },
    methods: {
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {
          });
      },
      enlargeHandle(){
        if(this.width >=500){
            return;
        }
        let w = this.width
        this.width = w + 10
      },
      narrowHandle(){
        if(this.width <= 20){
          return;
        }
        let w = this.width
        this.width = w - 10
      },
      coverHandle(){
        this.width = 100
      },
      rotateHandle(){
        let r = this.rotateValue
        console.log((r + 90) % 360)
        this.rotateValue = (r + 90) % 360
      },
      printHandle(){
        this.$refs.myPdfComponent.print()
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
