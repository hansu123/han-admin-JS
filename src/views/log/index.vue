<template>




    <div class="block">
        <el-row>


    <el-col :span="24">


  <el-timeline>
    <el-timeline-item
      v-for="(activity, index) in activities2"
      :key="index"
      :icon="activity.icon"
      :type="activity.type"
      :color="activity.color"
      :size="activity.size"
      :timestamp="activity.timestamp" placement="top">
      
      <el-card>
          <h4> {{activity.content}}</h4>
          <p> {{activity.event}}</p>
      </el-card>
     
    </el-timeline-item>
  </el-timeline>
      </el-col>
</el-row>
</div>



</template>
<script>
export default {

data(){

    return{
 activities2: [
     {
          content: '获得粉丝留言',
          event:'hansu 提交',
          timestamp: '2018-06-03 20:46',
          size: 'large',
          type: 'primary',
          color: '#0bbd87',
          
        },
        {
          content: '突破文章数量5',
          event:'hansu 提交',
          timestamp: '2018-04-12 20:46',
          size: 'large',
          type: 'primary',
          color: '#0bbd87',
        }, {
          
          content: '更新个人文章',
          event:'hansu 提交',
          timestamp: '2018-04-04 20:46',
          color: '#0bbd87'
        }, {
          content: '注册个人账号',
          event:'hansu 提交',
          timestamp: '2018-04-04 15:46',
          color: '#0bbd87',
          size: 'large'
        }, {
          content: '创建个人博客',
          event:'hansu 提交',
          timestamp: '2018-04-03 22:50',
          color: '#0bbd87',
        }]
      };

}

};
</script>
<style scoped lang="stylus">
.block {
    padding: 0.3rem;
}
</style>
