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
} from '../../../utils/helperFunction';
import CustomButton from '../../../components/CustomButton';
import CustomLoading from '../../../components/Loading/CustomLoading';
import { ScrollView } from 'react-native';
import { CustomIcon } from '../../../components/CustomIcon';
import fcmService from '../../../utils/NotificationHandler/FCMService';
import localNotificationService from '../../../utils/NotificationHandler/LocalNotification';

import { getDashboardDetails } from '../../../store/client/ClientActions';

const SECTIONS = [
  {
    label: 'Total',
  },
  {
    label: 'Real',
  },
  {
    label: 'Fake',
  },
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
  const user = useSelector((state) => state.AuthReducer.user);
  const [selectSearch, setSelectSearch] = useState(false);

  const dashDetail = useSelector((state) => state.ClientReducer.dashDetail);

  const loadNotification = useSelector(
    (state) => state.NotificationReducer.loadNotification
  );

  useEffect(() => {
    dispatch(getDashboardDetails());
  }, []);



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
          count: dashDetail?.all,
          icon: 'totalAudioIcon',
          color: 'rgba(98, 106, 255, 0.2)'
        };
      case 1:
        return {
          ...section,
          count: dashDetail?.real,
          icon: 'realAudioIcon',
          color: 'rgba(121, 170, 0, 0.1)'
        };
      case 2:
        return {
          ...section,
          count: dashDetail?.fake,
          icon: 'fakeAudioIcon',
          color: 'rgba(255, 0, 0, 0.1)'
        };
      default:
        return section;
    }
  });

  const onPressDashCard = (value) => {
    if (value === 'Total') {
      navigation.navigate('AudioHomeScreens', {
        screen: 'UserBookingHome',
        params: { index: 0 },
      });
    } else if (value === 'Real') {
      navigation.navigate('AudioHomeScreens', {
        screen: 'UserBookingHome',
        params: { index: 1 },
      });
    } else if (value === 'Fake') {
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
        title={t('home')}
        icon
        navigation={navigation}
        // search={true}
        onPressNotification={onPressNotification}
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
                style={{
                  backgroundColor: color,
                  borderColor: color,
                  ...styles.serviceCard
                }}
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

      <View style={styles.viewBtn}>
        <CustomButton
          title={t('New') + ' Audio'}
          onPress={() =>
            navigation.navigate('AllServices', {
              subCatAvailable: false,
              address: 'Base',
            })
          }
        />
      </View>

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
    marginTop: AppHeight(1),
    fontSize: AppFontSize(1.3),
    fontSize: 25,
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
  },

  viewBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    // paddingHorizontal: 15,
  },
});
