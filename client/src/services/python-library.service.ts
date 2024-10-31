import storageService from './storage.service'

export enum ELibraryType {
  PYODIDE = 'pyodide',
  PIPY = 'pipy'
}

const hasStorageKey = 'library_has_storage'

const getHasStorage = (): boolean => {
  return storageService.getStorage(hasStorageKey) || false
}

const setHasStorage = (flg: boolean): void => {
  storageService.setStorage(hasStorageKey, flg)
}

const getKey = (key: ELibraryType): string => {
  return `${key}_library`
}

const getStorageLibrary = (key: ELibraryType): string[] => {
  return storageService.getStorage(getKey(key)) || []
}

const setStorageLibrary = (key: ELibraryType, library: string[]): void => {
  const keyStr = getKey(key)
  const alreadyStored = storageService.getStorage(keyStr) || []
  library = [...new Set([...alreadyStored, ...library])]
  storageService.setStorage(keyStr, library)
}

const pythonLibraryService = {
  getStorageLibrary,
  setStorageLibrary,
  getHasStorage,
  setHasStorage
}

export default pythonLibraryService
