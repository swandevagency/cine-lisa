<template>
  <div class="about-page-wrapper">
    <div class="about-page-landing-wrapper">
      <div class="about-landing-page-title-wrapper">
        <h5>CINE LISA</h5>
        <h1>ABOUT</h1>
      </div>
    </div>
    <div class="about-page-content-wrapper">
      <div class="about-page-description-wrapper">
        <h3>Our technologies</h3>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui official deserunt mollit anim id est laborum.
        </p>
        <div class="our-technology-inspector-views-list">
          <div
            :class="`inspector-model-view-item inspector-no${index}`"
            v-for="(interaction, index) in $store.state.interactionsList
              .ourTechnologiesInteractionsList"
            :key="index"
            @click="zoomToObject(interaction, index)"
          >
            {{ interaction.interactionName }}
          </div>
        </div>
      </div>
      <div class="about-page-render-canvas-wrapper">
        <h6
          :class="`about-model-interaction-label about-model-interaction-label${index}`"
          v-for="(interaction, index) in $store.state.interactionsList
            .ourTechnologiesInteractionsList"
          :key="index"
          @click="zoomToObject(interaction, index)"
        >
          {{ interaction.interactionName }}
        </h6>
        <canvas
          class="camera-technology-render"
          ref="cameraTechnologyRender"
        ></canvas>
        <Loading
          v-if="showOurTechnologiesLoading"
          loadingCaption="- Loading -"
        />
      </div>
    </div>
    <div class="about-page-our-history-content-wrapper">
      <div class="about-page-our-history-render-canvas-wrapper">
        <canvas
          class="our-history-camera-visual-render"
          ref="ourHistoryCameraTechnologyRender"
        ></canvas>
        <Loading v-if="showOurHistoryLoading" loadingCaption="- Loading -" />
      </div>
      <div class="about-page-our-history-description-wrapper">
        <h3>Our history</h3>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui official deserunt mollit anim id est laborum.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { gsap } from "gsap";
import * as THREE from "three";
import Loading from "../components/Loading.vue";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
export default {
  transition: "about",
  data() {
    return { showOurTechnologiesLoading: true, showOurHistoryLoading: true };
  },
  components: {
    Loading,
  },
  methods: {
    // #region Renderers
    // ? "Our technologies" Renderer
    tick() {
      this.camera.lookAt(this.cameraLookAtPoint);
      this.camera.updateProjectionMatrix();

      for (const point of this.$store.state.interactionsList
        .ourTechnologiesInteractionsList) {
        // #region Convert the 3D space coordinates to 2D space
        const screenPosition = new THREE.Vector3(
          point.interactionPoint.x,
          point.interactionPoint.y,
          point.interactionPoint.z
        );
        screenPosition.project(this.camera);
        const translateX =
          screenPosition.x *
          this.$refs.cameraTechnologyRender.clientWidth *
          0.5;
        const translateY =
          -screenPosition.y *
          this.$refs.cameraTechnologyRender.clientHeight *
          0.5;
        // #endregion

        // #region Drawing ray caster to measure the distance between the interaction point and the intersect points in space
        this.raycaster.setFromCamera(screenPosition, this.camera);
        const intersects = this.raycaster.intersectObjects(
          this.scene.children,
          true
        );

        // No intersect found
        if (intersects.length === 0) {
          // Show
          document
            .querySelector(
              `.about-model-interaction-label${this.$store.state.interactionsList.ourTechnologiesInteractionsList.indexOf(
                point
              )}`
            )
            .classList.add("visible");
        }

        // ? Intersect found
        else {
          // Get the distance of the intersection and the distance of the point
          const intersectionDistance = intersects[0].distance;
          const pointDistance = new THREE.Vector3(
            point.interactionPoint.x,
            point.interactionPoint.y,
            point.interactionPoint.z
          ).distanceTo(this.camera.position);

          // Intersection is close than the point
          if (intersectionDistance < pointDistance) {
            // Hide
            document
              .querySelector(
                `.about-model-interaction-label${this.$store.state.interactionsList.ourTechnologiesInteractionsList.indexOf(
                  point
                )}`
              )
              .classList.remove("visible");
          }
          // Intersection is further than the point
          else {
            // Show
            document
              .querySelector(
                `.about-model-interaction-label${this.$store.state.interactionsList.ourTechnologiesInteractionsList.indexOf(
                  point
                )}`
              )
              .classList.add("visible");
          }
        }
        // #endregion

        // Animating the 2D interaction points
        gsap.to(
          `.about-model-interaction-label${this.$store.state.interactionsList.ourTechnologiesInteractionsList.indexOf(
            point
          )}`,
          {
            translateX: translateX,
            translateY: translateY,
            duration: 0.03,
          }
        );
      }
      this.renderer.render(this.scene, this.camera);
      window.requestAnimationFrame(this.tick);
    },
    // ? "Our history" Renderer
    tick2() {
      this.camera2.lookAt(0, 0, 0);
      this.renderer2.render(this.scene2, this.camera2);
      window.requestAnimationFrame(this.tick2);
    },
    // #endregion

    // #region Render methods
    renderOurTechnologies() {
      const directionalLight = new THREE.DirectionalLight("white", 1);
      const ambientLight = new THREE.AmbientLight("white", 1);
      const pointLightCreamy = new THREE.PointLight("#c4a280", 1);
      directionalLight.position.set(1, 1, 5);
      pointLightCreamy.position.set(-1, -1, -3);

      // ? Adding to the scene
      this.scene.add(directionalLight);
      this.scene.add(pointLightCreamy);
      this.scene.add(ambientLight);
      // ? Loading the camera 3D model
      const cameraModel = new GLTFLoader().load(
        "/Products/Cameras/Lecia Camera/scene.gltf",
        (gltf) => {
          // ? Animating the individual part of the camera
          this.showOurTechnologiesLoading = false;
          var model = gltf.scene;
          model.traverse((o) => {
            if (o.name == "") {
              return;
            }
            if (o.isMesh) {
              // ? Each case is a name of each layer of the model
              switch (o.name) {
                case "Knop3_Onder_LP_Device_0":
                  gsap.to(o.position, {
                    z: 25 * 2,
                    delay: 3,
                    duration: 2,
                  });
                  break;
                case "Knop4_LP_Device_0":
                  gsap.to(o.position, {
                    z: 25 * 2,
                    delay: 3,
                    duration: 2,
                  });
                  break;
                case "Knop1_LP_Device_0":
                  gsap.to(o.position, {
                    z: 20 * 2,
                    delay: 3,
                    duration: 2,
                  });
                  break;
                case "Knop2_LP_Device_0":
                  gsap.to(o.position, {
                    z: 25 * 2,
                    delay: 3,
                    duration: 2,
                  });
                  break;
                case "Knop1_Onder_LP_Device_0":
                  gsap.to(o.position, {
                    z: 15 * 2,
                    delay: 3,
                    duration: 2,
                  });
                  break;
                case "Knop4_Onder_LP_Device_0":
                  gsap.to(o.position, {
                    z: 15 * 2,
                    delay: 3,
                    duration: 2,
                  });
                  break;
                case "Knop3_LP_Device_0":
                  gsap.to(o.position, {
                    z: -5 * 2,
                    delay: 3,
                    duration: 2,
                  });
                  break;
                case "Knop5_LP_Device_0":
                  gsap.to(o.position, {
                    z: 25 * 2,
                    delay: 3,
                    duration: 2,
                  });
                  break;
                case "IronPieces_LP_Bag_0":
                  gsap.to(o.position, {
                    y: -35,
                    z: 35,
                    delay: 3,
                    duration: 2,
                  });
                  break;
                case "Bag_LP_Bag_0":
                  gsap.to(o.position, {
                    y: -125,
                    delay: 3,
                    duration: 2,
                  });
                  break;
                case "Lence_LP_Bag_0":
                  gsap.to(o.position, {
                    z: 90,
                    delay: 3,
                    duration: 2,
                  });
                  break;
                case "LensInside_LP_Bag_0":
                  gsap.to(o.position, {
                    z: -15,
                    delay: 3,
                    duration: 2,
                  });
                  break;
              }
            }
          });

          // ? Scaling model
          gltf.scene.children[0].scale.set(0.01, 0.01, 0.01);
          gltf.scene.children[0].position.set(0, 1, -0.4);

          // ? Camera model hover animation
          const tl = new gsap.timeline({ repeat: -1 })
            .to(gltf.scene.children[0].position, {
              y: 1.2,
              duration: 5,
            })
            .to(gltf.scene.children[0].position, {
              y: 1,
              duration: 5,
            });
          this.scene.add(gltf.scene);
        },
        undefined,
        (error) => {
          location.reload();
        }
      );
      this.tick();
    },
    renderOurHistory() {
      const directionalLight = new THREE.DirectionalLight("white", 1);
      const ambientLight = new THREE.AmbientLight("white", 1);
      const pointLightCreamy = new THREE.PointLight("#c4a280", 1);
      directionalLight.position.set(1, 1, 5);
      pointLightCreamy.position.set(-1, -1, -3);
      // ? Adding to the scene
      this.scene2.add(directionalLight);
      this.scene2.add(pointLightCreamy);
      this.scene2.add(ambientLight);
      // ? Loading 3D model
      const cameraModel = new GLTFLoader().load(
        "/Products/Cameras/Junior Camera/scene.gltf",
        (gltf) => {
          // ? Adding loaded model
          this.showOurHistoryLoading = false;
          gltf.scene.children[0].position.set(0, -0.1, 0);
          // ? Animating the scene
          const tl = new gsap.timeline({ repeat: -1 })
            .to(gltf.scene.children[0].position, {
              y: -0.2,
              duration: 5,
            })
            .to(gltf.scene.children[0].position, {
              y: -0.1,
              duration: 5,
            });
          this.scene2.add(gltf.scene);
        },
        undefined,
        (error) => {
          location.reload();
        }
      );
      this.tick2();
    },
    // #endregion

    zoomToObject(interaction, index) {
      // #region Update the inspector viewer
      if (
        document
          .querySelector(`.inspector-no${index}`)
          .classList.contains("toggled")
      ) {
        document
          .querySelector(`.inspector-no${index}`)
          .classList.remove("toggled");
        gsap.to(this.camera.position, {
          x: 3,
          y: 2,
          duration: 1,
        });
        gsap.to(this.camera, {
          zoom: 1,
          duration: 1,
        });
        this.cameraLookAtPoint = new THREE.Vector3(0, 0, 0);
        return;
      }
      for (const allInspectorViews of document.getElementsByClassName(
        `inspector-model-view-item`
      )) {
        allInspectorViews.classList.remove("toggled");
      }
      document.querySelector(`.inspector-no${index}`).classList.add("toggled");
      // #endregion

      // ? Zoom animation
      gsap.to(this.camera.position, {
        x: interaction.interactionCamera.x,
        y: interaction.interactionCamera.y,
        duration: 1,
      });
      gsap.to(this.camera, {
        zoom: interaction.interactionFov,
        duration: 1,
      });
      this.cameraLookAtPoint = new THREE.Vector3(
        interaction.interactionPoint.x,
        interaction.interactionPoint.y,
        interaction.interactionPoint.z
      );
    },

    dataInitialization() {
      this.cameraLookAtPoint = new THREE.Vector3(0, 0, 0);
      this.raycaster = new THREE.Raycaster();

      // * Our technologies data
      // ? Initializing the camera
      this.scene = new THREE.Scene();
      this.camera = new THREE.OrthographicCamera(-2, 2, 2, -2, 0.1, 1000);
      this.camera.position.z = 3;
      this.camera.position.x = 3;
      this.camera.position.y = 2;
      this.scene.add(this.camera);
      // ? Defining renderer
      this.renderer = new THREE.WebGLRenderer({
        canvas: this.$refs.cameraTechnologyRender,
        alpha: true,
      });
      this.renderer.setClearColor(0x000000, 0);
      this.renderer.setSize(
        this.$refs.cameraTechnologyRender.clientWidth,
        this.$refs.cameraTechnologyRender.clientHeight
      );
      // * Our history data
      // ? Initializing the camera
      this.scene2 = new THREE.Scene();
      this.camera2 = new THREE.OrthographicCamera(
        -0.3,
        0.3,
        0.3,
        -0.3,
        0.1,
        10
      );
      this.camera2.position.z = 1;
      this.camera2.position.x = -1;
      this.camera2.position.y = -1;
      this.scene2.add(this.camera2);
      // ? Defining renderer
      this.renderer2 = new THREE.WebGLRenderer({
        canvas: this.$refs.ourHistoryCameraTechnologyRender,
        alpha: true,
      });
      this.renderer2.setClearColor(0x000000, 0);
      this.renderer2.setSize(
        this.$refs.ourHistoryCameraTechnologyRender.clientWidth,
        this.$refs.ourHistoryCameraTechnologyRender.clientHeight
      );
    },
    // ? Intro animation for the page
    animateLandingPage() {
      gsap.fromTo(
        ".about-landing-page-title-wrapper",
        { translateY: 100, opacity: 0 },
        { translateY: 0, opacity: 1, duration: 2, ease: "power3.out" }
      );
    },
  },
  created() {
    this.showOurTechnologiesLoading = true;
  },
  // ? Mounted life hook
  mounted() {
    this.dataInitialization();
    this.animateLandingPage();
    this.renderOurTechnologies();
    this.renderOurHistory();
    window.addEventListener("resize", () => {
      // Update camera
      this.camera.aspect =
        this.$refs.cameraTechnologyRender.clientWidth /
        this.$refs.cameraTechnologyRender.clientHeight;
      this.camera2.aspect =
        this.$refs.ourHistoryCameraTechnologyRender.clientWidth /
        this.$refs.ourHistoryCameraTechnologyRender.clientHeight;
      this.camera.updateProjectionMatrix();
      this.camera2.updateProjectionMatrix();

      // Update renderer
      this.renderer.setSize(
        this.$refs.cameraTechnologyRender.clientWidth,
        this.$refs.cameraTechnologyRender.clientHeight
      );
      this.renderer2.setSize(
        this.$refs.ourHistoryCameraTechnologyRender.clientWidth,
        this.$refs.ourHistoryCameraTechnologyRender.clientHeight
      );
      this.renderer.setPixelRatio(
        Math.min(this.$refs.cameraTechnologyRender.devicePixelRatio, 2)
      );
      this.renderer2.setPixelRatio(
        Math.min(
          this.$refs.ourHistoryCameraTechnologyRender.devicePixelRatio,
          2
        )
      );
    });
  },
};
</script>

<style>
/* #region Default version */
.about-page-wrapper {
  padding: 0 var(--side-padding);
}
.about-page-landing-wrapper {
  font-family: montserrat;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: var(--dark-text-color);
  height: 100vh;
}
.about-landing-page-title-wrapper > h1 {
  color: var(--primary-theme-color);
  margin: 0;
  position: relative;
  font-weight: 100;
  font-size: 20vh;
}
.about-landing-page-title-wrapper > h5 {
  color: var(--secondary-theme-color-dimmed);
  margin: 0;
  font-weight: 400;
  font-size: 5vh;
}
.about-landing-page-title-wrapper > h1::after {
  content: "";
  background: linear-gradient(
    -90deg,
    rgba(255, 102, 0, 0) 0%,
    #f60 30%,
    #f60 70%,
    rgba(255, 102, 0, 0) 100%
  );
  top: 8%;
  right: 20%;
  left: 20%;
  height: 3px;
  position: absolute;
}
.about-page-content-wrapper,
.about-page-our-history-content-wrapper {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
}
.about-page-description-wrapper,
.about-page-our-history-description-wrapper {
  color: var(--dark-text-color);
  font-family: montserrat;
}
.about-page-description-wrapper > p,
.about-page-our-history-description-wrapper > p {
  line-height: 1.8em;
}
.about-page-description-wrapper > h3,
.about-page-our-history-description-wrapper > h3 {
  margin: 2em 0;
  font-size: 4em;
  position: relative;
}
.about-page-description-wrapper > h3::after,
.about-page-our-history-description-wrapper > h3::after {
  content: "";
  background-color: var(--primary-theme-color);
  left: 0;
  right: 70%;
  bottom: -0.7em;
  height: 3px;
  position: absolute;
}
.about-model-interaction-label,
.about-model-interaction-label.visible {
  z-index: 2;
  cursor: pointer;
  margin-left: -2em;
  margin-top: -3em;
  transition: opacity 0.2s, border 0.2s, background-color 0.2s, box-shadow 0.2s,
    color 0.2s;
  position: absolute;
  top: 50%;
  left: 50%;
  transform-origin: center;
  padding: 1em;
  font-family: montserrat;
  border-radius: 0.2em;
  font-weight: 300;
  font-size: 12px;
  color: var(--light-background-color);
}
.about-model-interaction-label::after {
  content: "";
  background-color: var(--secondary-theme-color);
  mix-blend-mode: soft-light;
  position: absolute;
  top: 100%;
  left: 48%;
  right: 48%;
  height: 1em;
}
.about-model-interaction-label:hover {
  color: var(--primary-theme-color);
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.7);
}
.about-model-interaction-label:hover,
.about-model-interaction-label.visible:hover {
  background-color: rgba(240, 240, 240, 0.8);
}
.about-model-interaction-label {
  background-color: rgba(255, 255, 255, 0.3);
  opacity: 0.3;
  border: 2px dashed rgba(0, 0, 0, 0.4);
}

.about-model-interaction-label.visible {
  background-color: rgba(35, 35, 35, 0.5);
  opacity: 1;
  border: 2px solid rgba(0, 0, 0, 0.4);
}

.about-page-render-canvas-wrapper,
.about-page-description-wrapper,
.about-page-our-history-render-canvas-wrapper,
.about-page-our-history-description-wrapper {
  padding: 0.5em 0;
  overflow: hidden;
  flex-basis: calc(50% - 50px);
  position: relative;
}
.camera-technology-render,
.our-history-camera-visual-render {
  aspect-ratio: 1 / 1;
  position: relative;
  width: 100%;
}
.our-technology-inspector-views-list {
  display: flex;
  overflow-x: scroll;
}
.our-technology-inspector-views-list::-webkit-scrollbar {
  display: none;
}
.inspector-model-view-item {
  cursor: pointer;
  transition: background-color 0.2s, color 0.2s, border 0.2s;
  flex-basis: 10%;
  border: 1px solid var(--light-background-color01);
  border-radius: 0.2em;
  margin-right: 1em;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);
  background-color: var(--light-background-color);
  color: var(--dark-text-color);
  padding: 0.5em 1em;
  text-align: center;
}
.inspector-model-view-item.toggled {
  background-color: var(--primary-theme-color);
  border: 1px solid var(--secondary-theme-color-dimmed);
  color: var(--light-background-color);
}
.about-page-render-canvas-wrapper::after,
.about-page-our-history-render-canvas-wrapper::after {
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
/* #endregion */

/* #region Transitions */
.about-enter-active,
.about-leave-active {
  transition: opacity 0.2s;
}
.about-enter,
.about-leave-active {
  opacity: 0;
}
/* #endregion */

/* Laptop L 1440px */
@media screen and (max-width: 1440px) {
  .about-page-wrapper {
    padding: 0 calc(var(--side-padding) / 2);
  }
  .about-page-description-wrapper > h3,
  .about-page-our-history-description-wrapper > h3 {
    font-size: 2.5em;
  }
}
/* Laptop S 1024px */
@media screen and (max-width: 1024px) {
  .about-page-description-wrapper > h3,
  .about-page-our-history-description-wrapper > h3 {
    font-size: 2em;
    margin: 1.5em 0;
  }
}
/* Tablet 768px */
@media screen and (max-width: 768px) {
  .about-page-render-canvas-wrapper,
  .about-page-description-wrapper,
  .about-page-our-history-render-canvas-wrapper,
  .about-page-our-history-description-wrapper {
    min-width: 80vw;
  }
  .about-page-our-history-description-wrapper {
    order: -1;
  }
  .about-landing-page-title-wrapper > h1 {
    font-size: 15vw;
  }
  .about-landing-page-title-wrapper > h5 {
    font-size: 3vw;
  }
  .about-landing-page-title-wrapper > h1::after {
    height: 2px;
  }
}
/* Mobile L 425px */
@media screen and (max-width: 425px) {
  .about-page-wrapper {
    padding: 0 calc(var(--side-padding) / 4);
  }
  .about-landing-page-title-wrapper > h1 {
    font-size: 8vh;
  }
  .about-landing-page-title-wrapper > h5 {
    font-size: 2vh;
  }
  .about-landing-page-title-wrapper > h1::after {
    top: 8%;
    height: 1px;
  }
  .about-page-description-wrapper > h3,
  .about-page-our-history-description-wrapper > h3 {
    font-size: 1.5em;
    margin: 1.5em 0;
  }
}
</style>
