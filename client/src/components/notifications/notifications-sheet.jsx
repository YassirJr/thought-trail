import React, {useEffect, useState, useCallback, useMemo} from 'react';
import {Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger} from "@/components/ui/sheet.jsx";
import {BellIcon} from "lucide-react";
import {notificationSocket} from "@/services/socket/notification-socket.js";
import {isToday, isYesterday, parseISO} from "date-fns";
import ListNotifications from "@/components/notifications/list-notifications.jsx";
import {socket} from "@/services/socket/index.js";
import {useNotification, useUser} from "@/context/index.jsx";


function NotificationsSheet() {
  const {myNotifications, setMyNotifications, getMyNotifications} = useNotification();
  const [notifications, setNotifications] = useState({});
  const {user} = useUser()

  const isDateToday = useCallback((date) => {
    if (!date) return false;
    return isToday(parseISO(date));
  }, []);

  const isDateYesterday = useCallback((date) => {
    if (!date) return false;
    return isYesterday(parseISO(date));
  }, []);

  const receiveNotification = () => {
    notificationSocket.receiveNotification(
      (data) => {
        (async () => {
          const response = await getMyNotifications()
          if (response.status === 200 && response.data.success) {
            setMyNotifications(response.data.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)))
          }
        })()
      })
  }


  const filterNotifications = useCallback(() => {
    const today = [];
    const yesterday = [];
    const earlier = [];

    myNotifications.forEach(notification => {
      const {createdAt} = notification;
      if (!createdAt) return;

      if (isDateToday(createdAt)) {
        today.push({...notification});
      } else if (isDateYesterday(createdAt)) {
        yesterday.push({...notification});
      } else {
        earlier.push({...notification});
      }
    });

    setNotifications({today, yesterday, earlier});
  }, [myNotifications, isDateToday, isDateYesterday]);

  useEffect(() => {
    notificationSocket.userConnected(user?._id)
    return notificationSocket.off
  }, [socket]);

  useEffect(() => {
    filterNotifications();
  }, [filterNotifications]);

  useEffect(() => {
    receiveNotification()
    return () => {
      notificationSocket.off();
    };
  }, [myNotifications, setMyNotifications]);


  const notificationsCount = useMemo(
    () => myNotifications.length, [myNotifications]);
  return (
    <Sheet>
      <SheetTrigger asChild>
        <div className="relative">
          <BellIcon className="h-6 w-6 text-gray-400 cursor-pointer" strokeWidth={1}/>
          {notificationsCount > 0 && (
            <span
              className="absolute -top-2 -right-2 bg-green-500 text-white rounded-full px-1 py-0.5 text-xs">
                            {notificationsCount}
                        </span>
          )}
        </div>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader className='my-4'>
          <SheetTitle>Notifications</SheetTitle>
        </SheetHeader>
        <ListNotifications notifications={notifications} count={notificationsCount}
        />
      </SheetContent>
    </Sheet>
  );
}

export default NotificationsSheet;
