import GoToday from "./GoToday";
import HeaderDate from "./HeaderDate";
import HeaderTitle from "./HeaderTitle";
import Notifications from "./Notifications";
import ThemePicker from "./ThemePicker";

interface HeaderProps {
  themeIndex: number;
  setThemeIndex: (index: number) => void;
  date: Date;
  setDate: (d: Date) => void;
}

const Header = ({ themeIndex, setThemeIndex, date, setDate }: HeaderProps) => {
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
          <GoToday goToToday={setDate} date={date} />
          <Notifications />
        </div>
      </div>
    </header>
  );
};

export default Header;
