<template>
  <div class="home">
    <h1>Welcome to the light novels app</h1>
    <router-link class="novels-btn" to="/novels">See all novels</router-link>
    <img
      src="https://images.pexels.com/photos/3013999/pexels-photo-3013999.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
      alt=""
    />
  </div>
</template>

<script>
export default {
  name: 'Home',
};
</script>

<style lang="scss" scoped>
.home {
  height: calc(100vh - 80px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #fff;

  h1 {
    font-size: 4rem;
  }

  .novels-btn {
    text-decoration: none;
    color: #fff;
    background-color: #26a7da;
    padding: 10px 15px;
    margin-top: 10px;
    font-size: 1.5rem;
    transition: 0.3s ease all;

    &:hover {
      background-color: #1c8cb8;
    }
  }

  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -2;
    object-fit: cover;

    &::after {
      position: absolute;
      background: #000;
      width: 100%;
      height: 100%;
      z-index: 2;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
    }
  }
}
</style>
