const routes =
  [

    {
      path: '/index',
      name: 'index',
      component: resolve => require(['../views/layout/index.vue'], resolve),
      redirect: '/home',
      children: [
        { path: '/home', name: 'home', component: resolve => require(['../views/home/index.vue'], resolve), meta: { icon: ['iconfont', 'icon-home_pho'], title: "home" } },
        {
          path: '/article', name: 'article', component: resolve => require(['../views/article/index.vue'], resolve), meta: { icon: ['iconfont', 'icon-shouye'], title: "article" },
          children: [
            { path: '/article/articleList', name: 'articleList', component: resolve => require(['../views/article/article.vue'], resolve), meta: { title: "articleList" } },
            // { path: '/addarticle', name: 'addarticle', component: resolve => require(['../views/article/addArticle.vue'], resolve) }
            { path: '/article/addarticle', name: 'addarticle', component: resolve => require(['../views/article/addArticle.vue'], resolve), meta: { title: "addArticle" } },
          ],

        },
        { path: '/user', name: 'user', component: resolve => require(['../views/user/user.vue'], resolve), meta: { icon: ['iconfont', 'icon-yuangongguanli'], title: "user" } },

        { path: '/qualityTest', name: 'qualityTest', component: resolve => require(['../views/qualityTest/index.vue'], resolve), meta: { icon: ['iconfont', 'icon-tiku'], title: "qualityTest" } },
        
        { path: '/organize', name: 'organize', component: resolve => require(['../views/organize/index.vue'], resolve), meta: { icon: ['iconfont', 'icon-jiagou'], title: "organize" } },

        { path: '/chart', name: 'chart', component: resolve => require(['../views/chart/index.vue'], resolve), meta: { icon: ['iconfont', 'icon-shuju'], title: "chart" } },

        { path: '/log', name: 'log', component: resolve => require(['../views/log/index.vue'], resolve), meta: { icon: ['iconfont', 'icon-rizhi'], title: "log" } },

        { path: '/test', name: 'test', component: resolve => require(['../views/test/index.vue'], resolve), meta: { icon: ['iconfont', 'icon-rizhi'], title: "test" } },
      ]
    }


  ]


export default routes;
