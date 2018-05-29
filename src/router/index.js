import Vue from 'vue';
import Router from 'vue-router';
import Login from '@/components/Login';
import Register from '@/components/Register';
import Panel from '@/components/Panel';
// import Address from '@/components/addressService/Address';

Vue.use(Router);

export default new Router({
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
    // {
    //   path: '/address',
    //   name: 'Address',
    //   component: Address,
    // },
  ],
});
