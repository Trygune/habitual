"use client";

import { Download, Share, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
}

const InstallBanner = () => {
  const [installPrompt, setInstallPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);

  const [isIOS, setIsIOS] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const standalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      ("standalone" in window.navigator &&
        Boolean(
          (window.navigator as Navigator & { standalone?: boolean }).standalone,
        ));

    if (standalone) return;

    const userAgent = window.navigator.userAgent;

    const ios =
      /iPad|iPhone|iPod/.test(userAgent) ||
      (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);

    setIsIOS(ios);

    const handleBeforeInstallPrompt = (event: Event) => {
      event.preventDefault();

      const installEvent = event as BeforeInstallPromptEvent;

      setInstallPrompt(installEvent);

      requestAnimationFrame(() => {
        setIsVisible(true);
      });
    };

    const handleAppInstalled = () => {
      setInstallPrompt(null);
      setIsVisible(false);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    window.addEventListener("appinstalled", handleAppInstalled);

    if (ios) {
      setIsVisible(true);
    }

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt,
      );

      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);

  const handleInstall = async () => {
    if (!installPrompt) return;

    await installPrompt.prompt();

    const { outcome } = await installPrompt.userChoice;

    if (outcome === "accepted") {
      setIsVisible(false);
    }

    setInstallPrompt(null);
  };

  const handleDismiss = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-x-0 bottom-4 z-50 mx-auto max-w-sm w-full animate-in slide-in-from-bottom-3 duration-300">
      <div className="flex items-center gap-3 rounded-2xl border border-[#d4d4cf] bg-[#f8f8f6] p-3 shadow-[0_12px_40px_rgba(0,0,0,0.12)] dark:border-[#333] dark:bg-[#161616]">
        <div className="flex size-9 shrink-0 items-center justify-center rounded-xl border border-[#d4d4cf] bg-white dark:border-[#333] dark:bg-[#202020]">
          {isIOS ? (
            <Share size={17} className="text-[#111] dark:text-[#f8f8f6]" />
          ) : (
            <Download size={17} className="text-[#111] dark:text-[#f8f8f6]" />
          )}
        </div>

        <div className="min-w-0 flex-1">
          <p className="text-[12px] font-semibold tracking-tight">
            Install Habitual
          </p>

          {isIOS ? (
            <p className="mt-0.5 text-[10px] leading-4 text-[#777771] dark:text-[#999]">
              Tap <span className="font-semibold">Share</span> →{" "}
              <span className="font-semibold">Add to Home Screen</span>
            </p>
          ) : (
            <p className="mt-0.5 text-[10px] leading-4 text-[#777771] dark:text-[#999]">
              Keep your habits one tap away.
            </p>
          )}
        </div>

        {!isIOS && installPrompt && (
          <Button
            onClick={handleInstall}
            size="sm"
            className="h-8 rounded-lg px-3 text-xs font-semibold"
          >
            Install
          </Button>
        )}

        <Button
          onClick={handleDismiss}
          aria-label="Dismiss install banner"
          variant="ghost"
          size="icon-sm"
          className="rounded-full text-[#999] transition-colors hover:bg-black/5 hover:text-[#111] dark:hover:bg-white/5 dark:hover:text-[#f8f8f6]"
        >
          <X size={15} />
        </Button>
      </div>
    </div>
  );
};

export default InstallBanner;
