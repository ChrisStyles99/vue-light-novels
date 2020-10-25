<template>
  <div class="add-novel">
    <h1 style="text-align: center">Add a novel</h1>
    <div class="add-novel-grid">
      <div class="add-form">
        <p v-if="!validImage">Add a valid Image url</p>
        <AddForm :novel="novel" :changeValue="changeValue" @add-novel="addNovel" :text="'Add novel'"/>
      </div>
      <NovelCard :novel="novel"/>
    </div>
  </div>
</template>

<script>
import AddForm from '@/components/AddForm.vue'
import NovelCard from '@/components/NovelCard.vue'
import { ref } from 'vue'
import Axios from 'axios'
import { useRouter } from 'vue-router'

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

    const changeValue = e => {
      if(e.target.id === 'title') {
        return novel.value.title = e.target.value;
      }
      if(e.target.id === 'author') {
        return novel.value.author = e.target.value;
      }
      if(e.target.id === 'volumes') {
        return novel.value.volumes = e.target.value;
      }
      if(e.target.id === 'image_url') {
        return novel.value.image_url = e.target.value;
      }
    }

    const addNovel = async() => {
      const regex = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/
      const validation = regex.test(novel.value.image_url);
      console.log(novel.value.image_url);
      if(!validation) {
        // novel.value.image_url = 'https://icon-library.com/images/no-picture-available-icon/no-picture-available-icon-1.jpg'
        return validImage.value = false;
      }

      await Axios.post('http://localhost:3000/new-novel', novel.value);
      router.push('/novels');
    };

    return {
      novel,
      changeValue,
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