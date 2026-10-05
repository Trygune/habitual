import GoToday from "./GoToday";
import HeaderDate from "./HeaderDate";
import HeaderTitle from "./HeaderTitle";
import Notifications from "./Notifications";
import ThemePicker from "./ThemePicker";

interface HeaderProps {
  setWeekOffset: (offset: number) => void;
  selectDay: (day: number) => void;
  themeIndex: number;
  setThemeIndex: (index: number) => void;
  selectedDay: number;
  date: Date | undefined;
  setDate: (d: Date | undefined) => void;
}

const Header = ({
  setWeekOffset,
  selectDay,
  themeIndex,
  setThemeIndex,
  selectedDay,
  date,
  setDate,
}: HeaderProps) => {
  const goToToday = () => {
    setWeekOffset(0);
    selectDay(2);
  };
  return (
    <header className="px-5 pb-5 mt-7">
      <HeaderDate date={date} setDate={setDate} />
      <div className="flex items-baseline-last justify-between">
        <div>
          <div className="mt-1 flex items-center gap-2">
            <ThemePicker
              themeIndex={themeIndex}
              setThemeIndex={setThemeIndex}
            />
            <HeaderTitle />
          </div>
        </div>
        <div className="flex items-center gap-0.5">
          <GoToday goToToday={goToToday} selectedDay={selectedDay} />
          <Notifications />
        </div>
      </div>
    </header>
  );
};

export default Header;
