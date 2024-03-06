<script>
import axios from 'axios';
import { useLanguageStore } from '@/stores/languagestore'

export default {
  data() {
      return {
          language: '',
      }
  },
  props: {
      route: {
          type: String,
      },
  },
  mounted() {
    const languageStore = useLanguageStore();
    this.language = languageStore.language;
    
    if (Object.keys(this.$route.query).length !== 0) {
      if (this.$route.query.action === 'reloadPage') {
        languageStore.setCurrentLanguage(this.$route.query.lang)
        this.$router.push({path: `/${this.$route.query.lang}/${this.$route.query.slug}`})
      } else {
        this.language = languageStore.language;
        this.$router.push({path: `/${this.$route.query.path}`})
      }
    } else {
      this.language = languageStore.language;
      axios
        .get(`${window.baseUrl}/json/routing_${this.language}.json`)
        .then(({data}) => {
            this.$router.push({path: `/${this.language}/${data.pages.find(element => element.index === true).slug}`})
        })
        .catch((error) => {
            console.log('error', error.toJSON());
        })
    }
  },
}
</script>

<template>
  <div class="mms__container"></div>
</template>

<style scoped>
</style>

