"use client";
import { createContext, useState, useMemo, ReactNode } from "react";

export type Section = {
  label: string;
  link: string;
};

type NavigationContextType = {
  sections: Section[];
  setSections: (sections: Section[]) => void;
};

export const NavigationContext = createContext<NavigationContextType | null>(
  null,
);

export function NavigationProvider({ children }: { children: ReactNode }) {
  const [sections, setSections] = useState<Section[]>([]);
  const value = useMemo(() => ({ sections, setSections }), [sections]);
  return (
    <NavigationContext.Provider value={value}>
      {children}
    </NavigationContext.Provider>
  );
}
