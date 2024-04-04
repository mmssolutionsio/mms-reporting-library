<script lang="ts" setup>
import axios from 'axios'
import { useLanguageStore } from '@/stores/languagestore'
import { onMounted, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
const searchValue = ref('')
const language = ref('de')
const isLoading = ref(true)
const searchData = ref([])
const routesArray = ref([])
const routeConfig = ref(null)

onMounted(() => {
  searchValue.value = <string>route.query.searchValue

  const languageStore = useLanguageStore()
  language.value = languageStore.language

  setTimeout(() => {
    isLoading.value = false
  }, 1500)

  axios
    .get(`${window.baseUrl}/json/routing_${language.value}.json`)
    .then(response => {
      routeConfig.value = response.data
      routeConfig.value?.pages?.filter(function(item) {
        return item.ignoreInSearch === false
      }).map((value) => (
        routesArray.value.push(
          {
            uuid: value.uuid,
            slug: value.slug,
            translatedTitle: value.translatedTitle
          }
        )
      ))

      routesArray.value && routesArray.value.length > 0 && routesArray.value.map((value) => (
        axios.get(`${window.baseUrl}/html/${language.value}/${value.slug}.html`).then(({ data }) => {
          return searchData.value.push(
            {
              title: `${language.value}/${value.slug}`,
              content: data,
              link: `${language.value}/${value.uuid}`,
              translatedTitle: value.translatedTitle
            }
          )
        }).catch((error) => {
          console.log('error', error.toJSON())
        })
      ))
    })
    .catch((error) => {
      console.log('error', error.toJSON())
    })
})

function getSearchResultTitle() {
  switch (language.value) {
    case 'de':
      return 'Suchergebnisse'
    case 'en':
      return 'Search results'
  }
}

function getSearchResultSubTitle1() {
  switch (language.value) {
    case 'de':
      return 'Ihre Suche nach'
    case 'en':
      return 'Your search for'
  }
}

function getSearchResultSubTitle2() {
  switch (language.value) {
    case 'de':
      return 'ergab'
    case 'en':
      return 'returned'
  }
}

function getSearchResultSubTitle3() {
  switch (language.value) {
    case 'de':
      return 'Treffer'
    case 'en':
      return 'hits'
  }
}

function filteredList() {
  return searchData.value.filter(dataItem => {
    return searchValue.value && dataItem.content.toLowerCase().includes(searchValue.value.toLowerCase())
  }).sort((a, b) => a.title.localeCompare(b.title))
}

function getFirstParagraphOfDataValue(response) {
  let doc = response !== undefined && new DOMParser().parseFromString(response, 'text/html')
  return doc && doc.querySelector('p').textContent
}
</script>

<template>
  <article class="srl-article">
    <div class="srl-article-container">
      <h1>{{ getSearchResultTitle() }}</h1>

      <div v-if="isLoading">Loading...</div>
      <transition name="fade">
        <h2 v-if="!isLoading">{{ getSearchResultSubTitle1()
          }}&nbsp;<span>“{{ searchValue }}”</span>&nbsp;{{ getSearchResultSubTitle2()
          }}&nbsp;<span>{{ filteredList().length }}</span>&nbsp;{{ getSearchResultSubTitle3() }}</h2>
      </transition>

      <transition name="fade">
        <div v-if="!isLoading && searchValue">
          <div v-for="(dataItem, index) in filteredList()">
            <h5>{{ dataItem.translatedTitle }}</h5>
            <p v-html="getFirstParagraphOfDataValue(dataItem.content)"></p>
            <router-link :to="{ path: `/${dataItem.title}`}">{{ dataItem.title }}</router-link>
          </div>
        </div>
      </transition>
    </div>
  </article>
</template>

<style scoped lang="scss">
@use "nswow";

.srl-article {
  @include nswow.grid-container();
  @include nswow.typography-core-styles();
  margin: 0 auto;
}

</style>

