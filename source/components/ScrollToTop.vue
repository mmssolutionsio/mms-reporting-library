<script>
import axios from 'axios';
import {useLanguageStore} from '@/stores/languagestore'

export default {
  data() {
    return {
        language: '',
    }
  },
  mounted() {
    const languageStore = useLanguageStore();
    this.language = languageStore.language;
  },
  methods: {
    toTheTop() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    getScrollTitle() {
        switch (this.language) {
        case 'de':
            return 'Nach oben scrollen';
        case 'en':
            return 'Scroll to top';
        }
    },
  },
}
</script>
<template>
<div class="scrollToTop-btn" @click="toTheTop">
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-up" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"/>
    </svg>
    <span>{{ getScrollTitle() }}</span>
</div>
</template>

<style scoped>
.scrollToTop-btn {
    font-size: 0.8rem;
    cursor: pointer;
    padding: 7px 12px 10px 11px;
    color: var(--mms-black-50);
    position: absolute;
    bottom: 10px;
    right: 0;
    left: 0;
    margin: auto;
    z-index: 999;
    width: 40px;
    height: 40px;
}

.scrollToTop-btn:hover {
    transition: opacity 200ms ease;
}

svg {
    position: relative;
    top: 6px;
    transition: all 200ms ease;
}

span {
  display: none;
  padding-top: 2px;
  padding-left: 4px;
}

.scrollToTop-btn:hover {
  width: 180px;
  display: flex;
  align-items: center;
}

.scrollToTop-btn:hover span {
  display: block;
  margin: 0 auto;
}

.scrollToTop-btn:hover svg {
  display: none;
}

</style>
