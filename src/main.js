import { createApp } from 'vue';
import App from './App.vue';
import { createPinia } from 'pinia';
import router from './router';

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

import './style.css';

// Vuetify
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
const vuetify = createVuetify({
  components,
  directives,
});

const firebaseConfig = {
  apiKey: 'AIzaSyC4e_0LxspH9Eoi9xxxxxxCl7j0AwkuTw',
  authDomain: 'tour-386117.firebaseapp.com',
  projectId: 'tour-386117',
  storageBucket: 'tour-386117.appspot.com',
  messagingSenderId: '638542335894',
  appId: '1:638542335894:web:b10c3f97432352bc5e17b7',
  measurementId: 'G-71QMF1RPK1',
};

initializeApp(firebaseConfig);
// const initFirebase = initializeApp(firebaseConfig);

const pinia = createPinia();
const fireApp = initializeApp(firebaseConfig);
const db = getFirestore(fireApp);

const app = createApp(App);

app.use(router);
app.use(pinia);

app.use(vuetify);
app.mount('#app');

export { db };
