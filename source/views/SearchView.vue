<script>
import axios from 'axios';
import { useLanguageStore } from "@/stores/languagestore";

export default {
  data() {
    return {
      searchValue: null,
      language: 'de',
      isLoading: true,
      data: [],
      routesArray: [],
      routeConfig: null,
    }
  },
  props: {
    route: {
      type: String,
    },
  },
  mounted() {
    this.getFirstParagraphOfDataValue();
    this.searchValue = this.$route.query.searchValue;
    const languageStore = useLanguageStore();
    this.language = languageStore.language;

    setTimeout(() => {
      this.isLoading = false;
    }, "1500");

    axios
      .get(`${window.baseUrl}/json/routing_${this.language}.json`)
      .then(response => {
        this.routeConfig = response.data
        this.routeConfig?.pages?.filter(function(item) {
          return item.ignoreInSearch === false; 
        }).map((value) => (
            this.routesArray.push(
                {
                    uuid: value.uuid,
                    slug: value.slug,
                    translatedTitle: value.translatedTitle
                }
            )
        ));

        this.routesArray && this.routesArray.length > 0 && this.routesArray.map((value) => (
          this.props = axios.get(`${window.baseUrl}/html/${this.language}/${value.slug}.html`).then(({ data }) => {   
            return this.data.push(
                {
                    title: `${this.language}/${value.slug}`,
                    content: data,
                    link: `${this.language}/${value.uuid}`,
                    translatedTitle: value.translatedTitle
                }
            );
            }).catch((error) => {
                console.log('error', error.toJSON());
            })
        ));
      })
        .catch((error) => {
            console.log('error', error.toJSON());
        })
  },
  updated() {
    this.searchValue = this.$route.query.searchValue || null;
  },
  methods: {
    getSearchResultTitle() {
        switch (this.language) {
        case 'de':
            return 'Suchergebnisse';
        case 'en':
            return 'Search results';
        }
    },
    getSearchResultSubTitle1() {
        switch (this.language) {
        case 'de':
            return 'Ihre Suche nach';
        case 'en':
            return 'Your search for';
        }
    },
    getSearchResultSubTitle2() {
        switch (this.language) {
        case 'de':
            return 'ergab';
        case 'en':
            return 'returned';
        }
    },
    getSearchResultSubTitle3() {
        switch (this.language) {
        case 'de':
            return 'Treffer';
        case 'en':
            return 'hits';
        }
    },
    filteredList() {
        return this.data.filter(dataItem => {
            return this.searchValue && dataItem.content.toLowerCase().includes(this.searchValue.toLowerCase())
        }).sort((a, b) => a.title.localeCompare(b.title))
    },
    getFirstParagraphOfDataValue(response) {
      let doc = response !== undefined && new DOMParser().parseFromString(response, 'text/html');

      return doc && doc.querySelector('p').textContent;
    }
  }
}
</script>

<template>
<article class="mms__article">

  <div class="mms__container">
    <h2 class="mms__searchresult-title">{{ getSearchResultTitle() }}</h2>

    <div v-if="isLoading" class="ms__dot-falling-container" data-title="dot-falling">
        <div class="dot-falling"></div>
    </div>
    <transition name="fade">
      <h4 v-if="!isLoading" class="mms__searchresult-subtitle">{{ getSearchResultSubTitle1() }}&nbsp;<span>“{{ searchValue }}”</span>&nbsp;{{ getSearchResultSubTitle2() }}&nbsp;<span>{{ filteredList().length }}</span>&nbsp;{{ getSearchResultSubTitle3() }}</h4>
    </transition>
    
    <transition name="fade">
      <div v-if="!isLoading && searchValue"  class="mms__searchresult-content">
        <div class="mms__searchresult-content-item" v-for="(dataItem, index) in filteredList()" >
          <h5>{{ dataItem.translatedTitle }}</h5>
          <p v-html="getFirstParagraphOfDataValue(dataItem.content)"></p>
          <router-link :to="{ path: `/${dataItem.title}`}">{{ dataItem.title }}</router-link>
        </div>
      </div>
    </transition>
  </div>
</article>
</template>
<style scoped>
.mms__searchresult-title {
  padding-bottom: 40px;
}

.mms__searchresult-subtitle {
  font-weight: normal;
}

.mms__searchresult-subtitle span {
  color: var(--mms-purple);
  font-weight: 700;
}

.mms__searchresult-content {
  margin-top: 80px;
}

.mms__searchresult-content-item {
  margin-bottom: 40px;
  padding-bottom: 30px;
  border-bottom: 1px solid var(--mms-black-10);
}

.mms__searchresult-content-item:last-of-type {
  border-bottom: none;
}

.mms__searchresult-content-item p {
  padding: 10px 0;
}

@media screen and (min-width: 756px) {

  .mms__searchresult-content-item p {
    max-width: 75%;
  }
}

.ms__dot-falling-container {
  padding-left: 20px;
}

.dot-falling {
  position: relative;
  left: -9999px;
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background-color: var(--mms-purple);
  color: var(--mms-purple);
  box-shadow: 9999px 0 0 0 var(--mms-purple);
  animation: dot-falling 1s infinite linear;
  animation-delay: 0.1s;
}
.dot-falling::before, .dot-falling::after {
  content: "";
  display: inline-block;
  position: absolute;
  top: 0;
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background-color: var(--mms-purple);
  color: var(--mms-purple);
}
.dot-falling::before {
  animation: dot-falling-before 1s infinite linear;
  animation-delay: 0s;
}
.dot-falling::after {
  animation: dot-falling-after 1s infinite linear;
  animation-delay: 0.2s;
}

@keyframes dot-falling {
  0% {
    box-shadow: 9999px -15px 0 0 var(--mms-purple-10);
  }
  25%, 50%, 75% {
    box-shadow: 9999px 0 0 0 var(--mms-purple);
  }
  100% {
    box-shadow: 9999px 15px 0 0 var(--mms-purple-10);
  }
}
@keyframes dot-falling-before {
  0% {
    box-shadow: 9984px -15px 0 0 var(--mms-purple-10);
  }
  25%, 50%, 75% {
    box-shadow: 9984px 0 0 0 var(--mms-purple);
  }
  100% {
    box-shadow: 9984px 15px 0 0 var(--mms-purple-10);
  }
}
@keyframes dot-falling-after {
  0% {
    box-shadow: 10014px -15px 0 0 var(--mms-purple-10);
  }
  25%, 50%, 75% {
    box-shadow: 10014px 0 0 0 var(--mms-purple);
  }
  100% {
    box-shadow: 10014px 15px 0 0 var(--mms-purple-10);
  }
}

.fade-enter-from {
  opacity: 0;
}

.fade-enter-to {
  opacity: 1;
}

.fade-enter-active {
  transition: opacity 300ms linear;
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

