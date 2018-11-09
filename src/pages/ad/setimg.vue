<template>
    <div class="setimg">
      <!--start 顶部面包屑导航-->
      <TopNav :nav="nav"></TopNav>
      <!--end 顶部面包屑导航-->

      <h2 class="notice">请选择这个组的图片</h2>

      <!--start 上传图片-->
      <el-upload
        action="https://jsonplaceholder.typicode.com/posts/"
        list-type="picture-card"
        :file-list="fileList"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove">
        <i class="el-icon-plus"></i>
      </el-upload>
      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt="">
      </el-dialog>
      <!--end 上传图片-->
    </div>
</template>

<script>
    export default {
        name: "setimg",
        data() {
          return {
            nav: {
              icon: 'icon-guanggaopai',
              title: '广告管理',
              subtitle: '广告图片设置'
            },
            dialogImageUrl: '',
            dialogVisible: false,
            fileList: []
          }
        },
        methods: {
          handleRemove(file, fileList) {
            console.log(file, fileList);
          },
          handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
          }
        }
    }
</script>

<style scoped>
.setimg .notice{
  font-size: 16px;
  padding-bottom: 10px;
}
</style>
