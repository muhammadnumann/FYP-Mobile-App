import { Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useToast } from 'native-base';
import SuccessToast from '../../../components/Toast/SuccessToast';
import CustomHeader from '../../../components/CustomHeader';
import CustomJobCard from '../../../components/Cards/CustomJobCard';
import BillSummaryCard from '../../../components/Cards/BillSummaryCard';
import CustomButton from '../../../components/CustomButton';
import { AppHeight, AppWidth, COLORS } from '../../../utils';
import { useTranslation } from 'react-i18next';
import {
  getBearerRequest,
  postBearerRequest,
} from '../../../services/ApiServices';
import {
  GET_VISIT_CHARGES_URL,
  SAVE_BOOKING_URL,
} from '../../../services/ApiConstants';
import {
  getDashboardDetails,
} from '../../../store/client/ClientActions';
import { useDispatch, useSelector } from 'react-redux';
import BookingBillSummary from '../../../components/Cards/BookingBillSummary';
import CustomBorderButton from '../../../components/CustomBorderButton';
import BookingSummary from '../../../components/Cards/BookingSummary';

const ClientBookingRecepient = ({ route, navigation }) => {
  const { data, total_amount } = route.params;
  const toast = useToast();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [charges, setCharges] = useState('');
  const [grandTotal, setGrandTotal] = useState(0);
  const user = useSelector((state) => state.AuthReducer.user);

  useEffect(() => {
    getGrandTotal();
    getVisitCharges();
  }, []);

  const getGrandTotal = () => {
    sum = 0;
    for (var i = 0; i < data?.services?.length; i++) {
      sum += data?.services[i]?.totalAmount;
    }
    setGrandTotal(sum);
  };

  const getVisitCharges = async () => {
    try {
      let response = await getBearerRequest(GET_VISIT_CHARGES_URL);

      setCharges(response.data);
      // setCharges()
    } catch (error) {
      console.log(error);
    }
  };

  const onPressPaymentRequest = () => {
    navigation.navigate('ClientPaymentMethod');
  };

  // useEffect(() => {
  //   navigation.getParent()?.setOptions({
  //     tabBarStyle: {
  //       display: "none",
  //     },
  //   });
  //   return () =>
  //     navigation.getParent()?.setOptions({
  //       tabBarStyle: {
  //         height: Platform.OS === "ios" ? 80 : 60,
  //       },
  //     });
  // }, [navigation]);

  const onPressBooking = async () => {
    setLoading(true);
    const sendingData = {
      bookedAt: data.bookedAt,
      bookedById: 0,
      clientId: data.clientId,
      bookedTime: data.bookedTime,
      services: data.services,
      latitude: data.latitude,
      longitude: data.longitude,
      bookedStartTime: data.bookedStartTime,
      bookedEndTime: data.bookedEndTime,
      otherDescription: data.reason,
    };

    try {
      let response = await postBearerRequest(SAVE_BOOKING_URL, sendingData);
      let sendingResponse = JSON.stringify(response);

      // SuccessToast( t("Success"), JSON.parse(sendingResponse).message);
      setLoading(false);
      dispatch(getDashboardDetails());

      navigation.push('BookingConfirmation', { status: true });
    } catch (error) {
      console.log(error);
      setLoading(false);
      navigation.push('BookingConfirmation', { status: false });
      // WarnToast( error);
    }
  };

  return (
    <View
      style={{
        height: AppHeight(100),
        backgroundColor: COLORS.white,
      }}
    >
      <CustomHeader title={t('booking_receipt')} back navigation={navigation} />

      <ScrollView style={{ height: AppHeight(70) }}>
        <BookingSummary data={data} />
        {/* <BookingBillSummary
          data={data.services}
          total_amount={total_amount}
          newBooking={true}
        /> */}

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 5,
            paddingHorizontal: 24,
          }}
        >
          <View>
            <Text style={styles.mainHeading}>{t('grand_total')}</Text>
          </View>
          <View>
            <Text style={styles.mainHeading}>
              {grandTotal} {'  '}
              {user?.currencyCode}
            </Text>
          </View>
        </View>

        {data.other ? (
          <View style={{ paddingHorizontal: 15, paddingVertical: 8 }}>
            <Text style={{ fontWeight: 'bold' }}>{t('Other')}</Text>
            <Text>{data?.reason}</Text>
          </View>
        ) : null}
      </ScrollView>

      <View style={styles.viewBtn}>
        <CustomButton
          title={t('book_now')}
          width={'100%'}
          onPress={onPressBooking}
          loading={loading}
        />

        <CustomBorderButton
          title={t('cancel')}
          top={1}
          width={'100%'}
          onPress={() => navigation.push('UserHome')}
        />

        <Text style={{ color: 'red', textAlign: 'center', paddingVertical: 2 }}>
          * Visit charges will be apply {user?.currencySymbol} {charges}
        </Text>
      </View>
    </View>
  );
};

export default ClientBookingRecepient;

const styles = StyleSheet.create({
  viewBtn: {
    position: 'absolute',
    bottom: 0,
    height: AppHeight(100 / 3),
    width: AppWidth(100),
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
  },

  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  services: {
    padding: 15,
  },
  service: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  serviceTitle: {
    width: 150,
  },
  servicePrice: {
    width: 100,
  },
  other: {
    padding: 15,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  otherTitle: {
    width: 150,
  },
  otherValue: {
    width: 100,
  },
  total: {
    padding: 15,
  },
  totalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  totalValue: {
    width: 100,
  },
  mainHeading: {
    fontWeight: 'bold',
    fontSize: 16,
    paddingVertical: 10,
  },
});
