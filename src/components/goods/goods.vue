<template>
  <div class="goods">
     <div class="menu-wrapper" ref="menuWrapper">
       <ul class="menu">
         <!--当所选元素的下标等于 这个高量的时候将高量 将class值付给他-->
   <li class="menu-item" v-for="(item,index) in goods" v-on:click="selectMenu(index)" :class="{'current':
      currentIndex ==index}">
           <!--只有当type>0的时候才能有图片--><span class="text"> <!--将li设计程表格 将“text”设计成单元格-->
           <span class="icon" v-if="item.type > 0" v-bind:class="classMap[item.type]"></span>{{item.name}}
         </span>
         </li>
       </ul>
     </div>
    <div class="foods-wrapper" ref="foodsWrapper">
      <ul>
        <!--首先遍历goods数组  goods数组含有foods数组  在<li>里-->
        <!--加个food-list-hook 类选择器名称-->
        <li v-for="good in goods" class="food-list-hook">
          <h1 class="title">{{good.name}}</h1>
          <ul class="foods">
            <li v-for="food in good.foods" class="food">
              <div class="content-wrapper border-1px">
              <div class="avatar">
                <img v-bind:src="food.icon" width="57" height="57">  <!--记住给属性绑定v-bind  才能获取数据-->
              </div>
              <div class="content">
                 <h1 class="name">{{food.name}}</h1>
                 <div class="description">{{food.description}}</div>
              <div class="count-rating">
                  <span class="count">月售{{food.sellCount}}份</span>
                  <span class="rating">好评率{{food.rating}}%</span>
              </div>
              <div class="price">
                  <span class="now">￥{{food.price}}</span>
                  <span class="old" v-if="food.oldPrice">￥{{food.oldPrice}}</span>
              </div>
              </div>
              <div class="cartcontrol-wrapper">
                <!--绑定food传给子组件  这里传给子组件是为了将选中的商品 传过去-->

                <cartcontrol v-bind:food="food" :selectFoods="selectFoods" :minPrice="minPrice">
                </cartcontrol>
                </div>

              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <!--引入shopcart组件   从app中获取seller-->
    <!--父组件接受子组件派发的事件  @clear-foods   @后main直接接受事件名-->
    <shopcart :deliveryPrice="seller.deliveryPrice" :minPrice="seller.minPrice"
    :selectFoods = "selectFoods" @clear-foods="clearFoods()">
    </shopcart>

  </div>
</template>

<script>
  //引入滚动插件  用vue来做
  import BSscroll from 'better-scroll'
  //我们需要在商品栏引入购物车组件    并将组件注册到goods的compoents中
  import shopcart from '../shopcart/shopcart'
  import cartcontrol from "../cartcontrol/cartcontrol";
  const ERR_Ok = 0
    export default {
        name: "goods",
      //定义在data中的数据都需要this.去拿minPrice 去传过去
        data(){
          return{
            goods:[],
            classMap:[],
            //currentIndex:0,
            scrollY:0,
            listHeight:[],
            minPrice:[]
          }
        },
      props:{
        seller:{
          type:Object,
          default:{}
        }
      },
      components:{
        cartcontrol,
          shopcart
      },
      computed:{
          //我们写在计算属性中
        currentIndex(){
          //this.scrollY =  this.scrollY + 0
          //console.log(2222)
           //判断scrollY在listHeight数组中的哪一个位置不会出现下表越界的情况
          for (let i = 0; i <this.listHeight.length-1 ; i++) {
            let Height1 = this.listHeight[i]
            let Height2 = this.listHeight[i+1]
            if(!Height2 || this.scrollY >= Height1 && this.scrollY < Height2){
             return i
              //i表示当前数组第几个菜单的那个位置
            }
          }
          return 0   //在没有滚动之前的第一个位置
      },

        //计算我所选的属性
        selectFoods(){
          //console.log(this.goods)
          //定义一个数组去接收 所选的食物
          let foods = []
              this.goods.forEach((good)=>{
                //当所选的商品数量大于0时才执行下面的逻辑
                good.foods.forEach((food)=>{
                  if(food.count){
                    foods.push(food)
                  }
            })
          })
          return foods
        }
      },

      created(){
       this.$axios.get('/api/goods').then((data)=>{
         //console.log(data)
         if(data.data.errno === ERR_Ok) {
           this.goods = data.data.data
           //当页面数据加载完毕之后我们再去抓数据


           //console.log(this.goods)
           //构建一个classmap承装图片数组
           this.classMap = ['decrease','discount','special','invoice','guarantee']
           //获取我们需要滚动的节点   在页面加载之前就会执行我们需要的方法
           /* new BSscroll(this.$refs.foodWrapper,{})*/
           //当执行完created执行完  就会异步执行此函数
           this.$nextTick(()=>{
             //我们需要在这里调用初始化方法
             this._initScroller()
             this._calculateHeight()
           })
         }
       })
      },
      methods:{
          //初始化方法 初始化滚动方法
          _initScroller(){
            //初始化对象  我们需要给这些对象添加到data中去  方便我们后面调用
            this.menuScroll=new BSscroll(this.$refs.menuWrapper,{click:true})
            //设置监控滚动
            this.foodsScroll=new BSscroll(this.$refs.foodsWrapper,{click:true,probeType:3})
            //我们需要监控事件 传一个字符串scroll  回调一个箭头函数 on方法
            //还需要传入一个滚动的位置坐标对象pos
            this.foodsScroll.on("scroll",(pos)=>{
              //监控到我们滚动的位置
               //console.log(Math.abs( Math.round(pos.y)))
              // 记录一下每次滚动的值
            this.scrollY=Math.abs( Math.round(pos.y))
              this.watchScroll()
            })
        },
        watchScroll(){
           // console.log("监控到都dom节点的变化了")
        },

        //我们需要去计算一下我们需要的区间高度
        _calculateHeight(){
          let foodList  =  this.$refs.foodsWrapper.getElementsByClassName("food-list-hook")
          //console.log(foodList.length)
          //区间初始值为0   放入我们定义的数组  vue的data的listHeight数组
          let height = 0
          this.listHeight.push(height)
          //需要我们去遍历foodList
          for (let i = 0; i < foodList.length ; i++) {
            //遍历出来的所有对象节点
             let item =  foodList[i]
            //item.clientHeight  获取数组中每个元素的高度
             height += item.clientHeight
            //将遍历之后的数组高度传入我们的高度区间数组
             this.listHeight.push(height)
            //此时数组中已经记录了所有菜单项的高度
          }
        },

        selectMenu(index){
           // console.log(index)
            //定义一个数组去接收我们 我们的dom节点上的所有商品对象 每个对象是有自然顺序的 这个类下的数组也是有顺序的
           // food-list-hook属性值 加在联动列表的class属性上
           let foodList  =  this.$refs.foodsWrapper.getElementsByClassName("food-list-hook")
          //console.log(foodList.length) //获取菜单中元素的个数
          //取出我们所选的那个下标
           let el = foodList[index]
           //调用滚动对象的 指定下标的具体节点位置 300秒是响应时间
           this.foodsScroll.scrollToElement(el,300)
           //每次滚动完之后  变一次高量将我们所选的值赋给currentindex
           this.currentIndex = index
        },
        clearFoods(){
          let foods = []
          this.goods.forEach((good)=>{
            //当所选的商品数量大于0时才执行下面的逻辑
            good.foods.forEach((food)=>{
              if(food.count){
                food.count = 0
              }
            })
          })
        }
      }
    }
</script>

<style lang="stylus" scoped>

  @import "../../commen/stylus/mixin.styl"
   /*为了手机适应的dpi 以及1px的边框*/
  .goods
   display flex
   position absolute
   top 180px
   left 0
   width 100%
   bottom 46px
   .menu-wrapper
    flex 0 0 80px
    background-color #f3f5f7
    overflow hidden
    .menu
     .menu-item
      display table
      font-size 12px
      font-weight 200
      color rgb(77,85,93)
      height 56px
      line-height 14px
      width 80px
      font-size 0
      padding 0 14px
      box-sizing border-box
      font-size 12px
      &.current    //& 代表当前最近父元素的节点  专门是为了修饰当前子元素设立的
       background-color #fff  /*选中之后背景变为白色*/
       .text
         border-none()  //藏起每格菜单的下划线
      &:last-child
        border-none()
      .text    /*让此文本生成表格的单元格*/
       display table-cell
       vertical-align middle
       border-1px (rgba(7,17,27,0.1))
       .icon
        display inline-block
        height 12px
        width 12px
        background-size 12px 12px   //设置背景图片大小的
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
   .foods-wrapper
     overflow hidden
     flex 1
    .title
      width 100%
      font-size 12px
      line-height 26px
      color rgb(147,153,159)
      padding-left 14px
      box-sizing border-box
      background-color #f3f5f7
      height 26px
      border-left 3px solid #d9dde1
    .food
     padding 18px 18px 0 18px
     box-sizing border-box
     .avatar
      flex 0 0 57px
      height 57px
     .content-wrapper
      position relative
      border-bottom 1px solid rgba(7,17,27,0.1)
      display flex
      padding-bottom 18px
      .cartcontrol-wrapper
       position absolute
       bottom 18px
       right 0
      .content
       flex 1
       margin-left 10px
       margin-top 2px
       .name
        line-height 14px
        font-size 14px
        color rgb(7,17,27)
        margin-bottom 8px
       .description
        line-height 10px
        font-size 10px
        color rgb(147,153,159)
        margin-bottom 8px
       .count-rating
        font-size 0
        margin-bottom 8px
        line-height 10px
        font-size 10px
        color rgb(147,153,159)
        .count
         margin-right 8px
       .price
        margin-top 2px
        .now
         font-size 14px
         font-weight 700
         color rgb(240,20,20)
         line-height 24px
        .old
         text-decoration line-through
         font-size 10px
         font-weight 700
         line-height 24px
         color rgb(147,153,159)
</style>
