<template>
  <v-sheet
    width="300"
    class="mx-auto"
  >
    <v-form @submit.prevent>
      <v-text-field
        v-model="postForm.title"
        label="タイトル"
      ></v-text-field>
      <v-text-field
        v-model="postForm.content"
        label="コンテンツ"
      ></v-text-field>
      <v-btn
        type="submit"
        block
        class="mt-2"
        @click.prevent="addPost"
        >投稿</v-btn
      >
    </v-form>
  </v-sheet>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { useDataStore } from '@/stores/pinia';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '@/main.js';

const dataStore = useDataStore();

const postInitial = {
  title: '',
  content: '',
};

const postForm = reactive({
  ...postInitial,
});

// フォームをリセットする関数
function resetForm() {
  Object.assign(postForm, postInitial);
}

function addPost() {
  addDoc(collection(db, 'post'), {
    title: postForm.title,
    content: postForm.content,
    uid: dataStore.userData.uid,
    userName: dataStore.userData.displayName,
  });
  resetForm()
}
</script>
