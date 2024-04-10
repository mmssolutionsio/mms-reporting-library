<script setup lang="ts">
import PageHeader from '@/components/PageHeader.vue'
import PageFooter from '@/components/PageFooter.vue'
import MainNavigation from '@/components/MainNavigation.vue'
import { watch } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ArrayToString } from '@/utils/variables'

const route = useRoute()
const { locale } = useI18n()

watch(
  route,
  () => {
    const paramLocale = ArrayToString(route.params.locale)
    if (paramLocale !== locale.value) {
      locale.value = paramLocale
    }
  }
)
</script>

<template>
  <PageHeader/>
  <MainNavigation/>
  <RouterView/>
  <PageFooter/>
</template>