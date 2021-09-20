<template>
  <div class="nuxt-app-wrapper">
    <div class="landing-background-image-container">
      <div class="landing-background-image">
        <div class="landing-image-title-wrapper">
          <h2><span>CINE</span> LISA</h2>
          <p>The logic of cinema</p>
        </div>
      </div>
    </div>
    <div class="landing-page-wrapper">
      <div class="side-ribbon-wrapper">
        <div class="landing-title-wrapper">
          <h2><span>CINE</span> LISA</h2>
          <p>The logic of cinema</p>
        </div>
      </div>
      <div class="aside-landing-image-wrapper">
        <img src="/CINE LISA Landing Image.jpg" alt="" />
      </div>
    </div>
    <section class="what-do-you-need-wrapper">
      <h2>What do you need?</h2>
      <img src="/What do you need section image.jpg" alt="" />
      <div class="what-do-you-need-categories-wrapper">
        <nuxt-link
          to="/products/#cameras"
          class="cameras-category-item"
          @mousemove.native="interactCategory"
          @mouseleave.native="resetInteract"
        >
          <img src="/RED Camera.png" alt="" />
          <div class="category-information-wrapper">
            <h3>Cameras</h3>
            <p>{{ `${$store.state.products.camerasList.length} Cameras` }}</p>
          </div>
        </nuxt-link>
        <nuxt-link
          to="/products/#accessories"
          class="accessory-category-item"
          @mousemove.native="interactCategory"
          @mouseleave.native="resetInteract"
        >
          <img src="/RED Komodo.png" alt="" />
          <div class="category-information-wrapper">
            <h3>Accessories</h3>
            <p>
              {{
                `${$store.state.products.accessoriesList.length} Accessories`
              }}
            </p>
          </div>
        </nuxt-link>
      </div>
    </section>
    <section class="shot-on-cine-lisa-wrapper">
      <div class="shot-on-cine-lisa-title-wrapper">
        <h4>SHOT ON</h4>
        <h2><span>CINE</span> LISA</h2>
      </div>
      <div class="shot-on-cine-lisa-slide-transition">
        <img src="/Shot on CINE LISA slideshow.png" alt="" />
        <img src="/Shot on CINE LISA slideshow.png" alt="" />
      </div>
    </section>
  </div>
</template>

<script>
import NavigationBar from "../components/NavigationBar.vue";
import Footer from "../components/Footer.vue";
import { gsap } from "gsap";
export default {
  transition: "home",
  data() {
    return {
      camera: Object,
      scene: Object,
      composer: Object,
      renderer: Object,
    };
  },
  components: {
    NavigationBar,
    Footer,
  },
  methods: {
    interactCategory(event) {
      gsap.set(event.target, { perspective: 800 });
      gsap.set(event.target, { transformStyle: "preserve-3d" });
      const cursor = {
        positionX:
          ((event.pageX - event.target.offsetLeft) / event.target.clientWidth -
            0.5) *
          50,
        positionY:
          -(
            (event.pageY - event.target.offsetTop) / event.target.clientHeight -
            0.5
          ) * 50,
      };
      gsap.to(event.target, {
        translateX: cursor.positionX,
        translateY: -cursor.positionY,
        rotateX: (cursor.positionY / 50) * 10,
        rotateY: (-cursor.positionX / 50) * 10,
        boxShadow: `${-cursor.positionX / 2}px ${
          cursor.positionY / 2
        }px 18px rgba(0,0,0,0.16)`,
        scale: 1.02,
        duration: 0.2,
        ease: "power3.out",
      });
    },
    resetInteract(event) {
      gsap.to(event.target, {
        translateX: 0,
        translateY: 0,
        rotateX: 0,
        rotateY: 0,
        boxShadow: "none",
        scale: 1,
        duration: 0.2,
        ease: "power3.out",
      });
    },
  },
  mounted() {
    // ? Animation
    const sequenceTwoDelay = 3;
    //
    // ? Sequence 1
    //
    gsap.fromTo(
      ".landing-image-title-wrapper",
      {
        opacity: 0,
        translateY: 100,
      },
      { opacity: 1, translateY: 0, duration: 0.5, ease: "power3.out" }
    );
    gsap.fromTo(
      ".landing-image-title-wrapper",
      {
        opacity: 0,
        translateY: 100,
      },
      { opacity: 1, translateY: 0, duration: 0.5, ease: "power3.out" }
    );
    gsap.to(".landing-background-image", {
      "--background-scale": 1,
      duration: 2,
    });

    //
    // ? Sequence 2
    //
    gsap.fromTo(
      ".navigation-bar-wrapper",
      { opacity: 0, translateY: -20 },
      {
        opacity: 1,
        translateY: 0,
        delay: sequenceTwoDelay,
        duration: 0.5,
        ease: "power3.out",
      }
    );
    gsap.fromTo(
      ".side-ribbon-wrapper",
      { opacity: 0, translateX: -50 },
      {
        opacity: 1,
        translateX: 0,
        delay: sequenceTwoDelay,
        duration: 0.5,
        ease: "power3.out",
      }
    );
    gsap.fromTo(
      ".aside-landing-image-wrapper",
      { opacity: 0 },
      { opacity: 1, delay: sequenceTwoDelay, duration: 0.5, ease: "power3.out" }
    );
    gsap.to(".nuxt-app-wrapper", {
      overflow: "visible",
      delay: sequenceTwoDelay,
    });
    gsap.to(".landing-image-title-wrapper", {
      opacity: 0,
      translateY: 20,
      delay: sequenceTwoDelay,
      duration: 0.5,
      ease: "power3.out",
    });
    gsap.to(".landing-background-image", {
      "--blur-amount": 20,
      "--fade-opacity": 0.7,
      duration: 0.5,
      delay: sequenceTwoDelay,
      ease: "power3.out",
    });
  },
};
</script>
<style>
.nuxt-app-wrapper {
  padding: 0 var(--side-padding);
  position: relative;
  overflow: hidden;
}
.landing-background-image-container {
  overflow: hidden;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: -1;
  border-bottom: 1px solid var(--light-background-color01);
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);
}
.landing-background-image {
  --blur-amount: 0px;
  width: 100%;
  height: 100%;
  --background-scale: 1.1;
  background-image: url("/Landing page background image.jpg");
  background-position: center;
  --fade-opacity: 0.2;
  transform: scale(var(--background-scale));
  background-size: cover;
  filter: blur(var(--blur-amount));
}
.landing-background-image::after {
  content: "";
  position: absolute;
  inset: 0;
  background-color: rgba(255, 255, 255, var(--fade-opacity));
}
.landing-image-title-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  inset: 0;
  width: fit-content;
  height: fit-content;
  border: 1px solid rgba(0, 0, 0, 0.95);
  background-color: rgba(0, 0, 0, 0.6);
  padding: 2em 4em;
  text-align: center;
  backdrop-filter: blur(20px);
  margin: auto;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.26);
}
.landing-image-title-wrapper > h2 {
  color: white;
  font-family: montserrat;
  text-shadow: 0 2px 2px rgba(0, 0, 0, 0.5);
  border-bottom: 1px solid white;
  font-size: 84px;
  font-weight: 100;
  margin: 0;
}
.landing-image-title-wrapper > p {
  color: white;
  font-family: montserrat;
  font-size: 18px;
  font-weight: 100;
  margin-bottom: 0;
  text-shadow: 0 2px 2px rgba(0, 0, 0, 0.5);
}
.landing-image-title-wrapper > h2 > span {
  border-top: 1px solid white;
}
.landing-page-wrapper {
  display: flex;
  justify-content: space-between;
}
.side-ribbon-wrapper {
  background: linear-gradient(
    90deg,
    var(--primary-theme-color) 63%,
    rgba(255, 255, 255, 0) 63%
  );
  display: inline-block;
  padding-left: calc(var(--side-padding) / 1.5);
  width: calc(fit-content - 50px);
  height: 100vh;
}
.landing-title-wrapper {
  font-family: montserrat;
  position: relative;
  margin-top: 35vh;
  color: var(--dark-text-color);
}
.landing-title-wrapper > h2 > span {
  border-top: 1px solid white;
  color: white;
}
.landing-title-wrapper > h2 {
  font-size: 94px;
  font-weight: 100;
  margin: 0;
}
.landing-title-wrapper::before {
  content: "";
  position: absolute;
  background-color: var(--secondary-theme-color);
  left: -30%;
  width: 25%;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);
  top: 0;
  bottom: 0;
}
.landing-title-wrapper::after {
  content: "";
  position: absolute;
  clip-path: polygon(0 0, 100% 100%, 0 100%);
  transform: scale(-1);
  background-color: var(--secondary-theme-color-dimmed);
  left: -30%;
  top: 100%;
  bottom: -25%;
  width: 10%;
}
.landing-title-wrapper > p {
  color: white;
  letter-spacing: 0.2em;
  font-style: italic;
  font-size: 14px;
  font-weight: 300;
}
.aside-landing-image-wrapper {
  position: relative;
  flex-basis: calc(45% - (var(--side-padding) * 1.8));
  overflow: hidden;
  margin-top: 35vh;
  height: 55vh;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.35);
}
.aside-landing-image-wrapper > img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.aside-landing-image-canvas-renderer {
  position: absolute;
  left: -20%;
  top: -20%;
  width: 140%;
  height: 140%;
}
/* #region What do you need section */
.what-do-you-need-wrapper {
  font-family: montserrat;
  color: var(--dark-text-color);
  text-align: center;
  margin: 0 auto;
  max-width: 800px;
}
.what-do-you-need-wrapper > h2 {
  font-size: 40px;
  font-weight: 300;
  width: fit-content;
  margin: 0 auto;
  margin-top: 5em;
  position: relative;
  padding: 0 0 0.4em;
}
.what-do-you-need-wrapper > h2::before {
  content: "";
  bottom: 0;
  position: absolute;
  left: 20%;
  right: 20%;
  height: 1px;
  background-color: var(--dark-text-color);
}
.what-do-you-need-wrapper > img {
  margin-top: 50px;
  width: 100%;
  object-fit: cover;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);
  height: 400px;
}
.what-do-you-need-categories-wrapper {
  display: flex;
  margin-top: 4em;
  justify-content: space-between;
}
.cameras-category-item,
.accessory-category-item {
  cursor: pointer;
  isolation: isolate;
  padding: 2em;
  flex-basis: calc(50% - 100px);
  text-align: center;
  background-color: var(--light-background-color);
  position: relative;
  border: 1px solid var(--light-background-color01);
}
.cameras-category-item::before {
  content: "";
  position: absolute;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.26);
  z-index: -1;
  background-color: var(--secondary-theme-color);
  left: -5%;
  right: 5%;
  bottom: 35%;
  top: -5%;
}
.accessory-category-item::before {
  content: "";
  position: absolute;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.26);
  z-index: -1;
  background-color: var(--secondary-theme-color);
  right: -5%;
  left: 5%;
  bottom: 35%;
  top: -5%;
}
.cameras-category-item::after {
  content: "";
  position: absolute;
  clip-path: polygon(0 0, 100% 100%, 0 100%);
  transform: scale(-1);
  background-color: var(--secondary-theme-color-dimmed);
  left: -5%;
  top: 65%;
  bottom: 30%;
  width: 5%;
}
.accessory-category-item::after {
  content: "";
  position: absolute;
  clip-path: polygon(0 0, 100% 100%, 0 100%);
  transform: scale(1, -1);
  background-color: var(--secondary-theme-color-dimmed);
  right: -5%;
  top: 65%;
  bottom: 30%;
  width: 5%;
}
.cameras-category-item img,
.accessory-category-item img {
  pointer-events: none;
  margin-top: 2em;
  width: 100%;
  height: 40%;
  object-fit: contain;
}
.category-information-wrapper {
  pointer-events: none;
  color: var(--dark-text-color);
  position: absolute;
  margin: 0 auto;
  left: 0;
  padding: 0 2em;
  right: 0;
  bottom: 32px;
  text-align: left;
}
.category-information-wrapper > h3 {
  margin: 0 0 0.4em;
  font-weight: 500;
  font-size: 18px;
}
.category-information-wrapper > p {
  margin: 0;
  color: var(--dark-text-color-dimmed);
  font-size: 12px;
}
/* #endregion */
/* #region Shot on CINE LISA section */
.shot-on-cine-lisa-wrapper {
  position: relative;
  margin: 5em calc(var(--side-padding) * -1) 0;
  width: 100vw;
}
.shot-on-cine-lisa-title-wrapper {
  text-align: center;
  position: absolute;
  font-family: montserrat;
  color: var(--light-background-color);
  margin: auto;
  left: 38%;
  padding: 4em;
  display: flex;
  flex-direction: column;
  justify-content: center;
  right: 38%;
  top: 0;
  bottom: 8px;
  background: linear-gradient(
    -90deg,
    rgba(255, 102, 0, 0) 0%,
    #f60 5%,
    #f60 95%,
    rgba(255, 102, 0, 0) 100%
  );
  z-index: 1;
}
.shot-on-cine-lisa-title-wrapper > h4 {
  color: var(--secondary-theme-color);
  font-weight: 300;
  margin: 0;
}
.shot-on-cine-lisa-title-wrapper > h2 {
  font-weight: 200;
  font-size: 50px;
  margin: 18px 0 0;
}
.shot-on-cine-lisa-title-wrapper span {
  border-top: 1px solid var(--light-background-color);
}
.shot-on-cine-lisa-slide-transition > img {
  flex-basis: 100vw;
}
.shot-on-cine-lisa-slide-transition {
  width: 200vw;
  display: flex;
  animation: infinite-slide 15s linear infinite both;
}
@keyframes infinite-slide {
  0% {
    transform: translateX(0vw);
  }
  100% {
    transform: translateX(-100vw);
  }
}
/* #endregion */

/* #region Transitions */
.home-enter-active,
.home-leave-active {
  transition: opacity 0.2s;
}
.home-enter,
.home-leave-active {
  opacity: 0;
}
/* #endregion */
</style>
