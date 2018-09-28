import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';

Vue.use(Router);
const router = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      children: [
        {
          path: 'user-list',
          name: 'user-list',
          component: () => import('./views/userAuth/userList'),
        },
        {
          path: '/about',
          name: 'about',
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
        },
        {
          path: '/vue-fusion-charts',
          name: 'vue-fusion-charts',
          component: () => import('./views/list/vueFusionCharts.vue'),
        },
      ],
    },

    {
      path: '/login',
      name: 'login',
      component: () => import('./views/Login.vue'),
    },
  ],
});

router.beforeEach((to, from, next) => {
  const username = localStorage.getItem('username');

  if (username) {
    if (to.name === 'login') {
      next('/');
    } else {
      next();
    }
  } else if (to.name !== 'login') {
    next('/login');
  } else {
    next();
  }
});

export default router;
