<script>
import axios from 'axios';
import { useLanguageStore } from '@/stores/languagestore'
import ScrollToTop from "../components/ScrollToTop.vue";

export default {
  data() {
      return {
          allPages: null,
          flatMenu: [],
          language: '',
      }
  },
  components: {
    ScrollToTop,
  },
  mounted() {
    const languageStore   = useLanguageStore()
    this.language = languageStore.language;

    axios
      .get(`${window.baseUrl}/json/routing_${this.language}.json`)
      .then(response => {
        this.allPages = response.data.pages;
        this.flatMenu = this.flatten(response && response.data && response.data.menu && response.data.menu.menuMain);
      })
      .catch((error) => {
        console.log('error', error.toJSON());
      })
  },
  methods: {
    getTopItem() {
        switch (this.language) {
        case 'de':
            return 'Nach oben';
        case 'en':
            return 'To top';
        }
    },
    flatten(input) {
      let flattenedArray = [];

      input && input.map(function(valueOne, index) {
        valueOne?.page && flattenedArray.push(
          valueOne
        );
        valueOne.submenuEntries?.map(function(valueTwo, index) {
          valueTwo?.page && flattenedArray.push(
            valueTwo
          );
          valueTwo.submenuEntries?.map(function(valueThree, index) {
            valueThree?.page && flattenedArray.push(
              valueThree
            );
            valueThree?.submenuEntries?.map(function(valueFour, index) {
                valueFour?.page && flattenedArray.push(
                    valueFour
                );
            });
          });
        });
      });

      return flattenedArray;
    },
    navigateRoutes(direction) {
      const currendID = this.$route.params.id
      const currentPage = this.allPages.find(element => element.slug === this.$route.params.id);
      const currentIndex = this.flatMenu && this.flatMenu.findIndex( (element) => element.page === currentPage.uuid);

      if (direction === 'next') {
        if (currentIndex === this.flatMenu.length - 1) {
          this.returnLink(0);
        } else {
            this.returnLink(currentIndex + 1);
        }
      } else {
        if (currentIndex === 0) {
            this.returnLink(this.flatMenu.length - 1);
          } else {
            this.returnLink(currentIndex - 1);
          }
      }
    },
    returnLink(index) {
        const pageToLinkTo = this.allPages.find(element => element.uuid === this.flatMenu[index].page)
        this.$router.push(`/${this.language}/${pageToLinkTo.slug}`);
    },
    getNextTitle() {
        switch (this.language) {
        case 'de':
            return 'Nächste Seite';
        case 'en':
            return 'Next page';
        }
    },
    getPrevTitle() {
        switch (this.language) {
        case 'de':
            return 'Vorherige Seite';
        case 'en':
            return 'Previous page';
        }
    },
  },
}
</script>
<template>
  <div class="mms-prevnext-nav-holder">
    <div class="mms-prevnext-nav-btn"  @click.prevent="navigateRoutes('prev')">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-left left" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
        </svg>
      {{ getPrevTitle() }}
    </div>
    
    <ScrollToTop />

    <div class="mms-prevnext-nav-btn"  @click.prevent="navigateRoutes('next')">
      {{ getNextTitle() }}
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-right right" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
        </svg>
    </div>
  </div>
</template>

<style scoped>
.mms-prevnext-nav-holder {
  width: 100%;
  display: flex;
  margin: 2rem 0;
  padding-top: 1rem;
  justify-content: space-between;
  border-top: 1px solid var(--mms-black-10);
  position: sticky;
  bottom: 0;
  background-color: var(--mms-white);
}

@media (min-width: 920px) {

  .mms-prevnext-nav-holder {
    margin: 80px 0 0 0;
  }
}

.mms-prevnext-nav-btn {
  display: flex;
  font-size: 0.8rem;
  cursor: pointer;
  padding: 10px 0 20px;
  color: var(--mms-black);
}

@media (min-width: 920px) {

  .mms-prevnext-nav-btn:first-of-type {
    margin-right: 40px;
  }
}

.mms-prevnext-nav-btn:hover {
    opacity: .5;
    transition: opacity 200ms ease;
}

svg {
    margin-top: 2px;
    transition: all 200ms ease;
}

svg.left {
    margin-right: 10px;
}

svg.right {
    margin-left: 10px;
}
</style>
