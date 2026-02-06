/**
 * Convert .po translation files to JSON format for runtime use.
 *
 * Usage: npx tsx scripts/po2json.ts
 *
 * Converts all .po files in src/locales/ to .json files.
 */

import { po } from 'gettext-parser'
import { readFileSync, writeFileSync, readdirSync } from 'fs'
import { join, basename } from 'path'

const LOCALES_DIR = join(import.meta.dirname, '..', 'src', 'locales')

function convertPoToJson(poPath: string): Record<string, string> {
  const input = readFileSync(poPath)
  const parsed = po.parse(input)

  const translations: Record<string, string> = {}

  // gettext-parser puts translations in context buckets, '' is the default context
  const defaultContext = parsed.translations[''] ?? {}

  for (const [msgid, entry] of Object.entries(defaultContext)) {
    // Skip the header entry (empty msgid)
    if (!msgid) continue

    // msgstr is an array, first element is the singular form
    const msgstr = entry.msgstr?.[0]
    if (msgstr) {
      translations[msgid] = msgstr
    }
  }

  return translations
}

function main() {
  const poFiles = readdirSync(LOCALES_DIR).filter((f) => f.endsWith('.po'))

  if (poFiles.length === 0) {
    console.log('No .po files found in', LOCALES_DIR)
    return
  }

  for (const poFile of poFiles) {
    const poPath = join(LOCALES_DIR, poFile)
    const jsonPath = join(LOCALES_DIR, basename(poFile, '.po') + '.json')

    const translations = convertPoToJson(poPath)
    writeFileSync(jsonPath, JSON.stringify(translations, null, 2) + '\n')

    console.log(`Converted ${poFile} -> ${basename(jsonPath)} (${Object.keys(translations).length} strings)`)
  }
}

main()
