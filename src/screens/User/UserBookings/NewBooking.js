import { FlatList, View, Text, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import CustomBookingCard from '../../../components/Cards/CustomBookingCard';
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
} from '../../../store/client/ClientActions';
import { useTranslation } from 'react-i18next';

const NewBooking = ({ route }) => {
  const { navigation } = route;
  const [loading, setLoading] = useState(false);
  const activeBookings = useSelector(
    (state) => state.ClientReducer.activeBookings
  );
  const loadBookings = useSelector((state) => state.ClientReducer.loadBookings);
  const dispatch = useDispatch();
  const toast = useToast();
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(getActiveBookings());
  }, []);

  const CancelBooking = async (id) => {
    setLoading(true);
    try {
      let response = await cancelBooking(id);

      SuccessToast(t('Success'), t('booking_cancel_msg'));

      navigation.navigate('Home');
      dispatch(getActiveBookings());
      dispatch(getCancelBookings());
      dispatch(getDashboardDetails());
      setLoading(false);
    } catch (error) {
      setLoading(false);
      // WarnToast( "error");
      console.log(error);
    }
  };

  const FinishBooking = async (bookings) => {
    navigation.navigate('ClientPaymentReceipt', { data: bookings });
  };

  if (loadBookings) {
    return (
      <CustomLoading
        content={t('loading') + ' ' + t('new_booking') + '...'}
        top={AppHeight(30)}
      />
    );
  }

  if (loading) {
    return (
      <CustomLoading
        content={t('loading') + ' ' + t('new_booking') + '...'}
        top={AppHeight(30)}
      />
    );
  }

  return (
    <View style={{ height: AppHeight(80), backgroundColor: COLORS.lightGrey }}>
      {activeBookings?.length === 0 ? (
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text style={{ color: COLORS.grey }}>
            {t('new_booking_placeholder')}
          </Text>
        </View>
      ) : (
        <FlatList
          data={activeBookings}
          style={{ paddingBottom: AppHeight(30) }}
          renderItem={({ item, index }) => (
            <View
              key={index}
              style={{ paddingHorizontal: 10, paddingVertical: 10 }}
            >
              <CustomBookingCard
                bookings={item}
                status={'Accepted'}
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

export default NewBooking;
