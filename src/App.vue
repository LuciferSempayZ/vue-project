<script>
import {RouterView} from "vue-router";
import Footer from "@/components/Footer.vue";
import Header from "@/components/Header.vue";

export default {
  components: {
    Header,
    RouterView
  },
};
</script>

<template>
<div id="app">
  <Header/>
  <RouterView/>
</div>
</template>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
}
</style>
