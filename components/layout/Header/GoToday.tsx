import { cn } from "cn";
import { Button } from "../../ui/button";

interface GoTodayProps {
  selectedDay: number;
  goToToday: () => void;
}

const GoToday = ({ selectedDay, goToToday }: GoTodayProps) => {
  return (
    <Button
      onClick={goToToday}
      aria-label="Go to today"
      variant="ghost"
      className={cn(
        "rounded-full px-2.5 py-1.5 text-[10px] font-semibold transition-all",
        selectedDay === 2
          ? "pointer-events-none opacity-0"
          : "text-[#777771] hover:bg-[#ededeb] hover:text-[#111]",
      )}
    >
      Today
    </Button>
  );
};

export default GoToday;
