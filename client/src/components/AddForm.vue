<template>
  <div class="novel-div">
    <form @submit="addNovel" class="novel-form">
      <div class="input-field">
        <label for="title">Title</label>
        <input
          type="text"
          name="title"
          id="title"
          :value="novel.title"
          @change="changeValue"
          @keyup="changeValue"
          required
        />
      </div>
      <div class="input-field">
        <label for="author">Author</label>
        <input
          type="text"
          name="author"
          id="author"
          :value="novel.author"
          @change="changeValue"
          @keyup="changeValue"
          required
        />
      </div>
      <div class="input-field">
        <label for="volumes">Volumes</label>
        <input
          type="number"
          name="volumes"
          id="volumes"
          :value="novel.volumes"
          @change="changeValue"
          required
          min="1"
        />
      </div>
      <div class="input-field">
        <label for="image_url">Image URL</label>
        <input
          type="url"
          name="imageUrl"
          id="image_url"
          :value="novel.image_url"
          @change="changeValue"
          @keyup="changeValue"
          required
        />
      </div>
      <div class="submit-btn">
        <button type="submit">{{text}}</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  props: ['novel', 'changeValue', 'text'],
  emits: ['add-novel'],

  setup(_, { emit }) {
    const addNovel = (e) => {
      e.preventDefault();
      emit('add-novel');
    };

    return {
      addNovel,
    };
  },
};
</script>

<style lang="scss" scoped>
.novel-div {
  position: relative;
  .novel-form {
    position: absolute;
    width: 80%;
    top: 50%;
    left: 50%;
    transform: translate(-50%);

    .input-field {
      margin: 10px 0;
      label {
        display: block;
        font-size: 1.2rem;
      }

      input {
        width: 100%;
        font-size: 1.2rem;
        padding: 10px;
        border: none;
        border-bottom: 1px solid #000;
        outline: none;
      }
    }

    .submit-btn {
      button {
        background-color: #2dc2d6;
        display: block;
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
}

@media (max-width: 500px) {
  .novel-div {
    position: static; 

    .novel-form {
      margin: auto;
      position: static;
      transform: translate(0);
    }
  }
}
</style>
