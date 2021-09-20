export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "CINE LISA",
    htmlAttrs: {
      lang: "en"
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ["@/assets/global.css"],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    "@nuxtjs/axios"
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: [
      "three/examples/jsm/postprocessing/EffectComposer.js",
      "three/examples/jsm/controls/OrbitControls.js",
      "three/examples/jsm/loaders/GLTFLoader.js"
    ],
    extend(config, { isClient, isServer }) {
      // `.foo` Loader
      config.module.rules.push({
        test: /\.(frag|vert|glsl)$/,
        use: ["raw-loader"]
      });
    }
  }
};
