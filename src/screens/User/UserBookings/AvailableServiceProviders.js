import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import NoDataFound from '../../../components/Loading/NoDataFound';
import {
  getBearerRequest,
  postBearerRequest,
} from '../../../services/ApiServices';
import {
  GET_BKING_ASSIGN_TIME,
  GET_BKING_DATE,
  GET_SP_AVAILABLE_BOOKING_URL,
} from '../../../services/ApiConstants';
import SpCustomList from '../../../components/List/SpCustomList';
import CustomLoading from '../../../components/Loading/CustomLoading';
import CustomHeader from '../../../components/CustomHeader';
import { AppHeight, COLORS, ScreenHeight } from '../../../utils';
import moment from 'moment';
import momentTimezone from 'moment-timezone';
import { useTranslation } from 'react-i18next';
import WarnToast from '../../../components/Toast/WarnToast';
import { showError } from '../../../utils/helperFunction';

const AvailableServiceProviders = ({ route, navigation }) => {
  const { updatedAt, bookingId } = route.params;

  const [serviceProviders, setServiceProviders] = useState();
  const [loading, setLoading] = useState(false);
  const [secondsRemaining, setSecondsRemaining] = useState(0);

  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [addedTime, setAddedTime] = useState('');
  const timerRef = useRef(null);
  const { t } = useTranslation();

  useEffect(() => {
    getServicesList();
    getAddedTime();
  }, []);

  useEffect(() => {
    const createdAtMoment = moment.utc(updatedAt);

    const createdAtLocal = createdAtMoment.tz(momentTimezone.tz.guess());
    const localTime = moment();

    const endTime = moment(createdAtLocal).add(addedTime, 'minutes');

    const remainingTime = endTime.diff(localTime);
    const nonNegativeRemainingTime = Math.max(remainingTime, 0);

    const remainingMinutes = Math.floor(nonNegativeRemainingTime / 60000);
    const remainingSeconds = Math.floor(
      (nonNegativeRemainingTime % 60000) / 1000
    );

    setMinutes(remainingMinutes);
    setSeconds(remainingSeconds);

    if (nonNegativeRemainingTime > 0) {
      timerRef.current = setInterval(() => {
        setSeconds((prevSeconds) => {
          if (prevSeconds > 0) {
            return prevSeconds - 1;
          } else {
            setMinutes((prevMinutes) => {
              if (prevMinutes > 0) {
                return prevMinutes - 1;
              } else {
                clearInterval(timerRef.current);
                handleTimerCompletion();
                return 0;
              }
            });
            return 59;
          }
        });
      }, 1000);
    }

    return () => clearInterval(timerRef.current);
  }, [updatedAt, addedTime]);

  const handleTimerCompletion = () => {
    // Perform your desired action here
    setMinutes(0);
    setSeconds(0);
  };

  const getServicesList = async () => {
    setLoading(true);
    try {
      let response = await getBearerRequest(
        GET_SP_AVAILABLE_BOOKING_URL + '?bookingid=' + bookingId
      );
      setLoading(false);

      setServiceProviders(response.data);
    } catch (error) {
      setLoading(false);

      console.log(error);
    }
  };

  const getAddedTime = async () => {
    try {
      let response = await getBearerRequest(GET_BKING_ASSIGN_TIME);
      setAddedTime(response.data);
    } catch (error) {
      WarnToast(t('Error'), error);
      console.log(error);
    }
  };

  const onPressNotification = () => {
    navigation.navigate('Home', { screen: 'UserNotification' });
  };

  if (loading) {
    return (
      <CustomLoading
        content={t('loading') + ' ' + t('Service Provider') + '....'}
        top={null}
      />
    );
  } else {
    return (
      <View style={{ backgroundColor: COLORS.white }}>
        <CustomHeader
          title={t('Service Provider')}
          navigation={navigation}
          back
          icon
          onPressNotification={onPressNotification}
        />

        {minutes === 0 ? null : (
          <View style={{ backgroundColor: 'red', padding: 5 }}>
            <Text
              style={{
                color: 'white',
                fontWeight: 'bold',
                textAlign: 'center',
              }}
            >
              Remaining Time: {minutes.toString().padStart(2, '0')} :{' '}
              {seconds.toString().padStart(2, '0')}
            </Text>
          </View>
        )}

        <View style={{ height: ScreenHeight }}>
          {serviceProviders?.length > 0 ? (
            <SpCustomList
              data={serviceProviders}
              navigation={navigation}
              // onNavigation={onPressList}
            />
          ) : (
            <NoDataFound
              content={t('sp_placeholder') + ':( '}
              top={AppHeight(40)}
            />
          )}
        </View>
      </View>
    );
  }
};

export default AvailableServiceProviders;

const styles = StyleSheet.create({});
