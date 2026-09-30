import { useEffect, useState } from "react";

export function usePreloaderDone() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (document.documentElement.dataset.preloaded) {
      setDone(true);
      return;
    }
    const onDone = () => setDone(true);
    window.addEventListener("preloader:done", onDone);
    return () => window.removeEventListener("preloader:done", onDone);
  }, []);

  return done;
}