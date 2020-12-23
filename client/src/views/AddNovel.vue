<template>
  <div class="add-novel">
    <h1 style="text-align: center">Add a novel</h1>
    <div class="add-novel-grid">
      <div class="add-form">
        <p v-if="!validImage">Add a valid Image url</p>
        <AddForm :novel="novel" v-model:title="novel.title" 
        v-model:author="novel.author" v-model:volumes="novel.volumes" v-model:image-url="novel.image_url" @add-novel="addNovel" :text="'Add novel'"/>
      </div>
      <NovelCard :novel="novel"/>
    </div>
  </div>
</template>

<script>
import AddForm from '@/components/AddForm.vue'
import NovelCard from '@/components/NovelCard.vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

export default {
  components: {
    AddForm,
    NovelCard
  },
  setup() {
    const novel = ref({
      title: '',
      author: '',
      volumes: 1,
      image_url: 'https://icon-library.com/images/no-picture-available-icon/no-picture-available-icon-1.jpg'
    });
    const validImage = ref(true);

    const router = useRouter();
    const store = useStore();

    const addNovel = async() => {
      const regex = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/
      const validation = regex.test(novel.value.image_url);
      if(!validation) {
        return validImage.value = false;
      }
      await store.dispatch('postNewNovel', novel.value);
      router.push('/novels');
    };

    return {
      novel,
      addNovel,
      validImage
    }
  }
}
</script>

<style lang="scss" scoped>
  .add-novel {
    min-height: 100vh;
    .add-novel-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
    }
  }

  @media (max-width: 500px) {
    .add-novel {
      .add-novel-grid {
        grid-template-columns: 1fr;
        grid-template-rows: 1fr 1fr;
      }
    }
  }
</style>