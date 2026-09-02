"use client";

import { useEffect } from "react";
import { Section } from "./nav-context-provider";
import { useNavigation } from "./use-navigation";

export default function SetSections({ sections }: { sections: Section[] }) {
  const { setSections } = useNavigation();
  useEffect(() => {
    setSections(sections);
  }, []);
  return <></>;
}
