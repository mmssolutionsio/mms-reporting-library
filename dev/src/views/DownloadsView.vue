<script>
import axios from 'axios';
import { useLanguageStore } from '@/stores/languagestore'

export default {
    data() {
        return {
            downloadData: null,
            language: '',
        }
    },
    mounted() {
        const languageStore = useLanguageStore();
        this.language = languageStore.language;
    
        axios
            .get(`${window.baseUrl}/json/downloads_${this.language}.json`)
            .then(response => (
                this.downloadData = response.data
            ))
            .catch((error) => {
                console.log('error', error.toJSON());
            }
        )
    },
}
</script>

<template>
<article class="mms__article">
    <div class="mms__container">
        <h2>{{ downloadData && downloadData.heading || "" }}</h2>
        <h3>{{ downloadData && downloadData.maintitle || "" }}</h3>
        <transition name="fade">
            <ul class="mms__download-ul" :key="Math.random()">
                <a v-for="(downloadItem, index) in downloadData && downloadData.downloads" :href="downloadItem.link" target="_blank" class="mms__download-link">
                    <li>
                        <div class="mms__download">
                            <div class="mms__download-text-wrapper">
                                <span class="mms__download-text-wrapper-title">{{ downloadItem.title }}</span><br />
                                <span class="mms__download-text__small">{{ downloadItem.size }}</span><br />
                            </div>
                            <div class="mms__download-icon-wrapper">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-download" viewBox="0 0 16 16">
                                    <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                                    <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
                                </svg>
                            </div>
                        </div>
                    </li>
                </a>
            </ul>
        </transition>
    </div>
</article>
</template>

<style scoped>
h2 {
    padding-bottom: 2rem;
}

h3 {
    font-size: 1rem;
    margin-top: 0;
    padding-top: 0;
    padding-bottom: 1rem;
}
.mms__download {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

.mms__download-text-wrapper,
.mms__download-icon-wrapper {
    width: 100%;
}

.mms__download-text-wrapper-title {
  font-weight: 700;
}

.mms__download-text__small {
    font-size: 0.7rem;
}

.mms__download-icon-wrapper {
    display: flex;
    justify-content: end;
    padding-top: 12px;
    padding-right: 12px;
    opacity: 0;
    transition: opacity 200ms linear;
}

.mms__download-link {
    color: var(--mms-black);
    text-decoration: none;
    display: block;
    transition: background-color 200ms linear;
}

.mms__download-link:hover {
    background-color: var(--mms-purple-10);
}

.mms__download-link:hover .mms__download-icon-wrapper {
  opacity: 1;
}

.mms__download-icon-hr {
    border-color: var(--mms-border-color-darker);
}

.mms__download-ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.mms__download-ul li {
  padding: 14px 20px 10px 20px;
  border-top: 1px solid var(--mms-grey-50);
}

@media screen and (max-width: 992px) {
    .download-icon-wrapper,
    .download {
        display: block;
    }

    .download-icon-wrapper {
        padding-top: 0;
        padding-right: 0;
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