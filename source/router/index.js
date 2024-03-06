import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ArticleView from '../views/ArticleView.vue'
import PageNotFound from '../views/PageNotFound.vue'
import SearchView from '../views/SearchView.vue'
import DownloadsView from '../views/DownloadsView.vue'
import axios from 'axios';

let currentLanguage = 'de';
let defaultLangRoutes = [];

const router = createRouter({
  history: createWebHistory(window.baseUrl !== '' ? window.baseUrl : '/'),
  scrollBehavior() {
    window.scrollTo(0, 0);
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
        props: route => ({ query: route.query.q }),
    },
    {
        path: `/:lang/search`,
        component: SearchView,
        props: route => ({ query: route.query.q }),
    },
    {
        path: `/:lang/downloads`,
        component: DownloadsView,
        props: route => ({ query: route.query.q }),
    },
    {
        path: `/:catchAll(.*)`,
        component: PageNotFound
    },
    {
        path: `/:lang/404`,
        component: PageNotFound
    },
    {
        path: ``,
        name: 'home',
        component: HomeView,redirect: to => {
            return { path: `de`}
        },
    },
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
                name: 'home',
                component: HomeView,redirect: to => {
                    return { path: `/${currentLanguage}`}
                },
                props: route => ({ query: route.query.q }),
            },
        )
    })
    .catch((error) => {
        console.log('error', error.toJSON());
    })

router.watch

export default router
