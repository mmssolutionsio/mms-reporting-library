<script setup lang="ts">

const props = defineProps<{
  label: string,
  url: string
}>()

</script>

<template>
  <span><a :href="props.url" target="_blank">{{ props.label }}</a></span>
</template>