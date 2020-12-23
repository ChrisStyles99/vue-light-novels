<template>
  <div class="edit-novel">
    <Loading v-if="loading"/>
    <Error v-if="error"/>
    <h1 style="text-align: center">Edit Novel</h1>
    <div class="edit-novel-grid">
      <div class="edit-form">
        <p v-if="!validImage">Please use a valid image url</p>
        <AddForm :novel="novel" v-model:title="novel.title" 
        v-model:author="novel.author" v-model:volumes="novel.volumes" v-model:image-url="novel.image_url" @add-novel="editNovel" :text="'Update novel'"/>
      </div>
      <NovelCard :novel="novel"/>
    </div>
  </div>
</template>

<script>
import AddForm from '@/components/AddForm.vue'
import NovelCard from '@/components/NovelCard.vue'
import {ref, onMounted, computed} from 'vue'
import {useRoute, useRouter} from 'vue-router'
import Error from '@/components/Error.vue';
import Loading from '@/components/Loading.vue';
import { useStore } from 'vuex'

export default {
  components: {
    AddForm,
    NovelCard,
    Loading,
    Error
  },
  setup() {
    const store = useStore();
    const {
      params: { id },
    } = useRoute();
    const router = useRouter();
    const validImage = ref(true);
    const loading = ref(true);
    const error = ref(false);
    const novel = computed(() => {
      return store.getters.singleNovel;
    });

    onMounted(async () => {
      try {
        store.dispatch('getSingleNovel', id);
        loading.value = false;
      } catch (err) {
        console.log(err);
        loading.value = false;
        error.value = true;
      }
    });

    const editNovel = async() => {
      const regex = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png|jpeg)/
      const validation = regex.test(novel.value.image_url);
      if(!validation) {
        return validImage.value = false;
      }

      store.dispatch('editNovel', {updatedNovelData: novel.value, id: id});
      router.push(`/novel/${id}`);
    };

    return {
      novel,
      editNovel,
      validImage,
      loading,
      error
    }
  }
}
</script>

<style lang="scss" scoped>
  .edit-novel {
    .edit-novel-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
    }
  }
  @media (max-width: 500px) {
    .edit-novel {
      .edit-novel-grid {
        grid-template-columns: 1fr;
      }
    }
  }
</style>