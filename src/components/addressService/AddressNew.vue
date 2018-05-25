<template>
  <div class="container">
    <div class="row justify-content-center">
      <form class="col-md-12">
        <div class="form-group">
          <label for="cep">Digite seu CEP</label>
          <input type="text" class="form-control"
          v-model="form.cep"
          @input="formatCep($event.target.value)"
          maxlength="9" @value="cep">
        </div>
        <div class="form-group">
          <label for="logradouro">Logradouro</label>
          <input type="text" class="form-control" v-model="form.logradouro">
        </div>
        <div class="form-group">
          <label for="complemento">Complemento</label>
          <input type="text" class="form-control" v-model="form.complemento">
        </div>
        <div class="form-group">
          <label for="bairro">Bairro</label>
          <input type="text" class="form-control" v-model="form.bairro">
        </div>
        <div class="form-group">
          <label for="cidade">Cidade</label>
          <input type="text" class="form-control" v-model="form.cidade">
        </div>
        <div class="form-group">
          <label for="cidade">Estado</label>
          <input type="text" class="form-control" v-model="form.estado">
        </div>
        <div class="row">
          <div class="form-group col-lg-12 align-items-center">
            <button type="submit" @click="saveAddress()"
            class="btn btn-success col-sm-6">Cadastrar</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      form: {
        cep: '',
        logradouro: '',
        complemento: '',
        bairro: '',
        cidade: '',
        estado: '',
      },
    };
  },
  methods: {
    formatCep(cep) {
      let formatedCep = cep;
      formatedCep = formatedCep.replace(/D/g, ';');
      formatedCep = formatedCep.replace(/^(\d{5})(\d)/, '$1-$2');
      this.cep = formatedCep;
    },
  },
};
</script>
