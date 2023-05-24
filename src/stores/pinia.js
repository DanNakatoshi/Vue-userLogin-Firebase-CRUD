import { defineStore } from 'pinia';
import { ref } from 'vue';


export const useDataStore = defineStore('data', () => {
  const userData = ref(null);

  const posts = ref();

  return {
    userData,
    posts,
  };
});
