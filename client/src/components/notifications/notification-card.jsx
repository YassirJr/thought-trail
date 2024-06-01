import React from 'react';
import {CheckIcon} from "lucide-react";
import {formatDistanceToNow} from "date-fns";
import {notificationApi} from "@/services/api/notification-api.js";
import {getUserFullName} from "@/utils/index.js";
import {useNotification} from "@/context/index.jsx";

function NotificationCard({notification}) {
  const {myNotifications, setMyNotifications} = useNotification()

  const markNotificationAsRead = async () => {
    try {
      const response = await notificationApi.markAsRead({_id: notification._id})
      if (response.status === 200) {
        setMyNotifications([...myNotifications.filter(e => e?._id !== notification?._id)])
      }
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div
      className="relative flex cursor-pointer items-start space-x-4 border p-2 mt-1 mb-4 rounded transition-all">
      <button onClick={markNotificationAsRead}
              className="absolute p-1 bg-gray-100 dark:bg-gray-900 border rounded-full -top-2 -right-2"
      >
        <CheckIcon strokeWidth={1} className='w-4 h-4'/>
      </button>
      <img src={notification.sender.photo} className='w-10 h-10 rounded-full' alt=""/>
      <div className="flex-1">
        <h4 className="font-semibold">{getUserFullName(notification.sender)}</h4>
        <p className="text-sm text-gray-600">
          {notification.message}
        </p>
      </div>
      <span className="text-xs absolute top-2 right-7 text-gray-400">
                                        {formatDistanceToNow(notification?.createdAt)}
                                    </span>
    </div>
  );
}

export default NotificationCard;
