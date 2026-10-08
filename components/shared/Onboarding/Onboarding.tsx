"use client";

import { SyntheticEvent, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { saveUserName } from "@/services/user.service";
import NightMode from "@/components/layout/Header/NightMode";

interface OnboardingProps {
  onComplete: (name: string) => void;
}

const Onboarding = ({ onComplete }: OnboardingProps) => {
  const [name, setName] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedName = name.trim();

    if (!trimmedName) return;

    setIsSaving(true);

    await saveUserName(trimmedName);
    onComplete(trimmedName);
  };

  return (
    <main className="flex min-h-dvh w-full items-center justify-center bg-[#f8f8f6] px-5 dark:bg-[#111]">
      <div className="w-full max-w-md">
        <div className="w-full flex items-center justify-end">
          <NightMode />
        </div>
        <div className="mb-10">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#999]">
            Habitual
          </p>

          <h1 className="text-3xl font-semibold tracking-tight text-[#111] dark:text-[#f8f8f6]">
            Let&apos;s get started.
          </h1>

          <p className="mt-2 max-w-sm text-sm leading-6 text-[#777771] dark:text-[#999]">
            What should we call you?
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="name" className="text-xs font-semibold text-[#555]">
              Your name
            </label>

            <Input
              id="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Enter your name"
              autoComplete="name"
              autoFocus
              maxLength={40}
              className="h-11 rounded-xl border-[#d4d4cf] bg-white px-3 text-sm shadow-none focus-visible:ring-1 focus-visible:ring-[#111] dark:border-[#333] dark:bg-[#181818] dark:focus-visible:ring-[#f8f8f6]"
            />
          </div>

          <Button
            type="submit"
            disabled={!name.trim() || isSaving}
            className="h-11 w-full rounded-xl text-sm font-semibold"
          >
            Continue
            <ArrowRight size={16} data-icon="inline-end" />
          </Button>
        </form>

        <p className="mt-5 text-center text-[11px] leading-4 text-[#999]">
          Your name is stored only on this device.
        </p>
      </div>
    </main>
  );
};

export default Onboarding;
