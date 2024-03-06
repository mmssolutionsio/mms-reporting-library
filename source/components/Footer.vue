<script setup>
import { RouterLink, RouterView } from "vue-router";
import { useLanguageStore } from "@/stores/languagestore";
const languageStore = useLanguageStore();
</script>

<template>
  <footer class="mms__footer">
      <div class="mms__container">
        <div class="mms__footer-content">
          <div class="mms__footer-content--item">
            <router-link class="mms-header__logo" :to="{ path: `/` }"></router-link>
          </div>
          <div class="mms__footer-content--item">
            <ul>
              <li><router-link :to="{ path: `/${languageStore.language}` }">Impressum</router-link></li>
              <li><router-link :to="{ path: `/${languageStore.language}` }">Datenschutzerklärung</router-link></li>
              <li><router-link :to="{ path: `/${languageStore.language}` }">Newsletter anmelden</router-link></li>
              <li><router-link :to="{ path: `/${languageStore.language}` }">Newsletter abmelden</router-link></li>
            </ul>
          </div>
          <div class="mms__footer-content--item">
            <ul>
              <li><router-link :to="{ path: `/${languageStore.language}` }">Instagram</router-link></li>
              <li><router-link :to="{ path: `/${languageStore.language}` }">Facebook</router-link></li>
              <li><router-link :to="{ path: `/${languageStore.language}` }">Linkedin</router-link></li>
            </ul>
          </div>
        </div>
        <div class="mms__footer-content mms__footer-content--small">
          <p>tbd</p>
        </div>
        <div class="mms__footer-content mms__footer-content--small">
          <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</p>
        </div>
      </div>
  </footer>
</template>
