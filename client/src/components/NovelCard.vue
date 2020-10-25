<template>
  <div class="card">
    <router-link class="card-link" :to="`/novel/${novel.id}`">
      <div class="card-header">
        <img :src="novel.image_url" alt="" />
      </div>
      <div class="card-body">
        <h1>{{ novel.title }}</h1>
        <p>{{novel.author}} <small v-if="novel.volumes !== ''">Volumes: {{novel.volumes}}</small></p>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  props: ['novel'],
};
</script>

<style lang="scss" scoped>
.card {
  border-radius: 24px;
  box-shadow: 3px 3px 6px rgba($color: #000000, $alpha: 0.5);
  .card-link {
    text-decoration: none;
    color: #000;
    .card-header {
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 12px 12px 0 0;
      }
    }
    .card-body {
      text-align: center;
    }
  }
}
</style>
