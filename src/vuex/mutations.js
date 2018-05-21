export default {
  LOGIN(state, user) {
    state.user = user;
  },

  LOGOUT(state) {
    state.user = {};
  },

};
