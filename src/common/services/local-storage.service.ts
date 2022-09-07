class LocalStorageService {
  getItem<T>(key: string) {
    try {
      const item = window.localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : null;
    } catch (error) {
      return null;
    }
  }

  setItem<T>(key: string, value: T) {
    try {
      return localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      return null;
    }
  }

  removeItem(key: string) {
    localStorage.removeItem(key);
  }
}

export default LocalStorageService;
