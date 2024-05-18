import { FlatList, View, Text, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import CustomAudioCard from '../../../components/Cards/CustomAudioCard';
import { AppHeight, COLORS } from '../../../utils';
import {
  FinishBookingService,
  cancelBooking,
} from '../../../services/SameApiServices';
import { useToast } from 'native-base';
import WarnToast from '../../../components/Toast/WarnToast';
import SuccessToast from '../../../components/Toast/SuccessToast';
import CustomLoading from '../../../components/Loading/CustomLoading';
import { useDispatch, useSelector } from 'react-redux';
import {
  getActiveBookings,
  getCancelBookings,
  getCompleteBookings,
  getDashboardDetails,
  getInprogressBookings,
} from '../../../store/client/ClientActions';
import { useTranslation } from 'react-i18next';
import { useIsFocused } from '@react-navigation/native';

const ActiveBooking = ({ route }) => {
  const { navigation } = route;
  const isFocused = useIsFocused();
  const [loading, setLoading] = useState(false);
  const inprogressBookings = useSelector(
    (state) => state.ClientReducer.inprogressBookings
  );
  const loadBookings = useSelector((state) => state.ClientReducer.loadBookings);
  const dispatch = useDispatch();
  const toast = useToast();
  const { t } = useTranslation();

  useEffect(() => {
    if (isFocused == true) {
      dispatch(getInprogressBookings());
    }
  }, [isFocused]);

  const CancelBooking = async (id) => {
    setLoading(true);
    try {
      let response = await cancelBooking(id);

      SuccessToast(t('Success'), t('booking_cancel_msg'));
      dispatch(getDashboardDetails());
      dispatch(getInprogressBookings());
      dispatch(getCancelBookings());
      navigation.push('Home');

      setLoading(false);
    } catch (error) {
      setLoading(false);
      // WarnToast( "error");
      console.log(error);
    }
  };

  const FinishBooking = async (bookings) => {
    navigation.navigate('ClientPaymentReceipt', { data: bookings, bookings });
  };

  if (loadBookings) {
    return (
      <CustomLoading
        content={t('loading') + ' ' + t('active_booking') + '...'}
        top={AppHeight(30)}
      />
    );
  }

  if (loading) {
    return (
      <CustomLoading
        content={t('loading') + ' ' + t('active_booking') + '...'}
        top={AppHeight(30)}
      />
    );
  }
  return (
    <View style={{ height: AppHeight(75), backgroundColor: COLORS.lightGrey }}>
      {inprogressBookings?.length === 0 ? (
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text style={{ color: COLORS.grey }}>
            {t('active_booking_placeholder')}
          </Text>
        </View>
      ) : (
        <FlatList
          data={inprogressBookings}
          style={{ paddingBottom: AppHeight(30) }}
          renderItem={({ item, index }) => (
            <View
              key={index}
              style={{ paddingHorizontal: 10, paddingVertical: 10 }}
            >
              <CustomAudioCard
                bookings={item}
                status={'Active'}
                index={index}
                onButtonPress={CancelBooking}
                onSuccessPress={FinishBooking}
                navigation={navigation}
              />
            </View>
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      )}
    </View>
  );
};

export default ActiveBooking;
