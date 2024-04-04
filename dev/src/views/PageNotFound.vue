<script>
import { useLanguageStore } from "@/stores/languagestore";

export default {
  data() {
    return {
      routeConfig: null,
      language: "",
    };
  },
  mounted() {
    const languageStore = useLanguageStore();
    this.language = languageStore.language;
  },
  methods: {
    get404Title() {
      switch (this.language) {
        case "de":
          return "Seite nicht gefunden";
        case "en":
          return "Page not found";
      }
    },
  },
};
</script>

<template>
  <main>
    <div class="intro">
      <h1>404</h1>
      <h2>{{ get404Title() }}</h2>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        class="bi bi-robot"
        viewBox="0 0 16 16"
      >
        <path
          d="M6 12.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5ZM3 8.062C3 6.76 4.235 5.765 5.53 5.886a26.58 26.58 0 0 0 4.94 0C11.765 5.765 13 6.76 13 8.062v1.157a.933.933 0 0 1-.765.935c-.845.147-2.34.346-4.235.346-1.895 0-3.39-.2-4.235-.346A.933.933 0 0 1 3 9.219V8.062Zm4.542-.827a.25.25 0 0 0-.217.068l-.92.9a24.767 24.767 0 0 1-1.871-.183.25.25 0 0 0-.068.495c.55.076 1.232.149 2.02.193a.25.25 0 0 0 .189-.071l.754-.736.847 1.71a.25.25 0 0 0 .404.062l.932-.97a25.286 25.286 0 0 0 1.922-.188.25.25 0 0 0-.068-.495c-.538.074-1.207.145-1.98.189a.25.25 0 0 0-.166.076l-.754.785-.842-1.7a.25.25 0 0 0-.182-.135Z"
        />
        <path
          d="M8.5 1.866a1 1 0 1 0-1 0V3h-2A4.5 4.5 0 0 0 1 7.5V8a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1v1a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-1a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1v-.5A4.5 4.5 0 0 0 10.5 3h-2V1.866ZM14 7.5V13a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V7.5A3.5 3.5 0 0 1 5.5 4h5A3.5 3.5 0 0 1 14 7.5Z"
        />
      </svg>
    </div>
  </main>
</template>

<style scoped>
@keyframes introH2Animation {
  0% {
    top: 60px;
    opacity: 0;
  }
  100% {
    top: 0;
    opacity: 1;
  }
}
@keyframes spin {
  10%, 90% {
    transform: translate3d(-1px, 0, 0);
  }

  20%, 80% {
    transform: translate3d(2px, 0, 0);
  }

  30%, 50%, 70% {
    transform: translate3d(-4px, 0, 0);
  }

  40%, 60% {
    transform: translate3d(4px, 0, 0);
  }
}

main {
  display: flex;
  flex-direction: column;
  height: calc(100vh - 200px);
  align-items: center;
}

.intro {
  background-color: var(--mms-black-75);
  text-align: center;
  display: flex;
  align-items: center;
  flex-direction: column;
  flex: 1;
}

.intro h1,
.intro h2 {
  line-height: 1;
  font-weight: 700;
  padding-bottom: 3rem;
  position: relative;
}

.intro h1 {
  font-size: 10rem;
  color: var(--mms-purple-75);
  padding-top: 2rem;
}

.intro h2 {
  font-size: 3em;
  animation: introH2Animation 600ms linear 1;
}

.intro svg {
  height: 100px;
  width: 100px;
  margin-top: 2rem;
  animation: spin 600ms linear 2;
}

@media (min-width: 920px) {
  main {
    flex-direction: row;
  }

  .intro__logo {
    margin-top: 0;
    margin-bottom: 2rem;
  }

  .intro h1 {
    font-size: 20rem;
    padding-top: 0;
  }

  .intro h2 {
    font-size: 4em;
    padding-bottom: 0;
  }
}
</style>
