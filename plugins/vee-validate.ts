import { localize, setLocale } from "@vee-validate/i18n"; // vee validateのバリデーションを使う場合だけ必要
import ja from "@vee-validate/i18n/dist/locale/ja.json"; // vee validateのョンを使う場合だけ必要
import { configure } from "vee-validate"; // vee validateのバリデーションを使う場合
import { setLocale as yupSetLocale, type LocaleObject } from "yup"; // @vee-validate/i18nのsetLocaleと被るので、別名指定をしています。
import { suggestive } from "yup-locale-ja";

export default defineNuxtPlugin(() => {
  // vee validateのバリデーションメッセージを日本語にする設定
  configure({
    generateMessage: localize({
      ja,
    }),
  });
  setLocale("ja");

  const customLocaleObject: LocaleObject = {
    mixed: {
      required: "必須です",
    },
  };

  // yupのバリデーションメッセージを日本語にする設定
  yupSetLocale({ ...suggestive, ...customLocaleObject });
});
