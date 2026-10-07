import GoToday from "./GoToday";
import HeaderDate from "./HeaderDate";
import HeaderTitle from "./HeaderTitle";
import NightMode from "./NightMode";
import Notifications from "./Notifications";
// import ThemePicker from "./ThemePicker";

interface HeaderProps {
  themeIndex: number;
  setThemeIndex: (index: number) => void;
  date: Date;
  setDate: (d: Date) => void;
}

const Header = ({ themeIndex, setThemeIndex, date, setDate }: HeaderProps) => {
  return (
    <header className="mt-4">
      <div className="flex items-center justify-between">
        <HeaderDate date={date} setDate={setDate} />
        <div className="flex items-center justify-end gap-x-2.5">
          <Notifications />
          <NightMode />
        </div>
      </div>
      <div className="h-7 mt-0.5 flex items-center justify-start">
        <HeaderTitle />
        <GoToday goToToday={setDate} date={date} />
      </div>
    </header>
  );
};

export default Header;
