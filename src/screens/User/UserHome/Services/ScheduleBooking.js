import moment from 'moment';
import { useToast } from 'native-base';
import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import CustomButton from '../../../../components/CustomButton';
import CustomHeader from '../../../../components/CustomHeader';
import { GetUserProfileInfo } from '../../../../services/SameApiServices';
import {
  AppHeight,
  AppWidth,
  COLORS,
  currentMonth,
  currentYear,
  fontSize,
  getDayNames,
  nextMonthDayNames,
} from '../../../../utils';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import CustomBorderButton from '../../../../components/CustomBorderButton';

export default function ScheduleBooking({ route, navigation }) {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedDateIndex, setSelectedDateIndex] = useState();
  const [selectTime, setSelectedTime] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [selectedStartTimeIndex, setSelectedStartTimeIndex] = useState(null);

  const [loading, setLoading] = useState(false);
  let booking_date = nextMonthDayNames(currentMonth, currentYear);

  const toast = useToast();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const {
    total_amount,
    serviceId,
    selectedCheckboxes,
    latitude,
    longitude,
    reason,
    other,
  } = route.params;

  const { data: userDetails } = GetUserProfileInfo();

  const onPressDate = (index) => {
    booking_date.map((date, i) => {
      if (index === i) {
        setSelectedDate(date.day);
        setSelectedDateIndex(i);
      }
    });
  };

  useEffect(() => {
    setSelectedDate(booking_date[0].day);
    setSelectedDateIndex(0);
  }, []);

  useEffect(() => {
    setStartTime(timeSlots[0].from);
    setEndTime(timeSlots[0].to);
    setSelectedStartTimeIndex(0);
  }, [selectedDate]);

  useEffect(() => {
    navigation.getParent()?.setOptions({
      tabBarStyle: {
        display: 'none',
      },
    });
    return () =>
      navigation.getParent()?.setOptions({
        height: Platform.OS === 'ios' ? 80 : 60,
      });
  }, [navigation]);

  const onPressNext = () => {
    if (selectedDate === '') {
      WarnToast(t('select_date'));
    } else if (startTime === '') {
      WarnToast(t('start_time_err'));
    } else if (endTime === '') {
      WarnToast(t('end_time_err'));
    } else {
      let date = `${currentYear}-${currentMonth}-${selectedDate}`;
      let time = selectTime;
      var timeAndDate = moment(date).toISOString();
      let booking_time = moment(date).format('hh:mm');

      const sendingData = {
        bookedAt: timeAndDate,
        bookedById: 0,
        clientId: userDetails?.data?.id,
        // serviceProviderId: ProfileInfo.id,
        bookedTime: booking_time,
        bookedStartTime: startTime,
        bookedEndTime: endTime,
        services: selectedCheckboxes,
        latitude: latitude,
        longitude: longitude,
        reason: reason,
        other: other,
      };
      navigation.navigate('ClientBookingRecepient', {
        data: sendingData,
        total_amount: total_amount,
        newBooking: true,
      });
    }
  };

  const handleStartTimePress = (from, to, index) => {
    setStartTime(from);
    setEndTime(to);
    setSelectedStartTimeIndex(index);
  };

  const generateTimeSlots = (selectedDate) => {
    const timeSlots = [];
    const now = moment();
    const startHour = parseInt(selectedDate) === now.date() ? now.hours() : 0;

    for (let i = startHour; i <= 23; i++) {
      const start = moment({ hour: i, minute: 0 });
      const end = moment({ hour: i + 1, minute: 0 });
      timeSlots.push({ from: start.format('HH:mm'), to: end.format('HH:mm') });
    }

    return timeSlots;
  };

  const timeSlots = generateTimeSlots(selectedDate);

  const onPressNotification = () => {
    navigation.navigate('Home', { screen: 'UserNotification' });
  };

  return (
    <View style={{ height: AppHeight(100), backgroundColor: COLORS.white }}>
      <CustomHeader
        title={t('booking')}
        navigation={navigation}
        back
        icon
        onPressNotification={onPressNotification}
      />
      <View>
        <View style={{ paddingHorizontal: 15 }}>
          <Text style={styles.header}>{t('booking_title')}</Text>
          <FlatList
            data={booking_date}
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            horizontal
            renderItem={({ item, index }) => {
              if (index === selectedDateIndex) {
                return (
                  <TouchableOpacity
                    style={[
                      styles.dateContainer,
                      { backgroundColor: COLORS.primary },
                    ]}
                    key={index}
                    onPress={() => onPressDate(index)}
                  >
                    <Text style={[styles.date_day, { color: COLORS.white }]}>
                      {item.day}
                    </Text>
                    <Text style={[styles.date_name, { color: COLORS.white }]}>
                      {t(item.name.substring(0, 3))}
                    </Text>
                  </TouchableOpacity>
                );
              } else {
                return (
                  <TouchableOpacity
                    style={styles.dateContainer}
                    key={index}
                    onPress={() => onPressDate(index)}
                  >
                    <Text style={styles.date_day}>{item.day}</Text>
                    <Text style={styles.date_name}>
                      {t(item.name.substring(0, 3))}
                    </Text>
                  </TouchableOpacity>
                );
              }
            }}
          />
        </View>

        <View style={{ paddingHorizontal: 15 }}>
          <Text style={styles.header}>{t('Time')}</Text>
          <FlatList
            data={timeSlots}
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            horizontal
            renderItem={({ item, index }) => {
              let onPressCheck = item.from === startTime;
              return (
                <TouchableOpacity
                  style={[
                    styles.dateContainer,
                    {
                      backgroundColor: onPressCheck ? COLORS.primary : null,
                      width: AppWidth(25),
                    },
                  ]}
                  key={index}
                  onPress={() =>
                    handleStartTimePress(item.from, item.to, index)
                  }
                >
                  <Text
                    style={[
                      styles.date_day,
                      { color: onPressCheck ? COLORS.white : COLORS.grey },
                    ]}
                  >
                    {item.from}
                  </Text>
                  <Text
                    style={[
                      styles.date_name,
                      { color: onPressCheck ? COLORS.white : COLORS.grey },
                    ]}
                  >
                    {t('to')}
                  </Text>

                  <Text
                    style={[
                      styles.date_day,
                      { color: onPressCheck ? COLORS.white : COLORS.grey },
                    ]}
                  >
                    {item.to === '00:00' ? '23:59' : item.to}
                  </Text>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      </View>

      <View style={styles.viewBtn}>
        <CustomButton
          title={t('next')}
          loading={loading}
          width={'100%'}
          onPress={onPressNext}
        />

        <CustomBorderButton
          title={t('cancel')}
          top={1}
          width={'100%'}
          onPress={() => navigation.push('UserHome')}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  dateContainer: {
    width: AppWidth(20),
    justifyContent: 'center',
    alignItems: 'center',
    padding: AppHeight(1.3),
    borderWidth: 1,
    borderRadius: 12,
    margin: 10,
    paddingHorizontal: 15,
    borderColor: COLORS.grey,
  },
  date_name: {
    color: COLORS.grey,
    marginTop: 5,
  },
  date_day: {
    fontWeight: 'bold',
    fontSize: fontSize.subHeader,
  },
  header: {
    fontWeight: 'bold',
    fontSize: fontSize.subHeader,
    padding: 10,
    marginTop: AppHeight(1),
  },
  viewBtn: {
    position: 'absolute',
    bottom: 0,
    height: AppHeight(100 / 3),
    width: AppWidth(100),
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  time_container: {
    width: AppWidth(18),
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderWidth: 1,
    borderRadius: 12,
    margin: AppHeight(0.6),
    borderColor: COLORS.grey,
  },
});
