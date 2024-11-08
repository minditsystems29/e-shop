"use client";

export const loadState = (key) => {
  if (typeof window === "undefined") return undefined; // Ensure this runs only in the client environment
  try {
    const serializedState = localStorage.getItem(key);
    return serializedState ? JSON.parse(serializedState) : undefined;
  } catch (err) {
    console.error("Could not load state from localStorage:", err);
    return undefined;
  }
};

export const saveState = (key, state) => {
  if (typeof window === "undefined") return; // Ensure this runs only in the client environment
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(key, serializedState);
  } catch (err) {
    console.error("Could not save state to localStorage:", err);
  }
};
