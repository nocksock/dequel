import { Transform } from './syntax'

/**
 * Toggle negation prefix.
 * - Regular condition → Excluded (add '-')
 * - Excluded → Regular (remove '-')
 */
export const negate: Transform = (parts) => ({
  ...parts,
  prefix: parts.prefix === '-' ? '' : '-',
})

/**
 * Replace the predicate value.
 */
export const setPredicate =
  (value: string): Transform =>
  (parts) => ({
    ...parts,
    predicate: value,
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
 * Wrap the current predicate in a command call.
 * Example: value → command(value)
 */
export const wrapInCommand =
  (cmd: string): Transform =>
  (parts) => ({
    ...parts,
    predicate: `${cmd}(${parts.predicate})`,
  })
