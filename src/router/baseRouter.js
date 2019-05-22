const routes=
  [
    {
      path: '/',
      name: 'signin',
      component: resolve => require(['../views/sign/signin.vue'], resolve)
    },
    {
      path: '/signup',
      name: 'signup',
      component: resolve => require(['../views/sign/signup.vue'], resolve)
    },
    {
      path: '/signin',
      name: 'signin',
      component: resolve => require(['../views/sign/signin.vue'], resolve)
      
    },
    // {
    //   path:"*",
    //   name: '404',
    //   component:resolve => require(['../views/notfound.vue'], resolve)
    // }
  ]


export default routes;
