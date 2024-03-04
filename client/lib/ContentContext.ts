import { createContext } from "react";

export const ContentContext = createContext({
  refetchQueries: [],
  addRefetchQueries: (v: string[]) => {},
  removeRefetchQueries: (v: string[]) => {},
} as { refetchQueries: string[]; addRefetchQueries: (v: string[]) => void; removeRefetchQueries: (v: string[]) => void });
