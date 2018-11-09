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
              value-format="yyyy-MM-dd"
              format="yyyy 年 MM 月 dd 日"
              placeholder="请选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="结束时间">
            <el-date-picker
              size="mini"
              v-model="formInline.endTime"
              type="date"
              value-format="yyyy-MM-dd"
              format="yyyy 年 MM 月 dd 日"
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
            <el-button size="mini" type="primary">搜索</el-button>
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
              value: '选项1',
              label: '黄金糕'
            }, {
              value: '选项2',
              label: '双皮奶'
            }, {
              value: '选项3',
              label: '蚵仔煎'
            }, {
              value: '选项4',
              label: '龙须面'
            }, {
              value: '选项5',
              label: '北京烤鸭'
            }],
            tableList: [   //表格的头部配置
              {prop: 'userName', label: '管理员级别'},
              {prop: 'schoolName', label: '管理员账户'},
              {prop: 'registerAddress', label: '操作类型'},
              {prop: 'macAddress', label: '操作模块'},
              {prop: 'leader', label: '操作时间'},
            ],
            tableData: [],   //表格的数据
            currentPage: 1, //当前第几页
            pageSize: 10,   //每页显示多少条
            total: 100,   //总共多少条数据
          }
        },
        mounted(){
          window.addEventListener('resize', ()=>{
            this.height = window.innerHeight - 240;
          })
        },
        created(){
          this.height = window.innerHeight - 240;
        },
        methods: {
          //每页显示多少条数据
          handleSizeChange(val) {
            this.pageSize = val;
          },

          //当前第几页
          handleCurrentChange(val) {
            this.currentPage = val;
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
