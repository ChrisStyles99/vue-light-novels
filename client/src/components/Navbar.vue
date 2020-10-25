<template>
  <nav
    class="nav"
    :style="valid ? 'background: rgba(255, 255, 255, 0.15)' : ''"
  >
    <h1>
      <router-link
        class="logo-link"
        :style="valid ? 'color: #fff;' : 'color: #000;'"
        to="/"
        >Light novels</router-link
      >
    </h1>
    <ul class="nav-list" :class="active ? 'active' : ''">
      <li>
        <router-link
          class="nav-link"
          :style="valid ? 'color: #fff;' : 'color: #000;'"
          to="/about"
          >About</router-link
        >
      </li>
      <li>
        <router-link
          class="nav-link"
          :style="valid ? 'color: #fff;' : 'color: #000;'"
          to="/novels"
          >All novels</router-link
        >
      </li>
      <li>
        <router-link
          class="nav-link"
          :style="valid ? 'color: #fff;' : 'color: #000;'"
          to="/novels/search"
          >Search</router-link
        >
      </li>
      <li>
        <router-link class="nav-link add-novel" to="/add-novel"
          >Add novel</router-link
        >
      </li>
    </ul>
    <div class="toggle-menu" @click="toggleMenu">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="icon icon-tabler icon-tabler-align-right"
        width="44"
        height="44"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="#26a7da"
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <line x1="4" y1="6" x2="20" y2="6" />
        <line x1="10" y1="12" x2="20" y2="12" />
        <line x1="6" y1="18" x2="20" y2="18" />
      </svg>
    </div>
  </nav>
</template>

<script>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
export default {
  setup() {
    const router = useRouter();
    const valid = ref(null);
    const active = ref(false);

    onMounted(() => {
      router.afterEach(() => {
        valid.value = router.currentRoute.value.fullPath === '/' ? true : false;
        active.value = false;
      });
    });

    const toggleMenu = () => {
      active.value = !active.value
    }

    return {
      valid,
      active,
      toggleMenu
    };
  },
};
</script>

<style lang="scss" scoped>
.nav {
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 80px;
  transition: 0.3s ease all;

  .toggle-menu {
    display: none;
  }

  h1 {
    .logo-link {
      color: #000;
      text-decoration: none;
      transition: 0.3s ease all;
    }
  }
  ul {
    display: flex;
    flex-direction: row;
    list-style-type: none;
    li {
      margin: 0 10px;
      .nav-link {
        color: #000;
        text-decoration: none;
        padding: 10px;
        transition: 0.3s ease all;

        &:hover {
          background-color: #3b72c5;
        }
      }

      .add-novel {
        background-color: #26a7da;
      }
    }
  }
}

@media (max-width: 500px) {
  .nav {
    ul {
      position: absolute;
      top: 0;
      left: 0;
      right: 50%;
      background-color: #2b69db;
      display: flex;
      height: 100%;
      flex-direction: column;
      justify-content: space-evenly;
      transform: translateX(-100%);
      z-index: 10;
      transition: 0.3s ease all;
      
      .nav-link {
        margin: 20px 0;
        font-size: 1.5rem;
      }
    }

    ul.active {
      transform: translateX(0);
    }

    .toggle-menu {
        display: block;
      }
  }
}
</style>
