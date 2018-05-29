import { fireDB } from '../firebase';

export default {
  LOGIN(state, user) {
    state.user = user;
  },

  LOGOUT(state) {
    state.user = {};
  },
  SAVE_ADDRESS(state, address) {
    fireDB.ref('address').child(state.user.id).push(address);
  },

  GET_ADDRESSES(state, uid) {
    let id = state.user.id;
    if (uid !== undefined) {
      id = uid;
    }
    state.userAddressList = [];
    fireDB.ref('address').once('value')
      .then((user) => {
        user.forEach((userAddress) => {
          if (userAddress.key === id) {
            const addressList = userAddress.val();
            Object.keys(addressList).forEach((key) => {
              state.userAddressList.push({
                key,
                address: addressList[key],
              });
            });
          }
        });
        state.userAddressList.reverse();
      });
  },

  CURRENT_ADDRESS(state, address) {
    state.currentAddress = address;
  },

  EDIT_ADDRESS(state, payload) {
    fireDB.ref('address').child(state.user.id).child(payload.key).update({
      cep: payload.form.cep,
      logradouro: payload.form.logradouro,
      complemento: payload.form.complemento,
      bairro: payload.form.bairro,
      cidade: payload.form.cidade,
      estado: payload.form.estado,
    });
  },

  DELETE_ADDRESS(state, key) {
    fireDB.ref('address').child(state.user.id).child(key).remove();
  },

  SET_LOCATION(state, location) {
    state.UserLocation = location;
  },
};
