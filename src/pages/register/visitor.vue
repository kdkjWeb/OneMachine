<template>
    <div class="visitor">
      <!--start 顶部面包屑导航-->
      <TopNav :nav="nav"></TopNav>
      <!--end 顶部面包屑导航-->


      <!--start 顶部搜索导入-->
      <div class="top_nav">
        <div class="top_nav_left">
          <el-form :inline="true" :model="formInline" class="demo-form-inline" size="mini">
            <el-form-item>
              <el-input clearable v-model="formInline.txt" placeholder="请输入姓名、身份证号"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button size="mini" type="primary">搜索</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="top_nav_right">
          <div>
            <el-button size="mini" type="primary" @click="entry">录入</el-button>
          </div>
        </div>
      </div>
      <!--end 顶部搜索导入-->

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
            v-for="(item,index) in tableList"
            :key="index"
            :prop="item.prop"
            :label="item.label"
            align="center"
            header-align="center"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            label="注册状态"
            align="center">
            <template slot-scope="scope">
              <el-tag type="danger" v-if="scope.row.status == 1">在线</el-tag>
              <el-tag type="success" v-if="scope.row.status == 0">离线</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            align="center">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!--end 表格-->

      <!--start 分页-->
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
      <!--end 分页-->


      <!--start 单个录入弹出框-->
      <el-dialog
        title="新增访客"
        :visible.sync="dialogVisible"
        width="30%">
        <div>
          <el-form ref="form" :model="form" label-width="110px" size="mini">
            <el-form-item label="访客姓名">
              <el-input clearable v-model="form.userName" placeholder="请输入访客姓名"></el-input>
            </el-form-item>
            <el-form-item label="访客身份证号">
              <el-input clearable v-model="form.idCard" placeholder="请输入访客身份证号"></el-input>
            </el-form-item>
            <el-form-item label="到访开始时间">
              <el-date-picker
                v-model="form.idCard"
                type="datetime"
                placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="到访结束时间">
              <el-date-picker
                v-model="form.idCard"
                type="datetime"
                placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="被访者姓名">
              <el-input clearable v-model="form.userName" placeholder="请输入被访者姓名"></el-input>
            </el-form-item>
            <el-form-item label="被访者身份证号">
              <el-input clearable v-model="form.idCard" placeholder="请输入被访者身份证号"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button size="mini" @click="cancel">取 消</el-button>
          <el-button size="mini" type="primary" @click="comfirm">确 定</el-button>
        </span>
      </el-dialog>
      <!--end  单个录入弹出框-->

    </div>
</template>

<script>
    export default {
        name: "visitor",
        data() {
          return {
            nav: {
              icon: 'icon-fuwuzhuce',
              title: ' 注册管理',
              subtitle: '学生注册'
            },
            height: null,
            formInline: {
              txt: ''
            },
            tableList: [   //表格的头部配置
              {prop: 'userName', label: '访客姓名'},
              {prop: 'schoolName', label: '访客身份证号'},
              {prop: 'registerAddress', label: '到访时间'},
              {prop: 'macAddress', label: '到访结束时间'},
              {prop: 'leader', label: '被访者姓名'},
              {prop: 'leaderPhone', label: '被访者身份证号'},
              {prop: 'authStartTime', label: '录入时间'},
            ],
            tableData: [],   //表格的数据
            currentPage: 1, //当前第几页
            pageSize: 10,   //每页显示多少条
            total: 100,   //总共多少条数据
            dialogVisible: false,
            form: {
              userName: '',   //学生姓名
              idCard: ''    //身份证号码
            }
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
          //点击单个录入
          entry(){
            this.dialogVisible = true;
          },

          //编辑
          handleEdit(){

          },

          //删除
          handleDelete(){

          },

          //每页显示多少条数据
          handleSizeChange(val) {
            this.pageSize = val;
          },

          //当前第几页
          handleCurrentChange(val) {
            this.currentPage = val;
          },

          //点击弹出框取消按钮
          cancel(){
            this.dialogVisible = false;
          },

          //点击弹出框的确认按钮
          comfirm(){
            this.dialogVisible = false;
          }
        }
    }
</script>

<style scoped>
  .visitor .top_nav{
    display: flex;
    display: -webkit-flex;
    justify-content: space-between;
  }
  .visitor .el-date-editor {
    width: 100%;
  }
</style>
