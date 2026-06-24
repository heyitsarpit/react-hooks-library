/**
 * Check if we're on the server or client side
 */
export const isClient = typeof window !== 'undefined'

/**
 * Check if object is a react ref
 */
export const isRef = (obj: unknown): boolean =>
  obj !== null &&
  typeof obj === 'object' &&
  Object.prototype.hasOwnProperty.call(obj, 'current')

const toString = Object.prototype.toString

export const isBoolean = (val: unknown): val is boolean =>
  typeof val === 'boolean'

export const isFunction = <T extends (...args: never[]) => unknown>(
  val: unknown
): val is T => typeof val === 'function'

export const isNumber = (val: unknown): val is number => typeof val === 'number'

export const isString = (val: unknown): val is string => typeof val === 'string'

export const isObject = (val: unknown): val is object =>
  toString.call(val) === '[object Object]'

export const isWindow = (val: unknown): val is Window =>
  typeof window !== 'undefined' && toString.call(val) === '[object Window]'

// eslint-disable-next-line @typescript-eslint/no-empty-function
export const noop = () => {}

export const rand = (min: number, max: number) => {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export const round = (num: number) => Math.round(num * 1e2) / 1e2
