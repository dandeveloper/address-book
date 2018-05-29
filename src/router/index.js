import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '@/components/Login';
import Register from '@/components/Register';
import Panel from '@/components/Panel';
import NotFoundComponent from '@/components/NoFoundComponent';

Vue.use(VueRouter);

export default new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login,
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
    },
    {
      path: '/panel',
      name: 'Panel',
      component: Panel,
    },
    {
      path: '*',
      component: NotFoundComponent,
    },
  ],
});
