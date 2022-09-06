/* eslint-disable no-console */
class LocalStorageService {
  getItem<T>(key: string) {
    try {
      const item = window.localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : null;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  setItem<T>(key: string, value: T) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.log(error);
    }
  }

  removeItem(key: string) {
    localStorage.removeItem(key);
  }
}

export default LocalStorageService;
