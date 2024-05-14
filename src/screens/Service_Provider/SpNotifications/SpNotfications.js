import {
  Alert,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { Box, HStack, VStack, Text, Image, Badge, useToast } from 'native-base';
import CustomHeader from '../../../components/CustomHeader';
import { AppHeight, COLORS, ScreenHeight, urlFormat } from '../../../utils';
import { useDispatch, useSelector } from 'react-redux';
import CustomLoading from '../../../components/Loading/CustomLoading';
import {
  getBearerRequest,
  postBearerRequest,
} from '../../../services/ApiServices';
import {
  MARK_AS_DELETE_NOTIFICATION_URL,
  MARK_AS_READ_NOTIFICATION_URL,
} from '../../../services/ApiConstants';
import SuccessToast from '../../../components/Toast/SuccessToast';
import { getNotifications } from '../../../store/notifications/NotificationActions';
import { useTranslation } from 'react-i18next';
import { getInProgressJobs } from '../../../store/serviceprovider/SpAction';

const SpNotifications = ({ navigation }) => {
  const notifications = useSelector(
    (state) => state.NotificationReducer.notifications
  );

  const loadNotification = useSelector(
    (state) => state.NotificationReducer.loadNotification
  );

  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.AuthReducer.user);

  const onPressNotification = (notification) => {
    markAsRead(notification?.id);
    if (notification.type === 'AddBooking') {
      navigation.push('SpBookingDetail', {
        bookingId: notification?.bookingId,
        bookedById: notification?.initiatedById,
        newBooking: true,
      });
    } else if (notification.type === 'AssignBookingSP') {
      dispatch(getInProgressJobs());
      navigation.push('MyJobScreen', { bookingAssigned: true });
    } else if (notification.type === 'BookingReOpened') {
      dispatch(getInProgressJobs());
      navigation.navigate('Home', {
        screen: 'GenerateBill',
        params: { data: notification },
      });
    } else if (notification.type === 'Message') {
      navigation.navigate('Inbox', {
        chatInfo: {
          bookedById: notification.initiatedById,
          clientName: notification.initiatedByName,
          clientImage: notification.initiatedByImage,
        },
      });
    } else if (notification.type === 'HelpCenterMessage') {
      navigation.navigate('ServiceProviderProfile', {
        screen: 'ProfileHelpCenter',
      });
    } else if (notification.type === 'EndBooking') {
      navigation.navigate('Home', {
        screen: 'BookingDetailsCommon',
        params: { bookingId: notification.bookingId },
      });
    }
  };

  const markAsRead = async (id) => {
    try {
      let response = await getBearerRequest(
        MARK_AS_READ_NOTIFICATION_URL + '?notificationId=' + id
      );
      dispatch(getNotifications());
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
      dispatch(getNotifications());
      SuccessToast(t('Success'), 'Notification Deleted');
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const showBadgeMessage = (message) => {
    if (message === 'Message') {
      return 'New Message';
    } else if (message === 'EndBooking') {
      return 'Booking Ended';
    } else if (message === 'AddBooking') {
      return 'New Booking';
    } else if (message === 'AssignBookingSP') {
      return 'Booking Assigned';
    } else if (message === 'HelpCenterMessage') {
      return 'Admin Message';
    } else if (message === 'BookingReOpened') {
      return 'Re Open';
    }
  };

  const renderNorifications =
    notifications &&
    notifications?.map((notification, index) => {
      let image = user?.uploadFileWebUrl + notification?.initiatedByImage;
      return (
        <View key={index}>
          <TouchableOpacity
            style={{
              alignSelf: 'flex-end',
              backgroundColor: 'red',
              height: 22,
              width: 22,
              borderRadius: 50,
              marginTop: 10,
              top: 10,
              zIndex: 2,
              marginLeft: 10,
            }}
            onPress={() => markAsDelete(notification?.id)}
          >
            <Text
              style={{
                textAlign: 'center',
                color: 'white',
                fontWeight: 'bold',
              }}
            >
              x
            </Text>
          </TouchableOpacity>
          <Box
            style={{
              borderWidth: 3,
              padding: 10,
              // marginTop: 10,
              borderRadius: 12,
              borderColor: COLORS.lightGrey,
              backgroundColor:
                notification.readAt === null ? null : COLORS.lightGrey,
            }}
            py='2'
          >
            <TouchableOpacity onPress={() => onPressNotification(notification)}>
              <HStack space={2}>
                <VStack>
                  <Image
                    size={'sm'}
                    resizeMode='cover'
                    alt='img loading..'
                    borderRadius={12}
                    source={{
                      uri: image,
                    }}
                  />
                </VStack>

                <VStack w={250}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}
                  >
                    <Text
                      _dark={{
                        color: 'warmGray.50',
                      }}
                      color='coolGray.800'
                      bold
                      style={{ padding: 4 }}
                    >
                      {notification?.initiatedByName}
                    </Text>

                    <Badge
                      colorScheme='info'
                      style={{ marginTop: 5, marginRight: 15 }}
                    >
                      {showBadgeMessage(notification?.type)}
                    </Badge>
                  </View>

                  <Text
                    color='coolGray.600'
                    _dark={{
                      color: 'warmGray.200',
                    }}
                  >
                    {notification?.description}
                  </Text>
                </VStack>

                {/* <VStack>
                <Badge colorScheme="info" style={{ marginTop: 5 }}>
                  {notification?.type}
                </Badge>
              </VStack> */}
              </HStack>
            </TouchableOpacity>
          </Box>
        </View>
      );
    });

  if (loadNotification) {
    return <CustomLoading content={t('loading') + '...'} top={null} />;
  }

  return (
    <View>
      <CustomHeader title={t('notification')} back navigation={navigation} />
      <ScrollView
        style={{
          backgroundColor: 'white',
          height: AppHeight(80),
          paddingHorizontal: 15,
        }}
      >
        {loadNotification ? (
          <Text>{t('loading') + '...'}</Text>
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
          <Box>{renderNorifications && renderNorifications}</Box>
        )}
      </ScrollView>
    </View>
  );
};

export default SpNotifications;

const styles = StyleSheet.create({});
