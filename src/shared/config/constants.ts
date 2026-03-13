export const SIDEBAR_WIDTH_IS_CLOSE = 60
export const SIDEBAR_WIDTH_IS_OPEN = 180

export const HEADER_HEIGHT = 56

export const API_HOST = import.meta.env.VITE_API_HOST
export const APP_VERSION = import.meta.env.VITE_APP_VERSION
export const IS_MOCK = import.meta.env.VITE_IS_MOCK
export const MOCK_API_HOST = import.meta.env.VITE_MOCK_API_HOST

export const MD5_SALT = import.meta.env.VITE_MD5_SALT
// eslint-disable-next-line no-underscore-dangle, @typescript-eslint/naming-convention
export const __DEV__ = import.meta.env.DEV
// eslint-disable-next-line no-underscore-dangle, @typescript-eslint/naming-convention
export const __DEBUG__ = import.meta.env.VITE_DEBUG === 'true'
export const ROUTES = {
  index: '/',
  login: '/authorize',
}
