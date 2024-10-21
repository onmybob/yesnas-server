export type Locale = (typeof locales)[number];

export const locales = ["en", "ja", "zh"] as const;
export const defaultLocale: Locale = "en";

export const languageMap = {
  zh: "简体中文",
  en: "English",
  ja: "日本語",
};
