import GoToday from "./GoToday";
import HeaderDate from "./HeaderDate";
import HeaderTitle from "./HeaderTitle";
import NightMode from "./NightMode";
import Notifications from "./Notifications";

interface HeaderProps {
  date: Date;
  handleSelectDate: (d: Date) => void;
}

const Header = ({ date, handleSelectDate }: HeaderProps) => {
  return (
    <header className="mt-4">
      <div className="flex items-center justify-between">
        <HeaderDate date={date} setDate={handleSelectDate} />
        <div className="flex items-center justify-end gap-x-2.5">
          <Notifications />
          <NightMode />
        </div>
      </div>
      <div className="h-7 mt-0.5 flex items-center justify-start">
        <HeaderTitle />
        <GoToday goToToday={handleSelectDate} date={date} />
      </div>
    </header>
  );
};

export default Header;
