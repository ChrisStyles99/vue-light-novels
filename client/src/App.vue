<template>
  <div id="app">
    <Navbar />
    <router-view class="router-view"/>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'

if(window.document.cookie === '') {
  window.localStorage.removeItem('isLoggedIn');
}

export default {
  components: {
    Navbar
  }
}
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  font-family: 'Cabin', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  // .router-view::after {
  //   content: '';
  //   position: absolute;
  //   right: 0;
  //   bottom: 0;
  //   z-index: -5;
  //   background-color: #2b69db;
  //   width: 100%;
  //   height: 50%;
  //   transform: skewY(-20deg);
  //   overflow: hidden;
  // }
}
</style>
