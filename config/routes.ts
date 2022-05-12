export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        name: '登录',
        path: '/user/login',
        component: './user/Login',
      },
      {
        name: '注册',
        path: '/user/register',
        component: './user/Register',
      },
      {
        component: './404',
      },
    ],
  },
  {
    path: '/welcome',
    name: '欢迎',
    icon: 'smile',
    component: './Welcome',
  },
  {
    path: '/admin',
    name: '管理',
    icon: 'crown',
    access: 'canAdmin',
    component: './Admin',
    routes: [
      {
        path: '/admin/sub-page',
        name: '用户管理',
        icon: 'smile',
        component: './Welcome',
      },
      {
        component: './404',
      },
    ],
  },
  {
    name: '用户管理',
    icon: 'table',
    path: '/list',
    access: 'canAdmin',
    component: './TableList',
  },
  {
    path: '/',
    redirect: '/welcome',
  },
  {
    component: './404',
  },
];
