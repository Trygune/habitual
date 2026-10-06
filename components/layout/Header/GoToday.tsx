import { cn } from "cn";
import { Button } from "../../ui/button";

interface GoTodayProps {
  date: Date;
  goToToday: (d: Date) => void;
}

const GoToday = ({ date, goToToday }: GoTodayProps) => {
  const nowDate = new Date().toDateString();
  const selectedDate = date.toDateString();
  const isToday = nowDate === selectedDate;
  return (
    <Button
      onClick={() => goToToday(new Date(new Date().setHours(0, 0, 0, 0)))}
      aria-label="Go to today"
      variant="ghost"
      className={cn(
        "rounded-full px-2.5 py-1.5 text-[10px] font-semibold transition-all",
        isToday
          ? "pointer-events-none hidden"
          : "text-[#777771] hover:bg-[#ededeb] hover:text-[#111]",
      )}
    >
      Today
    </Button>
  );
};

export default GoToday;
