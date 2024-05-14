import messaging from '@react-native-firebase/messaging';
import { Platform } from 'react-native';
import { store } from '../../store';
import { Logout } from '../../store/AuthActions';

class FCMService {
  //for registering and checking the permission
  register = (onRegister, onNotification, onOpenNotification) => {
    this.checkPermission(onRegister);
    this.createNotificationListeners(
      onRegister,
      onNotification,
      onOpenNotification
    );
  };

  //for registering with FCM firebase
  registerAppWithFCM = async () => {
    if (Platform.OS === 'ios') {
      // await messaging().registerDeviceForRemoteMessages();
      await messaging().setAutoInitEnabled(true);
    }
  };

  //for checking the permission
  checkPermission = (onRegister) => {
    messaging()
      .hasPermission()
      .then((enabled) => {
        if (enabled) {
          this.getToken(onRegister);
        } else {
          this.requestPermission(onRegister);
        }
      })
      .catch((error) => {
        console.log('Permission Rejected', error);
      });
  };

  //for gettng the fcm token
  getToken = (onRegister) => {
    messaging()
      .getToken()
      .then((fcmToken) => {
        if (fcmToken) {
          onRegister(fcmToken);
        } else {
          console.log('User does not have device token');
        }
      })
      .catch((error) => {
        console.log('getToken rejected', error);
      });
  };

  //for requesting the permission for fcm
  requestPermission = (onRegister) => {
    messaging()
      .requestPermission()
      .then(() => {
        this.getToken(onRegister);
      })
      .catch((error) => {
        console.log('Request permission rejected', error);
      });
  };

  //for deleting the fcm token
  deleteToken = () => {
    messaging()
      .deleteToken()
      .catch((error) => {
        console.log('Delete Token error', error);
      });
  };

  //notification listener
  createNotificationListeners = (
    onRegister,
    onNotification,
    onOpenNotification
  ) => {
    // when the application is running, but in the background
    messaging().onNotificationOpenedApp((remoteMessage) => {
      if (remoteMessage) {
        const notification = remoteMessage.notification;
        onOpenNotification(notification, remoteMessage.data);
      }
    });

    messaging().setBackgroundMessageHandler(async (remoteMessage) => {
      if (remoteMessage.data.type === 'Logout') {
        store.dispatch(Logout());
      }
    });

    // when the application is opened from a quite state
    messaging()
      .getInitialNotification()
      .then((remoteMessage) => {
        console.log('getInitial notification caused app to open');
        if (remoteMessage) {
          const notification = remoteMessage.notification;
          onOpenNotification(notification, remoteMessage.data);
        }
      });

    // foreground state message
    this.messageListener = messaging().onMessage(async (remoteMessage) => {
      console.log('new FCM message arrived', remoteMessage);
      if (remoteMessage) {
        onNotification(
          remoteMessage.data.notification || remoteMessage.notification,
          remoteMessage.data
        );
      }
    });

    // triggered when have new token
    messaging().onTokenRefresh((fcmToken) => {
      console.log('New Token Refresh: ', fcmToken);
      onRegister(fcmToken);
    });
  };

  //for unregistering with firebase
  unRegister = () => {
    this.messageListener();
  };
}

const fcmService = new FCMService();
export default fcmService;
