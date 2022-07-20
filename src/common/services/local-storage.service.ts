export const getItem = <T>(key: string) => {
  try {
    const item = window.localStorage.getItem(key);
    return item ? (JSON.parse(item) as T) : null;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const setItem = <T>(key: string, value: T) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.log(error);
  }
};

export const removeItem = (key: string) => {
  localStorage.removeItem(key);
};
