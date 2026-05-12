import { useEffect } from "react";

const DEFAULT_TITLE = "Mário Afonso — Software Engineer";

/** Sets document.title for the lifetime of the component, restoring the default on unmount. */
export function useTitle(title?: string) {
  useEffect(() => {
    document.title = title ? title : DEFAULT_TITLE;
    return () => {
      document.title = DEFAULT_TITLE;
    };
  }, [title]);
}
