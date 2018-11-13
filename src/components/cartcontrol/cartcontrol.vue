<template>
  <div class="cartcontrol">
    <div class="icon-remove_circle_outline" v-show="food.count" @click="decreaseCount"></div>
    <div class="count" v-show="food.count">{{food.count}}</div>
    <div class="icon-add_circle" @click="increaseCount"></div>
  </div>
</template>

<script>
  import Vue from 'vue'
   export default {
        name: "cartcontrol",
        props:{
          food:{
            type:Object
          },
          popShow:{
            type:Boolean
          }
        },
      methods:{
        decreaseCount(){
          this.food.count--
          //判断商品数量的总数是否为零
           if(this.food.count == 0){
             //如果为零的爱好U哈
             this.popShow = false
            }
        },
        //点击加号触发一个计算属性的方法
        increaseCount(){
          //判断food是否有这个属性 没有就创建一个
          if(!this.food.count){
            Vue.set(this.food,'count',0)
            this.food.count++
          }else {
            this.food.count++
          }
        }
      }



    }
</script>

<style lang="stylus" scoped>
   .cartcontrol
    div
     display inline-block
     vertical-align top
    .icon-remove_circle_outline
      font-size 24px
      font-weight 24px
      color rgb(0,160,220)
    .icon-add_circle
      font-size 24px
      font-weight 24px
      color rgb(0,160,220)
    .count
     width 24px
     font-size 10px
     line-height 24px
     color rgb(147,153,159)
     text-align center
</style>
