<template>
    <div class="configuration">
      <!--start 顶部面包屑导航-->
      <TopNav :nav="nav"></TopNav>
      <!--end 顶部面包屑导航-->

      
      <!--start 提示用户-->
      <div class="notice">
        <ul>
          <li>操作须知：</li>
          <li>1、高级管理员停止操作强制退出倒计时设置</li>
          <li>2、注册机无操作进入广告时间设置</li>
        </ul>
      </div>
      <!--end 提示用户-->
      
      <!--start 基本配置设置-->
      <div class="setting">
        <el-form size="small" ref="form" :model="form" label-width="100px">
          <el-form-item label="强制退出设置">
            <!--<el-input v-model="form.stopTime"></el-input>-->
            <el-input clearable placeholder="请输入时间" type="number" v-model.number="form.stopTime">
              <template slot="append">秒</template>
            </el-input>
          </el-form-item>
          <el-form-item label="广告进入设置">
            <!--<el-input v-model="form.endTime"></el-input>-->
            <el-input clearable placeholder="请输入时间" type="number" v-model.number="form.endTime">
              <template slot="append">秒</template>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">保存设置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <!--end 基本配置设置-->
    </div>
</template>

<script>
    export default {
        name: "configuration",
        data() {
          return {
            nav: {
              icon: 'icon-shezhi3',
              title: '参数设置',
              subtitle: '基本配置'
            },
            form: {
              stopTime: '',
              endTime: ''
            }
          }
        },
        methods: {
            //保存基本配置
          onSubmit(){

          }
        }
    }
</script>

<style scoped>
.setting{
  width: 500px;
}
.notice{
  margin-bottom: 20px;
}
.notice li{
  line-height: 30px;
}
.notice li:first-child{
  color: red;
  font-size: 16px;
}
</style>
