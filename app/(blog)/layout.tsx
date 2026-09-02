import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata = { title: "Blog",
  description: "Writing on things I'm building and learning.",
};

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="max-w-300 m-auto">
      <div className="border-y-2 border-zinc-800 p-2 w-full">
        <Button variant="outline">
          <ArrowLeft /> Back to Blog
        </Button>
      </div>
      <div className="m-auto flex flex-col justify-center items-center">
        {children}
      </div>
    </main>
  );
}
