<!-- 头部导航 -->
<template>
  <div class="header">
    <!-- start logo图片 -->
    <div class="logo"></div>
    <!-- end logo图片 -->

    <!-- start 标题 -->
    <h1 class="title">一体机系统管理平台</h1>
    <!-- end 标题 -->

    <!-- start 右侧模块 -->
    <div class="right_model">
      <div class="user" @click="downList">
        <div class="down">
          <span class="userName">{{user.userName ? user.userName : '管理员'}}</span>
          <span class="iconfont icon-xiajiantou1"></span>
          <transition name="fade">
            <ul class="down_list" v-if="show">
              <!--<li v-for="(item,index) in userList" :key="index"  @click="downClick(index)"><span class="iconfont" :class="item.icon"></span><a href="#">{{item.title}}</a></li>-->

              <li @click="downClick(0)"><span class="iconfont icon-mima1"></span><a href="#">修改密码</a></li>
              <li v-if="user.role === 2" @click="downClick(1)"><span class="iconfont icon-shezhi1"></span><a href="#">学校账号管理</a></li>
              <li @click="downClick(2)"><span class="iconfont icon-unie044"></span><a href="#">安全退出</a></li>
            </ul>
          </transition>
        </div>
      </div>
    </div>
    <!-- end 右侧模块 -->

    <!--start 弹出框-->
    <el-dialog
      :title=title
      :visible.sync="dialogVisible"
      width="30%">
      <div>
        <el-form ref="form" :rules="rules" :model="form" label-width="110px" size="mini">
          <div v-if="typeIndex === 0">
            <el-form-item label="原密码" prop="oldpas">
              <el-input clearable v-model="form.oldpas" type="password" placeholder="请输入原密码"></el-input>
            </el-form-item>
            <el-form-item label="新密码" prop="newpas">
              <el-input clearable v-model="form.newpas" type="password"  placeholder="请输入新密码"></el-input>
            </el-form-item>
            <el-form-item label="确认新密码" prop="sucpas">
              <el-input clearable v-model="form.sucpas" type="password"  placeholder="请再次确认新密码"></el-input>
            </el-form-item>
          </div>
          <div v-if="typeIndex === 1">
            <el-form-item label="学校账号">
              <el-input clearable v-model="form.userName"></el-input>
            </el-form-item>
            <el-form-item label="新密码" prop="shchoolpas">
              <el-input clearable v-model="form.shchoolpas" type="password"  placeholder="请输入新密码"></el-input>
            </el-form-item>
          </div>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
    <el-button size="mini" @click="dialogVisible = false">取 消</el-button>
    <el-button size="mini" type="primary" @click="comfirm('form')">确 定</el-button>
  </span>
    </el-dialog>
    <!--end 弹出框-->

  </div>
</template>

<script>
  import bus from './bus.js'
  export default {
    data(){
      return{
        show: false,
        user: {},
        title: '',
        dialogVisible: false,
        typeIndex: '',
        form: {
          oldpas: '',
          newpas: '',
          sucpas: '',
          shchoolpas: '',
          userName: ''
        },
        schoolUser: {},
        rules: {
          oldpas: [
            {required: true, message: '请输入密码', trigger: 'blur'},
            {pattern: /[a-zA-Z0-9]{6,}/, message: '请输入最少6位数字、字母组合的密码', trigger: 'blur'}
          ],
          newpas: [
            {required: true, message: '请输入新密码', trigger: 'blur'},
            {pattern: /[a-zA-Z0-9]{6,}/, message: '请输入最少6位数字、字母组合的密码', trigger: 'blur'}
          ],
          sucpas: [
            {required: true, message: '请确认输入密码', trigger: 'blur'},
            {pattern: /[a-zA-Z0-9]{6,}/, message: '请输入最少6位数字、字母组合的密码', trigger: 'blur'}
          ],
          shchoolpas: [
            {required: true, message: '请确认输入密码', trigger: 'blur'},
            {pattern: /[a-zA-Z0-9]{6,}/, message: '请输入最少6位数字、字母组合的密码', trigger: 'blur'}
          ],
        }
      }
    },
    methods: {
      downList(){
        this.show = !this.show;
        bus.$emit('headerShow',this.show)
      },

      //点击下拉列表的每一个选项
      downClick(index){
        this.typeIndex = index;
        switch(index){
          case 0:
            this.title = '修改密码';
            this.dialogVisible = true;
            this.form.oldpas = '';
            this.form.sucpas = '';
            this.form.newpas = ''
            break;
          case 1:
            this.title = '学校账号管理';
            this.dialogVisible = true;
            this.form.shchoolpas = ''
            break;
          case 2:
            this.$get('logout',{}).then(res=>{


              if(res.code == 0){
                sessionStorage.removeItem('userInfo');
                this.$store.commit('setToken',null)
                this.$router.push({
                  name: 'Login'
                })
              }
            })
            break;
        }
      },


      comfirm(formName){
        //验证表单填写的数据是否合法，合法将新增数据，反之提示
        this.$refs[formName].validate((valid) => {
          if (valid) {


            //修改密码
            if(this.typeIndex === 0){
              if(this.form.sucpas != this.form.newpas){
                this.$message({
                  message: '两次输入密码不一样，请确认后再输入',
                  type: 'warning'
                });
                return;
              }
              this.$post('user/updatePassword',{
                oldPassword: this.form.oldpas,
                password: this.form.sucpas,
                id: this.user.id
              }).then(res=>{
                if(res.code == 0){
                  this.$message({
                    type: 'success',
                    message: '修改成功!'
                  });
                  this.dialogVisible = false;
                }else if(res.code === 500){
                  this.$message({
                    message: res.msg,
                    type: 'warning'
                  });
                }

              })
            }else if(this.typeIndex === 1){
              //学校账号管理
                this.$post('user/updateSchoolUser',{
                  userName: this.form.userName,
                  password: this.form.shchoolpas,
                  id: !JSON.stringify(this.schoolUser) ? null : this.schoolUser.id
            }).then(res=>{
                    if(res.code === 0){
                      this.$message({
                        type: 'success',
                        message: '修改成功!'
                      });
                      this.dialogVisible = false;
                    }
                })
            }

          } else {
            return false;
          }
        });
      }
    },
    mounted(){

      let user = JSON.parse(sessionStorage.getItem('userInfo'))

      this.user = user;

      if(this.user.role == 2){
        this.$post('user/getSchoolAdminSmUser',{}).then(res=>{
          if(res.code === 0){
            this.schoolUser = res.data;
            this.form.userName = !JSON.stringify(this.schoolUser)   ? '' :  this.schoolUser.userName
          }
        })
      }

    }

  }
</script>

<style scoped>
  .header{
    width: 100%;
    height: 50px;
    background: #383d41;
  }
  .logo{
    float: left;
    width: 127px;
    height: 100%;
    border-right: 1px solid #2c3135;
    background-image: url(../assets/images/header_logo.png);
    background-repeat: no-repeat;
    background-position: center;
  }
  .title{
    float: left;
    line-height: 50px;
    padding-left: 20px;
    color: #fff;
    font-size: 16px;
  }
  .right_model{
    float: right;
    height: 100%;
    width: 220px;
  }





  .user{
    /*float: left;
    width: 220px;*/
    width: 100%;
    height: 100%;
  }

  .down{
    position: relative;
    float: left;
    line-height: 50px;
    /* padding-right: 30px; */
    cursor: pointer;
  }
  .down .userName{
    color: #fff;
    display: inline-block;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    font-size: 12px;
    max-width: 130px;
    text-indent: 20px;
  }
  .down .iconfont{
    position: relative;
    top: -18px;
    left: -2px;
    font-size: 20px;
    color: #fff;
  }
  .down_list{
    position: absolute;
    /* right: -20px; */
    left: -20px;
    top: 50px;
    z-index: 199;
    width: 230px;
    box-shadow: 0 0 3px rgba(86,96,117,.3);
    border: 1px solid #ddd;
    box-sizing: border-box;
    background: rgba(255,255,255,.7)
  }
  .down_list>li{
    line-height: 40px;
    /* box-sizing: border-box; */
  }
  .down_list>li>a{
    color: #000;
  }
  .down_list>li:nth-child(2){
    border-bottom: 1px solid #ddd;
  }
  .down_list>li:nth-child(5){
    border-bottom: 1px solid #ddd;
  }
  .down_list>li span.iconfont{
    position: relative;
    top: 1px;
    vertical-align: middle;
    font-size: 16px;
    padding-right: 8px;
    padding-left: 20px;
    color: #000;
  }
  .down_list>li:hover{
    background: #ccc;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
</style>
