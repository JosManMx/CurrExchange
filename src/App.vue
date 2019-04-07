<template>
  <main id="app" class="app">
    <currency-exchanger></currency-exchanger>
    <footer class="footer">
      <p class="footer-copyright">
        Developed and designed by
        <a
          class="footer-link"
          href="https://jostech.com.ve"
          target="_blank"
        >Jostech</a>
      </p>
      <p class="footer-using">
        Using
        <a class="footer-link" href="https://vuejs.org" target="_blank">Vue.js</a>,
        <a class="footer-link" href="https://github.com/axios/axios" target="_blank">Axios</a> and
        <a
          class="footer-link"
          href="https://exchangeratesapi.io/"
          target="_blank"
        >exchangeratesapi.io</a>.
      </p>
    </footer>
  </main>
</template>

<script>
import CurrencyExchanger from "./components/CurrencyExchanger";
export default {
  name: "app",
  components: {
    CurrencyExchanger
  }
};
</script>

<style lang="scss">
:root {
  --primary-color: #159957;
  --secondary-color: #155799;
}
body {
  margin: 0;
  font-family: "Roboto Condensed", sans-serif, arial;
}
.app {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(
    to right,
    var(--primary-color),
    var(--secondary-color)
  );
}
.footer {
  position: absolute;
  bottom: 10px;
  right: 10px;
  color: #fff;
  &-link,
  &-link:visited {
    color: #fff;
    text-decoration: none;
    font-weight: bold;
  }
}
</style>
