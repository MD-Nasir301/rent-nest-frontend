
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[100vh] gap-6 bg-emerald-950">
      <h1 className="text-4xl text-white font-bold"> 404</h1>
      <p className="text-white text-2xl">Page not found</p>
      <Button>
        <Link href="/">Return Home</Link>
      </Button>
    </div>
  );
}