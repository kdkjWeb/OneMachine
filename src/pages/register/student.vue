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
              <el-input clearable v-model="formInline.txt" placeholder="请输入姓名"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button size="mini" type="primary" @click="search">搜索</el-button>
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
              :action="`${this.$store.state.updateUrl}/gateUser/batchImport`"
              name="file"
              :before-upload="beforeAvatarUpload"
              :on-success="handleAvatarSuccess"
              :on-error="upError"
              :show-file-list="false"
            >
              <el-button size="mini" type="primary">批量导入</el-button>
            </el-upload>
          </div>
          <div>
            <el-upload
              class="upload-demo"
              :action="`${this.$store.state.updateUrl}/gateUser/uploadFolderPichList`"
              name="files"
              :before-upload="beforeAvatarUploadFile"
              :on-success="handleAvatarSuccess"
              :on-error="upError"
              :show-file-list="false"
              :multiple="true"
            >
              <el-button size="mini" type="primary">文件夹导入</el-button>
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
              <img v-if="scope.row.picPath" :src="scope.row.webPicPath" alt="学生照片" width="50" height="50">
              <el-tag type="info" v-else>暂无照片</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            prop="userName"
            label="学生姓名"
            align="center"
            header-align="center">
          </el-table-column>
          <el-table-column
            prop="cardId"
            label="身份证号码"
            align="center"
            header-align="center">
          </el-table-column>
          <!--<el-table-column
            label="当前状态"
            align="center">
            <template slot-scope="scope">
              <el-tag type="danger" v-if="scope.row.statusStr">{{scope.row.statusStr}}</el-tag>
              <el-tag type="success" v-else>暂无状态</el-tag>
            </template>
          </el-table-column>-->
          <el-table-column
            label="操作"
            align="center">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.row)">删除</el-button>
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
        width="30%"
        :close-on-click-modal="false">
        <div>
          <el-form ref="form" :rules="rules" :model="form" label-width="110px" size="mini">
            <el-form-item label="学生姓名" prop="userName">
              <el-input clearable v-model="form.userName" placeholder="请输入学生姓名"></el-input>
            </el-form-item>
            <el-form-item label="身份证号码" prop="idCard">
              <el-input clearable v-model="form.idCard" placeholder="请输入身份证号码"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button size="mini" @click="cancel">取 消</el-button>
          <el-button size="mini" type="primary" @click="comfirm('form')">确 定</el-button>
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
            total: null,   //总共多少条数据
            dialogVisible: false,
            form: {
              userName: '',   //学生姓名
              idCard: ''    //身份证号码
            },
            rules: {
              userName: [
                { required: true, message: '请输入学生姓名', trigger: 'blur' },
                { min: 2, max: 30, message: '长度在 2 到 30 个字符', trigger: 'blur' }
              ],
              idCard: [
                { required: true, message: '请输入身份证号码', trigger: 'blur' },
                { min: 1, max: 18, message: '长度在 1 到 18 个字符', trigger: 'blur' }
              ]
            }
          }
        },
        mounted(){
          window.addEventListener('resize', ()=>{
            this.height = window.innerHeight - 260;
          })


          //获取所有注册学生的列表
          this.getStudetList();
        },
        created(){
          this.height = window.innerHeight - 260;
        },
        methods: {
          //获取所有注册学生的列表
          getStudetList(pageSize,pageNum){
            this.$get('gateUser/getGateUserFormList',{
                username: this.formInline.txt ? this.formInline.txt : null,
                pageNum: pageNum ? pageNum : 1,
                pageSize: pageSize ? pageSize : 10

            }).then(res=>{
                if(res.code == 0){
                  this.tableData = res.data.content;
                  this.total = res.data.pageinfo.totalElements > 0 ? res.data.pageinfo.totalElements : 0
                }
            })
          },

          //点击搜索
          search(){
            this.getStudetList()
          },

          //点击单个录入
          entry(){
            this.dialogVisible = true;
            this.form.userName = '';
            this.form.idCard = '';
          },

          //限制导入数据类型
          beforeAvatarUpload(file) {



            const isExcel = file.name.includes('.xlsx')

            if (!isExcel) {
              this.$message.error('上传文件只能是 excel 最新版本!');
            }

            return isExcel;

          },

          handleAvatarSuccess(res, file, fileList) {
            if(res.code == 0){
              this.$message({
                type: 'success',
                message: '导入文件成功!'
              });
              this.getStudetList()
            }
          },

          //上传文件失败
          upError(err){
            if(err){
              this.$message.error('导入文件失败');
            }
          },

          beforeAvatarUploadFile(file){
            console.log(file)
          },

          //清除当前这个学生的信息
          handleDelete(row){

            this.$confirm('此操作将永久删除该条数据, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {

              this.$post('gateUser/delStudent',{
                userId: row.userId
              }).then(res=>{

                if(res.code === 0){
                  this.$message({
                    type: 'success',
                    message: '删除成功!'
                  });
                  this.getStudetList()
                }

              })
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消删除'
              });
            });

          },

          //每页显示多少条数据
          handleSizeChange(val) {
            this.pageSize = val;
            this.getStudetList(val,this.currentPage);
          },

          //当前第几页
          handleCurrentChange(val) {
            this.currentPage = val;
            this.getStudetList(this.pageSize,val);
          },

          //点击弹出框取消按钮
          cancel(){
            this.dialogVisible = false;
          },

          //点击弹出框的确认按钮
          comfirm(formName){
            //验证表单填写的数据是否合法，合法将新增数据，反之提示
            this.$refs[formName].validate((valid) => {
              if (valid) {
                  this.$post('gateUser/insertStudent',{
                    name: this.form.userName,
                    cardId: this.form.idCard
                  }).then(res=>{
                    if(res.code === 0){
                      this.$message({
                        type: 'success',
                        message: '录入成功!'
                      });

                      this.dialogVisible = false;

                      this.getStudetList()
                    }
                  })
              } else {
                return false;
              }
            });
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
  width: 300px;
  display: inherit;
  justify-content: space-around;
}



</style>
