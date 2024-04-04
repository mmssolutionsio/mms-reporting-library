<script lang="ts" setup>
import ScrollToTop from '@/components/ScrollToTop.vue'
import axios from 'axios'
import { useLanguageStore } from '@/stores/languagestore'
import { onMounted, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const allPages = ref(null)
const flatMenu = ref([])
const language = ref('')
const router = useRouter()
const route = useRoute()

onMounted(() => {
  const languageStore = useLanguageStore()
  language.value = languageStore.language

  axios
    .get(`${window.baseUrl}/json/routing_${language.value}.json`)
    .then(response => {
      allPages.value = response.data.pages
      flatMenu.value = flatten(response && response.data && response.data.menu && response.data.menu.menuMain)
    })
    .catch((error) => {
      console.log('error', error.toJSON())
    })
})

function flatten(input) {
  let flattenedArray = []

  input && input.map(function(valueOne, index) {
    valueOne?.page && flattenedArray.push(
      valueOne
    )
    valueOne.submenuEntries?.map(function(valueTwo, index) {
      valueTwo?.page && flattenedArray.push(
        valueTwo
      )
      valueTwo.submenuEntries?.map(function(valueThree, index) {
        valueThree?.page && flattenedArray.push(
          valueThree
        )
        valueThree?.submenuEntries?.map(function(valueFour, index) {
          valueFour?.page && flattenedArray.push(
            valueFour
          )
        })
      })
    })
  })

  return flattenedArray
}

function navigateRoutes(direction) {
  const currentPage = allPages.value.find(element => element.slug === route.params.id)
  const currentIndex = flatMenu.value && flatMenu.value.findIndex((element) => element.page === currentPage.uuid)

  if (direction === 'next') {
    if (currentIndex === flatMenu.value.length - 1) {
      returnLink(0)
    } else {
      returnLink(currentIndex + 1)
    }
  } else {
    if (currentIndex === 0) {
      returnLink(flatMenu.value.length - 1)
    } else {
      returnLink(currentIndex - 1)
    }
  }
}

function returnLink(index) {
  const pageToLinkTo = allPages.value.find(element => element.uuid === flatMenu.value[index].page)
  router.push(`/${language.value}/${pageToLinkTo.slug}`)
}

function getNextTitle() {
  switch (language.value) {
    case 'de':
      return 'Nächste Seite'
    case 'en':
      return 'Next page'
  }
}

function getPrevTitle() {
  switch (language.value) {
    case 'de':
      return 'Vorherige Seite'
    case 'en':
      return 'Previous page'
  }
}
</script>
<template>
  <div class="srl-nav-holder">
    <div class="srl-nav-holder__nav-btn" @click.prevent="navigateRoutes('prev')">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-left left"
           viewBox="0 0 16 16">
        <path fill-rule="evenodd"
              d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z" />
      </svg>
      {{ getPrevTitle() }}
    </div>

    <ScrollToTop />

    <div class="srl-nav-holder__nav-btn" @click.prevent="navigateRoutes('next')">
      {{ getNextTitle() }}
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
           class="bi bi-chevron-right right" viewBox="0 0 16 16">
        <path fill-rule="evenodd"
              d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z" />
      </svg>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use "nswow";

.srl-nav-holder {
  display: flex;
  width: 100%;
  justify-content: space-between;
  position: sticky;
  bottom: 0;
  margin-bottom: nswow.system-size-unit(10);

  &__nav-btn {
    display: flex;
    cursor: pointer;
    align-items: center;
    background-color: nswow.colors-primary();
    color: nswow.colors-light();
    font-size: nswow.typography-get-font-size(footnote);
    padding: nswow.system-size-unit(10) nswow.system-size-unit(15);

    svg {
      transition: all 200ms ease;

      &.left {
        margin-right: nswow.system-size-unit(10);
      }

      &.right {
        margin-left: nswow.system-size-unit(10);
      }
    }
  }

  @include nswow.grid-media(print) {
    display: none;
  }
}

</style>
