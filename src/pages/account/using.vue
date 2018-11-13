<template>
    <div class="using">
      <!--start 顶部面包屑导航-->
      <TopNav :nav="nav"></TopNav>
      <!--end 顶部面包屑导航-->

      <!--start 内容-->
      <div class="container">
        <div>
          <div>
            <el-button size="mini" type="primary" @click="addUser">新增管理</el-button>
          </div>
        </div>

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
              width="130"
              label="权限级别"
              align="center">
              <template slot-scope="scope">
                <el-tag type="danger" v-if="scope.row.authorityLevel == 0">一体机</el-tag>
                <el-tag type="success" v-if="scope.row.authorityLevel == 1">管理端</el-tag>
                <el-tag type="warning" v-if="scope.row.authorityLevel == 2">一体加管理端</el-tag>
              </template>
            </el-table-column>
            <el-table-column
              width="100"
              label="当前状态"
              align="center">
              <template slot-scope="scope">
                <el-tag type="danger" v-if="scope.row.status == 1">在线</el-tag>
                <el-tag type="success" v-if="scope.row.status == 0">离线</el-tag>
              </template>
            </el-table-column>
            <el-table-column
              width="147"
              label="操作"
              align="center">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="handleEdit(scope.row)">编辑</el-button>
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <!--end 表格-->
      </div>
      <!--end 内容-->

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

      <!--start 弹出新增用户框-->
      <el-dialog
        title="新增管理"
        :visible.sync="dialogVisible"
        width="30%">
        <div>
          <el-form ref="form" :rules="rules" :model="form" label-width="110px" size="mini">
            <el-form-item label="用户名" prop="userName">
              <el-input clearable v-model="form.userName" placeholder="请输入用户名"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input clearable v-model="form.password" type="password" placeholder="请输入密码"></el-input>
            </el-form-item>
            <el-form-item label="院校名称" prop="schoolName">
              <el-input clearable v-model="form.schoolName" placeholder="请输入院校名称"></el-input>
            </el-form-item>
            <el-form-item label="注册机地址" prop="registerAddress">
              <el-input clearable v-model="form.registerAddress" placeholder="请输入注册机地址"></el-input>
            </el-form-item>
            <el-form-item label="MAC地址" prop="macAddress">
              <el-input clearable v-model="form.macAddress" placeholder="请输入MAC地址"></el-input>
            </el-form-item>
            <el-form-item label="负责人" prop="leader">
              <el-input clearable v-model="form.leader" placeholder="请输入负责人"></el-input>
            </el-form-item>
            <el-form-item label="负责人电话" prop="leaderPhone">
              <el-input clearable v-model="form.leaderPhone" placeholder="请输入负责人电话"></el-input>
            </el-form-item>
            <el-form-item label="授权开始时间" prop="authStartTime">
              <el-date-picker
                size="mini"
                v-model="form.authStartTime"
                type="date"
                :picker-options="pickerOptions"
                value-format="yyyy-MM-dd"
                placeholder="请选择日期">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="授权结束时间" prop="authEndTime">
              <el-date-picker
                size="mini"
                v-model="form.authEndTime"
                type="date"
                :picker-options="pickerOptionE"
                value-format="yyyy-MM-dd"
                placeholder="请选择日期">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="权限级别" prop="authorityLevel">
              <el-checkbox-group v-model="form.authorityLevel">
                <el-checkbox label="0">一体机操作</el-checkbox>
                <el-checkbox label="1">后台管理</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button size="mini" @click="cancel">取 消</el-button>
          <el-button size="mini" type="primary" @click="comfirm('form')">确 定</el-button>
        </span>
      </el-dialog>
      <!--end 弹出新增用户框-->
    </div>
</template>

<script>
    export default {
        name: "using",
        data() {
          return {
            nav: {
              icon: 'icon-dengluyonghuming',
              title: '平台账户管理',
              subtitle: '使用中管理员'
            },
            height: null,
            tableList: [   //表格的头部配置
              {prop: 'userName', label: '用户名'},
              {prop: 'schoolName', label: '院校名称'},
              {prop: 'registerAddress', label: '注册机地址'},
              {prop: 'macAddress', label: 'MAC地址'},
              {prop: 'leader', label: '负责人'},
              {prop: 'leaderPhone', label: '负责人电话'},
              {prop: 'authStartTime', label: '授权开始时间'},
              {prop: 'authEndTime', label: '授权结束时间'},
            ],
            tableData: [],   //表格的数据
            currentPage: 1, //当前第几页
            pageSize: 10,   //每页显示多少条
            total: null,   //总共多少条数据
            dialogVisible: false,
            form: {
              userName: '',   //用户名
              password: '',   //密码
              schoolName: '', //院校名称
              registerAddress: '',  //注册机地址
              macAddress: '',   //Mac地址
              leader: '',   //负责人
              leaderPhone: '',   //负责人电话
              authStartTime: '',   //授权开始时间
              authEndTime: '',   //授权结束时间
              authorityLevel: []  //级别权限
            },
            userId: '',
            pickerOptions: {
              //限制用户只能选择今天和今天以后的日期
              disabledDate(time) {
                return time.getTime() < Date.now() - 8.64e7;
              }
            },
            pickerOptionE: {
              disabledDate: (time) => {
                return time.getTime() < new Date(this.form.authStartTime);
              }
            },
            rules: {
              userName: [
                { required: true, message: '请输入用户名', trigger: 'blur' },
                { min: 2, max: 30, message: '长度在 2 到 30 个字符', trigger: 'blur' }
              ],
              password: [
                { required: true, message: '请输入密码', trigger: 'blur' },
                { pattern: /[a-zA-Z0-9]{6,}/, message: '请输入最少6位数字、字母组合的密码', trigger: 'blur' }
              ],
              schoolName: [
                { required: true, message: '请输入院校名称', trigger: 'blur' },
                { min: 1, max: 30, message: '长度在 1 到 30 个字符', trigger: 'blur' }
              ],
              registerAddress: [
                { required: true, message: '请输入注册机地址', trigger: 'blur' },
                { min: 1, max: 30, message: '长度在 1 到 30 个字符', trigger: 'blur' }
              ],
              macAddress: [
                { required: true, message: '请输入MAC地址', trigger: 'blur' },
                { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
              ],
              leader: [
                { required: true, message: '请输入负责人姓名', trigger: 'blur' },
                { min: 1, max: 4, message: '长度在 1 到 4 个字符', trigger: 'blur' }
              ],
              leaderPhone: [
                { required: true, message: '请输入手机号', trigger: 'blur' },
                { pattern: /^1[3456789]\d{9}$/, message: '请输入合法的手机号', trigger: 'blur'}
              ],
              authStartTime: [
                { required: true, message: '请输入开始授权时间', trigger: 'blur' },
              ],
              authEndTime: [
                { required: true, message: '请输入结束授权时间', trigger: 'blur' },
              ],
              authorityLevel: [
                { required: true, message: '请勾选权限级别', trigger: 'blur' },
              ],
            }
          }
        },
        mounted(){
          window.addEventListener('resize', ()=>{
            this.height = window.innerHeight - 240;
          })

          //获取使用中的管理员
          this.getUseringList();
        },
        created(){
          this.height = window.innerHeight - 240;
        },
        methods: {
          //获取使用中的管理员
          getUseringList(pageSize,pageNum){
            this.$get('user/userList',{
              pageSize: pageSize ? pageSize : 10,
              pageNum: pageNum ? pageNum : 1,
            }).then(res=>{
              if(res.code === 0){
                this.tableData = res.data.content;
                this.total = res.data.pageinfo.totalElements > 0 ? res.data.pageinfo.totalElements : 0
              }

            })
          },

          //编辑
          handleEdit(row){
            this.userId = row.id;

            this.$post('user/getSmUser',{
              id: row.id
            }).then(res=>{

              if(res.code === 0){
                this.dialogVisible = true;
                Object.keys(this.form).forEach((item,index)=>{

                  if(item === 'authorityLevel'){
                    let arr = [];
                    if(res.data.authorityLevel == 2){
                      arr = ['0','1'];
                    }else{
                      arr.push(res.data.authorityLevel+'')
                    }
                    this.form.authorityLevel = arr;
                  }else{
                    this.form[item] = res.data[item]
                  }

                })
              }

            })
          },

          //删除
          handleDelete(row){

            this.$confirm('此操作将永久删除该条数据, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {

              this.$post('user/deleteUser',{
                id: row.id
              }).then(res=>{

                if(res.code === 0){
                  this.$message({
                    type: 'success',
                    message: '删除成功!'
                  });
                  this.getUseringList()
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
            this.getUseringList(val,this.currentPage);
          },

          //当前第几页
          handleCurrentChange(val) {
            this.currentPage = val;
            this.getUseringList(this.pageSize,val);
          },

          //新增管理
          addUser(){
            this.userId = '';
            this.dialogVisible = true;

            Object.keys(this.form).forEach((item,index)=>{
              if(item === 'authorityLevel'){
                this.form[item] = ['0'];
              }else{
                this.form[item] = '';
              }
            })
          },

          //点击弹出框取消按钮
          cancel(){
             this.dialogVisible = false;

          },

          //点击弹出框的确认按钮
          comfirm(formName){

            //验证表单填写的数据是否合法，合法将新增数据，反之提示
            this.$refs[formName].validate((valid) => {
              let url = this.userId ? 'user/updateUser' : 'user/insertUser';
              if (valid) {
                this.$post(url,{
                  userName: this.form.userName,   //用户名
                  password: this.form.password,   //密码
                  schoolName: this.form.schoolName, //院校名称
                  registerAddress: this.form.registerAddress,  //注册机地址
                  macAddress: this.form.macAddress,   //Mac地址
                  leader: this.form.leader,   //负责人
                  leaderPhone: this.form.leaderPhone,   //负责人电话
                  authStartTime: this.form.authStartTime,   //授权开始时间
                  authEndTime: this.form.authEndTime,   //授权结束时间
                  authorityLevel: this.form.authorityLevel.length > 1 ? '2' : this.form.authorityLevel[0], //级别权限
                  id: this.userId ? this.userId : null
                }).then(res=>{

                  let msg = this.userId ? '修改成功' : '新增成功'

                  if(res.code === 0){
                    this.$message({
                      type: 'success',
                      message: msg
                    });

                    this.dialogVisible = false;

                    this.getUseringList()
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
/* start 内容 */
.container{

}


/* end 内容*/


.using .el-date-editor{
  width: 100%;
}
</style>
