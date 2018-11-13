<template>
  <div id="app">
    <!--通过v-bind:标识将数据从父组件中传过来-->
    <v-header v-bind:seller="seller"></v-header>
    <!--我们在base.stylu中加了一个border-1px属性来控制旋转  所以我们需要引入border-1px-->
    <div class="tab border-1px">
    <div class="tab-item">
    <router-link to="/goods">商品</router-link>
    </div>
    <div class="tab-item">
      <router-link to="/ratings">评价</router-link>
    </div>
    <div class="tab-item">
      <router-link to="/seller">商家</router-link>
    </div>
    </div>
    <router-view :seller="seller"></router-view>
  </div>
</template>

<script>
  //引入组件
  import header from './components/header/header'

// 定义一个常量 来判定是否传到了子组件中
 const ERROK = 0
 //const ERRNO = 1
export default {
  name: 'App',
  data(){
    return{
      //seller是个对象 不是数组
      seller:{}
    }
  },
  components:{
     //给组件起别名
    'v-header':header,
    //'v-body-seller':body-seller,
  },
  //要在浏览器加载页面之前加载数据
  created(){
    //通过的网络get请求去查找本利文件  如果查到之后我将数据传到v-bind修饰的属性中  这里指的是是seller
    this.$axios.get('/api/seller').then((data)=>{
     if(data.data.errno === ERROK){
        this.seller = data.data.data,
       console.log( data.data.data)
     }
    })

  }

}
</script>

<style lang="stylus" scoped>
  @import "./commen/stylus/mixin.styl"
  #app
   .tab
     display flex
     width 100%
     height 40px
     line-height 40px
     border-1px(rgba(7,17,27,0.1))
    .tab-item
     flex 1
     text-align center
     &>a              //.tab-item>a  >表示的是 子元素
      display inline-block   //将a标签改成行内快元素
      width 100%
      font-size 14px
      color rgb(77, 85, 93)
      &.router-link-active
         color: red

</style>
