import React from 'react';
import NotificationCard from "@/components/notifications/notification-card.jsx";
import {Button} from "@/components/ui/button.jsx";
import {notificationApi} from "@/services/api/notification-api.js";
import {useNotification} from "@/context/index.jsx";

function ListNotifications({notifications, count,}) {
    const {setMyNotifications} = useNotification()
    const markAllNyNotificationsAsRead = async () => {
        try {
            const response = await notificationApi.markAllAsRead()
            if (response.status === 200) {
                setMyNotifications([])
            }
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div className='overflow-y-auto h-full pb-10 pe-2 w-full'>
            {notifications.today?.length > 0 && (
                <>
                    <h1 className='font-light text-gray-800 dark:text-gray-300'>Today</h1>
                    {notifications.today.map(notification => (
                        <NotificationCard key={notification._id} notification={notification}
                                          />
                    ))}
                </>
            )}

            {notifications.yesterday?.length > 0 && (
                <>
                    <h1 className='font-light text-gray-800 dark:text-gray-300'>Yesterday</h1>
                    {notifications.yesterday.map(notification => (
                        <NotificationCard key={notification._id} notification={notification}
                                          />
                    ))}
                </>
            )}

            {notifications.earlier?.length > 0 && (
                <>
                    <h1 className='font-light text-gray-800 dark:text-gray-300'>Earlier</h1>
                    {notifications.earlier.map(notification => (
                        <NotificationCard key={notification._id} notification={notification}
                                          />
                    ))}
                </>
            )}

            {count === 0 && <p>No notifications</p>}

            {count > 0 && (
                <div className="flex justify-center p-4">
                    <Button className="text-sm" variant="destructive" onClick={markAllNyNotificationsAsRead}>
                        Clear all notifications
                    </Button>
                </div>
            )}
        </div>
    );
}

export default ListNotifications;
