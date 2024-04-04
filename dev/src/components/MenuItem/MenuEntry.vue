<script setup lang="ts">

const props = defineProps<{
  label: string,
  page?: string,
  anchor?: string
}>()

</script>

<template>
  <span>{{ props.label }}</span>
</template>