<template>
    <div class="setimg">
      <!--start 顶部面包屑导航-->
      <TopNav :nav="nav"></TopNav>
      <!--end 顶部面包屑导航-->

      <h2 class="notice">请选择这个组的图片</h2>

      <!--start 上传图片-->
      <el-upload
        :action="`${this.$store.state.updateUrl}file/insertFile`"
        list-type="picture-card"
        :data= "{
          parentId: groupId
        }"
        accept="image/jpeg,image/png"
        name="file"
        :file-list="fileList"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
        :before-upload="beforeAvatarUpload"
        :on-success="handleAvatarSuccess"
        :on-error="upError">
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
            fileList: [],
            groupId: ''
          }
        },
        methods: {
          /**start上传图片 */
          handleRemove(file, fileList) {
            this.$post('file/delFile',{
              id: file.id
            }).then(res=>{

              if(res.code === 0){
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                });
                this.getImgList()
              }

            })
          },
          handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
          },
          handleAvatarSuccess(res, file, fileList) {
            if(res.code == 0){
              this.$message({
                type: 'success',
                message: '上传成功!'
              });
              this.getImgList()
            }
          },
          beforeAvatarUpload(file) {
            const isJPG = file.type === 'image/jpeg';
            const isPNG = file.type === 'image/png';
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG && !isPNG) {
              this.$message.error('请选择我们支持的格式!');
            }
            if (!isLt2M) {
              this.$message.error('上传图片大小不能超过 2MB!');
            }


            return (isJPG || isPNG) && isLt2M
          },
          //上传图片失败
          upError(err){
            if(err){
              this.$message.error('上传图片失败');
            }
          },
          /**end上传图片 */

          //获取以前的图片
          getImgList(){
            this.groupId && this.$post('file/getFileList',{
              parentId: this.groupId
            }).then(res=>{
              if(res.code === 0){
                let arr = [];
                res.data.forEach((e,index)=>{
                  let obj = {};
                  obj.url = e.webPath;
                  obj.id = e.id;
                  obj.name = e.name;
                  arr.push(obj);
                })
                this.fileList = JSON.parse(JSON.stringify(arr));

              }
            })
          }


        },

        mounted(){
          this.groupId = this.$route.query.id;

          this.getImgList();

        }
    }
</script>

<style scoped>
.setimg .notice{
  font-size: 16px;
  padding-bottom: 10px;
}
</style>
