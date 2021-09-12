import { isClient } from '@react-hooks-library/shared'

export const _window = /* #__PURE__ */ isClient ? window : undefined
export const _document = /* #__PURE__ */ isClient ? window.document : undefined
export const _navigator = /* #__PURE__ */ isClient
  ? window.navigator
  : undefined
export const _location = /* #__PURE__ */ isClient ? window.location : undefined
