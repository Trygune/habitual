import { Button } from "@/components/ui/button";
import { WifiOff } from "lucide-react";
import Link from "next/link";

const OfflinePage = () => {
  return (
    <main className="mx-auto px-5 min-h-screen flex w-full max-w-md flex-col items-center justify-center text-center bg-[#f8f8f6] dark:bg-[#111] shadow-[0_24px_80px_rgba(0,0,0,0.12)]">
      <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border bg-[#f8f8f6]/50 dark:bg-[#111]/50">
        <WifiOff />
      </div>

      <p className="mb-2 text-sm font-medium text-muted-foreground">
        You&apos;re offline
      </p>

      <h1 className="text-2xl font-semibold tracking-tight">
        Keep building better days.
      </h1>

      <p className="mt-2 max-w-sm text-sm leading-6 text-muted-foreground">
        No internet connection is available right now. Don&apos;t worry — your
        habits and progress are stored on this device.
      </p>

      <Button
        className="mt-6 px-4"
        size="lg"
        render={<Link href="/">Try Again</Link>}
      />
    </main>
  );
};

export default OfflinePage;
