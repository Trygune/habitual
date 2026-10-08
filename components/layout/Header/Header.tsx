import { useState } from "react";
import GoToday from "./GoToday";
import HeaderDate from "./HeaderDate";
import HeaderTitle from "./HeaderTitle";
import NightMode from "./NightMode";
import Notifications from "./Notifications";
import ChangeNameDialog from "@/components/shared/ChangeNameDialog/ChangeNameDialog";

interface HeaderProps {
  userName: string;
  date: Date;
  handleSelectDate: (d: Date) => void;
  handleChangeName: () => void;
}

const Header = ({
  userName,
  date,
  handleSelectDate,
  handleChangeName,
}: HeaderProps) => {
  const [isChangeNameOpen, setIsChangeNameOpen] = useState(false);

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
        <HeaderTitle
          userName={userName}
          onChangeName={() => setIsChangeNameOpen(true)}
        />
        <GoToday goToToday={handleSelectDate} date={date} />
      </div>
      <ChangeNameDialog
        open={isChangeNameOpen}
        onOpenChange={setIsChangeNameOpen}
        onConfirm={handleChangeName}
      />
    </header>
  );
};

export default Header;
