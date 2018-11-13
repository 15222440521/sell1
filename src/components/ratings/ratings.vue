<template>
  <div class="rating">
    <div class="main-wrapper">
     <div class="assess-content">
       <div class="assess-left">
         <span>3.9</span>
         <span>综合评分</span>
         <span>高于周边商家69.2%</span>
       </div>
       <div class="assess-left">
         <span>服务态度   <img src=""/></span>
         <span>服务态度</span>
         <span>送达时间</span>
       </div>
     </div>

    </div>
  </div>
</template>

<script>
    export default {
        name: "ratings"
    }
</script>

<style lang="stylus" scoped>
   .rating
    .main-wrapper
     .assess-content
      display flex
      .content-left
       flex 1
      .content-right
       flex 1
</style>
