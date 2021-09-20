<template>
  <div class="navigation-bar-wrapper">
    <h3 class="navigation-logo"><span>CINE</span> LISA</h3>
    <ul class="navigation-links-list">
      <li><nuxt-link to="/">Home</nuxt-link></li>
      <li><nuxt-link to="/products/#all">Products</nuxt-link></li>
      <li><nuxt-link to="/about">About</nuxt-link></li>
      <li>
        <a href="https://github.com/swandevagency" target="_blank">GitHub</a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap");
.navigation-bar-wrapper {
  background-color: var(--light-background-color);
  padding: 33px 45px 15px;
  display: flex;
  align-items: center;
  font-family: montserrat;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);
  width: fit-content;
  float: right;
  position: fixed;
  top: 0;
  z-index: 5;
  right: var(--side-padding);
}
.navigation-links-list {
  margin: 0;
  display: flex;
  list-style: none;
  align-items: center;
}
.navigation-links-list li {
  margin-right: 24px;
}
.navigation-links-list li a {
  color: var(--dark-text-color);
  text-decoration: none;
}
.navigation-logo {
  font-weight: 300;
  font-size: 24px;
  margin: 0;
  color: var(--dark-text-color);
}
.navigation-logo span {
  color: var(--primary-theme-color);
  border-top: 1px solid var(--primary-theme-color);
}
</style>