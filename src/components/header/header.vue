<template xmlns:on="http://www.w3.org/1999/xhtml">
  <div class="header">
    <div class="content-wrapper">
    <div class="avatar">
      <!--通过vue来绑定图片 绑定的是data中的信息   可以是父亲传过来的-->
      <img v-bind:src="seller.avatar" width="64" height="64"/>
    </div>
    <div class="content">
      <div class="title">
        <span class="brand"></span>
        <span class="name">{{seller.name}}(大运村)</span>
      </div>
      <div class="description">
       {{seller.description}}/{{seller.deliveryTime}}
        分钟送达
      </div>
      <div class="support" v-if="seller.supports">
        <!--去data中拿数据 按照supports的数组下标去取-->
        <span class="brand" v-bind:class="classMap[seller.supports[0].type]"></span>
        <span class="text">{{seller.supports[0].description}}</span>
      </div>
    </div>
    <!--v-if="seller.supports    判断商家是否有这条数组信息-->
    <div class="supports-count" v-if="seller.supports" v-on:click="showDetail = true">
      <span class="count">{{seller.supports.length}}个</span>
      <!--前提是你吧stylus已经引进到main.js中了-->
      <span class="icon-keyboard_arrow_right"></span>
    </div>
  </div>
    <!--公告栏--> <!--点击此区域跳转-->
    <div class="bulletin-wrapper" v-on:click="showDetail = true">
      <div class="title"></div>
      <div class="text">{{seller.bulletin}}</div>
      <div class="icon">
          <span class="icon-keyboard_arrow_right"></span>
      </div>
    </div>
    <!--添加头的背景-->
    <div class="background">
      <img :src="seller.avatar" width="100%" height="100%"/>
    </div>
    <!--商家公告和优惠信息   v-show的意思-->
    <div class="detail" v-show="showDetail">
      <div class="detail-wrapper">
        <div class="detail-main">
          <div class="name">{{seller.name}}(大运村)</div>
          <div class="star-wrapper"></div>
          <div class="title">
            <div class="line"></div>
            <div class="text">优惠信息</div>
            <div class="line"></div>
          </div>
          <ul class="supports">
            <li v-for="support in seller.supports" class="support-item">
              <span class="icon" v-bind:class="classMap[support.type]"></span>
              <span class="text">{{support.description}}{{support.description}}</span>
            </li>
          </ul>
          <!--此处的div仍然可以拆除成一个组件  哪里需要用到去哪里引入-->
          <div class="title">
            <div class="line"></div>
            <div class="text">商家公告</div>
            <div class="line"></div>
          </div>
          <div class="bulletin">
            {{seller.bulletin}}
          </div>
        </div>
         <div class="close">
           <span class="icon-close"  v-on:click="showDetail = false"></span>   <!--相对于detail-wrapper进行绝对定位-->
         </div>
      </div>
    </div>
  </div>

</template>

<script>
  export default {
    name: "header",
    //给页面渲染数据  需要data容器来接收  返回一个对象数组 你想给哪个属性添加值  就给那个属性加上
    //v-bind标签
    data(){
      return{
        classMap:[],
        showDetail:false,
      }
    },
    //接收父组件传过来的数据  表明传过来数据的类型
    props: {
      seller: {
        type: Object
      }
    },
    methods:{
     getSuppotes(){
       //将seller  return出来到页面中
        return this.seller.supports;
      }
    },
    created() {
      //获取加载页面之前父组件传来的附件
      /* this.seller = this.$props.seller
      console.log(this.$props.seller);*/
      //使用数组映射map图片集合
      this.classMap = ['decrease','discount','special','invoice','guarantee']
    }
  }

</script>

<style lang="stylus" scoped>
  //引入活动判断函数
  @import "../../commen/stylus/mixin.styl"
 // @import "../../commen/stylus/icon.styl"
 .header
   position relative
   background-color rgba(7,17,27,0.5)
   overflow hidden
   color #fff
   .content-wrapper
     position relative
     display flex
     //width 100%
     height 64px
     padding 24px 12px 18px 24px //内边距  上右下左
     .avatar
      width 64px
      img
       border-radius 4px
     .content //  所有在内部自己缩进去了
      padding-left 16px
      .title
        margin-top 2px
        margin-bottom 8px
        .brand
         display inline-block
         width 30px
         height 18px
         border:1px solid grey
         bg-image('brand')  //对接的brand选择器的 在mixin.styl 文件中拼接文件名称  引入 index.styl文件中
         background-size 30px 18px
        .name
         margin-left 6px
         fone-size 16px
         color rgb(255,255,255)
         font-weight bold
         line-height 18px   //给文字设置行高是为了竖直居中
         vertical-align top
      .description
        font-size 12px
        line-height 12px
        font-weight 200px
        vertical-align top
        margin-bottom 8px
      .support
        margin-bottom 2px
        font-size 0
        .brand
          vertical-align top
          background-size 12px 12px
          display inline-block
          width 12px
          height 12px
          &.decrease
           bg-image('decrease_1')
          &.discount
            bg-image('discount_1')
          &.special
            bg-image('special_1')
          &.invoice
            bg-image('invoice_1')
          &.guarantee
            bg-image('guarantee_1')
        .text
          margin-bottom 4px
          margin-left 4px
          font-size 10px
          color rgb(255,255,255)
          line-height 12px
          font-weight 200px
          vertical-align top
     .supports-count
      font-size 0  //去除span标签中的空格字符段
      height 24px
      background-color rgba(0,0,0,0.2)
      position absolute
      right 20px
      bottom 12px
      padding 7px 8px 9px 8px
      border-radius 14px
      margin-right 2px
      box-sizing border-box  //内边距吃自己的高宽
      .count
       vertical-align middle
       font-size 10px
       font-weight 200
       color rgb(255,255,255)
       line-height 12px

      .icon-keyboard_arrow_right
        vertical-align middle
        font-size 10px
        margin-left 2px
   .bulletin-wrapper
    display flex
    width 100%
    height 28px
    background-color rgba(7,17,27,0.2)
    padding 4px 12px
    .title
     display inline-block
     height 100%
     width 22px
     bg-image('bulletin')   //前提是已经引入了 mixin.styl
     background-repeat no-repeat
     background-size 22px 12px
     margin 8px 0
    .text
     font-size 10px
     font-weight 200
     color rgb(255,255,255)
     line-height 28px
     width 80%
     margin-left 4px
     white-space nowrap     //不允许换行
     overflow hidden
     text-overflow ellipsis //文档溢出  以...显示
    .icon
     position absolute
     right 12px
     bottom 4px
     display inline-block
     margin-left 4px
     line-height 28px
   .background
    top 0
    left 0
    position absolute
    z-index -1
    width 100%  //占父容器的100%
    height 100%  // 让他铺满整个父容器
    filter blur(10px)   // 给背景设置模糊效果
   .detail
    position fixed  //固定定位  一个div
    width 100%
    height 100%
    background-color rgba(7,17,27,0.8)
    left 0
    top 0
    z-index 10
    backdrop-filter blur(10px)
    overflow auto   //溢出部分可以向下滚动
    .detail-wrapper
     position relative
     width 80%
     min-height 84%
     margin 0 auto   //设置居中的方式  前提是父元素必须得有宽度
     padding-bottom 32px
     .detail-main
      margin-top 64px
      .name
       font-size 16px
       font-weight 700
       color rgb(255,255,255)
       line-height 16px
       text-align center
      .star-wrapper
       height 24px
       margin-top 16px
      .title
       margin-top 28px
       font-size 0    //防止换行有空隙
       .line
        border 1px solid rgba(255,255,255,0.2)
        display inline-block
        width 30%
        margin-bottom 4px
       .text
        margin 0 12px
        font-size 14px
        font-weight 700
        text-align center
        color rgba(255,255,255,0.2)
        line-height 14px
        display inline-block
      .supports
        margin-top 24px
       .support-item  //遍历图片去header 文件夹下去找 这是因为我们已经引入了mixin.styl文件到header.vue中
         font-size 0
         margin-left 12px
         margin-bottom 12px
         &:last-child
           margin-bottom 0px   //c3找最后一个子元素
         .icon
           vertical-align top
           display inline-block
           width 15px
           height 15px
           &.decrease
             bg-image('decrease_2')
           &.discount
             bg-image('discount_2')
           &.special
             bg-image('special_2')
           &.invoice
             bg-image('invoice_2')
           &.guarantee
             bg-image('guarantee_2')

         .text
          font-size 12px
          font-weight 200
          line-height 14px
          color rgb(255,255,255)
          vertical-align top
          margin-left 6px


      .bulletin
       font-size 12px
       font-weight 200
       color rgb(255,255,255)
       line-height 24px
       margin-top 24px
       padding 0 12px


     .close
      position absolute
      bottom 0
      right 0
      text-align center
      margin-bottom 32px
      width 100%
      .icon-close
        font-size 32px
</style>
