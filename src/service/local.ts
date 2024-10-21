"use server";

import { defaultLocale, Locale } from "@/i18n/config";
import { cookies } from "next/headers";

// In this example the locale is read from a cookie. You could alternatively
// also read it from a database, backend service, or any other source.
const COOKIE_NAME = "NEXT_LOCALE";

export async function getUserLocale() {
  return cookies().get(COOKIE_NAME)?.value || defaultLocale;
}

export async function setUserLocale(locale: Locale) {
  const expires = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000);
  cookies().set(COOKIE_NAME, locale, { expires });
}
