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
          <el-form ref="form" :model="form" label-width="110px" size="mini">
            <el-form-item label="院校名称">
              <el-input clearable v-model="form.userName" placeholder="请输入院校名称"></el-input>
            </el-form-item>
            <el-form-item label="注册机地址">
              <el-input clearable v-model="form.address" placeholder="请输入注册机地址"></el-input>
            </el-form-item>
            <el-form-item label="MAC编码">
              <el-input clearable v-model="form.macCode" placeholder="请输入MAC编码"></el-input>
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
        name: "admachine",
        data() {
          return {
            nav: {
              icon: 'icon-guanggaopai',
              title: '广告管理',
              subtitle: '广告机管理'
            },
            height: null,
            tableList: [   //表格的头部配置
              {prop: 'userName', label: '所属院线'},
              {prop: 'schoolName', label: '注册机地址'},
              {prop: 'registerAddress', label: 'MAC编码'},
            ],
            tableData: [],   //表格的数据
            currentPage: 1, //当前第几页
            pageSize: 10,   //每页显示多少条
            total: 100,   //总共多少条数据
            dialogVisible: false,
            form: {
              userName: '',   //院校名称
              address: '',    //注册机地址
              macCode: ''   //MAC编码
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
          //新增一体机
          addMac() {
            this.dialogVisible = true;
          },

          //编辑
          handleEdit() {

          },

          //删除
          handleDelete() {

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

</style>
