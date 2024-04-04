<script lang="ts" setup>
import { MenuArticle, MenuExternal, MenuEntry } from '@/components/MenuItem'
import { useLanguageStore } from '@/stores/languagestore'
import { onMounted, ref } from 'vue'
import axios from 'axios'

const language = ref('')
const navigation = ref([])

onMounted(() => {
  const languageStore = useLanguageStore()
  language.value = languageStore.language

  axios
    .get(`${window.baseUrl}/json/routing_${language.value}.json`)
    .then((response) => {
      navigation.value = response.data.menu.footer
    })
    .catch((error) => {
      console.log('error', error.toJSON())
    })
})

</script>

<template>
  <footer>
    <div class="srl-footer__inner">
      <div class="srl-footer__inner-navigation">
        <ul>
          <li v-for="(item, index) in navigation">
            <MenuArticle v-if="item.type==='Article'" :label="item.label" :page="item.page" />
            <MenuEntry v-if="item.type==='MenuEntry'" :label="item.label" />
            <MenuExternal v-if="item.type==='ExternalLink'" :label="item.label" :url="item.url" />
          </li>
        </ul>
      </div>
      <div class="srl-footer__inner-imprint">
        <p>Made by mms solutions x MULTIVISIO</p>
      </div>
    </div>
  </footer>
</template>

<style scoped lang="scss">
@use "nswow";

footer {
  background: nswow.colors-accent();
  color: nswow.colors-copy();
  min-height: nswow.system-size-unit(60);
  padding: nswow.system-size-unit(20) 0;

  .srl-footer {
    &__inner {
      @include nswow.grid-container();
      margin: 0 auto;

      &-imprint {
        color: nswow.colors-copy();
        font-size: nswow.typography-get-font-size(footnote);
        text-align: center;
      }

      &-navigation {
        ul {
          list-style-type: none;
          padding: 0 0 0 0;
          display: flex;
          gap: nswow.system-size-unit(10);
          font-size: nswow.typography-get-font-size(copy);
        }
      }
    }
  }

  @include nswow.grid-media(print) {
    display: none;
  }
}
</style>