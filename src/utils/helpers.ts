export const saveToStorage = (key: string, data: string) => {
  window.localStorage.setItem(key, data)
}

export const getFromStorage = (key: string) => window.localStorage.getItem(key)
