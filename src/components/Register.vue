<template>
  <div class="container">
    <div class="row justify-content-md-center">
      <div class="col-sm-6 col-md-4 col-md-offset-4">
        <h1 class="text-center login-title">Faça seu Cadastro</h1>
        <div class="account-wall">
          <img id="profile-img" class="profile-img-card"
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png" />
          <p v-if="errors.length">
            <ul class="alert alert-danger">
              <li v-for="error in errors" :key="error">{{ error }}</li>
            </ul>
          </p>
          <form class="form-signin" onsubmit="return false">
              <input type="email" id="email" class="form-control"
                placeholder="Cadastre seu Email"
                v-model="form.email" required>
              <input type="password" id="password" class="form-control"
              placeholder="Cadastre sua Senha"
              v-model="form.password" required>
              <button @click="register" class="btn btn-lg btn-primary btn-block">Cadastrar</button>
          </form>
        </div>
      </div>
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
      },
    };
  },

  methods: {
    register() {
      const form = this.form;
      firebase.auth().createUserWithEmailAndPassword(form.email, form.password)
        .then((user) => {
          console.log(user);
          this.doRegister(user);
        })
        .catch((e) => {
          this.registerError(e);
        });
    },

    registerError(e) {
      this.errors = [];
      if (e.code === 'auth/email-already-in-use') {
        this.errors.push('Este e-mail já está cadastrado');
      } else if (e.code === 'auth/invalid-email') {
        this.errors.push('Formato inválido de email');
      } else if (e.code === 'auth/weak-password') {
        this.errors.push('Sua senha obrigatóriamente deve conter pelo menos 6 digitos');
      }
    },

    doRegister(user) {
      store.commit('LOGIN', {
        id: user.uid,
        email: user.email,
        password: user.password,
      });
      this.$router.push('/panel');
    },
  },
};

</script>

<style scoped>
.form-signin
{
    max-width: 330px;
    padding: 15px;
    margin: 0 auto;
}
.form-signin .form-signin-heading, .form-signin .checkbox
{
    margin-bottom: 10px;
}
.form-signin .checkbox
{
    font-weight: normal;
}
.form-signin .form-control
{
    position: relative;
    font-size: 16px;
    height: auto;
    padding: 10px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
}
.form-signin .form-control:focus
{
    z-index: 2;
}
.form-signin input[type="text"]
{
    margin-bottom: -1px;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
}
.form-signin input[type="password"]
{
    margin-bottom: 10px;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
}
.account-wall
{
    margin-top: 20px;
    padding: 40px 0px 20px 0px;
    background-color: #f7f7f7;
    -moz-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
    -webkit-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
}
.login-title
{
    color: #555;
    font-size: 18px;
    font-weight: 400;
    display: block;
}
.profile-img
{
    width: 96px;
    height: 96px;
    margin: 0 auto 10px;
    display: block;
    -moz-border-radius: 50%;
    -webkit-border-radius: 50%;
    border-radius: 50%;
}
.need-help
{
    margin-top: 10px;
}
.new-account
{
    display: block;
    margin-top: 10px;
}
.profile-img-card {
    width: 96px;
    height: 96px;
    margin: 0 auto 10px;
    display: block;
    -moz-border-radius: 50%;
    -webkit-border-radius: 50%;
    border-radius: 50%;
}
</style>
