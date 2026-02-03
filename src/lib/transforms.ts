import { Transform } from './syntax'

/**
 * Toggle negation prefix.
 * - Regular condition → Excluded (add '-')
 * - Excluded → Regular (remove '-')
 * - Ignored → Excluded (replace '!' with '-')
 */
export const negate: Transform = (parts) => ({
  ...parts,
  prefix: parts.prefix === '-' ? '' : '-',
})

/**
 * Toggle disable prefix.
 * - Regular condition → Ignored (add '!')
 * - Ignored → Regular (remove '!')
 * - Excluded → Ignored (replace '-' with '!')
 */
export const disable: Transform = (parts) => ({
  ...parts,
  prefix: parts.prefix === '!' ? '' : '!',
})

/**
 * Replace the matcher value.
 */
export const setMatcher =
  (value: string): Transform =>
  (parts) => ({
    ...parts,
    matcher: value,
  })

/**
 * Replace the field name.
 */
export const setField =
  (field: string): Transform =>
  (parts) => ({
    ...parts,
    field,
  })

/**
 * Wrap the current matcher in a command call.
 * Example: value → command(value)
 */
export const wrapInCommand =
  (cmd: string): Transform =>
  (parts) => ({
    ...parts,
    matcher: `${cmd}(${parts.matcher})`,
  })
