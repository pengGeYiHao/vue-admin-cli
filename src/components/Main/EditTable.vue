<template>
  <div class="editTable" id="editTable">
    <TestSearchForm :fetchData="fetchData" :formData="getListDefaultParams"></TestSearchForm>
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
              <div v-if="scope.row.type === 'add'">
                <el-input v-if="showInput" v-model="addTableParams.t1"></el-input>
                <i v-else class="el-icon-plus" @click="showInput = true"></i>
              </div>
              <div v-else>
                {{scope.row.t1}}
              </div>
            </template>
          </el-table-column>
          <el-table-column
            label="标题2"
            width="110">
            <template slot-scope="scope">
              <div v-if="scope.row.type === 'add'">
                <el-input v-if="showInput" v-model="addTableParams.t2"></el-input>
              </div>
              <div v-else>
                {{scope.row.t2}}
              </div>
            </template>
          </el-table-column>
          <el-table-column
            label="标题3"
            width="110">
            <template slot-scope="scope">
              <div v-if="scope.row.type === 'add'">
                <el-input v-if="showInput" v-model="addTableParams.t3"></el-input>
              </div>
              <div v-else>
                {{scope.row.t3}}
              </div>
            </template>
          </el-table-column>
          <el-table-column
            label="标题4"
            width="110">
            <template slot-scope="scope">
              <div v-if="scope.row.type === 'add'">
                <el-input v-if="showInput" v-model="addTableParams.t4"></el-input>
              </div>
              <div v-else>
                {{scope.row.t4}}
              </div>
            </template>
          </el-table-column>
          <el-table-column
            label="标题5">
            <template slot-scope="scope">
              <div v-if="scope.row.type === 'add'">
                <el-input v-if="showInput" v-model="addTableParams.t5"></el-input>
              </div>
              <div v-else>
                {{scope.row.t5}}
              </div>
            </template>
          </el-table-column>
          <el-table-column
            label="标题6">
            <template slot-scope="scope">
              <div v-if="scope.row.type === 'add'">
                <el-input v-if="showInput" v-model="addTableParams.t6"></el-input>
              </div>
              <div v-else>
                {{scope.row.t6}}
              </div>
            </template>
          </el-table-column>
          <el-table-column
            label="标题7">
            <template slot-scope="scope">
              <div v-if="scope.row.type === 'add'">
                <el-input v-if="showInput" v-model="addTableParams.t7"></el-input>
              </div>
              <div v-else>
                {{scope.row.t7}}
              </div>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            width="200"
            fixed="right"
          >
            <template slot-scope="scope">
              <div class="operation">
                <el-button-group v-if="scope.row.type==='add' && showInput">
                  <el-button type="primary" size="mini" @click="saveAddHandle">保存</el-button>
                  <el-button type="primary" size="mini" @click="showInput = false">取消</el-button>
                </el-button-group>
                <el-button-group v-else-if="scope.row.type != 'add'">
                  <el-button type="primary" size="mini">删除</el-button>
                  <el-button type="primary" size="mini">编辑</el-button>
                </el-button-group>
              </div>
            </template>
          </el-table-column>
        </el-table>
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
          <el-col :span="20">
            <!-- 分页================================ -->
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="getListDefaultParams.currentPage"
              :page-sizes="[10, 30, 50]"
              :page-size="getListDefaultParams.pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="pageTotal">
            </el-pagination>
          </el-col>
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
  import {getTime, formatTimeYYMMDD} from '@/utils'

  // 面包屑
  import Breadcrumb from '@/components/common/Breadcrumb'
  // 无数据时组件
  import NoData from '@/components/common/NoData'
  //搜索栏
  import TestSearchForm from '@/components/searchForm/navMenu1/TestSearchForm'

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
      TestSearchForm
    },
    data() {
      return {

        tableData: [], //数据列表
        loading: false, //loading状态
        getListDefaultParams: { //获取列表数据默认参数    尽量在fetchData 里操作getListDefaultParams，其他地方不要操作，避免混乱
          pageSize:10, //每页条数
          currentPage:1, //当前页数
          f1:'f1',
          f2:'normal',
          f3:'f3',
          startTime:'',
          endTime:''
        },

        dialogTitle: '', // 弹窗名字
        dialogVisible: false, //弹窗是否显示
        popData: {}, //传递弹窗的数据

        pageTotal: 400, //总条数

        batchOperation:'', //批量操作名称
        batchItems:[], //批量操作数据

        addTableParams:{
            t1:'',
            t2:'',
            t3:'',
            t4:'',
            t5:'',
            t6:'',
            t7:'',
        },
        showInput:false, //是否显示添加的input 默认不显示
      }
    },
    created() {
      let pageR = this.$route.params.page
      if (pageR <= 0) {
        this.fetchData(null,{isFirstPage:true})
      }else {
        let o = {...this.getListDefaultParams}
        o.currentPage = pageR-0
        this.fetchData(o)
      }
    },
    watch: {
      // 如果路由有变化，会再次执行该方法
      '$route': 'watchRoute'
    },
    methods: {
      watchRoute(){
        let page = this.$route.params.page
        let o = {...this.getListDefaultParams}
        o.currentPage=page
        this.fetchData(o)
      },
      fetchData(data,page) {
        // 保存筛选条件
        if(data){
          this.getListDefaultParams={...data}
        }
        if(page && page.isFirstPage === true && this.$route.params.page !=1){
          //这里判断是否是第一页。如果不是需要在已填写的筛选条件下跳转到第一页
          this.$router.push({params: {page: 1}})
        }else {
          // 发送请求
          let self = this
//        this.loading = true
          console.log(this.getListDefaultParams)
          let data = [{
            t1:'1',
            t2:'1',
            t3:'1',
            t4:'1',
            t5:'1',
            t6:'1',
            t7:'1',
          }] //这里需要后台返回
          data.push({
            type:'add'
          })
          this.tableData=data
          this.showInput = false
//        testService.getList(params, this, (res) => {
//          let data = res.body.data.result
//          if (data.status === 0) {
//            self.loading = false
//          }
//        })
        }
      },
      getTime,
      formatTimeYYMMDD,
      handleSelectionChange(items){
        this.batchItems=items
      },
      handleSizeChange(val) {
        let o = {...this.getListDefaultParams}
        o.pageSize = val
        this.fetchData(o,{isFirstPage:true})
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        this.$router.push({params: {page: val}})
        console.log(`当前页: ${val}`);
      },
      handleCommand(command){
        this.batchOperation = command
      },
//      operationHandle1(data) {
//        this.dialogVisible = true
//        this.dialogTitle = '操作1'
//        this.popData = data
//      },
//      operationHandle2(data) {
//        this.dialogVisible = true
//        this.dialogTitle = '操作2'
//        this.popData = data
//      },
      saveAddHandle(){
        console.log(this.addTableParams)
        //这里发送添加请求，成功后获取列表数据
        this.fetchData()

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
