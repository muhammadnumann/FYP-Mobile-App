import messaging from '@react-native-firebase/messaging';
import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import { Alert } from 'react-native';
import PushNotification from 'react-native-push-notification';
// import notifee, { AndroidImportance } from "@notifee/react-native";
import { useDispatch } from 'react-redux';
import { mergeNotifications } from '../../store/notifications/NotificationActions';
import notifee, { EventType } from '@notifee/react-native';

async function onDisplayNotification(data) {
  // Request permissions (required for iOS)
  const { messageId, notification } = data;

  // if (Platform.OS == "ios") {
  //   await notifee.requestPermission();
  // }

  // Create a channel (required for Android)
  const channelId = await notifee.createChannel({
    id: messageId,
    name: notification.title,
    sound: 'default',
    importance: AndroidImportance.HIGH,
    displayInForeground: false, // set to false to prevent notification from showing up in foreground mode
  });

  // Display a notification
  await notifee.displayNotification({
    title: notification.title,
    body: notification.body,
    android: {
      channelId,
    },
    displayInForeground: false, // set to false to prevent notification from showing up in foreground mode
  });
}

export default ForegroundHandler = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      const { messageId, notification } = remoteMessage;
    });

    // Handle notification when app is in background or not running
    const unsubscribeBackground = messaging().onNotificationOpenedApp(
      (remoteMessage) => {
        console.log(
          'Notification caused app to open from background state:',
          remoteMessage
        );

        // Sp Navigations for background push notifications

        if (
          !!remoteMessage?.data &&
          remoteMessage?.data?.notificationType === 'AddBooking'
        ) {
          navigation.navigate('SpBookingDetail', {
            bookingId: remoteMessage?.data?.bookingId,
            bookedById: remoteMessage?.data?.initiatedById,
          });
        }

        if (
          !!remoteMessage?.data &&
          remoteMessage?.data?.notificationType === 'AssignBookingSP'
        ) {
          navigation.push('NewJobScreen');
        }

        // Client Navigations for background push notifications

        if (
          !!remoteMessage?.data &&
          remoteMessage?.data?.notificationType === 'AcceptBySPBooking'
        ) {
          // navigation.navigate("BookingDetailsCommon", {
          //   data: data,
          //   completed: false,
          //   bookingId: remoteMessage?.data?.bookingId,
          // });
          navigation.navigate('AgentProfileScreen', {
            ProfileInfo: remoteMessage?.data,
            serviceProviderId: remoteMessage?.data?.initiatedById,
            bookingId: remoteMessage?.data?.bookingId,
            action: remoteMessage?.data?.action,
          });
        }

        if (
          !!remoteMessage?.data &&
          remoteMessage?.data?.notificationType === 'EndBooking'
        ) {
          navigation.push('ClientPaymentReceipt', {
            data: remoteMessage?.data,
          });
        }
      }
    );

    return () => {
      unsubscribe();
      unsubscribeBackground();
    };
  }, []);
  return null;
};
