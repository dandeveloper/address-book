<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style lang="scss">
  $theme-colors: (
    "primary": #79589F,
    "danger": #ff4136,
    "info": #534A93,
  );
  @import '../node_modules/bootstrap/scss/bootstrap.scss';
</style>
