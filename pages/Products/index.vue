<template>
  <div class="products-page-wrapper">
    <div class="products-page-content-wrapper">
      <h3>Products</h3>
      <div class="products-categories-wrapper">
        <h3>Categories</h3>
        <div class="category-buttons-wrapper">
          <nuxt-link
            to="/products/#all"
            class="category-button toggled"
            @click.native="changeCategory"
          >
            All
          </nuxt-link>
          <nuxt-link
            to="/products/#cameras"
            class="category-button"
            @click.native="changeCategory"
          >
            Cameras
          </nuxt-link>
          <nuxt-link
            to="/products/#accessories"
            class="category-button"
            @click.native="changeCategory"
          >
            Accessories
          </nuxt-link>
        </div>
      </div>
      <div class="products-list-wrapper">
        <!-- Product Items -->
        <ProductsItem
          v-for="(productItem, index) in currentCategoryProducts"
          :key="index"
          :productInfo="productItem"
          :index="index"
        />
      </div>
    </div>
  </div>
</template>

<script>
import ProductsItem from "../../components/ProductsItem.vue";
export default {
  transition: "products",
  components: {
    ProductsItem,
  },
  data() {
    return {
      // ? Current products list to be shown
      currentCategoryProducts: [],
    };
  },
  methods: {
    changeCategory() {
      // ? Change the category based on the router full path on click event
      switch (this.$route.fullPath.split("/")[2]) {
        case "#all":
          this.currentCategoryProducts =
            this.$store.getters["products/allCategories"];
          break;
        case "#cameras":
          this.currentCategoryProducts = this.$store.state.products.camerasList;
          break;
        case "#accessories":
          this.currentCategoryProducts =
            this.$store.state.products.accessoriesList;
          break;
      }
    },
  },
  created() {
    // ? Change the category based on the router full path
    switch (this.$route.fullPath.split("/")[2]) {
      case "#all":
        this.currentCategoryProducts =
          this.$store.getters["products/allCategories"];
        break;
      case "#cameras":
        this.currentCategoryProducts = this.$store.state.products.camerasList;
        break;
      case "#accessories":
        this.currentCategoryProducts =
          this.$store.state.products.accessoriesList;
        break;
    }
  },
};
</script>

<style>
/* #region Default version */
.products-page-wrapper {
  padding: 4em var(--side-padding);
  font-family: montserrat;
}
.products-page-content-wrapper > h3 {
  display: inline-block;
  font-weight: 300;
  position: relative;
  padding: 0 0 0.5em;
  margin-bottom: 0;
  color: var(--dark-text-color);
  font-size: 2em;
}
.products-page-content-wrapper > h3::after {
  content: "";
  position: absolute;
  top: 100%;
  left: 0;
  right: 35%;
  height: 2px;
  background-color: var(--secondary-theme-color);
}
.products-categories-wrapper > h3 {
  font-weight: 500;
  color: var(--dark-text-color);
}
.products-categories-wrapper {
  margin-top: 3em;
}
.category-buttons-wrapper {
  display: flex;
  overflow-x: scroll;
}
.category-buttons-wrapper::-webkit-scrollbar {
  display: flex;
}
.category-buttons-wrapper a.nuxt-link-exact-active {
  background-color: var(--primary-theme-color);
  border: 1px solid var(--secondary-theme-color-dimmed);
  color: var(--light-background-color);
}
a.category-button {
  display: inline-block;
  cursor: pointer;
  transition: background-color 0.2s, color 0.2s, border 0.2s;
  /* flex-basis: 10%; */
  border: 1px solid var(--light-background-color01);
  border-radius: 0.2em;
  font-size: 0.95em;
  text-decoration: none;
  margin: 0.5em 0.7em 0 0;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);
  background-color: var(--light-background-color);
  color: var(--dark-text-color);
  padding: 0.5em 1em;
  text-align: center;
}
.products-list-wrapper {
  margin-top: 2em;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
/* #endregion */
/* #region Transitions */
.products-enter-active,
.products-leave-active {
  transition: opacity 0.2s;
}
.products-enter,
.products-leave-active {
  opacity: 0;
}
/* #endregion */

/* Laptop L 1440px */
@media screen and (max-width: 1440px) {
  .products-page-wrapper {
    padding: 2em calc(var(--side-padding) / 2);
  }
}
/* Laptop S 1024px */
@media screen and (max-width: 1024px) {
}
/* Out of context 620px */
@media screen and (max-width: 620px) {
  .products-list-wrapper {
    flex-direction: column;
  }
}
/* Tablet 768px */
@media screen and (max-width: 768px) {
}
/* Mobile L 425px */
@media screen and (max-width: 425px) {
  .products-page-wrapper {
    padding: 3em calc(var(--side-padding) / 4);
  }
}
</style>