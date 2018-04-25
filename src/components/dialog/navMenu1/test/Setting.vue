<template>
  <div class="test" id="test">
    <div style="max-height: 150px;overflow-y: scroll;">
      <div class="box head">
        <div>序号</div>
        <div>展示字段</div>
        <div>
          列显示
          <el-checkbox></el-checkbox>
        </div>
        <div>筛选</div>
      </div>
      <el-draggable v-model="list" class="body" :options="{group:'people'}" :move="getdata" @update="datadragEnd">
        <div v-for="(e,index) in list" :title="e.title" :name="e.name" :key="e.id" class="box">
          <div>{{e.id}}</div>
          <div>{{e.title}}</div>
          <div>
            <el-checkbox></el-checkbox>
          </div>
          <div>筛选</div>
        </div>
      </el-draggable>
    </div>
    <div style="text-align: right;margin-top: 10px;">
      <el-button type="primary" size="mini" @click="closeHandle">重置</el-button>
      <el-button type="primary" size="mini" @click="onSubmit" :loading="loading">提交</el-button>
    </div>
  </div>
</template>

<script>
  import testService from '@/service/navMenu1/testService'
  export default {
    name: 'test',
    props: ['formSubmit','popData','dialogHandleClose'],
    data() {
      return {
        loading:false,
        activeNames:'',
        list:[
          {
            id:1,
            name:'name',
            title:'title1'
          },
          {
            id:2,
            name:'name',
            title:'title2'
          },
          {
            id:3,
            name:'name',
            title:'title3'
          },
          {
            id:4,
            name:'name',
            title:'title4'
          },
          {
            id:5,
            name:'name',
            title:'title2'
          },
          {
            id:6,
            name:'name',
            title:'title3'
          },
          {
            id:7,
            name:'name',
            title:'title4'
          },
        ],
      }
    },
    created(){
    },
    methods:{
      closeHandle(){
        this.dialogHandleClose()
      },
      onSubmit(){
        this.loading=true
//        testService.test(this.form, this, (res) => {
//          let data = res.body
//          if(data.status===0){
//            this.$message({
//              type: 'success',
//              message: '操作成功!'
//            });
            this.formSubmit()
//          } else {
//            this.$message({
//              type: 'erroe',
//              message: '操作失败!'
//            });
//          }
//          this.loading=false
//        })
      },
      getdata (evt) {
        console.log(evt.draggedContext.element.id)
      },
      datadragEnd (evt) {
        console.log('拖动前的索引 :' + evt.oldIndex)
        console.log('拖动后的索引 :' + evt.newIndex)
        console.log(this.list)
      },
    }
  }
</script>
<style scoped>
  .box {
    display: flex;
    width: 100%;
    min-width:400px;
    justify-content: space-between;
  }
  .box > div {
    height:30px;
    line-height: 30px;
    flex: 2;
    border-top: 1px solid #c9cbd2;
    border-right:1px solid #c9cbd2;
  }
  .box > div:nth-child(1) {
    border-left: 1px solid #c9cbd2;
    flex:1;
  }
  .box > div:nth-child(2) {
    flex:3;
  }
  .body > div:last-child {
    border-bottom: 1px solid #c9cbd2;
  }
  .head{
    background-color: #e6e9e9;
  }
</style>

