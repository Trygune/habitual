import { Button } from "@/components/ui/button";
import Link from "next/link";

const NotFound = () => {
  return (
    <main className="mx-auto px-5 min-h-dvh flex w-full max-w-md flex-col items-center justify-center text-center bg-[#f8f8f6] dark:bg-[#111] shadow-[0_24px_80px_rgba(0,0,0,0.12)]">
      <span className="text-2xl font-medium tracking-wide text-gray-400">
        404
      </span>

      <h1 className="my-2 text-3xl font-semibold tracking-tight text-[#111] dark:text-[#f8f8f6]">
        Page not found
      </h1>

      <p className="max-w-sm text-sm leading-6 text-muted-foreground">
        The page you&apos;re looking for doesn&apos;t exist or may have been
        moved.
      </p>

      <Link
        href="/"
        className="mt-6 rounded-lg bg-[#111] px-4 py-2 text-sm font-semibold text-[#f8f8f6] transition-transform active:scale-95 dark:bg-[#f8f8f6] dark:text-[#111]"
      >
        Back to habits
      </Link>
    </main>
  );
};

export default NotFound;
