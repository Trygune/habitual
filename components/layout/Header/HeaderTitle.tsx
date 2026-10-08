import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { useMemo } from "react";

interface HeaderTitleProps {
  userName: string;
  onChangeName: () => void;
}

const HeaderTitle = ({ userName, onChangeName }: HeaderTitleProps) => {
  const greeting = useMemo(() => {
    const hour = new Date().getHours();

    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    if (hour < 21) return "Good evening";

    return "Good night";
  }, []);

  return (
    <div className="flex items-center gap-1.5 px-2">
      <h1 className="text-lg font-semibold tracking-tight text-[#111] dark:text-[#f8f8f6]">
        {greeting}, {userName}.
      </h1>

      <Button
        variant="ghost"
        size="icon-xs"
        aria-label="Edit name"
        onClick={onChangeName}
        className="text-[#999] transition-colors hover:bg-transparent hover:text-[#111] dark:hover:bg-transparent dark:hover:text-[#f8f8f6]"
      >
        <Pencil size={13} />
      </Button>
    </div>
  );
};

export default HeaderTitle;
