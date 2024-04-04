<script lang="ts" setup>
import { useLanguageStore } from '@/stores/languagestore'
import { onMounted, ref } from 'vue'

const language = ref()

onMounted(() => {
  const languageStore = useLanguageStore()
  language.value = languageStore.language
})

function toTheTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function getScrollTitle() {
  switch (language.value) {
    case 'de':
      return 'Nach oben scrollen'
    case 'en':
      return 'Scroll to top'
  }
}
</script>
<template>
  <div class="srl-scrollToTop" @click="toTheTop">
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-up"
         viewBox="0 0 16 16">
      <path fill-rule="evenodd"
            d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z" />
    </svg>
    <span>{{ getScrollTitle() }}</span>
  </div>
</template>

<style scoped lang="scss">
@use "nswow";

.srl-scrollToTop {
  position: absolute;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  bottom: nswow.system-size-unit(10);
  right: 0;
  left: 0;
  z-index: 999;
  width: nswow.system-size-unit(40);
  height: nswow.system-size-unit(40);
  background: nswow.colors-primary();
  color: nswow.colors-light();

  span {
    display: none;
  }

  &:hover {
    width: nswow.system-size-unit(180);

    span {
      display: block;
      margin: 0 auto;
    }

    svg {
      display: none;
    }
  }

  @include nswow.grid-media(print) {
    display: none;
  }
}
</style>