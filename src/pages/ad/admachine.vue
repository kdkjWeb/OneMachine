<template>
    <div class="admachine">
      <!--start 顶部面包屑导航-->
      <TopNav :nav="nav"></TopNav>
      <!--end 顶部面包屑导航-->

      <!--start 内容-->
      <div class="container">
        <div>
          <div>
            <el-button size="mini" type="primary" @click="addMac">新增一体机</el-button>
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
              label="广告机当前状态"
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
      </div>
      <!--end 内容-->

      <!--start 单个录入弹出框-->
      <el-dialog
        title="新增一体机"
        :visible.sync="dialogVisible"
        width="30%">
        <div>
          <el-form ref="form" :rules="rules" :model="form" label-width="110px" size="mini">
            <el-form-item label="院校名称" prop="schoolName">
              <el-input clearable v-model="form.schoolName" placeholder="请输入院校名称"></el-input>
            </el-form-item>
            <el-form-item label="注册机地址" prop="registerAddress">
              <el-input clearable v-model="form.registerAddress" placeholder="请输入注册机地址"></el-input>
            </el-form-item>
            <el-form-item label="MAC编码" prop="macAddress">
              <el-input clearable v-model="form.macAddress" placeholder="请输入MAC编码"></el-input>
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
        name: "admachine",
        data() {
          return {
            nav: {
              icon: 'icon-guanggaopai',
              title: '广告管理',
              subtitle: '广告机管理'
            },
            height: null,
            macId: '',
            tableList: [   //表格的头部配置
              {prop: 'schoolName', label: '所属院线'},
              {prop: 'registerAddress', label: '注册机地址'},
              {prop: 'macAddress', label: 'MAC编码'},
            ],
            tableData: [],   //表格的数据
            currentPage: 1, //当前第几页
            pageSize: 10,   //每页显示多少条
            total: null,   //总共多少条数据
            dialogVisible: false,
            form: {
              schoolName: '',   //院校名称
              registerAddress: '',    //注册机地址
              macAddress: ''   //MAC编码
            },
            rules: {
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
            }
          }
        },
        mounted(){
          window.addEventListener('resize', ()=>{
            this.height = window.innerHeight - 240;
          })

          this.getMachAdList();
        },
        created(){
          this.height = window.innerHeight - 240;
        },
        methods: {
          //新增一体机
          addMac() {
            this.dialogVisible = true;
            this.macId = '';
            Object.keys(this.form).forEach((item,index)=>{
                this.form[item] = '';
            })
          },

          //获取广告机列表
          getMachAdList(pageSize,pageNum){
            this.$get('sysAd/getAdList',{
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
          handleEdit(row) {
            this.macId = row.id;

            this.$post('sysAd/getSysAdd',{
              id: row.id
            }).then(res=>{

              if(res.code === 0){
                this.dialogVisible = true;
                Object.keys(this.form).forEach((item,index)=>{
                    if(res.data[item]) {
                      this.form[item] = res.data[item]
                    }
                })
              }

            })

          },

          //删除
          handleDelete(row) {
            this.$confirm('此操作将永久删除该条数据, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {

              this.$post('sysAd/delSysAd',{
                id: row.id
              }).then(res=>{

                if(res.code === 0){
                  this.$message({
                    type: 'success',
                    message: '删除成功!'
                  });
                  this.getMachAdList()
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
            this.getMachAdList(val,this.currentPage);
          },

          //当前第几页
          handleCurrentChange(val) {
            this.currentPage = val;
            this.getMachAdList(this.pageSize,val);
          },

          //点击弹出框取消按钮
          cancel(){
            this.dialogVisible = false;
          },

          //点击弹出框的确认按钮
          comfirm(formName){

            //验证表单填写的数据是否合法，合法将新增数据，反之提示
            this.$refs[formName].validate((valid) => {
              let url = this.macId ? 'sysAd/updateSysAd' : 'sysAd/addSysAd';
              if (valid) {
                this.$post(url,{
                  schoolName: this.form.schoolName,
                  registerAddress: this.form.registerAddress,
                  macAddress: this.form.macAddress,
                  id: this.macId ? this.macId : null
                }).then(res=>{

                  let msg = this.macId ? '修改成功' : '新增成功'

                  if(res.code === 0){
                    this.$message({
                      type: 'success',
                      message: msg
                    });

                    this.dialogVisible = false;

                    this.getMachAdList()
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

</style>
