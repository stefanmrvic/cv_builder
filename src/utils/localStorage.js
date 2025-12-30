export const getLocalStorageItem = (key, defaultValue = null) => {
    const localStorageItem = JSON.parse(localStorage.getItem(key));
    
    return localStorageItem ?? defaultValue;
}

export const setLocalStorageItem = (key, value) => {
    const localStorageItem = localStorage.setItem(key, JSON.stringify(value));

    return localStorageItem;
}

export const removeLocalStorageItem = (key) => {
    localStorage.removeItem(key);
}