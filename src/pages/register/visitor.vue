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
              <el-input clearable v-model="formInline.txt" placeholder="请输入访客姓名"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button size="mini" type="primary" @click="search">搜索</el-button>
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
            :width="item.width"
            align="center"
            header-align="center"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <!--<el-table-column
            label="注册状态"
            align="center"
            width="100">
            <template slot-scope="scope">
              <el-tag type="danger" v-if="scope.row.status == 1">注册成功</el-tag>
              <el-tag type="success" v-else-if="scope.row.status == 0">未注册</el-tag>
              <el-tag type="info" v-else>暂无状态</el-tag>
            </template>
          </el-table-column>-->
          <el-table-column
            label="操作"
            align="center"
          width="150">
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


      <!--start 单个录入弹出框-->
      <el-dialog
        title="新增访客"
        :visible.sync="dialogVisible"
        width="30%"
        :close-on-click-modal="false">
        <div>
          <el-form ref="form" :rules="rules" :model="form" label-width="120px" size="mini">
            <el-form-item label="访客姓名" prop="visitorName">
              <el-input clearable v-model="form.visitorName" placeholder="请输入访客姓名"></el-input>
            </el-form-item>
            <el-form-item label="访客身份证号" prop="cardId">
              <el-input clearable v-model="form.cardId" placeholder="请输入访客身份证号"></el-input>
            </el-form-item>
            <el-form-item label="到访开始时间" prop="arriveTime">
              <el-date-picker
                v-model="form.arriveTime"
                type="datetime"
                value-format="yyyy-MM-dd HH:mm:ss"
                :picker-options="pickerOptionsS"
                placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="到访结束时间" prop="arriveEndTime">
              <el-date-picker
                v-model="form.arriveEndTime"
                type="datetime"
                value-format="yyyy-MM-dd HH:mm:ss"
                :picker-options="pickerOptionsE"
                placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="被访者姓名" prop="visitUserName">
              <el-input clearable v-model="form.visitUserName" placeholder="请输入被访者姓名"></el-input>
            </el-form-item>
            <el-form-item label="被访者身份证号" prop="visitCardId">
              <el-input clearable v-model="form.visitCardId" placeholder="请输入被访者身份证号"></el-input>
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
        name: "visitor",
        data() {
          return {
            nav: {
              icon: 'icon-fuwuzhuce',
              title: ' 注册管理',
              subtitle: '访客登记'
            },
            height: null,
            formInline: {
              txt: ''
            },
            tableList: [   //表格的头部配置
              {prop: 'visitorName', label: '访客姓名',width: '150'},
              {prop: 'cardId', label: '访客身份证号',width: ''},
              {prop: 'arriveTime', label: '到访时间',width: '160'},
              {prop: 'arriveEndTime', label: '到访结束时间',width: '160'},
              {prop: 'visitUserName', label: '被访者姓名',width: '150'},
              {prop: 'visitCardId', label: '被访者身份证号',width: ''},
              {prop: 'modifyTime', label: '录入时间',width: '160'},
            ],
            tableData: [],   //表格的数据
            currentPage: 1, //当前第几页
            pageSize: 10,   //每页显示多少条
            total: null,   //总共多少条数据
            dialogVisible: false,
            form: {
              visitorName: '',   //访客姓名
              cardId: '',    //身份证号码
              arriveTime: '',
              arriveEndTime: '',
              visitUserName: '',   //被访者姓名
              visitCardId: ''
            },
            visitorId: '',   //通过id判断当前是修改还是新增
            rules: {
              visitorName: [
                { required: true, message: '请输入访客姓名', trigger: 'blur' },
                { min: 2, max: 30, message: '长度在 2 到 30 个字符', trigger: 'blur' }
              ],
              cardId: [
                { required: true, message: '请输入访客身份证号码', trigger: 'blur' },
                { min: 1, max: 18, message: '长度在 1 到 18 个字符', trigger: 'blur' }
              ],
              arriveTime: [
                { required: true, message: '请输入到访开始时间', trigger: 'blur' },
              ],
              arriveEndTime: [
                { required: true, message: '请输入到访结束时间', trigger: 'blur' },
              ],
              visitUserName: [
                { required: true, message: '请输入被访者姓名', trigger: 'blur' },
                { min: 2, max: 30, message: '长度在 2 到 30 个字符', trigger: 'blur' }
              ],
              visitCardId: [
                { required: true, message: '请输入被访者身份证号码', trigger: 'blur' },
                { min: 1, max: 18, message: '长度在 1 到 18 个字符', trigger: 'blur' }
              ]
            },
            pickerOptionsS: {
              disabledDate(time) {
                return time.getTime() < Date.now() - 8.64e7;
              }
            },
            pickerOptionsE: {
              disabledDate: (time) => {
               return time.getTime() > this.form.arriveTime || time.getTime() < Date.now() - 8.64e7;
              }
            },
          }
        },
        mounted(){
          window.addEventListener('resize', ()=>{
            this.height = window.innerHeight - 260;
          })

          //获取所有访客列表
          this.getVisitorList()
        },
        created(){
          this.height = window.innerHeight - 260;
        },
        methods: {

          //获取所有访客的列表
          getVisitorList(pageSize,pageNum){
            this.$get('gateVisitor/getGateVisitorFormList',{
              visitorName: this.formInline.txt ? this.formInline.txt : null,
              pageSize: pageSize ? pageSize : 10,
              pageNum: pageNum ? pageNum : 1
            }).then(res=>{
              if(res.code == 0){
                this.tableData = res.data.content;
                this.total = res.data.pageinfo.totalElements > 0 ? res.data.pageinfo.totalElements : 0
              }
            })
          },

          //搜索
          search(){
            this.getVisitorList(this.pageSize,1);
            this.currentPage = 1;
          },

          //点击单个录入
          entry(){
            this.dialogVisible = true;
            this.visitorId = '';

            Object.keys(this.form).forEach((item,index)=>{
              this.form[item] = '';
            })

          },

          //编辑
          handleEdit(row){
            this.dialogVisible = true;
            this.visitorId = row.id;

            this.$post('gateVisitor/getGateVisitor',{
              id: row.id
            }).then(res=>{
              if(res.code === 0){

                //将请求回来的单个数据回显到输入框
                Object.keys(this.form).forEach((item,index)=>{

                  if(res.data[item]){
                    this.form[item] = res.data[item];
                  }else{
                    this.form[item] = ''
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

              this.$post('gateVisitor/delGateVisitor',{
                id: row.id
              }).then(res=>{

                if(res.code === 0){
                  this.$message({
                    type: 'success',
                    message: '删除成功!'
                  });
                  this.getVisitorList(this.pageSize,this.currentPage)
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
            this.getVisitorList(val,this.currentPage);
          },

          //当前第几页
          handleCurrentChange(val) {
            this.currentPage = val;
            this.getVisitorList(this.pageSize,val);
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

                  let startTime = Date.parse(new Date(this.form.arriveTime))/1000;
                  let endTime = Date.parse(new Date(this.form.arriveEndTime)) / 1000;

                  if(startTime >= endTime) {
                    this.$message({
                      showClose: true,
                      message: '到访开始时间不能大于等于结束时间',
                      type: 'warning'
                    });
                    return;
                  }

                  if (this.form.cardId === this.form.visitCardId) {
                    this.$message({
                      showClose: true,
                      message: '两次输入身份证相同，请确认后重新输入',
                      type: 'warning'
                    });
                    return;
                  }


                let url = this.visitorId ? 'gateVisitor/updateGateVisitor' : 'gateVisitor/insertVisitor';

                this.$post(url,{
                  visitorName: this.form.visitorName,   //访客姓名
                  cardId: this.form.cardId,    //身份证号码
                  arriveTime: this.form.arriveTime,
                  arriveEndTime: this.form.arriveEndTime,
                  visitUserName: this.form.visitUserName,   //被访者姓名
                  visitCardId: this.form.visitCardId,
                  id: this.visitorId ? this.visitorId : null
                }).then(res=>{
                  if(res.code === 0){
                    let msg = this.visitorId ? '修改成功' : '录入成功'
                    this.$message({
                      type: 'success',
                      message: msg
                    });

                    this.dialogVisible = false;

                    this.visitorId ? this.getVisitorList(this.pageSize,this.currentPage) : this.getVisitorList(this.pageSize,1)
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
  .visitor .top_nav{
    display: flex;
    display: -webkit-flex;
    justify-content: space-between;
  }
  .visitor .el-date-editor {
    width: 100%;
  }
</style>
