import {Button} from "@/components/ui/button";
import { ArrowDown } from "lucide-react";
export default function Strip() {

  return (
    <div className="mt-20 mask-b-from-0%  h-max min-h-100 pt-4 rounded-2xl bg-linear-0 built to-blue-900 from-black pt-auto sm:mt-28 bg-zinc-600 lg:mt-32 flex flex-col items-center gap-4">
<Button variant="secondary" size="lg">
 <ArrowDown />  Want something Built
</Button>
    </div>
  )
}