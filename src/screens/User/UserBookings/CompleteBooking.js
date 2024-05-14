import { FlatList, View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import CustomBookingCard from '../../../components/Cards/CustomBookingCard';
import { AppHeight, COLORS } from '../../../utils';
import FeedBackModal from '../../../components/Modals/FeedBackModal';
import { BookingFeedbackService } from '../../../services/UserServices/UserService';
import WarnToast from '../../../components/Toast/WarnToast';
import CustomLoading from '../../../components/Loading/CustomLoading';
import { useDispatch, useSelector } from 'react-redux';
import { useToast } from 'native-base';
import SuccessToast from '../../../components/Toast/SuccessToast';
import {
  getCompleteBookings,
  getDashboardDetails,
  getInprogressBookings,
} from '../../../store/client/ClientActions';
import { useTranslation } from 'react-i18next';
import {
  getBearerRequest,
  postBearerRequest,
} from '../../../services/ApiServices';
import {
  GET_BKING_DATE,
  REOPEN_BOOKING_URL,
} from '../../../services/ApiConstants';
import ReOpenBookingModal from '../../../components/Modals/ReOpenBookingModal';

const CompleteBooking = ({ route }) => {
  const { navigation } = route;

  const [visible, setVisible] = useState(false);
  const [review, setReview] = useState('');
  const [loading, setLoading] = useState(false);
  const [booking, setBooking] = useState(null);
  const user = useSelector((state) => state.AuthReducer.user);
  const [warrantyDate, setWarrantyDate] = useState('');
  const toast = useToast();
  const { t } = useTranslation();
  const completeBookings = useSelector(
    (state) => state.ClientReducer.completedBookings
  );
  const loadBookings = useSelector((state) => state.ClientReducer.loadBookings);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCompleteBookings());
    getCompleteBookingDate();
  }, []);

  const getCompleteBookingDate = async () => {
    try {
      let response = await postBearerRequest(GET_BKING_DATE);
      setWarrantyDate(response.data);
    } catch (error) {
      WarnToast(t('Error'), error);
      console.log(error);
    }
  };

  const onReOpenPress = (bookingData) => {
    setBooking(bookingData);
    setVisible(!visible);
  };

  const OnReOpenBooking = async (booking) => {
    setLoading(true);

    let data = {
      bookingId: booking.id,
      reason: review,
    };

    try {
      let response = await postBearerRequest(REOPEN_BOOKING_URL, data);
      SuccessToast(t('Success'), response.message);
      dispatch(getInprogressBookings());
      dispatch(getCompleteBookings());
      dispatch(getDashboardDetails());
      navigation.navigate('BookingHomeScreens', {
        screen: 'UserBookingHome',
        params: { index: 1 },
      });
      setLoading(false);
      setVisible(false);
    } catch (error) {
      setLoading(false);
      setVisible(false);
      WarnToast(t('Error'), error);
      console.log(error);
    }
  };

  if (loadBookings) {
    return (
      <CustomLoading
        content={t('loading') + ' ' + t('complete_booking') + '...'}
        top={AppHeight(30)}
      />
    );
  }

  if (loading) {
    return (
      <CustomLoading
        content={t('loading') + ' ' + t('complete_booking') + '...'}
        top={AppHeight(30)}
      />
    );
  }

  return (
    <View style={{ height: AppHeight(80), backgroundColor: COLORS.lightGrey }}>
      {completeBookings === null || completeBookings?.length === 0 ? (
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text style={{ color: COLORS.grey }}>
            {t('complete_booking_placeholder')}
          </Text>
        </View>
      ) : (
        <FlatList
          data={completeBookings}
          style={{ paddingBottom: AppHeight(30) }}
          renderItem={({ item, index }) => (
            <View
              key={index}
              style={{ paddingHorizontal: 10, paddingVertical: 10 }}
            >
              <CustomBookingCard
                bookings={item}
                status={'Completed'}
                index={index}
                onButtonPress={onReOpenPress}
                navigation={navigation}
                warrantyDate={warrantyDate}
              />
            </View>
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      )}

      {/* <FeedBackModal
        booking={booking}
        visible={visible}
        setReview={setReview}
        setRatings={setRatings}
        onButtonPress={BookingFeedback}
        loading={loading}
        dismiss={() => setVisible(false)}
      /> */}

      <ReOpenBookingModal
        booking={booking}
        visible={visible}
        setReview={setReview}
        onButtonPress={OnReOpenBooking}
        loading={loading}
        dismiss={() => setVisible(false)}
      />
    </View>
  );
};

export default CompleteBooking;
