<template>
  <div class="seniorFilter" id="seniorFilter">
    <el-form :model="form" size="small">
      <el-row :gutter="20" type="flex" align="middle">
        <el-col >
          <el-form-item label="输入搜索:" :label-width="'100px'">
            <el-input v-model="form.f1" placeholder="请输入渠道产品名称或编号"></el-input>
          </el-form-item>
        </el-col>
        <el-col >
          <el-form-item label="渠道产品状态:" :label-width="'100px'">
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
        </el-col>
      </el-row>
      <el-row :gutter="20" type="flex" align="middle">
        <el-col >
          <el-form-item label="产品服务:" :label-width="'100px'">
            <el-select v-model="form.f3" placeholder="请选择" style="width: 100%;">
              <el-option
                label="全部"
                value="all"
              >
              </el-option>
              <el-option
                label="网关服务"
                value="normal"
              >
              </el-option>
              <el-option
                label="快捷服务"
                value="disable"
              >
              </el-option>
              <el-option
                label="认证服务"
                value="11"
              >
              </el-option>
              <el-option
                label="委托收款"
                value="22"
              >
              </el-option>
              <el-option
                label="委托付款"
                value="33"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col >
          <el-form-item label="更新人:" :label-width="'100px'">
            <el-input v-model="form.f4" placeholder="请输入更新人"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20" type="flex" align="middle">
        <el-col >
          <el-form-item label="创建时间:" :label-width="'100px'">
            <el-date-picker
              v-model="form.createTime"
              type="daterange"
              align="right"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :picker-options="pickerOptions">
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20" type="flex" align="middle">
        <el-col >
          <el-form-item label="更新时间:" :label-width="'100px'">
            <el-date-picker
              v-model="form.updateTime"
              type="daterange"
              align="right"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :picker-options="pickerOptions">
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div style="text-align: right;margin-top: 10px;">
      <el-button type="primary" size="mini" @click="closeHandle">重置</el-button>
      <el-button type="primary" size="mini" @click="onSubmit" :loading="loading">提交</el-button>
    </div>
  </div>
</template>

<script>
  import testService from '@/service/navMenu1/testService'
  export default {
    name: 'seniorFilter',
    props: ['formSubmit','popData','dialogHandleClose'],
    data() {
      return {
        loading:false,
        violationTypes:[], //删除理由选项列表
        form: {
          f1:'',
          f2:'',
          f3:'',
          f4:'',
          createTime: ['', ''],
          updateTime: ['', '']
        }, //查询条件

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
      }
    },
    created(){},
    methods:{
      closeHandle(){
        this.dialogHandleClose()
      },
      onSubmit(){
        this.form.id=this.popData.id
        this.loading=true
        testService.test(this.form, this, (res) => {
          let data = res.body
          if(data.status===0){
            this.$message({
              type: 'success',
              message: '操作成功!'
            });
            this.formSubmit()
          } else {
            this.$message({
              type: 'erroe',
              message: '操作失败!'
            });
          }
          this.loading=false
        })
      },
    }
  }
</script>
<style scoped>
  .seniorFilter {
    text-align: left;
  }
  .seniorFilter .el-form-item {
    margin-bottom: 20px;
  }
</style>

