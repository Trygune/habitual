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
      className="grid place-items-center rounded-full text-[#555550] transition-transform hover:bg-[#ededeb] hover:scale-105 active:scale-95"
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
