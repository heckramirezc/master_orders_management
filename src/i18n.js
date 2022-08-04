import i18n from "i18next"
import detector from "i18next-browser-languagedetector"
import { initReactI18next } from "react-i18next"
import translationSP from "./locales/sp/translation.json"

const resources = {
  sp: {
    translation: translationSP,
  }
}

const language = localStorage.getItem("I18N_LANGUAGE")
if (!language) {
  localStorage.setItem("I18N_LANGUAGE", "es")
}

i18n
  .use(detector)
  .use(initReactI18next)
  .init({
    resources,
    lng: localStorage.getItem("I18N_LANGUAGE") || "es",
    fallbackLng: "es",

    keySeparator: false,

    interpolation: {
      escapeValue: false,
    },
  })

export default i18n
