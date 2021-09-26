<template>
  <div class="individual-product-page-wrapper">
    <div class="individual-product-page-content-wrapper">
      <div class="product-info-title-wrapper">
        <h3>{{ getProductInfo.productName }}</h3>
        <h4>{{ getProductInfo.productModel }}</h4>
      </div>
      <div class="product-info-content-wrapper">
        <div class="product-info-description-wrapper">
          <p>{{ getProductInfo.productDescription }}</p>
          <div class="browse-more-products-wrapper">
            <h5>Didn't found what you're looking for?</h5>
            <nuxt-link to="/products/#all" class="back-to-products-button"
              >Browse products</nuxt-link
            >
          </div>
        </div>
        <div class="product-model-viewer">
          <canvas
            ref="productModelRenderer"
            class="product-model-renderer"
          ></canvas>
          <Loading v-if="showProductModel" loadingCaption="- Loading -" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as THREE from "three";
import Loading from "../../../../components/Loading.vue";
import { gsap } from "gsap";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
export default {
  transition: "individualProducts",
  data() {
    return {
      showProductModel: true,
    };
  },
  computed: {
    // ? Processing the product info based on the selected category
    getProductInfo() {
      console.log(this.$route.params.productType);
      switch (this.$route.params.productType) {
        case "cameras":
          return this.$store.state.products.camerasList[this.$route.params.Id];
          break;
        case "accessories":
          return this.$store.state.products.accessoriesList[
            this.$route.params.Id
          ];
          break;
      }
    },
  },
  components: {
    Loading,
  },
  methods: {
    tick() {
      this.controls.update();
      this.renderer.render(this.scene, this.camera);
      window.requestAnimationFrame(this.tick);
    },
    dataInitialization() {
      this.cameraLookAtPoint = new THREE.Vector3(0, 0, 0);
      this.raycaster = new THREE.Raycaster();

      // * Our technologies data
      // ? Initializing the camera
      this.scene = new THREE.Scene();
      this.camera = new THREE.OrthographicCamera(-2, 2, 2, -2, 0.1, 1000);
      this.scene.add(this.camera);
      this.controls = new OrbitControls(
        this.camera,
        this.$refs.productModelRenderer
      );
      this.controls.enableDamping = true;
      this.controls.enablePan = false;
      // ? Defining renderer
      this.renderer = new THREE.WebGLRenderer({
        canvas: this.$refs.productModelRenderer,
        alpha: true,
      });
      this.renderer.setClearColor(0x000000, 0);
      this.renderer.setSize(
        this.$refs.productModelRenderer.clientWidth,
        this.$refs.productModelRenderer.clientHeight
      );
    },
    renderProductModel() {
      const directionalLight = new THREE.DirectionalLight("white", 1);
      const ambientLight = new THREE.AmbientLight("white", 0.5);
      directionalLight.position.set(3, 5, 3);

      // ? Adding to the scene
      this.scene.add(directionalLight);
      this.scene.add(ambientLight);
      // ? Loading the camera 3D model
      const cameraModel = new GLTFLoader().load(
        `/Products/${this.$route.params.productType}/${this.getProductInfo.productModelPath}`,
        (gltf) => {
          // ? Scaling model
          this.showProductModel = false;
          var model = gltf.scene;
          model.traverse((o) => {
            if (o.isMesh) {
              console.log(o);
            }
          });
          gltf.scene.children[0].scale.set(
            this.getProductInfo.productScale.x,
            this.getProductInfo.productScale.y,
            this.getProductInfo.productScale.z
          );
          gltf.scene.children[0].position.set(
            this.getProductInfo.productPosition.x,
            this.getProductInfo.productPosition.y,
            this.getProductInfo.productPosition.z
          );
          this.camera.updateProjectionMatrix();
          this.camera.position.z = 3;
          this.camera.position.x = 3;
          this.camera.position.y = 2;

          // ? Camera model hover animation
          const tl = new gsap.timeline({ repeat: -1 })
            .to(gltf.scene.children[0].position, {
              y: this.getProductInfo.productPosition.y + 0.2,
              duration: 5,
            })
            .to(gltf.scene.children[0].position, {
              y: this.getProductInfo.productPosition.y,
              duration: 5,
            });
          this.scene.add(gltf.scene);
        },
        undefined,
        () => {
          location.reload();
        }
      );
      this.tick();
    },
  },
  // ? Mounted life hook
  mounted() {
    this.dataInitialization();
    this.renderProductModel();
  },
};
</script>

<style>
/* #region Default version */
.individual-product-page-wrapper {
  padding: 4em var(--side-padding);
  font-family: montserrat;
}
.product-info-title-wrapper > h3 {
  font-weight: 300;
  padding: 0 0 0.5em;
  margin-bottom: 0;
  color: var(--dark-text-color);
  font-size: 2em;
}
.product-info-title-wrapper > h4 {
  position: relative;
  font-weight: 500;
  padding: 0 0 0.5em;
  margin: 0;
  display: inline-block;
  color: var(--dark-text-color-dimmed);
}
.product-info-title-wrapper > h4::after {
  content: "";
  position: absolute;
  top: 100%;
  left: 0;
  right: 35%;
  height: 2px;
  background-color: var(--secondary-theme-color);
}
.product-info-content-wrapper {
  display: flex;
  flex-wrap: wrap;
  margin-top: 1em;
  justify-content: space-between;
}
.product-info-description-wrapper,
.product-model-viewer {
  flex-basis: calc(50% - 50px);
  position: relative;
}
.product-info-description-wrapper > p {
  color: var(--dark-text-color);
  line-height: 1.8em;
}
.product-model-viewer {
  position: relative;
}
.product-model-viewer::after {
  pointer-events: none;
  z-index: 2;
  content: "";
  background: linear-gradient(
      -90deg,
      rgba(255, 255, 255, 1) 0%,
      rgba(255, 255, 255, 0) 5%,
      rgba(255, 255, 255, 0) 95%,
      rgba(255, 255, 255, 1) 100%
    ),
    linear-gradient(
      180deg,
      rgba(255, 255, 255, 1) 0%,
      rgba(255, 255, 255, 0) 5%,
      rgba(255, 255, 255, 0) 95%,
      rgba(255, 255, 255, 1) 100%
    ),
    linear-gradient(
      45deg,
      rgba(255, 255, 255, 0.1) 0%,
      rgba(255, 255, 255, 0) 100%
    );
  inset: 0;
  position: absolute;
}
.product-model-renderer {
  aspect-ratio: 1 / 1;
  position: relative;
  width: 100%;
}
.browse-more-products-wrapper {
  display: inline-block;
  margin: 1em 0;
  background-color: var(--light-background-color);
  border: 1px solid var(--light-background-color01);
  border-radius: 0.2em;
  padding: 1em;
  text-align: center;
}
.browse-more-products-wrapper > h5 {
  font-size: 1em;
  margin: 0 0 1.4em;
  padding: 0 1em;
  color: var(--dark-text-color);
  font-weight: 400;
}
.back-to-products-button {
  display: inline-block;
  cursor: pointer;
  transition: background-color 0.2s, color 0.2s, border 0.2s;
  flex-basis: 10%;
  border: 1px solid var(--secondary-theme-color);
  border-radius: 0.2em;
  font-size: 0.95em;
  text-decoration: none;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);
  background-color: var(--primary-theme-color);
  color: var(--light-background-color);
  padding: 0.5em 1em;
  text-align: center;
}
.back-to-products-button:hover {
  background-color: var(--secondary-theme-color);
}
/* #endregion */
/* #region Transitions */
.individualProducts-enter-active,
.individualProducts-leave-active {
  transition: opacity 0.2s;
}
.individualProducts-enter,
.individualProducts-leave-active {
  opacity: 0;
}
/* #endregion */
/* Laptop L 1440px */
@media screen and (max-width: 1440px) {
  .individual-product-page-wrapper {
    padding: 3em calc(var(--side-padding) / 2);
  }
  .product-info-title-wrapper > h3 {
    padding: 0 0 0.3em;
    font-size: 1.4em;
  }
  .product-info-title-wrapper > h4 {
    font-size: 0.8em;
  }
}
/* Tablet 768px */
@media screen and (max-width: 768px) {
  .product-model-viewer {
    order: -1;
  }
  .product-info-description-wrapper,
  .product-model-viewer {
    min-width: 80vw;
  }
}
/* Mobile L 425px */
@media screen and (max-width: 425px) {
  .individual-product-page-wrapper {
    padding: 3em calc(var(--side-padding) / 4);
  }
}
</style>