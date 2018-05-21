<template>
  <div class="container">
    <div class="row justify-content-md-center">
      <form class="form col-md-6 col-lg-4 text-justify">
        <p v-if="errors.length">
          <ul>
            <li class="alert alert-danger"
            v-for="error in errors"
            :key="error">{{ error }}</li>
          </ul>
        </p>

        <div class="form-group">
          <label for="email">Cadastre seu email</label>
          <input type="email" id="email" class="form-control"
          placeholder="meu@email.com"
          v-model="form.email" required>
        </div>
        <div class="form-group">
          <label for="password">Cadastre sua Senha</label>
          <input type="password" id="password" class="form-control"
          placeholder="Cadastre sua Senha..." v-model="form.password" required>
        </div>
        <div class="float-right">
          <button @click="register" class="btn btn-primary">Cadastrar</button>
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
        emailConfirm: '',
        passwordConfirm: '',
      },
    };
  },

  methods: {
    register() {
      const form = this.form;
      firebase.auth().createUserWithEmailAndPassword(form.email, form.password)
        .then((user) => {
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
      alert('Usuário Registrado');
      // this.$router.push('/panel');
    },
  },
};

</script>
