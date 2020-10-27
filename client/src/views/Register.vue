<template>
  <div class="register">
    <h1>Register</h1>
    <p>{{error}}</p>
    <p v-if="validFields">Please fill all the fields</p>
    <form @submit.prevent="register">
      <div class="input-field">
        <label for="name">Name</label>
        <input type="text" id="name" name="name" v-model="name" />
      </div>
      <div class="input-field">
        <label for="email">Email</label>
        <input type="email" name="email" id="email" v-model="email" />
      </div>
      <div class="input-field">
        <label for="password">Password</label>
        <input type="password" name="password" id="password" v-model="password" />
      </div>
      <button type="submit">
        Register
      </button>
    </form>
  </div>
</template>

<script>
import { computed, ref } from 'vue';
import {useStore} from 'vuex';
import { useRouter } from 'vue-router';
export default {
  setup() {
    const name = ref('');
    const email = ref('');
    const password = ref('');
    const store = useStore();
    const error = computed(() => {
      return store.getters.registerError
    })
    const validFields = ref(false);
    const router = useRouter();

    const register = async() => {
      validFields.value = false;

      if(name.value === '' || email.value === '' || password.value === '') {
        return  validFields.value = true;
      }

      const newUser = {
        name: name.value,
        email: email.value,
        password: password.value
      }
      await store.dispatch('registerUser', newUser);

      if(error.value) return

      router.push('/login');
    }

    return {
      name, email, password, register, error, validFields
    }
  }
};
</script>

<style lang="scss" scoped>
.register {
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
