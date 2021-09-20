<template>
  <div class="our-technologies-loading-wrapper">
    <h5>{{ loadingCaption }}</h5>
    <div class="loading-bar-wrapper">
      <div class="spinning-bar"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    loadingCaption: String,
  },
};
</script>

<style>
.our-technologies-loading-wrapper {
  padding: 0 2em;
  display: flex;
  text-align: center;
  font-family: montserrat;
  justify-content: center;
  flex-direction: column;
  position: absolute;
  z-index: 3;
  background-color: var(--light-background-color);
  inset: 0;
}
.our-technologies-loading-wrapper > h5 {
  text-transform: uppercase;
  font-size: 1.2em;
  font-weight: 500;
  color: var(--dark-text-color);
}
.loading-bar-wrapper {
  height: 2px;
  position: relative;
}
.loading-bar-wrapper .spinning-bar {
  height: 100%;
  animation: scale-up-hor-left 2s cubic-bezier(0.39, 0.575, 0.565, 1) both
    infinite;
  width: 100%;
  background-color: var(--secondary-theme-color-dimmed);
  position: absolute;
}
@keyframes scale-up-hor-left {
  0% {
    transform: scaleX(0);
    transform-origin: 0% 0%;
  }
  50% {
    transform: scaleX(1);
    transform-origin: 0% 0%;
  }
  51% {
    transform-origin: 100% 0%;
  }
  100% {
    transform: scaleX(0);
    transform-origin: 100% 0%;
  }
}
</style>