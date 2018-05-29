<template>
  <div>
    <addressweather :cidade="address.cidade"></addressweather>
    <iframe
      width="100%"
      height="400px"
      frameborder="0" style="border:0"
      :src="`https://www.google.com/maps/embed/v1/directions?key=AIzaSyCw9eoi9__xAgDwpt1b1f05MSU0ds_b68o&origin=${currentLocation}&destination=${address.cep}&mode=driving`" allowfullscreen>
    </iframe>
  </div>
</template>

<script>
import AddressWeather from './AddressWeather';
import store from '../../vuex/store';

export default {
  computed: {
    currentLocation: () => store.state.UserLocation,
  },

  mounted() {
    this.getUserLocation();
  },

  props: {
    address: '',
  },

  methods: {
    getUserLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          const coords = `${position.coords.latitude} , ${position.coords.longitude}`;
          store.commit('SET_LOCATION', coords);
        });
      } else {
        console.log('ok');
      }
    },
  },

  components: {
    addressweather: AddressWeather,
  },
};
</script>
