<template>
  <div class="container">
    <div class="col-md-12" v-if="addressList.length > 0">
      <h2 class="p-4 text-center">Lista de Endereços</h2>
      <b-card no-body v-for="object in addressList" :key="object.key">
        <b-card-header class="p-0" header-tag="header" role="tab">
          <b-btn block @click="visible ? true : false" v-b-toggle="object.key" variant="info">
            {{`${object.address.logradouro} -
            ${object.address.cidade} -
            ${object.address.complemento}`}}
          </b-btn>
        </b-card-header>
        <b-collapse :id="object.key" :visible="visible" :aria-controls="object.key"
        accordion="my-accordion" role="tabpanel">
          <b-card-header>
            {{object.address.logradouro}}
            {{object.address.complemento}}
            {{object.address.bairro}},
            {{object.address.cidade}} -
            {{object.address.estado}} -
            {{object.address.cep}}
          </b-card-header>
          <b-card-body>
            <addressElement :address="object.address"></addressElement>
            <div class="float-right">
              <a href="#" v-b-tooltip.hover title="Excluir Endereço"
                @click="deleteAddress(object.key, object.address)"
                class="btn btn-danger">
                <span class="fa fa-trash"></span>
              </a>
              <a href="#" v-b-tooltip.hover title="Editar Endereço"
                @click="setAddress(object.address, object.key)"
                class="btn btn-secondary">
                <span class="fa fa-edit"></span>
              </a>
            </div>
          </b-card-body>
        </b-collapse>
      </b-card>
      <b-modal ref="myModalRef" hide-footer title="Atualizar endereço">
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
                  <button  class="btn btn-info" @click="hideModal()">
                    <span class="fa fa-times"></span> Cancelar Edição
                  </button>
                  <button type="submit" @click="editAddress()"
                  class="btn btn-success col-sm-6">Cadastrar</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </b-modal>
    </div>
  </div>
</template>

<script>
import AddressElement from './AddressElement';
import AddressNew from './AddressNew';
import store from '../../vuex/store';

export default {
  data() {
    return {
      visible: false,
      addresskey: '',
      showCollapse: false,
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
  computed: {
    addressList() {
      return store.state.userAddressList;
    },
  },

  mounted() {
    this.uid = store.state.user.id;
    store.commit('GET_ADDRESSES');
  },

  methods: {
    deleteAddress(key, address) {
      if (confirm(`Deseja excluir o endereço ${address.cep} - ${address.logradouro}, ${address.cidade} - ${address.estado}?`)) {
        store.commit('DELETE_ADDRESS', key);
        store.commit('GET_ADDRESSES');
      }
    },

    setAddress(address, key) {
      this.addresskey = key;
      this.form = address;
      this.openModal();
    },

    editAddress() {
      const form = this.form;
      const key = this.addresskey;
      store.commit('EDIT_ADDRESS', { form, key });
      store.commit('GET_ADDRESSES');
      this.addresskey = '';
      this.hideModal();
    },

    openModal() {
      this.$refs.myModalRef.show();
    },

    hideModal() {
      this.$refs.myModalRef.hide();
    },
  },

  components: {
    addressElement: AddressElement,
    addressNew: AddressNew,
  },
};
</script>
