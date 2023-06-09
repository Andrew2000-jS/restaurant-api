export const addItem = (data: any, key: string): void => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const removeItem = (key: string): void => {
  localStorage.removeItem(key);
};

export const findItem = (key: string): boolean => {
  const value = localStorage.getItem(key);
  const exists = value !== null;

  if (exists) {
    return true;
  }

  return false;
};
