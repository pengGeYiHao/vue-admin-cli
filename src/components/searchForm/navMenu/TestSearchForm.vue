<template>
  <div class="testSearch" id="testSearch">
    <el-collapse accordion @change="collapseHandle" v-model="activeNames">
      <el-collapse-item name="true">
        <template slot="title">
          <div style="display: flex;justify-content: space-between;padding-right:10px;background-color: #f3f3f3">
            <div style="font-size: 22px;width:50px;">
              <i class="el-icon-tickets"></i>
            </div>
            <span>{{collapseName}}</span>
          </div>
        </template>
        <el-form :model="form" size="small">
          <div style="display: flex;flex-wrap: wrap;justify-content: space-between;">
            <el-form-item label="筛选1:" :label-width="'100px'">
              <el-input v-model="form.f1" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="筛选2:" :label-width="'100px'">
              <el-select v-model="form.f2" placeholder="请选择" style="width: 100%;">
                <el-option
                  label="全部"
                  value="all"
                >
                </el-option>
                <el-option
                  label="正常"
                  value="normal"
                >
                </el-option>
                <el-option
                  label="停用"
                  value="disable"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="筛选3:" :label-width="'100px'">
              <el-input v-model="form.f3" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="时间:" :label-width="'100px'">
              <el-date-picker
                v-model="form.time"
                type="daterange"
                align="right"
                unlink-panels
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :picker-options="pickerOptions">
              </el-date-picker>
            </el-form-item>
            <el-button-group style="margin-bottom: 20px;padding-left:100px;">
              <el-button type="primary" size="mini" icon="el-icon-search" @click="searchOnChange">搜索</el-button>
              <el-button type="primary" size="mini" @click="reverseHandle">操作2</el-button>
              <el-button type="primary" size="mini" @click="settingDialog('setting')">操作3</el-button>
              <el-button type="primary" size="mini" @click="seniorFilterDialog">高级</el-button>
              <el-button type="primary" size="mini" @click="exportHandle">导出</el-button>
            </el-button-group>
          </div>
        </el-form>
      </el-collapse-item>
    </el-collapse>
    <!--弹窗================================= -->
    <el-dialog
      :title="dialogTitle+'窗口'"
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="dialogHandleClose">
      <template>
        <div v-if="dialogTitle=='操作1'">
          <FilterDialog :formSubmit="formSubmit" :popData="popData" :dialogHandleClose="dialogHandleClose"></FilterDialog>
        </div>
        <div v-if="dialogTitle=='操作2'">
          <SettingDialog :formSubmit="formSubmit" :popData="popData" :dialogHandleClose="dialogHandleClose"></SettingDialog>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script>
  import testService from '@/service/navMenu1/testService'


  import {getTime, formatTimeYYMMDD} from '@/utils'


  //  弹窗
  import FilterDialog from '@/components/dialog/navMenu1/test/Filter'
  import SettingDialog from '@/components/dialog/navMenu1/test/Setting'


  export default {
    name: 'testSearch',
    props: ['fetchData','formData'],
    components: {
      FilterDialog,
      SettingDialog,
    },
    data() {
      return {
        form: {
          f1:'',
          f2:'',
          f3:'',
          time: ['', '']
        }, //查询条件

        getListParams: {},//获取列表数据请求参数
        pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        dialogTitle: '', // 弹窗名字
        dialogVisible: false, //弹窗是否显示
        popData: {}, //传递弹窗的数据

        collapseName:'收起筛选',//
        activeNames:['true']
      }
    },
    created() {
      this.setSearchParams()
    },
    methods: {
      getTime,
      formatTimeYYMMDD,
      setSearchParams(){ //设置搜索默认值
        let o = {}
        this.getListParams = {...this.formData}
        Object.keys(this.form).forEach((key)=>{
          if(key === 'time'){
            o.time=[this.formData.startTime,this.formData.endTime]
          }else {
              o[key]=this.formData[key]
          }
        })
        this.form = o
      },
      reverseHandle(data) {
        let self=this
        this.$confirm('确定要xx吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
//          testService.test({}, this, (res) => {
//            let data = res.body
//            if(data.status===0){
//              this.$message({
//                type: 'success',
//                message: '操作成功!'
//              });
//              self.fetchData()
//            } else {
//              this.$message({
//                type: 'erroe',
//                message: '操作失败!'
//              });
//            }
//          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          });
        });
      },
      exportHandle(data) {
        let self=this
        this.$confirm('确定要导出excel吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
//          testService.test({id:data.id}, this, (res) => {
//            let data = res.body
//            if(data.status===0){
//              this.$message({
//                type: 'success',
//                message: '操作成功!'
//              });
//              self.fetchData()
//            } else {
//              this.$message({
//                type: 'erroe',
//                message: '操作失败!'
//              });
//            }
//          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          });
        });
      },
      seniorFilterDialog(data) {
        this.dialogVisible = true
        this.dialogTitle = '操作1'
        this.popData = data
      },
      settingDialog(data) {
        this.dialogVisible = true
        this.dialogTitle = '操作2'
        this.popData = data
      },
      searchOnChange() {
        let startT = this.form.time[0]
        let endT = this.form.time[1]
        if (startT != '' && endT != '') {
          this.getListParams.startTime = this.formatTimeYYMMDD(new Date(startT).toLocaleDateString().split('/'))
          this.getListParams.endTime = this.formatTimeYYMMDD(new Date(endT).toLocaleDateString().split('/'))
        } else {
          this.getListParams.startTime = ''
          this.getListParams.endTime = ''
        }
        this.getListParams.currentPage = 1
        Object.keys(this.form).forEach((key)=>{
          if(key != 'time'){
            this.getListParams[key]=this.form[key]
          }
        })

        //当传递isFirstPage为true时表示不是，这时如果不是第一页，应该跳转到第一页
//
        if (this.$route.params.page == 1) {
          this.fetchData(this.getListParams)
        } else {
          this.fetchData(this.getListParams,{isFirstPage:true})
        }
      },
      dialogHandleClose(done) {
        this.dialogTitle = ''
        this.popData = {}
        if(done){
          done()
        }else {
          this.dialogVisible=false
        }
      },
      formSubmit() {
        this.dialogVisible = false
        this.dialogTitle = ''
        this.popData = {}
        this.fetchData()
      },
      collapseHandle(val){
        if(val){
          this.collapseName='收起筛选'
        }else {
          this.collapseName='展开筛选'
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
