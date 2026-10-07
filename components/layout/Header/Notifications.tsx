import { Bell, BellOff } from "lucide-react";
import { useState } from "react";
import { Button } from "../../ui/button";

const Notifications = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  return (
    <Button
      onClick={() => setNotificationsEnabled((enabled) => !enabled)}
      variant="ghost"
      size="icon-sm"
      aria-label={
        notificationsEnabled ? "Mute notifications" : "Unmute notifications"
      }
      className="grid place-items-center rounded-full text-gray-500 transition-transform hover:bg-[#ededeb] hover:text-[#111] hover:scale-105 active:scale-95 dark:text-gray-300 dark:hover:bg-[#202020] dark:hover:text-[#f8f8f6]"
    >
      {notificationsEnabled ? (
        <Bell strokeWidth={2} />
      ) : (
        <BellOff strokeWidth={2} className="text-[#999995]" />
      )}
    </Button>
  );
};

export default Notifications;
