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
      variant="outline"
      className={cn(
        "rounded-full px-2 text-[10px] font-semibold transition-all bg-[#f8f8f6]/10 dark:bg-[#111]/10",
        isToday
          ? "pointer-events-none hidden"
          : "text-gray-400 hover:bg-[#ededeb] hover:text-[#111] dark:hover:bg-[#181818] dark:hover:text-[#f8f8f6] dark:text-gray-300",
      )}
    >
      Today
    </Button>
  );
};

export default GoToday;
