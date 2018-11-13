<template xmlns: xmlns:>
    <div class="shopcart">
      <div class="content">
        <!--点击触发事件-->
        <div class="content-left" v-on:click="togglePopShow" >
          <div class="logo-wrapper">
             <!--套层做阴影-->
          <div class="logo" v-bind:class="{'lights':selectFoods.length > 0}">
          <span class="icon-shopping_cart"></span>
            <!--判断v-show中的属性值大于0就满足条件-->
            <span v-show="totalCount" class="count">{{totalCount}}</span>
          </div>  <!--icon-shopping_cart-->
         </div>
          <div class="price" :class="{'light':this.totalPrice}">￥{{totalPrice}}</div>
          <div class="desc">另需配送费{{deliveryPrice}}元</div>
      </div>
        <div class="content-right" :class="payClass">{{payContent}}
        </div>
    </div>
      <!--通过v-show来控制显隐  需要在data中定义变量 popShow ：false-->
      <div class="pop-wrapper" v-show="popShow" :popShow="popShow">
        <!--定高的层-->
        <!--显示商品层的父层-->
       <div class="foods-wrapper">
         <!--撑搞滚动-->
         <div class="food-content">
           <div class="title">   <!--整占一行  自然换行-->
             <span class="cart">购物车</span>
             <span class="clear" @click="clearFoodList">清空</span>
           </div>
           <div class="content-list" ref="contentlist">
           <ul class="food-list">
             <li class="food border-1px" v-for="food in selectFoods">
               <div class="name">{{food.name}}</div>
                <div class="right">
                  <div class="price">{{food.price}}</div>
                  <div class="cartcontrol-wrapper">
                    <!--将计算组件的食物传过来   我们已经-->
                    <cartcontrol :food="food"></cartcontrol>
                  </div>
                </div>
             </li>
           </ul>
         </div>
         </div>
       </div>
      </div>
    </div>

</template>

<script>
    import cartcontrol from "../cartcontrol/cartcontrol";
    //引入滚动组件
    import BScroll from "better-scroll"

    export default {
      name: "shopcart",
      data(){
        return{
          popShow:false
        }
      },
      //我们的购物车列表是在变化的  我们需要重新渲染一次弹窗

      created(){
        //在重新渲染完dom之后我们在生成一个滚动
        this.$nextTick(()=>{
          this.scroll = new BScroll(this.$refs.contentlist,{click:true})
        })
      },
      updated(){
        this.scroll.refresh()
      },
      methods:{
        //展示购物车选择的商品列表
        togglePopShow(){
          //在vue中取他的计算属性  用this.这个方法
          if(this.totalCount > 0){
            //如果你没选商品的话  就不执行这个方法
            this.popShow = !this.popShow
          }/*else{
            //如果选了这个商品就让他显示
            this.popShow = !this.popShow
            //在渲染完dom之后再执行下面的方法
            this.$nextTick(()=>{
              //this.scroll   默认这个属性没有   为false  下面去new 一个
              if(!this.scroll){
                console.log(this.$refs.contentlist)
                this.scroll = new BScroll(this.$refs.contentlist,{click:true})
              }else{
                //如果有这个滚动组件 就去刷新滚动数据
                this.scroll.refresh()
              }
            })
          }*/
        },
        clearFoodList(){
          //利用子组件向父组件（goods组件）派发事件 并携带参数   第一个是事件名
          this.$emit("clear-foods")
          this.popShow = false   //这是为了将下面的选择的商品数量也清空
        }
      },
      components: {cartcontrol},
      props:{
   //接收goods组件所选商品的  我们接收到的所选的食物 selectFoods 是个数组  给他定义两个属性 price 和 count
        selectFoods:{
          type:Array,
          default(){
           return [{
           }
           ]
          }
        },
        deliveryPrice: {
          type: Number,
          default: 0,
        },
        minPrice: {
          type: Number,
          default: 0
        }
      },
      // 计算属性
      computed:{
           // 计算总价的方法
       totalPrice(){
           //定义一个变量总价
           let price = 0
           //遍历我们所选商品的信息
           this.selectFoods.forEach((food)=>{
             price = food.price * food.count
           })
          return  price
         },
        totalCount(){
           let count = 0
           this.selectFoods.forEach((food)=>{
             count += food.count
           })
          if(count === 0){
             this.popShow = false
          }else{
            return count
          }

        },
        payContent() {
          if(this.selectFoods.length === 0 || this.totalPrice ===0) {
            return '满￥'+ this.minPrice + '起送'
          }else if(this.totalPrice < this.minPrice ){
           return `还差￥${this.minPrice -this.totalPrice}起送`
          } else
          {
            return '去支付'
          }
          },
        payClass(){
           if(this.totalPrice <this.minPrice){
             return 'no-pay'
           }else {
             return 'pay'
           }
        }
        }
    }

</script>
<style lang="stylus" scoped>
  @import "../../commen/stylus/mixin.styl"
 .shopcart
  position fixed
  left 0
  bottom 0
  width 100%
  height 48px
  .content
   position relative
   z-index 50
   display flex
   background-color #141d27
   .content-right
    flex 0 0 90px
    height 48px
    background  #2b343c
    text-align center
    padding 0 12px
    line-height 48px
    color rgba(255,255,255,0.8)
    font-size 13px
    &.pay
     background rgb(0,160,220)
   .content-left
     flex 1
    .logo-wrapper
      box-sizing border-box
      padding 6px
      margin-left 10px
      display inline-block
      position relative
      top -10px
      height 58px
      width 58px
      border-radius 50%
      background-color #141d27
      .logo
       width 44px
       height 44px
       text-align center   /*设置这个属性是给他的父子元素水平居中*/
       border-radius 50%
       background-color #2b343c
       &.lights
        background rgba(0,160,220,0.8)
        .icon-shopping_cart
         color rgb(255,255,255)
       .count
        top -1px
        right 2px
        position absolute
        display inline-block
        width 24px
        line-height 18px
        font-size 9px
        color rgb(255,255,255)
        font-weight 700
        background rgb(240,20,20)
        box-shadow 0px 4px 8px 0px rgba(0,0,0,0.4)
        border-radius 16px

       .icon-shopping_cart
        display inline-block
        font-size 24px
        line-height 44px
        color rgba(255,255,255,0.4)
    .price
     margin-top 14px
     padding-right 8px
     font-size 18px
     font-weight 700
     line-height 24px
     display inline-block
     color rgb(255,255,255,0.4)
     border-right 1px solid rgba(255,255,255,0.1)
     vertical-align top
     &.light
      color red
    .desc
     bottom 10px
     right 130px
     position fixed
     vertical-align top
     line-height 24px
     margin-left 12px
     font-size 10px
     color rgb(255,255,255,0.4)
     display inline-block
  .pop-wrapper
   position fixed
   left 0
   bottom 48px
   width 100%
   height 100%
   background rgba(7,17,27,0.6)
   backdrop-filter blur(10px)    //模糊效果  在sarfar浏览器上
   .foods-wrapper         //定义在父层上在内容曾的外面     给他个绝对定位
    position absolute
    bottom 0
    right 0
    max-height 282px    //最大高度
    width 100%
    background #fff
    z-index 10
    .food-content
     .title
      display flex
      box-sizing border-box
      width 100%
      height 40px
      background #f3f5f7
      padding 0 18px
      .cart
       flex 1
       font-weight 200
       font-size 14px
       line-height 40px
       color rgb(7,17,27)
      .clear
       flex 1
       text-align right
       font-size 12px
       color rgb(0,160,220)
       line-height 40px

     .food-list
      width 100%
      padding 0 18px
      box-sizing border-box
      .food
       display flex
       height 48px
       line-height 48px
       border-1px(rgba(7,17,27,0.1))
       &:last-child
         border-none()
       .name
        flex 1
        font-size 14px
        line-height 48px
        color rgb(7,17,27)
       .right
        margin-top 12px
        line-height 24px
        display inline-block
        .price
         display inline-block
         font-size 10px
         font-weight 700
         color rgb(240,20,20)
         line-height 24px
        .cartcontrol-wrapper
         display inline-block


     .content-list
      overflow hidden
      max-height 242px
</style>
