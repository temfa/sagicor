export const setItem = <T>(key: string, value: T): void => {
  if (typeof window === "undefined") return;

  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error("Error setting localStorage item", error);
  }
};

export const getItem = <T>(key: string): T | null => {
  if (typeof window === "undefined") return null;

  try {
    const item = localStorage.getItem(key);
    return item ? (JSON.parse(item) as T) : null;
  } catch (error) {
    console.error("Error getting localStorage item", error);
    return null;
  }
};

export const removeItem = (key: string): void => {
  if (typeof window === "undefined") return;
  localStorage.removeItem(key);
};
