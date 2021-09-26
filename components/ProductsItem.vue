<template>
  <nuxt-link
    :to="`${productInfo.productType}/${trueIndex}`"
    class="product-item-wrapper"
    click.native="changeIndex"
  >
    <div class="product-thumbnail">
      <img :src="productInfo.productThumbnailPath" alt="" />
    </div>
    <div class="product-information-wrapper">
      <div class="product-information-title-wrapper">
        <h3>{{ productInfo.productName }}</h3>
        <h6>{{ productInfo.productModel }}</h6>
        <p>{{ productInfo.productPrice }}</p>
      </div>
    </div>
  </nuxt-link>
</template>

<script>
export default {
  props: {
    productInfo: Object,
    index: Number,
  },
  methods: {
    // ? The parameter "index" could be out of range, only if the "All" categories is shown in the page, so it needs to be changed to a true id
    // ? There are easier ways to handle the categories and product indexes, but i made the hard decision to challenge myself!
    changeIndex() {
      switch (this.$route.fullPath.split("/")[2]) {
        case "#all":
          switch (this.productInfo.productType) {
            case "cameras":
              this.trueIndex =
                this.index - this.$store.state.products.accessoriesList.length;
              return;
              break;
            case "accessories":
              this.trueIndex = this.index;
              break;
          }
          break;
        case "#cameras":
          this.trueIndex = this.index;
          break;
        case "#accessories":
          this.trueIndex = this.index;
          break;
      }
    },
  },
  created() {
    this.changeIndex();
  },
};
</script>

<style>
.product-item-wrapper {
  text-decoration: none;
  transition: transform 0.3s, box-shadow 0.3s, filter 0.3s;
  padding: 1em;
  text-align: center;
  margin-bottom: 1em;
  border: 1px solid var(--light-background-color01);
  border-radius: 0.2em;
  color: var(--dark-text-color);
  background-color: var(--light-background-color);
  min-width: 200px;
  flex-basis: calc(20% - 0.2em);
}
.product-item-wrapper:hover {
  box-shadow: 0 3px 12px rgba(0, 0, 0, 0.16);
  filter: brightness(1.05);
  transform: scale(1.01);
}
.product-thumbnail {
  width: 100%;
}
.product-thumbnail > img {
  object-fit: contain;
  border: 1px solid var(--light-background-color01);
  border-radius: 0.2em;
  width: 100%;
  height: 100%;
}
.product-information-title-wrapper > h3 {
  font-weight: 400;
  margin-bottom: 0;
  font-size: 1.2em;
}
.product-information-title-wrapper > h6 {
  font-weight: 300;
  margin: 0.4em 0;
  color: var(--light-background-color01);
}
.product-information-title-wrapper > p {
  color: var(--secondary-theme-color);
}
/* Out of context 620px */
@media screen and (max-width: 620px) {
  .products-item-wrapper {
    min-width: 280px;
  }
}
</style>