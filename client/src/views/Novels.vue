<template>
  <div class="novels">
    <h1 style="text-align: center">All novels</h1>
    <Loading v-if="loading" />
    <Error v-if="error" />
    <div class="card-grid">
      <NovelCard
        v-for="novel in displayedNovels"
        :key="novel.id"
        :novel="novel"
      />
    </div>
    <div class="paginate-btns">
      <button v-if="page != 1" @click="page--">
        Before
      </button>
      <button v-for="numberOfPage in pages.slice(page - 1, page + 4)" 
        :key="numberOfPage"
        @click="page = numberOfPage"
      >
        {{numberOfPage}}
      </button>
      <button @click="page++" v-if="page < pages.length">
        Next
      </button>
    </div>
  </div>
</template>

<script>
import { computed, ref, watch } from 'vue';
import axios from 'axios';
import NovelCard from '@/components/NovelCard.vue';
import Loading from '@/components/Loading.vue';
import Error from '@/components/Error.vue';

export default {
  components: {
    NovelCard,
    Loading,
    Error,
  },
  setup() {
    const novels = ref([]);
    const loading = ref(true);
    const error = ref(false);
    const page = ref(1);
    const perPage = ref(12);
    const pages = ref([]);

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

    const displayedNovels = computed(() => {
      return paginate(novels.value);
    });

    const paginate = (newNovels) => {
      let pageNumber = page.value;
      let perPageNovels = perPage.value;
      let from = (pageNumber * perPageNovels) - perPageNovels;
      let to = pageNumber * perPageNovels;
      return newNovels.slice(from, to);
    };

    const setNovels = () => {
      let numberOfPages = Math.ceil(novels.value.length / perPage.value);
      for (let i = 1; i <= numberOfPages; i++) {
        pages.value.push(i);
      }
    }

    watch([pages, novels], () => {
      setNovels();
    })

    // watchEffect([pages, novels], setNovels());

    return {
      novels,
      loading,
      error,
      displayedNovels,
      page,
      perPage,
      pages,
    };
  },
};
</script>

<style lang="scss" scoped>
.novels {
  .card-grid {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 20px;
    margin: 0 20px;
  }

  .paginate-btns {
    display: flex;
    justify-content: center;
    margin-top: 10px;

    button {
      cursor: pointer;
      padding: 10px 15px;
      font-size: 1.2rem;
      background-color: #26a7da;
      border: 1px solid #3b72c5;
      transition: 0.3s ease all;

      &:hover {
        background-color: #3b72c5;
      }
    }
  }
}

@media (max-width: 992px) {
  .novels {
    .card-grid {
      grid-template-columns: repeat(4, 1fr);
    }
  }
}

@media (max-width: 768px) {
  .novels {
    .card-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
}

@media (max-width: 500px) {
  .novels {
    .card-grid {
      grid-template-columns: repeat(1, 1fr);
    }
  }
}
</style>
