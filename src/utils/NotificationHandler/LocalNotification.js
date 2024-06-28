import PushNotification, { Importance } from 'react-native-push-notification';

import { Platform } from 'react-native';
import { store } from '../../store';
import { Logout } from '../../store/AuthActions';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
class LocalNotificationService {
  //for configuring the local notification

  configure = (onOpenNotification) => {
    PushNotification.configure({
      onRegister: function (token) {
        // console.log('[LocalNotificationService] onRegister', token);
      },
      onOpenNotification: function (notification) { },
      onNotification: function (notification) {
        if (notification?.data?.type === 'Logout') {
          store.dispatch(Logout());
        }

        if (notification?.data?.type === 'AssignBookingSP') {
        }

        if (notification?.data?.type === 'BookingReOpened') {
        }


        if (notification.userInteraction) {
          onOpenNotification(
            Platform.OS === 'ios' ? notification.data.item : notification.data,
            notification.data
          );

          if (Platform.OS === 'ios') {
            // (required) Called when a remote is received or opened, or local notification is opened
            notification.finish(PushNotificationIOS.FetchResult.NoData);
          }
        }
      },
      senderID: '246666371258',
      // IOS ONLY (optional): default: all - Permissions to register.
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },
      // Should the initial notification be popped automatically
      // default: true
      popInitialNotification: true,
      /**
       * (optional) default: true
       * - Specified if permissions (ios) and token (android and ios) will requested or not,
       * - if not, you must call PushNotificationsHandler.requestPermissions() later
       * - if you are not using remote notification or do not have Firebase installed, use this:
       *     requestPermissions: Platform.OS === 'ios'
       */
      requestPermissions: true,
    });
    PushNotification.createChannel(
      {
        channelId: 'fcm_fallback_notification_channel', // Provide a unique channel ID
        channelName: 'Mumtaz_Services', // Name of the channel
        channelDescription: 'Service_Provider', // Description of the channel (optional)
        playSound: true, // Whether to play a sound for notifications sent to this channel (optional)
        soundName: 'default', // Sound to be played for notifications (optional)
        importance: Importance.HIGH, // Importance level of the notifications (optional)
        vibrate: true, // Whether the device should vibrate for notifications (optional)
      },
      (created) => console.log(`createChannel returned '${created}'`)
    );
  };

  //for unregistering the push notification
  unregister = () => {
    PushNotification.unregister();
  };

  //for showing the notification in the notification bar
  showNotification = (id, title, message, data = {}, options = {}) => {
    PushNotification.localNotification({
      /* Android Only Properties */
      ...this.buildAndroidNotification(id, title, message, data, options),
      /* IOS Only Properties  */
      ...this.buildIOSNotification(id, title, message, data, options),
      /* IOS and Andoid Properties */
      //   title: title || "",
      //   message: message || "",
      //   playSound: options.playSound || false,
      //   soundName: options.soundName || "default",
      //   userInteraction: false,
    });
  };

  //for building the notification in the android
  buildAndroidNotification = (id, title, message, data = {}, options = {}) => {
    return {
      id: id,
      autoCancel: true,
      largeIcon: options.largeIcon || 'ic_launcher',
      smallIcon: options.smallIcon || 'ic_launcher',
      bigText: message || '',
      subText: title || '',
      vibrate: options.vibrate || true,
      vibration: options.vibration || 300,
      priority: options.priority || 'high',
      importance: options.importance || 'high',
      data: data,
      channelId: 'fcm_fallback_notification_channel', // Use the correct channel ID here
    };
  };

  //for building the notification in the iOS
  buildIOSNotification = (id, title, message, data = {}, options = {}) => {
    return {
      alertAction: options.alertAction || 'view',
      category: options.category || '',
      userInfo: {
        id: id,
        item: data,
      },
    };
  };

  //for cancelling the local notification
  cancelAllLocalNotifications = () => {
    if (Platform.IOS === 'ios') {
      // PushNotificationIOS.cancelAllLocalNotifications();
    } else {
      PushNotification.cancelAllLocalNotifications();
    }
  };

  removeDeliveredNotificationByID = (notificationId) => {
    PushNotification.cancelLocalNotification({ id: `${notificationId}` });
  };
}
const localNotificationService = new LocalNotificationService();
export default localNotificationService;
