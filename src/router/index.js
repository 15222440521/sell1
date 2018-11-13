import Vue from 'vue'
import Router from 'vue-router'
import goods from '../components/goods/goods'
import ratings from '../components/ratings/ratings'
import seller from '../components/seller/seller'

Vue.use(Router)
//默认路由页面
export default new Router({
  //记得配路由路径
  routes: [
    //默认情况下访问商品
    {path:'/',redirect:'goods'},
    {path:'/goods',component:goods},
    {path:'/ratings',component:ratings},
    {path:'/seller',component:seller}

  ],
  //改成H5的路由模式  去掉#
 mode:'history',
})
