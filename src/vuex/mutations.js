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

};
