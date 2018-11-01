/**
 * @author 杨勇
 * @date 18/10/31
 * @Description: 将所有路由文件单独放在一个文件中并抛出去
 */


/* start 引入路由文件 */

export default {
  routes: [
    {
      path: '/',
      component: resolve => require(['@/components/Home.vue'],resolve),
      redirect: '/index',
      children: [
        {
          path: '/index',
          name: 'index',
          component: resolve => require(['@/pages/Index.vue'],resolve)
        },
      ]
    },{
      path: '/login',
      name: 'Login',
      component: resolve => require(['@/pages/Login'],resolve)
    }
  ]
}

/* end 引入路由文件 */
