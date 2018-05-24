<template>
  <div class="container">
    <div class="row justify-content-md-center">
      <div class="col-sm-6 col-md-4 col-md-offset-4">
        <h1 class="text-center login-title">Faça seu Login</h1>
        <div class="account-wall">
          <img id="profile-img" class="profile-img-card"
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png" />
          <p v-if="errors.length">
            <ul class="alert alert-danger">
              <li v-for="error in errors" :key="error">{{ error }}</li>
            </ul>
          </p>
          <form class="form-signin">
              <input type="email" id="email" class="form-control"
              placeholder="meu@email.com" v-model="form.email" required>
              <input type="password" id="password" class="form-control"
              placeholder="Digite sua Senha..." v-model="form.password" required>
              <button @click="login" class="btn btn-lg btn-primary btn-block">Entrar</button>
            <label class="checkbox pull-left">
              <input type="checkbox" id="rememberme"
              v-model="form.remoberMe">
              Lembrar-me
            </label>
          </form>
        </div>
        <router-link :to="'/register'" class="text-center new-account">
          Não possuo cadastro
        </router-link>
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
      this.$router.push('/panel');
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
  .form-signin {
    max-width: 330px;
    padding: 15px;
    margin: 0 auto;
  }
  .form-signin .form-signin-heading,
  .form-signin .checkbox {
    margin-bottom: 10px;
  }
  .form-signin .checkbox {
    font-weight: normal;
  }
  .form-signin .form-control {
    position: relative;
    font-size: 16px;
    height: auto;
    padding: 10px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }
  .form-signin .form-control:focus {
    z-index: 2;
  }
  .form-signin input[type="text"] {
    margin-bottom: -1px;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }
  .form-signin input[type="password"] {
    margin-bottom: 10px;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }
  .account-wall {
    margin-top: 20px;
    padding: 40px 0px 20px 0px;
    background-color: #f7f7f7;
    -moz-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
    -webkit-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  }

  .login-title {
    color: #555;
    font-size: 18px;
    font-weight: 400;
    display: block;
  }

  .profile-img {
    width: 96px;
    height: 96px;
    margin: 0 auto 10px;
    display: block;
    -moz-border-radius: 50%;
    -webkit-border-radius: 50%;
    border-radius: 50%;
  }

  .need-help {
    margin-top: 10px;
  }

  .new-account {
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
