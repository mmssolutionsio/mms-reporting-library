<script>
import axios from 'axios';
import {useLanguageStore} from '@/stores/languagestore'

export default {
  data() {
    return {
        routeConfig: null,
        language: '',
        subNavigationVisible: false,
        activeSubmenu: [],
        activeSubSubmenu: [],
    }
  },
  mounted() {
    const languageStore = useLanguageStore();
    this.language = languageStore.language;

    axios
      .get(`${window.baseUrl}/json/routing_${this.language}.json`)
      .then(response => (this.routeConfig = response.data))
      .catch((error) => {
          console.log('error', error.toJSON());
      })
  },
  updated() {
    const languageStore = useLanguageStore();

    if (this.language !== languageStore.language) {
      this.language = languageStore.language;
      axios
        .get(`${window.baseUrl}/json/routing_${this.language}.json`)
        .then(response => (this.routeConfig = response.data))
        .catch((error) => {
            console.log('error', error.toJSON());
        })
    }
  },
  methods: {
    getLinkByPage(page) {
      const languageStore = useLanguageStore();
      const currentPage = this.routeConfig && this.routeConfig.pages.find(element => element.uuid === page);

      return `/${languageStore.language}/${currentPage.slug}`;
    },
    activateSubmenu(index) {
      this.activeSubmenu = this.routeConfig?.menu?.menuMain[index].submenuEntries;

      if (!this.subNavigationVisible) {
        this.subNavigationVisible = !this.subNavigationVisible;
      }
    },
    closeSubmenu() {
      this.subNavigationVisible = false;
    }
  }
}
</script>

<template>
<nav class="mms-nav">
  <div class="mms__nav-top">
    <div class="mms__container">
      <ul class="mms__main-navigation">
        <li class="mms__main-navigation-li" v-for="(level1Item, level1ItemIndex) in routeConfig?.menu?.menuMain" @click="activateSubmenu(level1ItemIndex)">
          {{ level1Item.label }}
        </li>
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16" @click="subNavigationVisible = false" v-if="subNavigationVisible">
          <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
      </svg>
      </ul>
    </div>

    <transition name="fade">
      <div class="mms__container--border-top" v-if="activeSubmenu.length && subNavigationVisible">
        <div class="mms__container ">
          <div class="mms__sub-navigation-container">
            
            <div>
              <div class="mms__main-navigation-sub-li" v-for="(level2Item, level2ItemIndex) in activeSubmenu">

                <div class="mms__main-navigation-sub-li-item">
                  <router-link v-if="level2Item.type === 'Article' && level2Item.page" :to="{path: getLinkByPage(level2Item.page)}">{{ level2Item.label }}</router-link>
                  <span v-if="level2Item.type === 'MenuEntry' && !level2Item.page">
                    {{ level2Item.label }}
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-right" viewBox="0 0 16 16">
                      <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
                    </svg>
                  </span>
                  <a v-if="level2Item.type === 'ExternalLink' && level2Item.url" :href="level2Item.url" target="_blank">
                    {{ level2Item.label }}
                    <svg class="mms__main-navigation-external-link-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M6.364 13.5a.5.5 0 0 0 .5.5H13.5a1.5 1.5 0 0 0 1.5-1.5v-10A1.5 1.5 0 0 0 13.5 1h-10A1.5 1.5 0 0 0 2 2.5v6.636a.5.5 0 1 0 1 0V2.5a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 .5.5v10a.5.5 0 0 1-.5.5H6.864a.5.5 0 0 0-.5.5z"/>
                        <path fill-rule="evenodd" d="M11 5.5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793l-8.147 8.146a.5.5 0 0 0 .708.708L10 6.707V10.5a.5.5 0 0 0 1 0v-5z"/>
                    </svg>
                  </a>
                </div>

                <div class="mms__main-navigation-sub-li-item">
                  <div v-for="(level3Item, index) in level2Item && level2Item.submenuEntries">
                      <router-link v-if="level3Item.type === 'Article' && level3Item.page" :to="{path: getLinkByPage(level3Item.page)}" @click="closeSubmenu">{{ level3Item.label }}</router-link>
                      <span class="pl-10" v-if="level3Item.type === 'MenuEntry' && !level3Item.page">{{ level3Item.label }}</span>
                      <a v-if="level3Item.type === 'ExternalLink' && level3Item.url" :href="level3Item.url" target="_blank">
                        {{ level3Item.label }}
                        <svg class="mms__main-navigation-external-link-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M6.364 13.5a.5.5 0 0 0 .5.5H13.5a1.5 1.5 0 0 0 1.5-1.5v-10A1.5 1.5 0 0 0 13.5 1h-10A1.5 1.5 0 0 0 2 2.5v6.636a.5.5 0 1 0 1 0V2.5a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 .5.5v10a.5.5 0 0 1-.5.5H6.864a.5.5 0 0 0-.5.5z"/>
                            <path fill-rule="evenodd" d="M11 5.5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793l-8.147 8.146a.5.5 0 0 0 .708.708L10 6.707V10.5a.5.5 0 0 0 1 0v-5z"/>
                        </svg>
                      </a>
                  </div>
                </div>
                
              </div>
            </div>

          </div>
        </div>
      </div>
    </transition>
  </div>
</nav>
</template>

<style scoped>
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
