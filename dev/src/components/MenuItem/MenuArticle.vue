<script setup lang="ts">

import { RouterLink } from 'vue-router'
import { useLanguageStore } from '@/stores/languagestore'

const languageStore = useLanguageStore().language

const props = defineProps<{
  label: string,
  page: string,
  anchor?: string
}>()

</script>

<template>
  <span><router-link :to="{ path: props.page }">{{ props.label }}</router-link></span>
</template>