<template>
    <div class="adplay">
      <!--start 顶部面包屑导航-->
      <TopNav :nav="nav"></TopNav>
      <!--end 顶部面包屑导航-->

      <!--start 顶部导航-->
      <div class="nav_top">
        <div class="nav_top_left">
          <el-form :inline="true" :model="formInline" class="demo-form-inline" size="mini">
            <el-form-item>
              <el-button size="mini" type="primary" @click="openBox(2)">创建分组</el-button>
            </el-form-item>
            <el-form-item>
              <el-select
                clearable
                filterable
                v-model="formInline.type"
                placeholder="请选择组别"
                @change="getAdList">
                <el-option
                  v-for="item in options"
                  :key="item.code"
                  :label="item.text"
                  :value="item.code">
                </el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </div>
        <div class="nav_top_right">
          <el-button type="text" @click="openBox(0)">分组设置</el-button>
          <el-button type="text" @click="openBox(1)">广告播放时间设置</el-button>
          <el-button type="text" @click="openBox(3)">广告播放图片设置</el-button>
        </div>
      </div>
      <!--end 顶部导航-->

      <!--start 内容-->
      <div class="wrap">
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
                <el-tag type="danger" v-if="scope.row.adStatusStr">{{scope.row.adStatusStr}}</el-tag>
                <el-tag type="info" v-else>暂无状态</el-tag>
              </template>
            </el-table-column>
            <el-table-column
              label="操作"
              align="center">
              <template slot-scope="scope">
                <el-button
                  v-if="scope.row.adStatus == 1"
                  size="mini"
                  @click="handleControl(scope.row,0)">暂停</el-button>
                <el-button
                  v-if="scope.row.adStatus == 0"
                  size="mini"
                  type="danger"
                  @click="handleControl(scope.row,1)">播放</el-button>
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

      <!--start 分组设置0、播放时间设置1、创建分组2、图片设置3 弹出框-->
      <el-dialog
        :title="title"
        :visible.sync="dialogVisible"
        width="30%"
        :close-on-click-modal="false">
        <div>
            <el-form ref="form" :rules="rules" :model="form" :label-width="labelWidth" size="mini">
              <!--start 分组设置 0-->
              <div v-if="typeIndex == 0">
                <el-form-item label="广告机MAC" prop="mac">
                  <el-select clearable="" v-model="form.mac" @change="chooseMac(form.mac)" placeholder="请选择">
                    <el-option
                      v-for="item in options1"
                      :key="item.code"
                      :label="item.text"
                      :value="item.code">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="分组选择" prop="group">
                  <el-select clearable="" v-model="form.group" placeholder="请选择">
                    <el-option
                      v-for="item in options"
                      :key="item.code"
                      :label="item.text"
                      :value="item.code">
                    </el-option>
                  </el-select>
                </el-form-item>
              </div>
              <!--end 分组设置 0-->

              <!--start 播放时间设置  1-->
              <div v-if="typeIndex == 1">
                  <el-form-item label="分组选择" prop="group">
                    <el-select clearable="" v-model="form.group" placeholder="请选择">
                      <el-option
                        v-for="item in options"
                        :key="item.code"
                        :label="item.text"
                        :value="item.code">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="广告机MAC" prop="time">
                    <el-input clearable placeholder="请输入时间" type="number" v-model.number="form.time">
                      <template slot="append">秒</template>
                    </el-input>
                  </el-form-item>
              </div>
              <!--end 播放时间设置  1-->

              <!--start 创建分组 2-->
              <div v-if="typeIndex == 2">
                  <el-form-item label="组名" prop="createGroup">
                    <el-input clearable v-model="form.createGroup" placeholder="请输入组名"></el-input>
                  </el-form-item>
              </div>
              <!--end 创建分组 2-->

              <!--start 图片设置3-->
              <div v-if="typeIndex == 3">
                <el-form-item label="分组选择" prop="group">
                  <el-select clearable="" v-model="form.group" placeholder="请选择">
                    <el-option
                      v-for="item in options"
                      :key="item.code"
                      :label="item.text"
                      :value="item.code">
                    </el-option>
                  </el-select>
                </el-form-item>
              </div>
              <!--end 图片设置3-->
            </el-form>
        </div>
        <span slot="footer" class="dialog-footer" v-if="typeIndex === 3">
          <el-button size="mini" type="primary" @click="next('form')">下 一 步</el-button>
        </span>
        <span slot="footer" class="dialog-footer" v-else>
          <el-button size="mini" @click="cancel">取 消</el-button>
          <el-button size="mini" type="primary" @click="comfirm('form')">确 定</el-button>
        </span>

      </el-dialog>
      <!--end  分组设置0、播放时间设置1、创建分组2、图片设置3 弹出框-->

    </div>
</template>

<script>
    export default {
        name: "adplay",
        data() {
          return {
            nav: {
              icon: 'icon-guanggaopai',
              title: '广告管理',
              subtitle: '广告播放设置'
            },
            title: '',
            labelWidth: '',
            height: null,
            typeIndex: null,   //控制弹出框显示哪一块
            options: [],
            options1: [],
            formInline: {
              type: ''
            },
            tableList: [   //表格的头部配置
              {prop: 'macAddress', label: 'MAC'},
              {prop: 'esxitGroupStr', label: '是否存在分组'},
              {prop: 'groupName', label: '所属分组'},
              {prop: 'intervalTime', label: '播放间隔时间'},
              // {prop: 'adStatusStr', label: '当前状态'},
            ],
            tableData: [],   //表格的数据
            currentPage: 1, //当前第几页
            pageSize: 10,   //每页显示多少条
            total: 100,   //总共多少条数据
            dialogVisible: false,
            form: {
              mac: '',   //mac
              group: '',    //组别筛选
              time: '',   //播放时间
              createGroup: ''   //创建分组
            },
            rules: {
              createGroup: [
                { required: true, message: '请输入组别名称', trigger: 'blur' },
                { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
              ],
              mac: [
                { required: true, message: '请选择MAC', trigger: 'blur' },
              ],
              group: [
                { required: true, message: '请选择组别', trigger: 'blur' },
              ],
              time: [
                { required: true, message: '请输入时间', trigger: 'blur' },
                { pattern: /^[0-9]*$/, message: '请输入数字', trigger: 'blur' }
              ]
            }
          }
        },
        mounted(){
          window.addEventListener('resize', ()=>{
            this.height = window.innerHeight - 260;
          })

          //获取广告播放设置
          this.getAdPlayList();

          //获取分组下拉框列表
          this.getSelectList();

          //获取Mac下拉框列表
          this.getMacSelectList();
        },
        created(){
          this.height = window.innerHeight - 260;
        },
        methods: {


            //获取广告播放设置列表
            getAdPlayList(pageSize,pageNum){
              this.$post('sysGroup/getAdGroupList',{
                pageSize: pageSize ? pageSize : 10,
                pageNum: pageNum ? pageNum : 1,
                adGroupId: this.formInline.type ? this.formInline.type : null
              }).then(res=>{
                if(res.code === 0){
                  this.tableData = res.data.content;
                  this.total = res.data.pageinfo.totalElements > 0 ? res.data.pageinfo.totalElements : 0
                }

              })
            },

            //下拉框查询
            getAdList(){
                this.getAdPlayList(this.pageSize,1);
                this.currentPage = 1;
            },

            //获取分组下拉框列表
             getSelectList(){
                this.$post('sysGroup/selectGroupByCodeTextList',{}).then(res=>{
                      if(res.code == 0){
                        this.options = res.data;
                      }
                })
             },

            //获取MAC下拉框列表
            getMacSelectList(){
              this.$post('sysAd/selectIsNoExsitGroupAd',{}).then(res=>{
                if(res.code == 0){
                  this.options1 = res.data;
                }
              })
            },

          //选择广告机查看当前广告机是否存在分组
          chooseMac(val){
            this.$get('/sysAd/getAdGroupId',{
              id: val
            }).then(res=>{
              if(res.code == 0){
                this.form.group = res.data;
              }
            })
          },

            //控制播放暂停
          handleControl(row,index){
            this.$post('sysAd/updateSysAdStatus',{
              id: row.adId,
              adStatus: index
            }).then(res=>{
              if(res.code == 0){
                this.$message({
                  type: 'success',
                  message: '操作成功!'
                });
                this.getAdPlayList(this.pageSize,this.currentPage);
              }
            })
          },



            //每页显示多少条数据
            handleSizeChange(val) {
              this.pageSize = val;
              this.getAdPlayList(val,this.currentPage);
            },

            //当前第几页
            handleCurrentChange(val) {
              this.currentPage = val;
              this.getAdPlayList(this.pageSize,val);
            },

            //打开弹出框
            openBox(type){
              // 分组设置0、播放时间设置1、创建分组2、图片设置3
                switch (type) {
                  case 0:
                    this.title = '分组设置';
                    this.labelWidth = '100px';
                    this.form.group = '';
                    this.form.mac = '';
                    break;
                  case 1:
                    this.title = '播放时间设置';
                    this.labelWidth = '100px';
                    this.form.group = '';
                    this.form.time = '';
                    break;
                  case 2:
                    this.title = '创建分组';
                    this.labelWidth = '60px';
                    this.form.createGroup = '';
                    break;
                  case 3:
                    this.title = '选择分组';
                    this.labelWidth = '100px';
                    this.form.group = '';
                    break;
                }
                this.dialogVisible = true;
                this.typeIndex = type;

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
                      switch (this.typeIndex) {
                        case 0:
                          this.groupSet();
                          break;
                        case 1:
                          this.adPlaySet();
                          break;
                        case 2:
                          this.createGroup();
                          break;
                        case 3:
                          break;
                      }
                } else {
                  return false;
                }
              });
            },

            //创建分组
            createGroup(){
              this.$post('sysGroup/addAdGroup',{
                groupName: this.form.createGroup
              }).then(res=>{
                if(res.code === 0){
                  this.$message({
                    type: 'success',
                    message: '创建分组成功!'
                  });
                  this.dialogVisible = false;
                  this.getAdPlayList(this.pageSize,this.currentPage);
                }
              })
            },

            //分组设置
            groupSet(){
              this.$post('sysAd/updateSysAdGroupId',{
                groupId: this.form.group,
                id: this.form.mac
              }).then(res=>{
                if(res.code === 0){
                  this.$message({
                    type: 'success',
                    message: '分组设置成功!'
                  });
                  this.dialogVisible = false;
                  this.getAdPlayList(this.pageSize,this.currentPage);
                }

              })
            },

            //广告播放设置
            adPlaySet(){
              this.$post('sysGroup/updateGroupintervalTime',{
                id: this.form.group,
                intervalTime: this.form.time
              }).then(res=>{
                if(res.code === 0){
                  this.$message({
                    type: 'success',
                    message: '广告播放时间设置成功!'
                  });
                  this.dialogVisible = false;
                  this.getAdPlayList(this.pageSize,this.currentPage);
                }
              })
            },

            //点击弹出框的下一步跳转到图片设置页面
            next(formName){

              //验证表单填写的数据是否合法，合法将新增数据，反之提示
              this.$refs[formName].validate((valid) => {

                if (valid) {
                  this.$router.push({
                    name: 'setimg',
                    query: {
                      id: this.form.group
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
.adplay .nav_top{
  display: flex;
  display: -webkit-flex;
  justify-content: space-between;
}
.adplay .nav_top .top_nav_right{
  width: 300px;
  display: inherit;
  justify-content: space-around;
}
.adplay .el-select{
  width: 100%;
}
</style>
