import { StyleSheet, Text, View, Linking } from 'react-native';
import React, { useState, useEffect } from 'react';
import { AppHeight, AppWidth, COLORS, urlFormat } from '../../utils';
import CustomButton from '../CustomButton';
import CustomBorderButton from '../CustomBorderButton';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Badge, HamburgerIcon } from 'native-base';
import { Menu } from 'native-base';
import { TouchableOpacity } from 'react-native';
import { CustomIcon } from '../CustomIcon';
import { getBearerRequest } from '../../services/ApiServices';
import { GET_INVOICE_BOOKING_URL } from '../../services/ApiConstants';

const CustomBookingCard = React.memo(
  ({
    bookings,
    status,
    index,
    onButtonPress,
    onSuccessPress,
    navigation,
    warrantyDate,
  }) => {
    const user = useSelector((state) => state.AuthReducer.user);
    let checkUser = user?.id === bookings?.clientId;
    let image = urlFormat(bookings?.serviceProviderImage);
    const { t } = useTranslation();

    const dispatch = useDispatch();

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(targetDate));

    const targetDate = moment(bookings?.endedAt)
      .add(warrantyDate, 'days')
      .toDate();

    useEffect(() => {
      const timer = setTimeout(() => {
        setTimeLeft(calculateTimeLeft(targetDate));
      }, 1000);

      // Clear timeout if the component is unmounted or the target date is changed
      return () => clearTimeout(timer);
    }, [targetDate, timeLeft]);

    // Calculate the remaining time from the target date
    function calculateTimeLeft(targetDate) {
      const now = moment();
      const difference = moment(targetDate).diff(now);
      const duration = moment.duration(difference);

      return {
        days: Math.floor(duration.asDays()),
        hours: duration.hours(),
        minutes: duration.minutes(),
        seconds: duration.seconds(),
      };
    }

    // Format the remaining time as a string
    function formatTimeLeft(timeLeft) {
      const { days, hours, minutes, seconds } = timeLeft;
      const daysStr = days > 0 ? `${days}d ` : '';
      const hoursStr = hours < 10 ? `0${hours}` : hours;
      const minutesStr = minutes < 10 ? `0${minutes}` : minutes;
      const secondsStr = seconds < 10 ? `0${seconds}` : seconds;
      // return `${daysStr}${hoursStr}:${minutesStr}:${secondsStr}`;
      return { daysStr, hoursStr, minutesStr, secondsStr };
    }

    useEffect(() => {
      getInvoiceBooking();
    }, []);

    const getInvoiceBooking = async () => {
      try {
        let response = await getBearerRequest(
          GET_INVOICE_BOOKING_URL + '?id=' + bookings.id
        );
        // setInvoiceState(response.data);
        // setAvailableCountries(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    let { daysStr, hoursStr, minutesStr, secondsStr } =
      formatTimeLeft(timeLeft);

    let renderServicesSummary = bookings?.services?.map((service, index) => {
      return (
        <View key={index}>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <View style={{ width: AppWidth(40) }}>
              <Text>{service?.serviceName}</Text>
            </View>
            <View style={{ width: AppWidth(20) }}>
              <Text style={{ textAlign: 'center' }}>{service?.count}</Text>
            </View>
            <View style={{ width: AppWidth(20) }}>
              <Text style={{ textAlign: 'center' }}>
                {' '}
                {service?.totalAmount} {user?.currencyCode}
              </Text>
            </View>
          </View>
        </View>
      );
    });

    const totalAmount = bookings?.services?.reduce((acc, service) => {
      return acc + service?.totalAmount;
    }, 0);

    return (
      <View style={styles.container}>
        <View style={styles.profileSection}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: status === 'Cancelled' ? null : 'space-between',
              width: '100%',
            }}
          >
            {status === 'Accepted' ? (
              <>
                <CustomBorderButton
                  title={t('View Service Provider')}
                  width={'80%'}
                  height={50}
                  fontSize={12}
                  top={2}
                  center
                  onPress={() =>
                    navigation.navigate('AvailableServiceProviders', {
                      bookingId: bookings.id,
                      updatedAt: bookings.createdAt,
                    })
                  }
                />
              </>
            ) : null}

            {status === 'Active' ? (
              <>
                <TouchableOpacity
                  style={styles.iconButtonContainer}
                  onPress={() =>
                    navigation.navigate('UserInbox', { chatInfo: bookings })
                  }
                >
                  <CustomIcon name={'messageIcon'} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.iconButtonContainer}
                  onPress={() =>
                    Linking.openURL(`tel:${bookings.servicProviderPhoneNumber}`)
                  }
                >
                  <CustomIcon name={'phoneIcon'} />
                </TouchableOpacity>
              </>
            ) : null}

            {status === 'Active' ? (
              <Menu
                w='190'
                style={{ marginTop: 15 }}
                trigger={(triggerProps) => {
                  return (
                    <TouchableOpacity
                      accessibilityLabel='More options menu'
                      {...triggerProps}
                      style={{ marginTop: 10 }}
                    >
                      <HamburgerIcon size={8} />
                    </TouchableOpacity>
                  );
                }}
              >
                <Menu.Item
                  onPress={() =>
                    navigation.navigate('AgentProfileScreen', {
                      ProfileInfo: bookings,
                      serviceProviderId: bookings.serviceProviderId,
                      bookingId: bookings.bookingId,
                      action: bookings.action,
                      // serviceId: serviceId,
                    })
                  }
                >
                  {t('View Service Provider')}
                </Menu.Item>

                <Menu.Item onPress={() => onSuccessPress(bookings)}>
                  {t('View Details')}
                </Menu.Item>
                <Menu.Item onPress={() => onButtonPress(bookings.id)}>
                  {t('Cancel Booking')}
                </Menu.Item>
              </Menu>
            ) : null}

            {status === 'Accepted' ? (
              <Menu
                w='190'
                style={{ marginTop: 15 }}
                trigger={(triggerProps) => {
                  return (
                    <TouchableOpacity
                      accessibilityLabel='More options menu'
                      {...triggerProps}
                      style={{ marginTop: 10 }}
                    >
                      <HamburgerIcon size={8} />
                    </TouchableOpacity>
                  );
                }}
              >
                {/* <Menu.Item onPress={() => onSuccessPress(bookings)}>
                  {t("Finish Booking")}
                </Menu.Item> */}
                <Menu.Item onPress={() => onButtonPress(bookings.id)}>
                  {t('Cancel Booking')}
                </Menu.Item>
              </Menu>
            ) : null}
          </View>
        </View>

        {status !== 'Completed' && status !== 'Cancelled' ? (
          <View
            style={{
              borderWidth: 1,
              borderColor: COLORS.lightGrey,
              marginTop: 15,
            }}
          />
        ) : null}

        {/* <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <View>{renderServices}</View>

        <CustomBorderButton
          title={t(status)}
          width={"30%"}
          height={30}
          fontSize={12}
          top={8}
          status={status}
        />
      </View> */}

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingVertical: 10,
          }}
        >
          <View>
            <Text style={styles.title}>{t('Job ID')}</Text>

            <Text style={styles.subText}>{bookings.id}</Text>
          </View>

          <View>
            <Text style={styles.title}>{t('Date')}</Text>

            <Text style={styles.subText}>
              {moment(bookings.bookedAt).format('DD-MM-YYYY')}
            </Text>
          </View>

          <View>
            <Text style={styles.title}>{t('Time')}</Text>

            <Text style={styles.subText}>
              {bookings?.bookedStartTime} to {bookings?.bookedEndTime}
            </Text>
          </View>
        </View>

        {status === 'Completed' ? (
          <>
            <Text style={[styles.title, { top: 10, color: COLORS.primary }]}>
              {t('validity')}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingVertical: 10,
              }}
            >
              <View>
                <Text style={styles.title}>{t('days')}</Text>

                <Text style={[styles.subText, { color: COLORS.primary }]}>
                  {daysStr}
                </Text>
              </View>

              <View>
                <Text style={styles.title}>{t('hours')}</Text>

                <Text style={[styles.subText, { color: COLORS.primary }]}>
                  {hoursStr}
                </Text>
              </View>

              <View>
                <Text style={styles.title}>{t('mins')}</Text>

                <Text style={[styles.subText, { color: COLORS.primary }]}>
                  {minutesStr}
                </Text>
              </View>

              <View>
                <CustomButton
                  title={t('Re Open')}
                  width={AppWidth(25)}
                  height={45}
                  fontSize={12}
                  top={8}
                  onPress={() => onButtonPress(bookings)}
                />
                {/* <Text style={styles.title}>Sec</Text>

                <Text style={[styles.subText, { color: COLORS.primary }]}>
                  {secondsStr}
                </Text> */}
              </View>
            </View>
          </>
        ) : null}

        <View
          style={{
            borderWidth: 1,
            borderColor: COLORS.lightGrey,
            marginTop: 15,
          }}
        />

        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View style={{ width: AppWidth(40) }}>
            <Text style={[styles.heading, { textAlign: 'left' }]}>
              {t('Items')}
            </Text>
          </View>

          <View style={{ width: AppWidth(20) }}>
            <Text style={styles.heading}>{t('Qty')}</Text>
          </View>
          <View style={{ width: AppWidth(20) }}>
            <Text style={styles.heading}>{t('Price')}</Text>
          </View>
        </View>
        {renderServicesSummary}

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 5,
          }}
        >
          <View style={{ width: AppWidth(60) }}>
            <Text style={[styles.heading, { textAlign: 'left' }]}>
              {t('grand_total')}
            </Text>
          </View>
          <View style={{ width: AppWidth(20) }}>
            <Text style={styles.heading}>
              {totalAmount} {user?.currencyCode}
            </Text>
          </View>
        </View>
      </View>
    );
  }
);

export default CustomBookingCard;

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderColor: COLORS.lightGrey,
    padding: 10,
    // margin: 15,
    // paddingHorizontal: 40,

    borderRadius: 12,
    backgroundColor: COLORS.white,
  },
  profileSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  avatar: {
    height: 70,
    width: 70,
    borderRadius: 12,
  },
  subText: {
    fontSize: 15,
    color: COLORS.grey,
  },
  title: {
    fontSize: 15,
    fontWeight: 'bold',
    paddingVertical: 7,
  },
  heading: {
    fontWeight: 'bold',
    paddingVertical: 10,
    textAlign: 'center',
  },
  iconButtonContainer: {
    height: AppHeight(6),
    width: AppWidth(38),
    backgroundColor: COLORS.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    borderColor: COLORS.primary,
    borderWidth: 1,
  },
});
