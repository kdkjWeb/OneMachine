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

      children: [
        {
          path: '/using',
          name: 'using',
          component: resolve => require(['@/pages/account/using'],resolve)
        },{
          path: '/expired',
          name: 'expired',
          component: resolve => require(['@/pages/account/expired'],resolve)
        },{
          path: '/student',
          name: 'student',
          component: resolve => require(['@/pages/register/student'],resolve)
        },{
          path: '/visitor',
          name: 'visitor',
          component: resolve => require(['@/pages/register/visitor'],resolve)
        },{
          path: '/machine',
          name: 'machine',
          component: resolve => require(['@/pages/log/machine'],resolve)
        },{
          path: '/platform',
          name: 'platform',
          component: resolve => require(['@/pages/log/platform'],resolve)
        },{
          path: '/configuration',
          name: 'configuration',
          component: resolve => require(['@/pages/setting/configuration'],resolve)
        },{
          path: '/admachine',
          name: 'admachine',
          component: resolve => require(['@/pages/ad/admachine'],resolve)
        },{
          path: '/adplay',
          name: 'adplay',
          component: resolve => require(['@/pages/ad/adplay'],resolve)
        },{
          path: '/setimg',
          name: 'setimg',
          component: resolve => require(['@/pages/ad/setimg'],resolve)
        }
      ]
    },{
      path: '/login',
      name: 'Login',
      component: resolve => require(['@/pages/Login'],resolve)
    },{
      path: '*',
      name: '404',
      component: resolve => require(['@/pages/notFound/404'],resolve)
    }
  ]
}

/* end 引入路由文件 */



