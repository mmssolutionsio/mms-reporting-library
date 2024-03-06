<script setup>
import { useLanguageStore } from "@/stores/languagestore";
import { RouterLink, RouterView } from "vue-router";
import { onMounted } from "vue";

const languageStore = useLanguageStore();
let searchValue = "";

function changeLanguage() {
  return `/${languageStore.language}`;
}

function toggleSearchVisible() {
  let element = document.getElementById("mms__search-row");
  element.classList.toggle("mms__search-row--visible");
}

onMounted(() => {
  changeLanguage();
});
</script>

<template>
  <header class="mms__header">
    <div class="mms__header-inner">
      <router-link class="mms-header__logo" :to="{ path: `/` }"> </router-link>
      <div class="mms__header-content">
        <div class="mms-languages">
          <router-link :to="{ path: `/${languageStore.language}/downloads` }">
            <button>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-download"
                viewBox="0 0 16 16"
              >
                <path
                  d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"
                />
                <path
                  d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"
                />
              </svg>
            </button>
          </router-link>
          <button @click="toggleSearchVisible">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-search"
              viewBox="0 0 16 16"
            >
              <path
                d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"
              />
            </svg>
          </button>
          <button
            v-for="langCode in languageStore.allLanguages || ['de', 'en']"
            :key="langCode"
            type="button"
            class="btn btn-primary"
            :class="{ active: languageStore.language === langCode }"
            @click="languageStore.setCurrentLanguage(langCode)"
            @click.prevent="$router.push(changeLanguage())"
          >
            {{ langCode.toUpperCase() }}
          </button>
        </div>

        <span>multivisio report</span>
      </div>
    </div>
    <div id="mms__search-row" class="mms__search-row">
      <div class="mms__container mms__search-input-wrapper">
        <input
          type="search"
          class="mms__search-input"
          placeholder="Search ..."
          v-model="searchValue"
          @keypress.enter="$router.push(`/${languageStore.language}/search?searchValue=${searchValue}`); toggleSearchVisible()"
        />
      </div>
    </div>
  </header>
</template>

<style scoped>
@keyframes logoAnimation {
  0% {
    top: 60px;
    opacity: 0;
  }
  100% {
    top: 0;
    opacity: 1;
  }
}

.mms-header__logo {
  animation: logoAnimation 600ms linear 1;
}
</style>
