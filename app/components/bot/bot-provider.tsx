"use client";
import dynamic from "next/dynamic";

const ChatWidget = dynamic(() => import("./bot"), {
  ssr: false,
});
export default function BotProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ChatWidget />
      {children}
    </>
  );
}
