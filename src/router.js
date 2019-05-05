import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';

Vue.use(Router);
const router = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: 'user-list',
      component: Home,
      children: [
        {
          path: 'user-list',
          name: 'user_list',
          component: () => import('./views/userAuth/userList'),
        },
        {
          path: 'subject-bank-list',
          name: 'subject_bank_list',
          component: () => import('./views/subject/subjectBank'),
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
  const name = localStorage.getItem('name');
  if (name) {
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
