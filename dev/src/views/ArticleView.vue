<script lang="ts" setup>
import Autoload from '@/Autoload.ts'
import axios from 'axios'
import { useLanguageStore } from '@/stores/languagestore'
import PrevNext from '@/components/PrevNext.vue'
import { nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
const articleContent = ref()
const article = ref()
const url = route.fullPath
const html = ref('')
const routeConfig = ref(null)
const language = ref('')

onMounted(() => {
  const languageStore = useLanguageStore()
  language.value = languageStore.language

  axios
    .get(`${window.baseUrl}/json/routing_${language.value}.json`)
    .then(response => {
      routeConfig.value = response.data
      const currentPage = routeConfig.value && routeConfig.value.pages.find(element => element.slug === route.params.id)

      if (currentPage && currentPage.slug) {
        axios.get(`${window.baseUrl}/html/${language.value}/${currentPage.name}.html`).then(({ data }) => {
          html.value = data
          nextTick(() => {
            Autoload.init(articleContent.value)
          })
        }).catch((error) => {
          console.log('error', error.toJSON())
          navigateTo404()
        })
      } else {
        navigateTo404()
      }
    })
    .catch((error) => {
      console.log('error', error.toJSON())
    })

  article.value.addEventListener('click', handleMissingLink)
})

onBeforeUnmount(() => {
  article.value.removeEventListener('click', handleMissingLink)
})

function navigateTo404() {
  const languageStore = useLanguageStore()
  router.push({ path: `/${languageStore.language}/404` })
}

function handleMissingLink(event) {
  if (event.target.localName === 'a') {
    const languageStore = useLanguageStore()
    const splitUrl = event.target.href.split('/')
    const pageReference = splitUrl.pop()
    const currentPage = routeConfig.value && routeConfig.value.pages.find(element => element.uuid === pageReference)

    if (currentPage !== undefined) {
      event.preventDefault()
      router.push({ path: `/${languageStore.language}/${currentPage.slug}` })
    }
  }
}

</script>

<template>
  <article ref="article">
    <div class="srl-article-container">
      <transition name="fade">
        <div ref="articleContent" class="srl-article-root" v-html="html"></div>
      </transition>
    </div>
    <PrevNext />
  </article>
</template>

<style scoped lang="scss">
@use "nswow";

.srl-article-container {
  @include nswow.grid-container();
  margin: 0 auto;
  padding-bottom: nswow.system-size-unit(50);
}

.fade-enter-from {
  opacity: 0;
}

.fade-enter-to {
  opacity: 1;
}

.fade-enter-active {
  transition: opacity 600ms linear;
}

.fade-leave-from {
  opacity: 1;
}

.fade-leave-to {
  opacity: 0;
}

.fade-leave-active {
  transition: opacity 300ms linear;
}
</style>
