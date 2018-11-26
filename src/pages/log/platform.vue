<template>
    <div class="platform">
      <!--start 顶部面包屑导航-->
      <TopNav :nav="nav"></TopNav>
      <!--end 顶部面包屑导航-->

      <!--start 顶部搜索区域-->
      <div class="top_nav">
        <el-form :inline="true" :model="formInline" class="demo-form-inline" size="mini">
          <el-form-item label="开始时间">
            <el-date-picker
              size="mini"
              v-model="formInline.startTime"
              type="date"
              value-format="yyyy-MM-dd HH:mm:ss"
              placeholder="请选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="结束时间">
            <el-date-picker
              size="mini"
              v-model="formInline.endTime"
              type="date"
              value-format="yyyy-MM-dd HH:mm:ss"
              :picker-options="pickerOptionsE"
              placeholder="请选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="操作类型">
            <el-select clearable v-model="formInline.type" filterable placeholder="请选择类型">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button size="mini" type="primary" @click="search">搜索</el-button>
          </el-form-item>
        </el-form>
      </div>
      <!--end 顶部搜索区域-->

      <!--start 表格-->
      <div class="table">
        <el-table
          border=""
          :max-height="height"
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%"
          stripe>
          <el-table-column
            type="index"
            width="80"
            header-align="center"
            align="right"
            :index="index"
            :show-overflow-tooltip="true"
            label="序号">
          </el-table-column>
          <el-table-column
            v-for="(item,index) in tableList"
            :key="index"
            :prop="item.prop"
            :label="item.label"
            align="center"
            header-align="center"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
        </el-table>
      </div>
      <!--end 表格-->

      <!-- start分页 -->
      <div class="page">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-sizes="[10, 50, 80, 100]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          background>
        </el-pagination>
      </div>
      <!-- end分页 -->

    </div>
</template>

<script>
    export default {
        name: "platform",
        data() {
          return {
            nav: {
              icon: 'icon-xitongrizhi',
              title: '系统日志',
              subtitle: '平台操作日志'
            },
            height: null,
            formInline: {
              startTime: '',   //开始时间
              endTime: '',   //结束时间
              type: ''   //类型
            },
            options: [{
              value: '查看',
              label: '查看'
            }, {
              value: '删除',
              label: '删除'
            }, {
              value: '添加',
              label: '添加'
            },{
              value: '更新',
              label: '更新'
            }],
            tableList: [   //表格的头部配置
              {prop: 'operateLevel', label: '管理员级别'},
              {prop: 'userName', label: '管理员账户'},
              {prop: 'operate', label: '操作类型'},
              {prop: 'moduleName', label: '操作模块'},
              {prop: 'operateTime', label: '操作时间'},
            ],
            tableData: [],   //表格的数据
            currentPage: 1, //当前第几页
            pageSize: 10,   //每页显示多少条
            total: null,   //总共多少条数据
            pickerOptionsE: {
              disabledDate: (time) => {
                return time.getTime() < new Date(this.formInline.startTime);
              }
            },
          }
        },
        mounted(){
          //获取平台操作日志列表
          this.getPlatformLogList();

          window.addEventListener('resize', ()=>{
            this.height = window.innerHeight - 260;
          })
        },
        created(){
          this.height = window.innerHeight - 260;
        },
        methods: {

          //获取平台操作日志列表
          getPlatformLogList(pageSize,pageNum){
            this.$post('smLog/getSmLogFormList',{
                pageSize: pageSize ? pageSize : 10,
                pageNum: pageNum ? pageNum : 1,
                beginTime: this.formInline.startTime ? this.formInline.startTime : null,
                endTime: this.formInline.endTime ? this.formInline.endTime : null,
                operate: this.formInline.type ? this.formInline.type : null
            }).then(res=>{
                if(res.code === 0){
                  this.tableData = res.data.content;
                  this.total = res.data.pageinfo.totalElements > 0 ? res.data.pageinfo.totalElements : 0
                }

            })
          },

          //搜索
          search(){
            this.getPlatformLogList(this.pageSize,1);
          },

          //每页显示多少条数据
          handleSizeChange(val) {
            this.pageSize = val;
            this.getPlatformLogList(val,this.currentPage);

            console.log(this.pageSize)
          },

          //当前第几页
          handleCurrentChange(val) {
            this.currentPage = val;
            this.getPlatformLogList(this.pageSize,val);
          },

          //设置表格索引序号
          index(index){
            return (this.currentPage - 1)*this.pageSize + index + 1;
          },
        }
    }
</script>

<style scoped>

</style>
