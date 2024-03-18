import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import ArticleView from '@/views/ArticleView.vue'
import PageNotFound from '@/views/PageNotFound.vue'
import SearchView from '@/views/SearchView.vue'
import DownloadsView from '@/views/DownloadsView.vue'
import axios from 'axios';

let currentLanguage = 'de';
let defaultLangRoutes = [];

const router = createRouter({
  history: createWebHistory( <string>window.baseUrl !== '' ? <string>window.baseUrl : import.meta.env.BASE_URL),
  scrollBehavior() {
    window.scrollTo(0, 0)
  },
  routes: [
    {
      path: `/:lang`,
      component: HomeView,
      props: route => ({ query: route.query.q }),
    },
    {
      path: `/:lang/:id`,
      component: ArticleView,
      name: 'article',
      props: route => ({ query: route.query.q }),
    },
    {
      path: `/:lang/search`,
      component: SearchView,
      name: 'search',
      props: route => ({ query: route.query.q }),
    },
    {
      path: `/:lang/downloads`,
      component: DownloadsView,
      name: 'downloads',
      props: route => ({ query: route.query.q }),
    },
    {
      path: `/:catchAll(.*)`,
      component: PageNotFound,
      naem: 'catchall'
    },
    {
      path: `/:lang/404`,
      component: PageNotFound,
      name: 'error404'
    },
    {
      path: ``,
      redirect: `de`,
    }
  ]
})

axios
  .get(`${window.baseUrl}/json/settings.json`)
  .then(response => {
    currentLanguage = response?.data?.defaultLanguage;
    defaultLangRoutes = response?.data?.languages?.map((langValue) => {
      router.addRoute(
        {
          path: `/${langValue}`,
          name: langValue,
          component: HomeView,
        }
      );
    });

    router.addRoute(
      {
        path: '/',
        redirect: to => {
          return { path: `/${currentLanguage}`}
        },
      },
    )
  })
  .catch((error) => {
    console.log('error', error.toJSON());
  });

export default router
