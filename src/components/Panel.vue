<template>
  <div>
    <b-navbar toggleable="md" type="dark" variant="primary">
      <div class="container">
        <div class="col-md-3">
          <router-link :to="'/register'" class="navbar-brand">
            <span class="fa fa-address-book"></span>
            {{title}}
          </router-link>
        </div>
        <div class="col-md-7">
          <a href="#" @click="newAddress" class="btn btn-success">
            <span class="fa fa-plus-circle"></span> Novo Endereço</a>
        </div>
        <div class="col-md-2">
          <a href="#" class="logoff float-right" @click="logoff">
            <span class="fa fa-power-off"></span> Sair
          </a>
        </div>
      </div>
    </b-navbar>
  </div>
</template>

<script>
import Vue from 'vue';
import { Navbar } from 'bootstrap-vue/es/components';
import store from '../vuex/store';

Vue.use(Navbar);

export default {
  data() {
    return {
      title: 'Livro de Endereços',
    };
  },

  mounted() {
    this.user = store.state.user;
  },
  methods: {
    logoff() {
      store.commit('LOGOUT');
      this.$router.push('/');
    },
    newAddress() {

    },
  },
};
</script>
<style scoped>
.logoff {
  color: #ffffff;
}
</style>
