<template>
  <div class="container">
    <div class="row justify-content-md-center">
      <form class="form col-md-6 col-lg-4 text-justify">
        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" id="email" class="form-control" placeholder="meu@email.com" v-model="form.email" required>
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" id="password" class="form-control" placeholder="Digite sua Senha..." v-model="form.password" required>
        </div>
        <div class="form-group">
          <input type="checkbox" id="rememberme" class="form-check-input" v-model="form.remoberMe">
          <label class="form-check-label" for="rememberme">Lembrar-me</label>
        </div>
        <div class="float-right">
          <button class="btn btn-secondary">Não sou cadastrado</button>
          <button class="btn btn-primary">Entrar</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
  import firebase from 'firebase';

  export default {
    data() {
      return {
        form: {
          email: '',
          password: '',
          rememberMe: '',
        },
      };
    },
    methods: {
      login() {
        let form = this.form;
        this.loginAuth(form);
        localStorage.setItem('email', form.email);
      },

      loginAuth(form) {
        firebase.auth().signInWithEmailAndPassword(form.emai, form.password)
        .then( (user) => {

        })
        .catch( (error) => {

        })
      }
    }
  };

</script>

<style scoped>


</style>
