<template>
  <div class="login">
    <h1>Login</h1>
    <p>{{error}}</p>
    <p v-if="validFields">Please fill all the inputs</p>
    <form @submit.prevent="login">
      <div class="input-field">
        <label for="email">Email</label>
        <input type="email" name="email" id="email" v-model="email" />
      </div>
      <div class="input-field">
        <label for="password">Password</label>
        <input type="password" name="password" id="password" v-model="password" />
      </div>
      <button type="submit">
        Login
      </button>
    </form>
  </div>
</template>

<script>
import {computed, ref} from 'vue'
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const email = ref('');
    const password = ref('');
    const store = useStore();
    const error = computed(() => {
      return store.getters.loginError;
    });
    const validFields = ref(false);
    const router = useRouter();

    const login = async() => {
      validFields.value = false;

      if(email.value === '' || password.value === '') {
        return validFields.value = true;
      }

      const userData = {
        email: email.value,
        password: password.value
      }

      await store.dispatch('loginUser', userData);

      if(error.value !== '') return

      router.push('/novels');
    }

    return {
      email, password, error, validFields, login
    }
  }
};
</script>

<style lang="scss" scoped>
.login {
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;

  h1 {
    margin: 20px 0;
  }

  form {
    .input-field {
      display: flex;
      flex-direction: column;
      label {
        font-size: 1.2rem;
        margin: 10px 0;
      }
      input {
        font-size: 1.2rem;
        padding: 10px;
        margin: 10px 0;
        border: none;
        outline: none;
        border-bottom: 1px solid #000;
      }
    }

    button {
      background-color: #2dc2d6;
      width: 100%;
      margin-top: 10px;
      font-size: 1.2rem;
      padding: 10px;
      border: 2px solid #1c9cad;
      cursor: pointer;
      transition: 0.3s ease all;

      &:hover {
        background-color: #1c9cad;
      }
    }
  }
}
</style>
