<template>
  <div class="novel">
    <Loading v-if="loading"/>
    <Error v-if="error"/>
    <div class="novel-img">
      <img :src="novel.image_url" alt="" />
    </div>
    <div class="novel-desc">
      <h1>{{ novel.title }}</h1>
      <h2>{{ novel.author }}</h2>
      <h3>{{ novel.volumes }}</h3>
      <router-link :to="`/novel/edit/${novel.id}`" class="edit-btn">Edit Novel</router-link>
      <button class="delete-btn" @click="deleteNovel(novel.id)">Delete novel</button>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Error from '@/components/Error.vue';
import Loading from '@/components/Loading.vue';
import { useStore } from 'vuex';

export default {
  components: {
    Error,
    Loading
  },
  setup() {
    const {
      params: { id },
    } = useRoute();
    const store = useStore();
    const novel = computed(() => {
      return store.getters.singleNovel;
    });
    const router = useRouter();
    const loading = ref(true);
    const error = ref(false);
    

    if(id === undefined) {
      return router.push('/add-novel');
    }

    onMounted(async () => {
      try {
        if(id === undefined) {
          return router.push('/add-novel');
        }
        store.dispatch('getSingleNovel', id);
        loading.value = false;
      } catch (err) {
        console.log(err);
        error.value = true;
        loading.value = false;
      }
    });

    const deleteNovel = async(id) => {
      store.dispatch('deleteNovel', id);
      router.push('/novels');
    }

    return {
      novel,
      deleteNovel,
      loading,
      error
    };
  },
};
</script>

<style lang="scss" scoped>
.novel {
  display: grid;
  grid-template-columns: 30vw 1fr;

  .novel-img {
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .novel-desc {
    margin: auto;

    .edit-btn {
      background-color: rgb(27, 147, 177);
      padding: 10px 15px;
      border: none;
      font-size: 1.2rem;
      margin-bottom: 10px;
      color: #000;
      text-decoration: none;
      display: inline-block;
      cursor: pointer;
    }

    .delete-btn {
      background-color: rgb(216, 60, 60);
      padding: 10px 15px;
      border: none;
      font-size: 1.2rem;
      display: block;
      cursor: pointer;
    }
  }
}

@media (max-width: 500px) {
  .novel {
    grid-template-columns: 1fr;

    .novel-img {
      grid-row: 2 / 3;
    }
  }
}
</style>
