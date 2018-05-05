<template>
  <div class="container">
    <div class="row justify-content-md-center">
      <form class="form col-md-4 text-justify">
        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" id="email" class="form-control" placeholder="meu@email.com" required>
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" id="password" class="form-control" placeholder="Senha" required>
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
export default {
  data() {
    return {
      email: '',
      senha: '',
    };
  },
};
</script>

<style scoped>

</style>
