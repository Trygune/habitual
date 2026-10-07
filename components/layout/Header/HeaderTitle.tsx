import { useMemo } from "react";

const HeaderTitle = () => {
  const greeting = useMemo(() => {
    const hour = new Date().getHours();

    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    if (hour < 21) return "Good evening";

    return "Good night";
  }, []);

  return (
    <h1 className="text-lg font-semibold tracking-tight px-2 text-[#111] dark:text-[#f8f8f6]">
      {greeting}, Farbod.
    </h1>
  );
};

export default HeaderTitle;
