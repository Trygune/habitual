import type { Metadata } from "next";
import { ArrowRight, CircleHelp, Leaf, WifiOff } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

export const metadata: Metadata = {
  title: "Offline | Habit",
  description: "Reconnect to the internet to get back to your routines.",
};

export default function OfflinePage() {
  return (
    <main className="min-h-dvh bg-[#ededeb] text-[#111] dark:bg-[#111] dark:text-[#ededeb]">
      <div className="mx-auto flex min-h-dvh w-full max-w-md flex-col bg-[#f8f8f6] px-5 shadow-[0_24px_80px_rgba(0,0,0,0.12)] dark:bg-[#111] dark:shadow-none">
        <header className="mt-4 flex items-center justify-between border-b border-[#eeeeea] pb-4 pt-2 dark:border-[#2c2c29]">
          <a
            href="/"
            aria-label="Habit home"
            className="flex items-center gap-2.5 rounded-md outline-none focus-visible:ring-2 focus-visible:ring-[#667360] focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#111]"
          >
            <span className="grid size-8 place-items-center rounded-[10px] bg-[#e8ece4] text-[#53664d] dark:bg-[#222a21] dark:text-[#b8c8b0]">
              <Leaf size={16} aria-hidden="true" />
            </span>
            <span className="text-[13px] font-semibold tracking-[-0.02em]">
              Habit
            </span>
          </a>
          <span
            role="status"
            aria-label="Connection status: offline"
            className="inline-flex items-center gap-2 rounded-full bg-[#f1eee7] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-[#76613e] dark:bg-[#28251e] dark:text-[#d5bd91]"
          >
            <span
              aria-hidden="true"
              className="size-1.5 rounded-full bg-[#ad8b50]"
            />
            Offline
          </span>
        </header>

        <Empty className="flex-1 justify-center gap-0 rounded-none border-0 px-0 py-10">
          <EmptyHeader className="max-w-none gap-0">
            <EmptyMedia className="mb-8">
              <span className="relative grid size-24 place-items-center rounded-full border border-[#e9e8e2] bg-white dark:border-[#343430] dark:bg-[#181817]">
                <span
                  aria-hidden="true"
                  className="absolute inset-2 rounded-full border border-dashed border-[#e7e6df] dark:border-[#353531]"
                />
                <WifiOff
                  size={30}
                  strokeWidth={1.5}
                  aria-hidden="true"
                  className="relative text-[#687762] dark:text-[#b3c1a9]"
                />
              </span>
            </EmptyMedia>
            <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-[#82827a] dark:text-[#a4a49e]">
              Connection lost
            </p>
            <EmptyTitle
              role="heading"
              aria-level={1}
              className="w-full max-w-sm text-[clamp(2.4rem,9vw,3.5rem)] font-semibold leading-[1.02] tracking-[-0.06em] text-[#171713] dark:text-[#f6f5f0]"
            >
              You&apos;re offline.
            </EmptyTitle>
            <EmptyDescription className="mt-4 max-w-[19rem] text-sm leading-6 text-[#777770] dark:text-[#aaa9a2]">
              Habit can&apos;t reach the internet right now. Reconnect to Wi-Fi or
              mobile data, then try again.
            </EmptyDescription>
          </EmptyHeader>

          <EmptyContent className="mt-8 max-w-[19rem] gap-4">
            <a
              href="/"
              className={buttonVariants({
                variant: "default",
                size: "lg",
                className: "h-11 w-full rounded-xl text-sm font-semibold",
              })}
            >
              Try again
              <ArrowRight data-icon="inline-end" aria-hidden="true" />
            </a>
            <div className="flex items-start gap-3 rounded-2xl border border-[#ecebe5] bg-white p-4 text-left dark:border-[#2e2e2b] dark:bg-[#181817]">
              <span className="grid size-8 shrink-0 place-items-center rounded-xl bg-[#f0f0eb] text-[#687762] dark:bg-[#262622] dark:text-[#b3c1a9]">
                <CircleHelp size={16} aria-hidden="true" />
              </span>
              <div className="flex flex-col gap-1">
                <p className="text-xs font-semibold text-[#262620] dark:text-[#e5e4dc]">
                  A quick check
                </p>
                <p className="text-xs leading-5 text-[#777770] dark:text-[#aaa9a2]">
                  Try toggling Wi-Fi or turning airplane mode off.
                </p>
              </div>
            </div>
          </EmptyContent>
        </Empty>

        <footer className="border-t border-[#eeeeea] px-1 py-4 text-center text-[10px] font-medium uppercase tracking-[0.18em] text-[#aaa9a4] dark:border-[#2c2c29] dark:text-[#8f8e88]">
          Build your better days
        </footer>
      </div>
    </main>
  );
}
