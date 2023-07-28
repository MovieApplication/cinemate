// session storage
export const Data = {
  set: ($name: string, $value: boolean | string | object) => {
    const value: string = typeof $value === 'object' ? JSON.stringify($value) : typeof $value === 'boolean' ? $value.toString() : $value

    window.sessionStorage.setItem($name, value)
  },
  get: ($name: string) => {
    try {
      const data: string | null = window.sessionStorage.getItem($name)

      return data !== 'undefined' && data !== null ? JSON.parse(data) : data
    } catch (e) {
      return window.sessionStorage.getItem($name)
    }
  },
  remove: ($name: string) => {
    window.sessionStorage.removeItem($name)
  },
  clear: () => {
    window.sessionStorage.clear()
  }
}

// cookie
export const getCookie = ($name: string) => {
  const matches = document.cookie.match(new RegExp(
    // eslint-disable-next-line no-useless-escape
    '(?:^|; )' + $name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)'
  ))

  return matches ? decodeURIComponent(matches[1]) : undefined
}

export const setCookie = ($name: string, $value: string, $options: {'max-age'?: number; expires?: number; SameSite?: string} = {}) => {
  const options: {
    path: string;
    expires?: string | number;
    SameSite?: string;
  } = {
    path: '/',
    ...$options
  }

  if ($options.expires !== undefined) {
    const date = new Date()

    date.setTime(Number(date.getTime()) + $options.expires)

    options.expires = date.toUTCString()
  }

  let updatedCookie = encodeURIComponent($name) + '=' + encodeURIComponent($value)

  for (const optionKey in options) {
    updatedCookie += '; ' + optionKey
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const optionValue = options[optionKey]
    if (optionValue !== true) {
      updatedCookie += '=' + optionValue
    }
  }

  document.cookie = updatedCookie
}

export const deleteCookie = ($name: string) => {
  setCookie($name, '', {
    'max-age': -1,
    'expires': 1000,
  })
}