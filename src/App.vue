<template>
  <v-app id="inspire">
    <v-app-bar
      class="px-3"
      color="white"
      flat
      density="compact"
    >
      <v-avatar
        color="grey-darken-1"
        size="32"
      ></v-avatar>

      <v-spacer></v-spacer>

      <v-tabs
        centered
        color="grey-darken-2"
      >
        <v-tab>
          <router-link to="/">ホーム</router-link>
        </v-tab>
        <v-tab v-if="isLoggedIn">
          <router-link to="/profile">プロフィール</router-link>
        </v-tab>
      </v-tabs>
      <v-spacer></v-spacer>

      <v-btn
        v-if="!isLoggedIn"
        @click="signInWithGoogle"
      >
        サインイン
      </v-btn>
      <v-btn
        v-if="isLoggedIn"
        @click="handleSignOut"
      >
        サインアウト
      </v-btn>
    </v-app-bar>

    <v-main class="bg-grey-lighten-3">
      <v-container>
        <v-row>
          <v-col
            cols="12"
            sm="3"
          >
            <v-sheet
              rounded="lg"
              min-height="268"
            >
              <div class="d-flex justify-center">
                <p
                  v-if="displayName"
                  class="pa-3"
                >
                  {{ displayName }}さん
                </p>
              </div>
            </v-sheet>
          </v-col>

          <v-col
            cols="12"
            sm="9"
          >
            <v-sheet
              min-height="70vh"
              rounded="lg"
            >
              <div class="pa-1">
                <router-view />
              </div>
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
  <!-- <router-view signInWithGoogle="signInWithGoogle" /> -->
</template>

<script setup>
import { onMounted, ref } from 'vue';
import {
  getAuth,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import { collection, getDocs, onSnapshot } from 'firebase/firestore';

import { useRouter } from 'vue-router';
import { useDataStore } from '@/stores/pinia';
import { db } from '@/main.js';

const dataStore = useDataStore();

const router = useRouter();
const isLoggedIn = ref(false);
const displayName = ref('ゲスト');

// const posts = ref();

let auth;
onMounted(
  // Check Auth Status
  () => {
    auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        isLoggedIn.value = true;
        displayName.value = user.displayName;
        dataStore.userData = user;
        // console.log(user.uid);
      } else {
        isLoggedIn.value = false;
        displayName.value = 'ゲスト';
        dataStore.userData = null;
      }
    });

    // Load Initial Data
    (async () => {

      onSnapshot(collection(db, 'post'), (querySnapshot) => {
        const fbPosts = [];
        querySnapshot.forEach((doc) => {
          const post = {
            id: doc.id,
            userName: doc.data().user_name,
            title: doc.data().title,
            content: doc.data().content,
          };
          fbPosts.push(post);
        });
        dataStore.posts = fbPosts;
      });
    })()

  }
);

function handleSignOut() {
  signOut(auth)
    .then(() => {
      console.log('サインアウトしました');
      router.push('/');
    })
    .catch((error) => {
      console.log(error);
    });
}

function signInWithGoogle() {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
    .then((result) => {
      displayName.value = result.user.displayName;
      router.push('/profile');
    })
    .catch((error) => {});
}
</script>
