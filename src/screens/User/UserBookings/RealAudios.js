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
  getCancelBookings,
  getCompleteBookings,
  getDashboardDetails,
  getRealAudios,
} from '../../../store/client/ClientActions';
import { useTranslation } from 'react-i18next';

const RealAudios = ({ route }) => {
  const { navigation } = route;
  const [loading, setLoading] = useState(false);
  const realAudios = useSelector(
    (state) => state.ClientReducer.realAudios
  );
  const loadAudios = useSelector((state) => state.ClientReducer.loadAudios);
  const dispatch = useDispatch();
  const toast = useToast();
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(getRealAudios());
  }, []);

  const CancelBooking = async (id) => {
    setLoading(true);
    try {
      let response = await cancelBooking(id);

      SuccessToast(t('Success'), t('booking_cancel_msg'));

      navigation.navigate('Home');
      dispatch(getRealAudios());
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

  if (loadAudios) {
    return (
      <CustomLoading
        content={t('loading') + ' ' + t('audio_list') + '...'}
        top={AppHeight(30)}
      />
    );
  }

  if (loading) {
    return (
      <CustomLoading
        content={t('loading') + ' ' + t('audio_list') + '...'}
        top={AppHeight(30)}
      />
    );
  }

  console.log(realAudios)
  return (
    <View style={{ height: AppHeight(80), backgroundColor: COLORS.lightGrey }}>
      {realAudios?.services?.length === 0 ? (
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text style={{ color: COLORS.grey }}>
            {t('audio_placeholder')}
          </Text>
        </View>
      ) : (
        <FlatList
          data={realAudios?.services}
          style={{ paddingBottom: AppHeight(30) }}
          renderItem={({ item, index }) => (
            <View
              key={index}
              style={{ paddingHorizontal: 10, paddingVertical: 10 }}
            >
              <CustomAudioCard
                bookings={item}
                status={'Accepted'}
                index={index}
                onButtonPress={CancelBooking}
                onSuccessPress={FinishBooking}
                navigation={navigation}
              />
            </View>
          )}
        />
      )}
    </View>
  );
};

export default RealAudios;
