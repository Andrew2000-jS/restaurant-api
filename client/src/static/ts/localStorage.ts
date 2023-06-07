export const addItem = (data: any): void => {
  const token = data.token;
  localStorage.setItem("token", JSON.stringify(token));
};

export const removeItem = (): void => {
  localStorage.removeItem("token");
};

export const findItem = (): boolean => {
  const value = localStorage.getItem("token");
  const exists = value !== null;

  if (exists) {
    return true;
  }

  return false;
};
