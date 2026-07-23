/**
 * -----------------------------------------------------------------------------
 * File: field-width.ts
 *
 * Description:
 * Defines responsive field widths for the dynamic form engine.
 * -----------------------------------------------------------------------------
 */

export const FIELD_WIDTH = {
  QUARTER: 3,
  THIRD: 4,
  HALF: 6,
  TWO_THIRDS: 8,
  THREE_QUARTERS: 9,
  FULL: 12,
} as const;

export type FieldWidth = (typeof FIELD_WIDTH)[keyof typeof FIELD_WIDTH];

export const FIELD_WIDTH_CLASS: Record<FieldWidth, string> = {
  3: "col-span-1 min-w-0 md:col-span-3",
  4: "col-span-1 min-w-0 md:col-span-4",
  6: "col-span-1 min-w-0 md:col-span-6",
  8: "col-span-1 min-w-0 md:col-span-8",
  9: "col-span-1 min-w-0 md:col-span-9",
  12: "col-span-1 min-w-0 md:col-span-12",
};
