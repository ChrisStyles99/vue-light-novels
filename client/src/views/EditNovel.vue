<template>
  <div class="edit-novel">
    <Loading v-if="loading"/>
    <Error v-if="error"/>
    <h1 style="text-align: center">Edit Novel</h1>
    <div class="edit-novel-grid">
      <div class="edit-form">
        <p v-if="!validImage">Please use a valid image url</p>
        <AddForm :novel="novel" :changeValue="changeValue" @add-novel="editNovel" :text="'Update novel'"/>
      </div>
      <NovelCard :novel="novel"/>
    </div>
  </div>
</template>

<script>
import AddForm from '@/components/AddForm.vue'
import NovelCard from '@/components/NovelCard.vue'
import {ref, onMounted} from 'vue'
import {useRoute, useRouter} from 'vue-router'
import axios from 'axios'
import Error from '@/components/Error.vue';
import Loading from '@/components/Loading.vue';

export default {
  components: {
    AddForm,
    NovelCard,
    Loading,
    Error
  },
  setup() {
    const novel = ref({});
    const {
      params: { id },
    } = useRoute();
    const router = useRouter();
    const validImage = ref(true);
    const loading = ref(true);
    const error = ref(false);

    onMounted(async () => {
      try {
        const res = await axios.get(`http://localhost:3000/novel/${id}`);
        const data = res.data;
        novel.value = data[0];
        loading.value = false;
      } catch (err) {
        console.log(err);
        loading.value = false;
        error.value = true;
      }
    });

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

    const editNovel = async() => {
      const regex = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png|jpeg)/
      const validation = regex.test(novel.value.image_url);
      if(!validation) {
        return validImage.value = false;
      }

      await axios.put(`http://localhost:3000/edit/${id}`, novel.value);
      router.push('/novels');
    };

    return {
      novel,
      changeValue,
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