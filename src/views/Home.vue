<template>
  <div v-for="post in dataStore.posts" :key="post.id" class="ma-2">
    <v-card
      width="400"
      :title="post.title"
      :subtitle="post.userName"
      :text="post.content"
    ></v-card>
  </div>


</template>

<script setup>
import { useDataStore } from "@/stores/pinia";

const dataStore = useDataStore();

</script>
