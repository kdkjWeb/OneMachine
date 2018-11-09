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
              <el-select clearable filterable v-model="formInline.type" placeholder="请选择组别">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
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
              label="操作"
              align="center">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="handlePause(scope.$index, scope.row)">暂停</el-button>
                <el-button
                  size="mini"
                  type="danger"
                  @click="handlePlay(scope.$index, scope.row)">播放</el-button>
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
        width="30%">
        <div>
            <el-form ref="form" :model="form" :label-width="labelWidth" size="mini">
              <!--start 分组设置 0-->
              <div v-if="typeIndex == 0">
                <el-form-item label="分组选择">
                  <el-select clearable="" v-model="form.group" placeholder="请选择">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="广告机MAC">
                  <el-select clearable="" v-model="form.mac" placeholder="请选择">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </div>
              <!--end 分组设置 0-->

              <!--start 播放时间设置  1-->
              <div v-if="typeIndex == 1">
                  <el-form-item label="分组选择">
                    <el-select clearable="" v-model="form.group" placeholder="请选择">
                      <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="广告机MAC">
                    <el-input clearable placeholder="请输入时间" type="number" v-model.number="form.time">
                      <template slot="append">秒</template>
                    </el-input>
                  </el-form-item>
              </div>
              <!--end 播放时间设置  1-->

              <!--start 创建分组 2-->
              <div v-if="typeIndex == 2">
                  <el-form-item label="组名">
                    <el-input clearable v-model="form.createGroup" placeholder="请输入组名"></el-input>
                  </el-form-item>
              </div>
              <!--end 创建分组 2-->

              <!--start 图片设置3-->
              <div v-if="typeIndex == 3">
                <el-form-item label="分组选择">
                  <el-select clearable="" v-model="form.group" placeholder="请选择">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </div>
              <!--end 图片设置3-->
            </el-form>
        </div>
        <span slot="footer" class="dialog-footer" v-if="typeIndex === 3">
          <el-button size="mini" type="primary" @click="next">下 一 步</el-button>
        </span>
        <span slot="footer" class="dialog-footer" v-else>
          <el-button size="mini" @click="cancel">取 消</el-button>
          <el-button size="mini" type="primary" @click="comfirm">确 定</el-button>
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
            formInline: {
              type: ''
            },
            tableList: [   //表格的头部配置
              {prop: 'userName', label: 'MAC'},
              {prop: 'schoolName', label: '是否存在分组'},
              {prop: 'registerAddress', label: '所属分组'},
              {prop: 'registerAddress', label: '播放间隔时间'},
              {prop: 'registerAddress', label: '当前状态'},
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
            //暂停
            handlePause(){

            },

            //停止
            handlePlay(){

            },

            //每页显示多少条数据
            handleSizeChange(val) {
              this.pageSize = val;
            },

            //当前第几页
            handleCurrentChange(val) {
              this.currentPage = val;
            },

            //打开弹出框
            openBox(type){
              // 分组设置0、播放时间设置1、创建分组2、图片设置3
                switch (type) {
                  case 0:
                    this.title = '分组设置';
                    this.labelWidth = '100px';
                    break;
                  case 1:
                    this.title = '播放时间设置';
                    this.labelWidth = '100px';
                    break;
                  case 2:
                    this.title = '创建分组';
                    this.labelWidth = '60px';
                    break;
                  case 3:
                    this.title = '选择分组';
                    this.labelWidth = '100px';
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
            comfirm(){
              this.dialogVisible = false;
            },

            //点击弹出框的下一步跳转到图片设置页面
            next(){
              this.$router.push({
                name: 'setimg'
              })
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
