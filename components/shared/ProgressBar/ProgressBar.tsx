import {
  Progress,
  ProgressLabel,
  ProgressValue,
} from "@/components/ui/progress";
import { cn } from "cn";
import { CSSProperties } from "react";

interface ProgressBarProps {
  showCelebration: boolean;
  habitsLength: number;
  completed: number;
}

const ProgressBar = ({
  showCelebration,
  habitsLength,
  completed,
}: ProgressBarProps) => {
  const progress = habitsLength
    ? Math.round((completed / habitsLength) * 100)
    : 0;
  return (
    <section
      className={cn(
        "relative rounded-2xl border border-[#111]/8 bg-[#f8f8f6] text-[#111] shadow-[0_8px_28px_rgba(17,17,17,0.12)] dark:border-[#f8f8f6]/10 dark:bg-[#111] dark:text-[#929292] dark:shadow-[0_8px_28px_rgba(0,0,0,0.35)] transition-all duration-500 p-5",
        showCelebration && "habit-complete",
      )}
      aria-label="Daily progress"
    >
      {showCelebration && (
        <div
          className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl"
          aria-label="All habits complete"
        >
          {/* celebration */}
          {[...Array(8)].map((_, index) => (
            <span
              key={index}
              className="celebration-dot absolute left-1/2 top-1/2 size-1.5 rounded-full bg-[#111] dark:bg-[#f8f8f6]"
              style={
                {
                  "--end": `translate(${Math.cos(index * 0.8) * 90}px, ${Math.sin(index * 0.8) * 55}px)`,
                } as CSSProperties
              }
            />
          ))}
          <p className="absolute inset-x-0 top-3 text-center text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-300/70 dark:text-gray-700/70">
            All done
          </p>
        </div>
      )}

      <Progress value={progress} className="w-full">
        <ProgressLabel>
          <div>
            <p className="text-xs text-gray-700/55 dark:text-gray-300/55">
              Your daily progress
            </p>
            <p className="mt-1 text-[26px] font-semibold tracking-[-0.04em]">
              {completed}{" "}
              <span className="text-base font-normal text-gray-700/45 dark:text-gray-300/45">
                of {habitsLength}
              </span>
            </p>
            <p className="mt-2.5 text-[11px] text-gray-700/45 dark:text-gray-300/45">
              Small steps, every day.
            </p>
          </div>
        </ProgressLabel>
        <ProgressValue />
      </Progress>
    </section>
  );
};

export default ProgressBar;
