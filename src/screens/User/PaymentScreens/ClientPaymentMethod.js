import { Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useToast } from 'native-base';
import SuccessToast from '../../../components/Toast/SuccessToast';
import CustomHeader from '../../../components/CustomHeader';
import CustomButton from '../../../components/CustomButton';
import { AppHeight, AppWidth, COLORS } from '../../../utils';
import { useTranslation } from 'react-i18next';
import CustomCheckBox from '../../../components/CustomCheckBox';
import { CustomIcon } from '../../../components/CustomIcon';
import { useDispatch, useSelector } from 'react-redux';
import { postBearerRequest } from '../../../services/ApiServices';
import { END_BOOKING_URL } from '../../../services/ApiConstants';
import { getDashboardDetails } from '../../../store/client/ClientActions';
import WarnToast from '../../../components/Toast/WarnToast';

const ClientPaymentMethod = ({ route, navigation }) => {
  const { data, totalAmount } = route.params;

  const toast = useToast();
  const { t } = useTranslation();
  const [method, setMethod] = useState('');
  const user = useSelector((state) => state.AuthReducer.user);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const onPressPaymentRequest = async () => {
    setLoading(true);

    if (method === '') {
      WarnToast('Please select a payment method');
      setLoading(false);
    } else {
      let sendingData = {
        bookingId: data?.id,
        paymentMethod: method === 'cash' ? 'Cash' : 'Wallet',
      };

      try {
        let response = await postBearerRequest(END_BOOKING_URL, sendingData);
        dispatch({ type: 'FEEDBACK_VISIBLE', payload: true });
        SuccessToast(t('Success'), 'Booking Finsihed Successfully');
        dispatch(getDashboardDetails());
        setLoading(false);
        navigation.push('UserHome');
      } catch (error) {
        setLoading(false);
        console.log('error', error);
        WarnToast(t('Error'), error);
      }
    }
  };

  useEffect(() => {
    handleCheckBox('cash');
  }, []);

  // useEffect(() => {
  //   navigation.getParent()?.setOptions({
  //     tabBarStyle: {
  //       display: "none",
  //     },
  //   });
  //   return () =>
  //     navigation.getParent()?.setOptions({
  //       height: Platform.OS === "ios" ? 80 : 60,
  //     });
  // }, [navigation]);

  const handleCheckBox = (value) => {
    setMethod(value);
  };

  const wallet_balance = '10,000';
  const billing_amount = '150';
  return (
    <View
      style={{
        height: AppHeight(100),
        backgroundColor: COLORS.white,
      }}
    >
      <CustomHeader title={t('payment_method')} back navigation={navigation} />

      <ScrollView>
        {/* <BillSummaryCard /> */}
        <View style={{ paddingHorizontal: 15, marginTop: 15 }}>
          <Text style={{ fontWeight: 'bold' }}>
            {t('payment_method_title')}
          </Text>
        </View>
        {/* <CreditCardInfo method={method} setMethod={handleCheckBox} /> */}

        <View style={{ paddingHorizontal: 15, marginTop: 15 }}>
          <View style={styles.select_payment_container}>
            <CustomCheckBox
              isChecked={method === 'cash'}
              onPress={() => handleCheckBox('cash')}
            />

            <View style={{ marginLeft: 10 }}>
              <CustomIcon name={'handCash'} />
            </View>

            <Text
              style={{ color: COLORS.black, padding: 5, fontWeight: 'bold' }}
            >
              {t('cash_payment')}
            </Text>
          </View>

          <Text style={{ color: COLORS.primary }}>
            * We are currently supporting cash on hand method only.
          </Text>

          {/* <View style={styles.select_payment_container}>
            <CustomCheckBox
              isChecked={method === "wallet"}
              onPress={() => handleCheckBox("wallet")}
            />

            <View style={{ marginLeft: 10 }}>
              <CustomIcon name={"handCash"} />
            </View>

            <Text
              style={{ color: COLORS.black, padding: 5, fontWeight: "bold" }}
            >
              {t("wallet_payment")}
            </Text>
          </View> */}

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 5,
            }}
          >
            <View>
              <Text style={styles.heading}>Billing Amount</Text>
            </View>
            <View>
              <Text style={styles.heading}>
                {totalAmount} {user?.currencyCode}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.viewBtn}>
        <CustomButton
          title={t('pay_now') + ' ' + totalAmount + ' ' + user?.currencyCode}
          width={'90%'}
          center
          loading={loading}
          onPress={onPressPaymentRequest}
        />
      </View>
    </View>
  );
};

export default ClientPaymentMethod;

const styles = StyleSheet.create({
  select_payment_container: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    flexDirection: 'row',
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 15,
    borderColor: COLORS.lightGrey,
    marginBottom: 10,
  },

  viewBtn: {
    position: 'absolute',
    bottom: 0,
    height: AppHeight(100 / 2.9),
    width: AppWidth(100),
    justifyContent: 'center',
    paddingHorizontal: 15,
  },

  heading: {
    fontWeight: 'bold',
    paddingVertical: 10,
  },
});
