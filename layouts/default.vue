<template>
  <div class="layout-wrapper">
    <NavigationBar />
    <Nuxt />
    <Footer />
  </div>
</template>

<script>
import NavigationBar from "../components/NavigationBar.vue";
import Footer from "../components/Footer.vue";
export default {
  components: {
    NavigationBar,
    Footer,
  },
};
</script>

<style>
</style>