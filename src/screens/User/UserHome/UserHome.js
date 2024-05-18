import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import CustomHeader from '../../../components/CustomHeader';
import { AppFontSize, AppHeight, AppWidth, COLORS } from '../../../utils';
import CustomSearchInput from '../../../components/CustomSearchInput';
import CustomImageSlider from '../../../components/CustomImageSlider';

import { useToast } from 'native-base';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { navigate } from '../../../../RootNavigation';
import {
  deviceCountryCode,
  getCurrentLocation,
} from '../../../utils/helperFunction';
import ClientFeedBackModal from '../../../components/Modals/ClientFeedBackModal';
import CustomButton from '../../../components/CustomButton';
import { getNotifications } from '../../../store/notifications/NotificationActions';
import CustomLoading from '../../../components/Loading/CustomLoading';
import { ScrollView } from 'react-native';
import { CustomIcon } from '../../../components/CustomIcon';
import fcmService from '../../../utils/NotificationHandler/FCMService';
import localNotificationService from '../../../utils/NotificationHandler/LocalNotification';
import {
  getBearerRequest,
  postBearerRequest,
} from '../../../services/ApiServices';
import {
  GET_BOOKING_BY_ID_URL,
  USER_GET_DASHB_URL,
  USER_PROMOTIONS_URL,
} from '../../../services/ApiConstants';
import { getDashboardDetails } from '../../../store/client/ClientActions';
import FeedBackModal from '../../../components/Modals/FeedBackModal';

const SECTIONS = [
  {
    icon: 'inProgressIcon',
    label: 'Services In Progress',
  },
  {
    icon: 'newJobIcon',
    label: 'Scheduled Services',
  },
  {
    icon: 'jobIcon',
    label: 'Work History',
  },
  // {
  //   icon: "ServiceProviderWallet",
  //   label: "My Wallet",
  // },
];

const UserHome = ({ navigation }) => {
  const [inputs, setInputs] = useState({
    search: '',
    services: null,
    code: deviceCountryCode(),
    promotions: null,
  });
  const toast = useToast();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  // const { isLoading, data: serviceList, isError, error } = getServices("PK");
  const user = useSelector((state) => state.AuthReducer.user);
  const [selectSearch, setSelectSearch] = useState(false);

  const feedBackVisible = useSelector(
    (state) => state.NotificationReducer.feedBackVisible
  );

  const dashDetail = useSelector((state) => state.ClientReducer.dashDetail);

  const loadNotification = useSelector(
    (state) => state.NotificationReducer.loadNotification
  );

  useEffect(() => {
    dispatch(getNotifications());
    dispatch(getDashboardDetails());
    getPromotions();

    getCurrentLocation()
      .then((location) =>
        dispatch({
          type: 'CURRENT_LOCATION_CORDS',
          payload: {
            latitude: location.latitude,
            longitude: location.longitude,
          },
        })
      )
      .catch((error) => console.warn(error));
  }, []);

  const getPromotions = async () => {
    try {
      let response = await getBearerRequest(USER_PROMOTIONS_URL);

      console.log(response.data)
      handleOnchange(response.data, 'promotions');
    } catch (error) {
      console.log('error', error);
    }
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

  useEffect(() => {
    const onRegister = (token) => {
      // console.log("[App] onRegister. We get FCM Token: ", token);
    };

    const onNotification = (notify, data) => {
      console.log('User\n', 'Data', data, '\nNotification', notify);
      const options = {
        soundName: 'default',
        playSound: true,
      };

      if (notify)
        localNotificationService.showNotification(
          0,
          notify.title,
          notify.body,
          notify,
          options
        );
    };

    const onOpenNotification = (notify, data) => {
      console.log(
        'User Opens Notification\n',
        'Data',
        data,
        '\nNotification',
        notify
      );
      if (data.type === 'AcceptBySPBooking') {
        navigation.navigate('AudioHomeScreens', {
          screen: 'AgentProfileScreen',
          params: {
            ProfileInfo: data,
            serviceProviderId: data.initiatedById,
            bookingId: data.bookingId,
            action: 'Accepted',
          },
        });
      }

      if (data.type === 'EndBooking') {
        getBookingDetails(data.bookingId);
      }

      if (data.type === 'Message') {
        navigation.navigate('UserInbox', {
          chatInfo: {
            serviceProviderId: data.initiatedById,
            serviceProviderName: data.initiatedByName,
            serviceProviderImage: data.initiatedByImage,
          },
        });
      }

      if (data.type === 'HelpCenterMessage') {
        navigation.navigate('UserProfileHome', {
          screen: 'ProfileHelp',
        });
      }
    };

    fcmService.registerAppWithFCM();
    fcmService.register(onRegister, onNotification, onOpenNotification);
    localNotificationService.configure(onOpenNotification);

    return () => {
      fcmService.unRegister();
    };
  }, []);

  const handleOnchange = (text, input) => {
    setInputs((prevState) => ({ ...prevState, [input]: text }));
  };

  const onPressNotification = () => {
    navigation.navigate('UserNotification');
  };

  const onPressBook = () => { };

  if (loadNotification) {
    return <CustomLoading content={t('loading') + '....'} top={null} />;
  }

  const mergedSections = SECTIONS.map((section, index) => {
    switch (index) {
      case 0:
        return {
          ...section,
          count: dashDetail?.inProgressServicesCount,
        };
      case 1:
        return {
          ...section,
          count: dashDetail?.scheduledServicesCount,
        };
      case 2:
        return {
          ...section,
          count: dashDetail?.workHistoryCount,
        };
      case 3:
        return {
          ...section,
          count: dashDetail?.walletBalance,
        };
      default:
        return section;
    }
  });

  const onPressDashCard = (value) => {
    if (value === 'My Wallet') {
      navigation.navigate('UserProfileHome', { screen: 'Wallet' });
    } else if (value === 'Services In Progress') {
      navigation.navigate('AudioHomeScreens', {
        screen: 'UserBookingHome',
        params: { index: 1 },
      });
    } else if (value === 'Scheduled Services') {
      navigation.navigate('AudioHomeScreens', {
        screen: 'UserBookingHome',
        params: { index: 0 },
      });
    } else if (value === 'Work History') {
      navigation.navigate('AudioHomeScreens', {
        screen: 'UserBookingHome',
        params: { index: 2 },
      });
    }
  };

  return (
    <View
      style={{
        backgroundColor: 'white',
        height: AppHeight(100),
      }}
    >
      <CustomHeader
        title={t('services')}
        icon
        navigation={navigation}
        // search={true}
        onPressNotification={onPressNotification}
      // setSelectSearch={setSelectSearch}
      // selectSearch={selectSearch}
      />

      {selectSearch ? (
        <View
          style={{
            backgroundColor: COLORS.primary,
            padding: AppHeight(1.5),
          }}
        >
          <CustomSearchInput
            onChangeText={(text) => handleOnchange(text, 'search')}
            // onFocus={() => handleError(null, "search")}
            IconName={'searchIcon'}
            placeholder={t('search_service')}
          />
        </View>
      ) : null}

      <CustomImageSlider onPressBook={onPressBook} data={inputs?.promotions} />

      <View style={styles.viewBtn}>
        <CustomButton
          title={t('New') + ' ' + t('services')}
          onPress={() =>
            navigation.navigate('AllServices', {
              subCatAvailable: false,
              address: 'Base',
            })
          }
        />
      </View>

      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          paddingBottom: AppHeight(30),
          paddingHorizontal: 15,
          marginTop: 15,
        }}
      >
        {mergedSections.map(({ label, icon, count, value, color }, index) => {
          return (
            <View
              style={{
                flexDirection: 'row',
              }}
              key={index}
            >
              <TouchableOpacity
                style={styles.serviceCard}
                onPress={() => onPressDashCard(label)}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}
                >
                  <CustomIcon name={icon} color={COLORS.primary} />

                  <Text style={[{ fontSize: 30 }]}>{count}</Text>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}
                >
                  <Text style={styles.item}>{t(label)}</Text>
                </View>
              </TouchableOpacity>
            </View>
          );
        })}
      </View>

      {feedBackVisible ? (
        <ClientFeedBackModal
          visible={feedBackVisible && feedBackVisible}
          dismiss={() => dispatch({ type: 'FEEDBACK_VISIBLE', payload: false })}
        />
      ) : null}
    </View>
  );
};

export default UserHome;

const styles = StyleSheet.create({
  row: {
    flex: 1,
    justifyContent: 'space-between',
  },
  item: {
    // textAlign: "center",
    fontWeight: 600,
    marginTop: AppHeight(4),
    fontSize: 15,
    fontSize: AppFontSize(1.3),
  },
  serviceCard: {
    // alignItems: "center",
    width: AppWidth(43),
    // padding: AppHeight(2.5),
    paddingHorizontal: 15,
    paddingVertical: 15,
    marginTop: 13,
    borderWidth: 2,
    borderRadius: 12,
    borderColor: COLORS.lightGrey,
    backgroundColor: COLORS.primaryLight,
  },

  viewBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    // paddingHorizontal: 15,
  },
});
