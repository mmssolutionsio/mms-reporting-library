<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
import Navigation from "./components/Navigation.vue";
</script>

<template>
  <Header />
  <Navigation />

  <RouterView :key="$route.path" />

  <Footer />
</template>
