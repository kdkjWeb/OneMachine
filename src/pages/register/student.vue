<template>
    <div class="student">
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
            <el-button size="mini" type="primary" @click="entry">单个录入</el-button>
          </div>
          <div>
            <el-upload
              class="upload-demo"
              action="https://jsonplaceholder.typicode.com/posts/"
            >
              <el-button size="mini" type="primary">批量导入</el-button>
            </el-upload>
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
            label="照片"
            align="center">
            <template slot-scope="scope">
              <img v-if="scope.row.authorityLevel == 0" src="" alt="学生照片" width="50" height="50">
              <el-tag type="info" v-else>暂无照片</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            prop="name"
            label="学生姓名"
            align="center"
            header-align="center">
          </el-table-column>
          <el-table-column
            prop="idcard"
            label="身份证号码"
            align="center"
            header-align="center">
          </el-table-column>
          <el-table-column
            label="当前状态"
            align="center">
            <template slot-scope="scope">
              <el-tag type="danger" v-if="scope.row.status == 1">注册中</el-tag>
              <el-tag type="success" v-if="scope.row.status == 0">注册成功</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            align="center">
            <template slot-scope="scope">
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
        title="新增学生"
        :visible.sync="dialogVisible"
        width="30%">
        <div>
          <el-form ref="form" :model="form" label-width="110px" size="mini">
            <el-form-item label="学生姓名">
              <el-input clearable v-model="form.userName" placeholder="请输入学生姓名"></el-input>
            </el-form-item>
            <el-form-item label="身份证号码">
              <el-input clearable v-model="form.idCard" placeholder="请输入身份证号码"></el-input>
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
        name: "student",
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

          //清除当前这个学生的信息
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
.student .top_nav{
  display: flex;
  display: -webkit-flex;
  justify-content: space-between;
}
.student .top_nav .top_nav_right{
  width: 200px;
  display: inherit;
  justify-content: space-around;
}



</style>
