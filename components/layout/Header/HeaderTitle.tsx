import { useMemo } from "react";

const HeaderTitle = () => {
  const greeting = useMemo(
    () => (new Date().getHours() < 12 ? "Good morning" : "Good day"),
    [],
  );

  return (
    <h1 className="text-lg font-semibold tracking-tighter">
      {greeting}, Farbod.
    </h1>
  );
};

export default HeaderTitle;
