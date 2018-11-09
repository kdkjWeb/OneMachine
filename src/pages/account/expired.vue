<template>
  <div class="expired">
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
            label="权限级别"
            align="center">
            <template slot-scope="scope">
              <el-tag type="danger" v-if="scope.row.authorityLevel == 0">一体机</el-tag>
              <el-tag type="success" v-if="scope.row.authorityLevel == 1">管理端</el-tag>
              <el-tag type="warning" v-if="scope.row.authorityLevel == 2">一体加管理端</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            label="当前状态"
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
        <el-form ref="form" :model="form" label-width="110px" size="mini">
          <el-form-item label="用户名">
            <el-input clearable v-model="form.userName" placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input clearable v-model="form.password" type="password" placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item label="院校名称">
            <el-input clearable v-model="form.schoolName" placeholder="请输入院校名称"></el-input>
          </el-form-item>
          <el-form-item label="注册机地址">
            <el-input clearable v-model="form.registerAddress" placeholder="请输入注册机地址"></el-input>
          </el-form-item>
          <el-form-item label="MAC地址">
            <el-input clearable v-model="form.macAddress" placeholder="请输入MAC地址"></el-input>
          </el-form-item>
          <el-form-item label="负责人">
            <el-input clearable v-model="form.leader" placeholder="请输入负责人"></el-input>
          </el-form-item>
          <el-form-item label="负责人电话">
            <el-input clearable v-model="form.leaderPhone" placeholder="请输入负责人电话"></el-input>
          </el-form-item>
          <el-form-item label="授权开始时间">
            <el-date-picker
              size="mini"
              v-model="form.authStartTime"
              type="date"
              :picker-options="pickerOptions"
              value-format="yyyy-MM-dd"
              format="yyyy 年 MM 月 dd 日"
              placeholder="请选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="授权结束时间">
            <el-date-picker
              size="mini"
              v-model="form.authEndTime"
              type="date"
              :picker-options="pickerOptions"
              value-format="yyyy-MM-dd"
              format="yyyy 年 MM 月 dd 日"
              placeholder="请选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="权限级别" prop="resource">
            <el-radio-group v-model="form.authorityLevel">
              <el-radio label="一体机操作"></el-radio>
              <el-radio label="后台管理"></el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
          <el-button size="mini" @click="cancel">取 消</el-button>
          <el-button size="mini" type="primary" @click="comfirm">确 定</el-button>
        </span>
    </el-dialog>
    <!--end 弹出新增用户框-->
  </div>
</template>

<script>
  export default {
    name: "expired",
    data() {
      return {
        nav: {
          icon: 'icon-dengluyonghuming',
          title: '平台账户管理',
          subtitle: '已过期管理员'
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
        total: 100,   //总共多少条数据
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
          authorityLevel: ''  //级别权限
        },
        pickerOptions: {
          //限制用户只能选择今天和今天以前的日期
          disabledDate(time) {
            return time.getTime() > Date.now() - 8.64e6
          }
        },
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

      //新增管理
      addUser(){
        this.dialogVisible = true;
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
  /* start 内容 */
  .container{

  }


  /* end 内容*/


  .expired .el-date-editor{
    width: 100%;
  }
</style>
