<template>
  <div class="container">
    <div class="row justify-content-center">
      <form onsubmit="return false" class="col-md-12">
        <div class="form-group">
          <label for="cep">Digite seu CEP</label>
          <input type="text" class="form-control"
          v-model="form.cep"
          @input="formatCep($event.target.value)"
          @blur="requestAddress()"
          maxlength="9" @value="form.cep" required>
        </div>
        <div class="form-group">
          <label for="logradouro">Logradouro</label>
          <input type="text" class="form-control"
          v-model="form.logradouro" required>
        </div>
        <div class="form-group">
          <label for="complemento">Complemento</label>
          <input type="text" class="form-control"
          v-model="form.complemento" required>
        </div>
        <div class="form-group">
          <label for="bairro">Bairro</label>
          <input type="text" class="form-control"
          v-model="form.bairro" required>
        </div>
        <div class="form-group">
          <label for="cidade">Cidade</label>
          <input type="text" class="form-control"
          v-model="form.cidade" required>
        </div>
        <div class="form-group">
          <label for="cidade">Estado</label>
          <input type="text" class="form-control" v-model="form.estado" required>
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

import store from '@/vuex/store';

export default {
  data() {
    return {
      cepError: false,
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
      formatedCep = formatedCep.replace(/\D/g, '');
      formatedCep = formatedCep.replace(/^(\d{5})(\d)/, '$1-$2');
      this.form.cep = formatedCep;
    },
    requestAddress() {
      const cep = this.form.cep;
      this.$http.get(`https://viacep.com.br/ws/${cep}/json/`).then((response) => {
        if (response.ok) {
          if (response.body.erro) {
            alert('CEP não encontrado', 'warning');
            this.cepError = true;
          } else {
            this.cepError = false;
            this.autoFillForm(response.body);
          }
        }
      }, (e) => {
        console.log(e);
      });
    },
    autoFillForm(address) {
      this.form.logradouro = address.logradouro;
      this.form.bairro = address.bairro;
      this.form.cidade = address.localidade;
      this.form.estado = address.uf;
    },
    saveAddress() {
      if (this.form.cep.length !== 9) {
        alert('Preencha o CEP corretamente.');
      } else if (this.form.logradouro === '' || this.form.complemento === '' ||
            this.form.bairro === '' || this.form.cidade === '' || this.form.estado === '') {
        alert('Preencha todos os campos corretamente.');
      } else {
        store.commit('SAVE_ADDRESS', this.form);
        this.clearForm();
        store.commit('GET_ADDRESSES');
      }
    },
    clearForm() {
      this.cepError = false;
      this.form = {
        cep: '',
        logradouro: '',
        complemento: '',
        bairro: '',
        cidade: '',
        estado: '',
      };
    },
  },
};
</script>
