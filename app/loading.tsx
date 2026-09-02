import logo from "@/public/logo3.svg";
import Image from "next/image";

export default function Loader() {
  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <div className="rounded-full aspect-square p-16 relative">
        <Image
          src={logo}
          alt="Logo"
          width={128}
          height={128}
          className="z-100"
        />
        <div className="absolute top-0 left-0 w-full p-1 h-full bg-conic from-transparent via-blue-600 to-red-600 rounded-full animate-spin -z-10">
          <div className="w-full h-full bg-black rounded-full"></div>
        </div>
      </div>
    </div>
  );
}
