/**
 * A set of paddings loosely based on the output
 * of this tool https://hihayk.github.io/modulator/
 *
 * The base unit is 8 pixels
 * */

const unit = 8

export enum padding {
  xs = 0.5 * unit, // 4
  s = unit, // 8
  m = 2 * unit, // 16
  l = 4 * unit, // 32
  xl = 8 * unit, // 64
}
