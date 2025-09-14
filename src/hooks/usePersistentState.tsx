import { Dispatch, SetStateAction, useEffect, useState } from "react";

const usePersistentState = <T,>(
  key: string,
  initialValue: T
): [T, Dispatch<SetStateAction<T>>] => {
  const [state, setState] = useState<T>(initialValue);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load the stored value on mount
  useEffect(() => {
    // Guard for non-extension environments
    if (typeof chrome === "undefined" || !chrome.storage) {
      setIsLoaded(true);
      return;
    }

    chrome.storage.local.get([key], (result) => {
      if (result[key] !== undefined) {
        setState(result[key]);
      }
      setIsLoaded(true); // Mark as loaded
    });
  }, [key]);

  // Save value to storage whenever it changes
  useEffect(() => {
    // Only save if the initial load has completed
    if (!isLoaded) {
      return;
    }
    // Guard for non-extension environments
    if (typeof chrome === "undefined" || !chrome.storage) {
      return;
    }

    chrome.storage.local.set({ [key]: state });
  }, [key, state, isLoaded]);

  return [state, setState];
};

export default usePersistentState;
