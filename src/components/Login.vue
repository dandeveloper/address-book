<template>
  <div class="container">
    <div class="row justify-content-md-center">
      <form class="form col-md-6 col-lg-4 text-justify">
        <p v-if="errors.length">
          <ul>
            <li class="alert alert-danger" v-for="error in errors" :key="error">{{ error }}</li>
          </ul>
        </p>
        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" id="email" class="form-control"
          placeholder="meu@email.com" v-model="form.email" required>
        </div>
        <div class="form-group">
          <label for="password">Senha</label>
          <input type="password" id="password" class="form-control"
          placeholder="Digite sua Senha..." v-model="form.password" required>
        </div>
        <div class="form-group">
          <input type="checkbox" id="rememberme" class="form-check-input" v-model="form.remoberMe">
          <label class="form-check-label" for="rememberme">Lembrar-me</label>
        </div>
        <div class="float-right">
          <router-link :to="'/register'" class="btn btn-secondary">
            Cadastrar
          </router-link>
          <!-- <button class="btn btn-secondary">Não sou cadastrado</button> -->
          <button @click="login" class="btn btn-primary">Entrar</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase';
import store from '../vuex/store';

export default {

  data() {
    return {
      errors: [],
      form: {
        email: '',
        password: '',
        rememberMe: '',
      },
    };
  },

  mounted() {
    if (localStorage.getItem('email')) {
      this.form.email = localStorage.getItem('email');
    } else {
      localStorage.getItem('email');
    }
  },

  methods: {
    login() {
      const form = this.form;
      this.authUser(form);
      localStorage.setItem('email', form.email);
    },

    authUser(form) {
      firebase
        .auth()
        .signInWithEmailAndPassword(form.email, form.password)
        .then((user) => {
          this.doLogin(user);
          alert('logado');
        })
        .catch((error) => {
          this.loginError(error);
        });
    },

    doLogin(user) {
      store.commit('LOGIN', {
        id: user.uid,
        auth: true,
      });
    },

    loginError(e) {
      this.errors = [];
      if (e.code === 'auth/network-request-failed') {
        this.errors.push('Problema de conexão.');
      } else if (e.code === 'auth/account-exists-with-different-credential') {
        this.errors.push(`Email já registrado ${e.email}`);
      } else if (e.code === 'auth/wrong-password') {
        this.errors.push('Senha incorreta');
      } else if (e.code === 'auth/user-not-found') {
        this.errors.push('E-mail não encontrado');
      }
    },
  },
};
</script>

<style scoped>
</style>
