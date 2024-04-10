import { createI18n, type I18nOptions, type LocaleMessages } from 'vue-i18n'
import useConfig from '@/composables/config'

const config = await useConfig()
const defaultMessages: LocaleMessages<any> = {}

const locales = import.meta.glob('@/locales/**/*.json', { eager: true, import: "default" });

for ( const path in locales) {
  const matched = path.match(/([A-Za-z0-9-_]+)\./i);
  if (matched && matched.length > 1) {
    const locale = matched[1];
    defaultMessages[locale] = locales[path];
  }
}

const options: I18nOptions = {
  legacy: false,
  locale: config.value.settings.defaultLanguage,
  fallbackLocale: config.value.settings.defaultLanguage,
  globalInjection: true,
  messages: {}
}

const file = `${config.value.baseUrl}/json/translations_hosting.json`
try {
  const response: Response = await fetch(file)
  const importMessages: LocaleMessages<any> = await response.json();

  for ( const lang in importMessages ) {
    if (typeof defaultMessages[lang] !== "undefined") {
      importMessages[lang] = Object.assign(
        defaultMessages[lang],
        importMessages[lang]
      )
    }
  }

  options.messages = importMessages
} catch (e) {
  options.messages = defaultMessages
  console.error(`"${file}" could not be loaded.`)
}

if (navigator && navigator.language && typeof options.messages[navigator.language] !== "undefined") {
  options.locale = navigator.language;
}

export default createI18n<false, typeof options>(options)