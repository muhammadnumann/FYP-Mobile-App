import React, { useEffect, useState } from 'react';
import CustomHeader from '../../../components/CustomHeader';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { AppHeight, AppWidth, COLORS } from '../../../utils';
import CustomButton from '../../../components/CustomButton';
import CustomBorderButton from '../../../components/CustomBorderButton';
import {
  GET_BOOKING_BY_ID_URL,
  GET_CLIENT_INFO_BY_ID,
} from '../../../services/ApiConstants';
import { getBearerRequest } from '../../../services/ApiServices';
import BookingBillSummary from '../../../components/Cards/BookingBillSummary';
import { setSpAcceptBooking } from '../../../services/ServiceProviderServices/ServiceProviderService';
import { useDispatch, useSelector } from 'react-redux';
import { useToast } from 'native-base';
import { useTranslation } from 'react-i18next';
import { Box, HStack, VStack, Image, Badge } from 'native-base';
import { Rating } from 'react-native-ratings';
import BookingSummary from '../../../components/Cards/BookingSummary';
import { ScrollView } from 'react-native-gesture-handler';

export default function SpBookingDetail({ route, navigation }) {
  const { bookingId, bookedById, newBooking } = route.params;
  const [bookingDetail, setBookingDetail] = useState();
  const [laodingAccept, setLaodingAccept] = useState(false);
  const [laodingReject, setLaodingReject] = useState(false);
  const [SpDetail, setSpDetail] = useState();

  const user = useSelector((state) => state.AuthReducer.user);
  const dispatch = useDispatch();
  const toast = useToast();
  const { t } = useTranslation();

  useEffect(() => {
    getBookingDetails();
    getClientInfo();
  }, []);

  const getBookingDetails = async () => {
    try {
      let response = await getBearerRequest(
        GET_BOOKING_BY_ID_URL + '?bookingid=' + bookingId
      );

      setBookingDetail(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getClientInfo = async () => {
    try {
      let response = await getBearerRequest(
        GET_CLIENT_INFO_BY_ID + '?userid=' + bookedById
      );
      setSpDetail(response.data);
    } catch (error) {
      // setLoading(false);

      console.log('client -error', error);
    }
  };

  const onPressAccept = async (id, spId) => {
    setLaodingAccept(true);
    try {
      let response = await setSpAcceptBooking(id, spId);
      SuccessToast(t('Success'), t('job_accept_msg'));
      navigation.navigate('Dashboard');
      setLaodingAccept(false);
    } catch (error) {
      setLaodingAccept(false);
      console.log('accept error', error);
    }
  };

  const onPressReject = async (id) => {
    // setLaodingReject(true);
    // try {
    //   let response = await rejectJob(id);
    //   console.log(response);
    //   SuccessToast( t("Success"), t("job_reject_msg"));
    //   navigation.navigate("Dashboard");
    //   setLaodingReject(false);
    // } catch (error) {
    //   setLaodingReject(false);
    //   console.log(error);
    // }
  };

  let image = user?.uploadFileWebUrl + SpDetail?.profileImage;

  let isAccepted = bookingDetail?.isAccepted;
  let isAssigned = bookingDetail?.isAssigned;

  const totalAmount = bookingDetail?.services?.reduce((acc, service) => {
    return acc + service?.totalAmount;
  }, 0);

  const onPressGenerateBill = (bookingDetail) => {
    navigation.navigate('GenerateBill', { data: bookingDetail });
    dispatch({ type: 'FEEDBACK_DATA', payload: bookingDetail });
  };

  const renderAdditionalText = () => {
    if (isAssigned) {
      if (bookingDetail?.serviceProviderId === user?.id) {
        return (
          <CustomButton
            title={t('View Details')}
            width={AppWidth(25)}
            height={45}
            fontSize={12}
            top={8}
            onPress={() => onPressGenerateBill(bookingDetail)}
          />
        );
      } else {
        return <Text> {t('job_assign_message')}</Text>;
      }
    } else {
      if (isAccepted) {
        return <Text> {t('job_accept_message')}</Text>;
      }
    }
  };

  return (
    <View style={{ backgroundColor: 'white', height: AppHeight(100) }}>
      <ScrollView>
        <CustomHeader back navigation={navigation} title={'Booking Detail'} />
        <BookingSummary data={bookingDetail} />
        {/* <BookingBillSummary
          data={bookingDetail?.services}
          details={bookingDetail}
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
            <Text style={styles.heading}>{t('grand_total')}</Text>
          </View>
          <View>
            <Text style={styles.heading}>
              {totalAmount} {'  '}
              {user?.currencyCode}
            </Text>
          </View>
        </View>

        <View style={{ paddingHorizontal: 15 }}>
          {isAccepted === true || isAssigned === true ? null : (
            <View
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}
            >
              <CustomBorderButton
                title={'Cancel'}
                width={AppWidth(40)}
                height={45}
                fontSize={12}
                onPress={() => onPressReject(bookingDetail?.id)}
                loading={laodingReject}
              />
              <CustomBorderButton
                title={'Accept'}
                width={AppWidth(40)}
                height={45}
                fontSize={12}
                loading={laodingAccept}
                onPress={() => onPressAccept(bookingDetail?.id, user?.id)}
              />
            </View>
          )}

          <Text style={{ fontWeight: 'bold' }}>Client Info</Text>

          <Box
            style={{
              borderWidth: 3,
              padding: 10,
              marginTop: 10,
              borderRadius: 12,
              borderColor: COLORS.lightGrey,
            }}
            py='2'
          >
            <TouchableOpacity>
              <HStack space={2}>
                <VStack>
                  <Image
                    size={'sm'}
                    resizeMode='cover'
                    alt='fallback text'
                    borderRadius={12}
                    source={{
                      uri: image,
                    }}
                  />
                </VStack>

                <VStack w={220}>
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
                      style={{ padding: 4, fontWeight: 'bold' }}
                    >
                      {SpDetail?.fullName}
                    </Text>
                  </View>

                  <View style={{ alignSelf: 'flex-start' }}>
                    <Rating
                      imageSize={17}
                      readonly
                      startingValue={SpDetail?.rating}
                      style={{ marginTop: 4 }}
                    />
                  </View>
                </VStack>
              </HStack>
            </TouchableOpacity>
          </Box>

          {isAccepted === true || isAssigned === true ? null : (
            <CustomButton
              title={'Booking Direction'}
              width={AppWidth(92)}
              height={45}
              fontSize={12}
              onPress={() =>
                navigation.navigate('JobDirection', { data: bookingDetail })
              }
            />
          )}

          <View style={{ marginTop: 10 }}>{renderAdditionalText()}</View>

          {/* {isAssigned === true ? (
          <Text
            style={{
              fontWeight: "bold",
              color: COLORS.primary,
              paddingVertical: 10,
            }}
          >
            {t("job_assign_message")}
          </Text>
        ) : null}

        {isAccepted === true ? (
          <Text
            style={{
              fontWeight: "bold",
              color: COLORS.primary,
              paddingVertical: 10,
            }}
          >
            {t("job_accept_message")}
          </Text>
        ) : null} */}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  incrementBtn: {
    height: 20,
    width: 20,
    backgroundColor: COLORS.primary,
    borderRadius: 5,
  },
  heading: {
    fontWeight: 'bold',
  },

  inrementText: {
    color: COLORS.white,
    textAlign: 'center',
  },
});
