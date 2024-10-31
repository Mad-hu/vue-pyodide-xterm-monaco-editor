import StoreJsAPI from 'store'

const removeStorage = (key: string) => {
  StoreJsAPI.remove(key)
}
const setStorage = (key: string, value: any) => {
  StoreJsAPI.set(key, value)
}
const getStorage = (key: string) => {
  return StoreJsAPI.get(key)
}

const storageService = {
  setStorage,
  getStorage,
  removeStorage
}
export default storageService
