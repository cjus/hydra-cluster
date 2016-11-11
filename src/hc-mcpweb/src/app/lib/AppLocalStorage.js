export default class AppLocalStorage {
  get(key) {
    return JSON.parse(localStorage.getItem(key) || '{}');
  }

  put(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
  }

  delete(key) {
    localStorage.removeItem(key);
  }
}
