/**
 * A set of paddings loosely based on the output
 * of this tool https://hihayk.github.io/modulator/
 *
 * The base unit is 8 pixels
 * */

const unit = 8

export enum padding {
  xs = 0.5 * unit,
  s = unit,
  m = 2 * unit,
  l = 4 * unit,
  xl = 8 * unit,
}
