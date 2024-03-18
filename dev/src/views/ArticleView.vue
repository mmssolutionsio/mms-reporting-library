<script>
import axios from 'axios';
import { useLanguageStore } from '@/stores/languagestore'
import PrevNext from "../components/PrevNext.vue";

export default {
  data() {
    return {
      url: this.$route.fullPath,
      data: null,
      routeConfig: null,
      language: '',
    }
  },
  props: {
    route: {
      type: String,
    },
  },
  components: {
    PrevNext,
  },
  mounted() {
    const languageStore = useLanguageStore();
    this.language = languageStore.language;
    const currendID = this.$route.params.id;

    axios
      .get(`${window.baseUrl}/json/routing_${this.language}.json`)
      .then(response => {
        this.routeConfig = response.data
        const currentPage = this.routeConfig && this.routeConfig.pages.find(element => element.slug === this.$route.params.id);

        if (currentPage && currentPage.slug) {
          this.props = axios.get(`${window.baseUrl}/html/${this.language}/${currentPage.name}.html`).then(({data}) => {
            this.data = data;
          }).catch((error) => {
            console.log('error', error.toJSON());
            this.navigateTo404();
          })
        } else {
          this.navigateTo404();
        }
      })
      .catch((error) => {
        console.log('error', error.toJSON());
      })

    this.$refs.article.addEventListener('click', this.handleMissingLink);
  },
  beforeUnmount() {
    this.$refs.article.removeEventListener('click', this.handleMissingLink)
  },

  methods: {
    navigateTo404() {
      const languageStore = useLanguageStore();
      this.$router.push({path: `/${languageStore.language}/404`})
    },

    handleMissingLink(event) {
      if (event.target.localName === 'a') {
        const languageStore = useLanguageStore();
        const splitUrl = event.target.href.split('/');
        const pageReference = splitUrl.pop();

        const currentPage = this.routeConfig && this.routeConfig.pages.find(element => element.uuid === pageReference);

        if (currentPage !== undefined) {
          event.preventDefault();
          this.$router.push({path: `/${languageStore.language}/${currentPage.slug}`});
        }

      }
    }
  },
}
</script>

<template>
  <article ref="article" class="mms__article">
    <div class="mms__container mms__container--main">
      <transition name="fade">
        <div v-html="data" :key="data"></div>
      </transition>
    </div>
    <PrevNext />
  </article>
</template>

<style scoped>
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
