import { useEffect } from "react";

function useSystemTheme() {
  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");

    const applyTheme = (e: MediaQueryList | MediaQueryListEvent) => {
      if (e.matches) {
        // Dark mode: remove data-theme to use :root (dark) styles
        document.documentElement.removeAttribute("data-theme");
      } else {
        // Light mode: set data-theme="light"
        document.documentElement.setAttribute("data-theme", "light");
      }
    };

    applyTheme(media); 
    media.addEventListener("change", applyTheme);

    return () => media.removeEventListener("change", applyTheme);
  }, []);
}

export default useSystemTheme;