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
import CustomBorderButton from '../../../components/CustomBorderButton';
import CustomButton from '../../../components/CustomButton';
import CustomHeader from '../../../components/CustomHeader';
import SuccessToast from '../../../components/Toast/SuccessToast';
import { SAVE_BOOKING_URL } from '../../../services/ApiConstants';
import { postBearerRequest, postRequest } from '../../../services/ApiServices';
import { GetUserProfileInfo } from '../../../services/SameApiServices';
import {
  AppHeight,
  AppWidth,
  arrayChunk,
  COLORS,
  currentMonth,
  currentYear,
  fontSize,
  getDayNames,
  ScreenWidth,
} from '../../../utils';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

let morning_time = [{ time: '10:00' }, { time: '11:00' }, { time: '12:00' }];
let afternoon_time = [
  { time: '01:00' },
  { time: '02:30' },
  { time: '03:00' },
  { time: '03:45' },
  { time: '04:00' },
  { time: '04:30' },
  { time: '05:00' },
  { time: '05:45' },
  { time: '06:30' },
  { time: '07:30' },
];

export default function SelectBooking({ route, navigation }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedDateIndex, setSelectedDateIndex] = useState();
  const [selectTime, setSelectedTime] = useState('');
  const [loading, setLoading] = useState(false);
  let booking_date = getDayNames(currentMonth, currentYear);
  const toast = useToast();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { ProfileInfo, serviceId } = route.params;
  const { data: userDetails } = GetUserProfileInfo();
  const onPressDate = (index) => {
    booking_date.map((date, i) => {
      if (index === i) {
        setSelectedDate(date);
        setSelectedDateIndex(i);
      }
    });
  };

  const onPressTime = (time) => {
    morning_time.map((date, i) => {
      if (date.time === time) {
        setSelectedTime(time);
      }
    });
    afternoon_time.map((date, i) => {
      if (date.time === time) {
        setSelectedTime(time);
      }
    });
  };

  useEffect(() => {
    navigation.getParent()?.setOptions({
      tabBarStyle: {
        display: 'none',
      },
    });
    return () =>
      navigation.getParent()?.setOptions({
        tabBarStyle: {
          height: Platform.OS === 'ios' ? 80 : 60,
        },
      });
  }, [navigation]);

  const onPressNotification = () => {
    navigation.navigate('UserNotification');
  };

  const render_morning_time = () => {
    let morning = morning_time.map((item, index) => {
      let onPressCheck = item.time === selectTime;
      return (
        <TouchableOpacity
          key={index}
          style={[
            styles.time_container,
            { backgroundColor: onPressCheck ? COLORS.primary : null },
          ]}
          onPress={() => onPressTime(item.time)}
        >
          <Text style={{ color: onPressCheck ? COLORS.white : COLORS.grey }}>
            {item.time}
          </Text>
        </TouchableOpacity>
      );
    });

    return morning;
  };

  const render_afternoon_time = () => {
    let afternoon = arrayChunk(afternoon_time, 4).map((row, index) => {
      return (
        <View style={{ flexDirection: 'row' }} key={index}>
          {row.map((item, i) => {
            let onPressCheck = item.time === selectTime;
            return (
              <TouchableOpacity
                key={i}
                style={[
                  styles.time_container,
                  { backgroundColor: onPressCheck ? COLORS.primary : null },
                ]}
                onPress={() => onPressTime(item.time)}
              >
                <Text
                  style={{ color: onPressCheck ? COLORS.white : COLORS.grey }}
                >
                  {item.time}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      );
    });

    return afternoon;
  };

  const onPressBook = async () => {
    if (selectedDate === '') {
      WarnToast(t('select_date'));
    } else if (selectTime === '') {
      WarnToast(t('select_time'));
    } else {
      let date = `${currentYear}-${currentMonth}-${selectedDateIndex + 1}`;
      let time = selectTime;
      var timeAndDate = moment(date + ' ' + time);
      let booking_time = moment(timeAndDate).format('hh:mm');

      setLoading(true);
      const sendingData = {
        bookedAt: timeAndDate,
        bookedById: 0,
        clientId: userDetails?.data?.id,
        serviceProviderId: ProfileInfo.id,
        bookedTime: booking_time,
        ServiceId: serviceId,
        bookingAddress:
          userDetails?.data?.address !== null
            ? userDetails?.data?.address
            : 'lahore',
      };

      try {
        let response = await postBearerRequest(SAVE_BOOKING_URL, sendingData);
        let sendingResponse = JSON.stringify(response);

        // SuccessToast( t("Success"), JSON.parse(sendingResponse).message);
        setLoading(false);
        navigation.navigate('BookingConfirmation', { status: true });
      } catch (error) {
        console.log(error);
        setLoading(false);
        navigation.navigate('BookingConfirmation', { status: false });
        WarnToast(t('Error'), error);
      }
    }
  };

  const onPressCancel = () => {
    navigation.goBack();
  };

  return (
    <View style={{ height: AppHeight(100), backgroundColor: COLORS.white }}>
      <CustomHeader
        title={'Booking'}
        navigation={navigation}
        back
        onPressNotification={onPressNotification}
      />
      <View>
        <Text style={styles.header}>Select Booking Date & Time</Text>

        <View>
          <FlatList
            data={booking_date}
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            // onScroll={(e) => {
            //   const x = e.nativeEvent.contentOffset.x;
            //   setCurrentIndex((x / AppWidth(100)).toFixed(0));
            // }}
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
                      {item.name.substring(0, 3)}
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
                      {item.name.substring(0, 3)}
                    </Text>
                  </TouchableOpacity>
                );
              }
            }}
          />
        </View>

        <View style={{ paddingHorizontal: 20, alignSelf: 'center' }}>
          <Text style={styles.header}>Morning</Text>
          <View style={{ flexDirection: 'row' }}>{render_morning_time()}</View>
          <Text style={styles.header}>Afternoon</Text>
          <View>{render_afternoon_time()}</View>
        </View>
      </View>

      <View style={styles.viewBtn}>
        <CustomButton
          title='Book'
          loading={loading}
          width={'100%'}
          onPress={onPressBook}
        />
        <CustomBorderButton
          title='Cancel'
          top={1}
          width={'100%'}
          onPress={onPressCancel}
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
    padding: AppHeight(1.5),
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
    fontSize: fontSize.header,
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
    margin: AppHeight(1.2),
    borderColor: COLORS.grey,
  },
});
