import React, { useRef, useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  ScrollView,
  Image,
  TouchableWithoutFeedback,
  Dimensions,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import {
  closeDrawer,
} from '../../store/notifications/NotificationActions';
import { AppHeight, AppWidth, COLORS, fontSize } from '../../utils';
import { useTranslation } from 'react-i18next';
import { Box, VStack, useToast, HStack, Badge, Center } from 'native-base';
import { getBearerRequest } from '../../services/ApiServices';
import {
  GET_BOOKING_BY_ID_URL,
  MARK_AS_DELETE_NOTIFICATION_URL,
  MARK_AS_READ_NOTIFICATION_URL,
} from '../../services/ApiConstants';
import CustomLoading from '../Loading/CustomLoading';
import { navigate } from '../../../RootNavigation';
import { CustomIcon } from '../CustomIcon';

const CustomSideDrawer = ({ navigation }) => {
  const dispatch = useDispatch();
  const drawerWidth = Dimensions.get('window').width * 0.81; // Adjust the width as per your preference
  const drawerAnimation = useRef(new Animated.Value(-300)).current;

  const notifications = useSelector(
    (state) => state.NotificationReducer.notifications
  );

  const loadNotification = useSelector(
    (state) => state.NotificationReducer.loadNotification
  );

  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const { t } = useTranslation();

  const user = useSelector((state) => state.AuthReducer.user);

  const onPressNotification = (notification) => {
    markAsRead(notification?.id);

    if (user.role !== 'Client') {
      if (notification.type === 'AddBooking') {

      } else if (notification.type === 'AssignBookingSP') {
        dispatch({ type: 'FEEDBACK_DATA', payload: notification });

      } else if (notification.type === 'BookingReOpened') {

      } else if (notification.type === 'Message') {
        navigate('Inbox', {
          chatInfo: {
            bookedById: notification.initiatedById,
            clientName: notification.initiatedByName,
            clientImage: notification.initiatedByImage,
          },
        });
      } else if (notification.type === 'HelpCenterMessage') {
        navigate('ServiceProviderProfile', {
          screen: 'ProfileHelpCenter',
        });
      } else if (notification.type === 'EndBooking') {

      }
    } else {
      if (notification.type === 'AcceptBySPBooking') {
        navigate('AudioHomeScreens', {
          screen: 'AgentProfileScreen',
          params: {
            ProfileInfo: notification,
            serviceProviderId: notification.initiatedById,
            bookingId: notification.bookingId,
            action: 'Accepted',
          },
        });
      } else if (notification.type === 'EndBooking') {
        getBookingDetails(notification.bookingId);
      } else if (notification.type === 'Message') {
        navigate('AudioHomeScreens', {
          screen: 'UserInbox',
          params: {
            chatInfo: {
              serviceProviderId: notification.initiatedById,
              serviceProviderName: notification.initiatedByName,
              serviceProviderImage: notification.initiatedByImage,
            },
          },
        });
      } else if (notification.type === 'HelpCenterMessage') {
        navigate('UserProfileHome', {
          screen: 'ProfileHelp',
        });
      }
    }

    handleCloseDrawer();
  };

  const getBookingDetails = async (id) => {
    try {
      let response = await getBearerRequest(
        GET_BOOKING_BY_ID_URL + '?bookingid=' + id
      );

      navigate('AudioHomeScreens', {
        screen: 'ClientPaymentReceipt',
        params: { data: response.data, completed: true },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const markAsRead = async (id) => {
    try {
      let response = await getBearerRequest(
        MARK_AS_READ_NOTIFICATION_URL + '?notificationId=' + id
      );
      // dispatch({ type: "FEEDBACK_VISIBLE", payload: true });
      // SuccessToast( t("Success"), "Notification Deleted");
    } catch (error) {
      console.log(error);
    }
  };

  const markAsDelete = async (id) => {
    setLoading(true);
    try {
      let response = await getBearerRequest(
        MARK_AS_DELETE_NOTIFICATION_URL + '?notificationId=' + id
      );
      SuccessToast(t('Success'), 'Notification Deleted');
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const showBadgeMessage = (message) => {
    if (message === 'Message') {
      return t('New Message');
    } else if (message === 'EndBooking') {
      return t('Booking Ended');
    } else if (message === 'AddBooking') {
      return t('New Booking');
    } else if (message === 'AssignBookingSP') {
      return t('Booking Assigned');
    } else if (message === 'HelpCenterMessage') {
      return t('Admin Message');
    } else if (message === 'BookingReOpened') {
      return t('Re Open');
    } else if (message === 'AcceptBySPBooking') {
      return t('Booking Accepted');
    }
  };

  const notificationCard = (notification) => {
    return (
      <View style={styles.notificationCard}>
        <TouchableOpacity onPress={() => onPressNotification(notification)}>
          <HStack space={2}>
            <VStack>
              <Image
                style={styles.notificationAvatar}
                resizeMode='cover'
                alt='img loading..'
                borderRadius={100}
                source={{
                  uri: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
                }}
              />
            </VStack>

            <VStack w={'60%'}>
              <Text>{notification?.initiatedByName} </Text>

              {notificationRow('Type:', showBadgeMessage(notification?.type))}

              {notificationRow('Time:', clipTime(notification?.description))}
            </VStack>

            <VStack style={styles.crossButton}>
              <TouchableOpacity onPress={() => markAsDelete(notification?.id)}>
                <Text>x</Text>
              </TouchableOpacity>
            </VStack>
          </HStack>
        </TouchableOpacity>
      </View>
    );
  };

  const notificationRow = (label, text) => {
    return (
      <HStack style={styles.hStack}>
        <View style={styles.labelView}>
          <Text style={styles.labelText}>{label}</Text>
        </View>
        <Text> {text}</Text>
      </HStack>
    );
  };

  const clipTime = (text) => {
    return text?.substring(text.indexOf(':') + 2);
  };

  const renderNotifications =
    notifications &&
    notifications?.map((notification, index) => {
      let image = user?.uploadFileWebUrl + notification?.initiatedByImage;
      return <View key={index}>{notificationCard(notification)}</View>;
    });

  const handleCloseDrawer = () => {
    Animated.timing(drawerAnimation, {
      toValue: -300,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      dispatch(closeDrawer());
    });
  };

  useEffect(() => {
    Animated.timing(drawerAnimation, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, []);

  const drawerTranslateX = drawerAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [75, 0],
  });

  //   if (loadNotification) {
  //     return <CustomLoading content={t("loading") + "..."} top={null} />;
  //   }

  return (
    <>
      <View style={styles.drawerContainer} onPress={closeDrawer}>
        <Animated.View
          style={[
            styles.drawerContent,
            {
              width: drawerWidth,
              transform: [{ translateX: drawerTranslateX }],
            },
          ]}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: 20,
              paddingVertical: 20,
            }}
          >
            <TouchableOpacity onPress={handleCloseDrawer}>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 30,
                  marginTop: -10,
                }}
              >
                →
              </Text>
            </TouchableOpacity>
            <Text
              style={{
                textAlign: 'center',
                fontSize: fontSize.medium,
                // marginTop: 20,
              }}
            >
              {t('notification')}
            </Text>
            <View></View>
          </View>

          <ScrollView
            style={{
              backgroundColor: 'white',
              height: AppHeight(80),
            }}
          >
            {loadNotification ? (
              <CustomLoading
                content={t('loading') + '...'}
                top={AppHeight(40)}
              />
            ) : (notifications && notifications === null) ||
              notifications?.length === 0 ? (
              <View
                style={{
                  marginTop: AppHeight(35),
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Text style={{ color: COLORS.grey }}>
                  {t('notification_placeholder')}
                </Text>
              </View>
            ) : (
              <Box>{renderNotifications && renderNotifications}</Box>
            )}
          </ScrollView>
        </Animated.View>
        <TouchableOpacity
          style={styles.drawerContainerButton}
          onPress={handleCloseDrawer}
        ></TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  drawerContainer: {
    // flex: 1,
    position: 'absolute',
    top: 0,
    right: 0,
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    zIndex: 100,
  },
  drawerContainerButton: {
    // flex: 1,
    position: 'absolute',
    top: 0,
    right: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    zIndex: -1,
  },
  drawerContent: {
    paddingTop: 20,
    padding: 4,
    // flex: 1,
    backgroundColor: 'white',
    height: AppHeight(100),
    right: 0, // Align the drawer content to the right side
    // borderTopLeftRadius: 15,
    width: '100%',
  },
  labelView: {
    backgroundColor: COLORS.primary,
    padding: 2,
    borderRadius: 5,
    paddingHorizontal: 4,
  },
  labelText: {
    fontSize: 12,
    color: 'black',
  },
  hStack: { margin: 2 },
  notificationCard: {
    backgroundColor: COLORS.primaryLighter,
    padding: 6,
    margin: 3,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  crossButton: {
    position: 'absolute',
    top: 0,
    right: 4,
    backgroundColor: COLORS.primaryLight,
    height: 20,
    width: 20,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  notificationAvatar: { height: 50, width: 50 },
});

export default CustomSideDrawer;
