/**
 * Minimal i18n module using .po/.json translation files.
 *
 * Locale detection priority:
 * 1. Explicitly set via setLocale()
 * 2. <html lang="..."> attribute
 * 3. Fallback to 'en'
 */

let translations: Record<string, string> = {}
let currentLocale = 'en'

/**
 * Translate a message. Returns the translation if found, otherwise the original msgid.
 * Supports positional arguments: gettext('Hello %1', 'World') -> 'Hello World'
 */
export function gettext(msgid: string, ...args: (string | number)[]): string {
  let result = translations[msgid] ?? msgid
  args.forEach((arg, i) => {
    result = result.replace(`%${i + 1}`, String(arg))
  })
  return result
}

/**
 * Translate with plural forms.
 * Returns msgidPlural if n != 1, otherwise msgid.
 */
export function ngettext(msgid: string, msgidPlural: string, n: number, ...args: (string | number)[]): string {
  const key = n === 1 ? msgid : msgidPlural
  return gettext(key, ...args)
}

/**
 * Load translations for a locale.
 * Translations should be a simple key-value object: { "English": "German" }
 */
export function loadTranslations(data: Record<string, string>, locale: string): void {
  translations = data
  currentLocale = locale
}

/**
 * Get the current locale.
 */
export function getLocale(): string {
  return currentLocale
}

/**
 * Set the current locale without loading translations.
 * Useful for setting the default locale before async translation loading.
 */
export function setLocale(locale: string): void {
  currentLocale = locale
}

/**
 * Detect locale from environment.
 * Priority: explicit locale > <html lang> > 'en'
 */
export function detectLocale(explicit?: string | null): string {
  if (explicit) return explicit
  if (typeof document !== 'undefined' && document.documentElement.lang) {
    return document.documentElement.lang
  }
  return 'en'
}
