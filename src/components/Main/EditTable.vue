<template>
  <div class="editTable" id="editTable">
    <NoPageSearchForm :fetchData="fetchData" :formData="getListDefaultParams"></NoPageSearchForm>
    <div
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      class="main-table"
    >
      <template v-if="tableData.length !=0">
        <el-table
          :data="tableData"
          stripe
          border
          style="width: 100%"
          v-loading="loading"
          element-loading-text="拼命加载中"
          @selection-change="handleSelectionChange"
        >
          <el-table-column
            type="selection"
            width="55"
            fixed="left"
          >
          </el-table-column>
          <el-table-column
            label="标题1"
            fixed="left"
          >
            <template slot-scope="scope">
              <div>
                <el-input v-model="scope.row.t1" placeholder="请输入..."></el-input>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            label="标题2"
            width="110">
            <template slot-scope="scope">
              <div>
                <el-input v-model="scope.row.t2" placeholder="请输入..."></el-input>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            label="标题3"
            width="110">
            <template slot-scope="scope">
              <div>
                <el-input v-model="scope.row.t3" placeholder="请输入..."></el-input>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            label="标题4"
            width="110">
            <template slot-scope="scope">
              <div>
                <el-input v-model="scope.row.t4" placeholder="请输入..."></el-input>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            label="标题5">
            <template slot-scope="scope">
              <div>
                <el-select v-model="scope.row.t5" placeholder="请选择" style="width: 100%;">
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
              </div>
            </template>
          </el-table-column>
          <el-table-column
            label="标题6">
            <template slot-scope="scope">
              <div>
                <el-input v-model="scope.row.t6" placeholder="请输入..."></el-input>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            label="标题7">
            <template slot-scope="scope">
              <div>
                <el-input v-model="scope.row.t7" placeholder="请输入..."></el-input>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            width="250"
            fixed="right"
          >
            <template slot-scope="scope">
              <div class="operation">
                <el-button-group>
                  <el-button type="primary" size="mini" @click="()=>delHandle(scope)">删除</el-button>
                  <el-button type="primary" size="mini">操作一</el-button>
                  <el-button type="primary" size="mini">操作二</el-button>
                </el-button-group>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <div style="display: flex;height:50px;justify-content: space-between;align-items: center;padding: 0px 34px;background-color: #fff;">
          <i class="el-icon-plus" @click="addDataHandle"></i>
          <el-button type="primary" size="mini" @click="saveHandle">保存</el-button>
        </div>
        <el-row :gutter="24" type="flex" justify="space-between" align="middle" class="main-footer">
          <el-col :span="4">
            <el-dropdown trigger="click" @command="handleCommand">
              <el-button size="mini">
                {{batchOperation?batchOperation:'批量操作'}}<i class="el-icon-caret-bottom"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="操作1">操作1</el-dropdown-item>
                <el-dropdown-item command="操作2">操作2</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <el-button type="primary" size="mini" @click="batchOperationHandel">确定</el-button>
          </el-col>
          <!--<el-col :span="20">-->
            <!-- 分页================================ -->
            <!--<el-pagination-->
              <!--@size-change="handleSizeChange"-->
              <!--@current-change="handleCurrentChange"-->
              <!--:current-page="getListDefaultParams.currentPage"-->
              <!--:page-sizes="[10, 30, 50]"-->
              <!--:page-size="getListDefaultParams.pageSize"-->
              <!--layout="total, sizes, prev, pager, next, jumper"-->
              <!--:total="pageTotal">-->
            <!--</el-pagination>-->
          <!--</el-col>-->
        </el-row>
      </template>
      <NoData v-else="tableData.length == 0"></NoData>
    </div>
    <!--弹窗================================= -->
    <el-dialog
      :title="dialogTitle+'窗口'"
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="dialogHandleClose">
      <template>
        <!--<div v-if="dialogTitle=='操作1'">-->
          <!--<BusinessConfig :formSubmit="formSubmit" :popData="popData" :dialogHandleClose="dialogHandleClose"></BusinessConfig>-->
        <!--</div>-->
        <!--<div v-if="dialogTitle=='操作2'">-->
          <!--<CallConfig :formSubmit="formSubmit" :popData="popData" :dialogHandleClose="dialogHandleClose"></CallConfig>-->
        <!--</div>-->
      </template>
    </el-dialog>
  </div>
</template>

<script>
  import testService from '@/service/navMenu1/testService'
  import {getTime, formatTimeYYMMDD,isObjectKeysNull} from '@/utils'

  // 面包屑
  import Breadcrumb from '@/components/common/Breadcrumb'
  // 无数据时组件
  import NoData from '@/components/common/NoData'
  //搜索栏
  import NoPageSearchForm from '@/components/searchForm/NoPageSearchForm'

  //  弹窗
  import BusinessConfig from '@/components/dialog/navMenu1/test/BusinessConfig'
  import CallConfig from '@/components/dialog/navMenu1/test/CallConfig'


  export default {
    name: 'editTable',
    components: {
      Breadcrumb,
      NoData,
      BusinessConfig,
      CallConfig,
      NoPageSearchForm
    },
    data() {
      return {

        tableData: [], //数据列表
        loading: false, //loading状态
        getListDefaultParams: { //获取列表数据默认参数    尽量在fetchData 里操作getListDefaultParams，其他地方不要操作，避免混乱
          f1:'f1',
          f2:'normal',
          f3:'f3',
          startTime:'',
          endTime:''
        },

        dialogTitle: '', // 弹窗名字
        dialogVisible: false, //弹窗是否显示
        popData: {}, //传递弹窗的数据

        batchOperation:'', //批量操作名称
        batchItems:[], //批量操作数据

        showInput:false, //是否显示添加的input 默认不显示
      }
    },
    created() {
      this.fetchData()
    },
    watch: {
      // 如果路由有变化，会再次执行该方法
      '$route': 'watchRoute'
    },
    methods: {
      watchRoute(){
        this.fetchData()
      },
      fetchData(data,page) {
        // 保存筛选条件
        if(data){
          this.getListDefaultParams={...data}
        }
        // 发送请求
        let self = this
//        this.loading = true
        console.log(this.getListDefaultParams)
        let arr = [{
          t1:'1',
          t2:'1',
          t3:'1',
          t4:'1',
          t5:'',
          t6:'1',
          t7:'1',
        }] //这里需要后台返回
        this.tableData=arr
//        testService.getList(params, this, (res) => {
//          let data = res.body.data.result
//          if (data.status === 0) {
//            self.loading = false
//          }
//        })
      },
      getTime,
      formatTimeYYMMDD,
      isObjectKeysNull,
      handleSelectionChange(items){
        this.batchItems=items
      },
      handleCommand(command){
        this.batchOperation = command
      },
      addDataHandle(){
        let arr = [...this.tableData]
        arr.push({
          t1:'',
          t2:'',
          t3:'',
          t4:'',
          t5:'',
          t6:'',
          t7:'',
        })
        this.tableData=arr
      },
      saveHandle(){
        let data = []

        this.tableData.forEach((item,index)=>{
            if(!isObjectKeysNull(this.tableData[index])){
                data[data.length]=this.tableData[index]
            }
        })
        console.log(data)
        //这里发送添加请求，成功后获取列表数据
//        this.fetchData()

      },
      delHandle(scope){
        let data = [...this.tableData]
        data.splice(scope.$index,1)
        this.tableData = data
      },
      batchOperationHandel(){
        //这里发送批量操作请求
        console.log(this.batchItems)
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
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .el-icon-plus {
    cursor: pointer;
  }
</style>
