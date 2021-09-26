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
@media screen and (max-width: 1024px) {
  .layout-wrapper {
    padding-top: 4rem;
  }
}
@media screen and (max-width: 575px) {
  .layout-wrapper {
    padding-top: 6rem;
  }
}
</style>