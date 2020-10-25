<template>
  <div class="search">
    <div class="search-div">
      <h1>Search</h1>
      <input
        type="text"
        v-model="searchTerm"
        placeholder="Search for a novel"
      />
    </div>
    <Loading v-if="loading" />
    <Error v-if="error" />
    <div class="card-grid">
      <NovelCard
        v-for="novel in filteredNovels"
        :key="novel.id"
        :novel="novel"
      />
    </div>
  </div>
</template>

<script>
import { computed, ref } from 'vue';
import axios from 'axios';
import NovelCard from '@/components/NovelCard.vue';
import Error from '@/components/Error.vue';
import Loading from '@/components/Loading.vue';

export default {
  components: {
    NovelCard,
    Error,
    Loading,
  },
  setup() {
    const novels = ref([]);
    const loading = ref(true);
    const error = ref(false);
    const searchTerm = ref('');

    const getNovels = async () => {
      try {
        const res = await axios.get('http://localhost:3000/novels');
        const data = res.data;
        novels.value = data;
        loading.value = false;
      } catch (err) {
        console.log(err);
        error.value = true;
        loading.value = false;
      }
    };

    getNovels();

    const filteredNovels = computed(() => {
      return novels.value.filter((novel) => {
        return novel.title.toLowerCase().match(searchTerm.value.toLowerCase());
      });
    });

    return {
      novels,
      loading,
      error,
      searchTerm,
      filteredNovels,
    };
  },
};
</script>

<style lang="scss" scoped>
.search {

  .search-div {
    text-align: center;
    margin-bottom: 10px;

    input {
      font-size: 1.2rem;
    }
  }

  .card-grid {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 20px;
    margin: 0 20px;
  }
}
@media (max-width: 992px) {
  .search {
    .card-grid {
      grid-template-columns: repeat(4, 1fr);
    }
  }
}

@media (max-width: 768px) {
  .search {
    .card-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
}

@media (max-width: 500px) {
  .search {
    .card-grid {
      grid-template-columns: repeat(1, 1fr);
    }
  }
}
</style>
