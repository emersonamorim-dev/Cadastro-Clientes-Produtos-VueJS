<template>
  <div id="app">
    <AppHeader />
    <router-view></router-view>
  </div>
</template>

<script>
// Importe o componente
import AppHeader from "@/components/Header/AppHeader.vue";

export default {
  name: 'App',
  components: {
    AppHeader,
  },
};
</script>

<style>
/* seus estilos aqui */
</style>

