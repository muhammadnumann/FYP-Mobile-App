import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import CustomHeader from '../../../components/CustomHeader';
import { AppHeight, AppWidth, COLORS } from '../../../utils';
import { Checkbox, useToast } from 'native-base';
import CustomButton from '../../../components/CustomButton';
import {
  getAvailabilityService,
  updateAvailabilityService,
} from '../../../services/ServiceProviderServices/ServiceProviderService';
import SuccessToast from '../../../components/Toast/SuccessToast';
import { useTranslation } from 'react-i18next';

const ProfileManageAvailability = ({ navigation }) => {
  const [selectedData, setSelectedData] = useState([
    {
      day: 1,
      isAvailable: true,
      dayStartTime: '9:00 AM',
      dayEndTime: '5:00 PM',
      isFullDayAvailable: true,
    },
    {
      day: 2,
      isAvailable: false,
      dayStartTime: '9:00 AM',
      dayEndTime: '5:00 PM',
      isFullDayAvailable: false,
    },
    {
      day: 3,
      isAvailable: false,
      dayStartTime: '9:00 AM',
      dayEndTime: '5:00 PM',
      isFullDayAvailable: false,
    },
    {
      day: 4,
      isAvailable: false,
      dayStartTime: '9:00 AM',
      dayEndTime: '5:00 PM',
      isFullDayAvailable: false,
    },
    {
      day: 5,
      isAvailable: false,
      dayStartTime: '9:00 AM',
      dayEndTime: '5:00 PM',
      isFullDayAvailable: false,
    },
    {
      day: 6,
      isAvailable: false,
      dayStartTime: '9:00 AM',
      dayEndTime: '5:00 PM',
      isFullDayAvailable: false,
    },
    {
      day: 7,
      isAvailable: false,
      dayStartTime: '9:00 AM',
      dayEndTime: '5:00 PM',
      isFullDayAvailable: false,
    },
  ]);

  const [loading, setLoading] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const toast = useToast();
  const { t } = useTranslation();

  const toggleTime = (dayNumber) => {
    const updatedSelectedData = selectedData.slice();
    updatedSelectedData[dayNumber].isFullDayAvailable =
      !updatedSelectedData[dayNumber].isFullDayAvailable;
    setSelectedData(updatedSelectedData);
  };

  const toggleDay = (dayNumber) => {
    const updatedSelectedData = selectedData.slice();
    updatedSelectedData[dayNumber].isAvailable =
      !updatedSelectedData[dayNumber].isAvailable;

    setSelectedData(updatedSelectedData);
  };

  let days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const renderDays = selectedData?.map((day, index) => {
    return (
      <TouchableOpacity
        style={day.isAvailable ? styles.blueDataBox : styles.dataBox}
        key={day.day}
        onPress={() => toggleDay(index)}
      >
        <Text
          style={{
            color: day.isAvailable ? 'white' : 'black',
          }}
        >
          {t(days[index])}
        </Text>
      </TouchableOpacity>
    );
  });

  const renderTime = selectedData?.map((day, index) => {
    return (
      <View style={styles.timeContainer} key={index}>
        <Text style={{ color: '#707070' }}>9:00 AM - 5:00 PM</Text>
        <View style={styles.freeArea}>
          <Text style={{ color: '#707070' }}>{t('available')}</Text>
          <Checkbox
            // value={day?.isFullDayAvailable}
            isChecked={day?.isFullDayAvailable}
            onChange={() => toggleTime(index)}
            style={{ marginLeft: 5 }}
            colorScheme={'blue'}
            accessibilityLabel='checkboxes'
          />
        </View>
      </View>
    );
  });

  useEffect(() => {
    getAvailability();
  }, []);

  const getAvailability = async () => {
    setLoading(true);
    try {
      let response = await getAvailabilityService();
      let dayNumbers = [0, 1, 2, 3, 4, 5, 6];
      response[dayNumbers].day = response[dayNumbers];
      setSelectedData(response);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const updateAvailability = async () => {
    setUpdateLoading(true);
    try {
      await updateAvailabilityService(selectedData);
      navigation.push('profile');
      SuccessToast(t('Success'), t('schedule_updated_msg'));
      setUpdateLoading(false);
    } catch (error) {
      console.log(error);
      setUpdateLoading(false);
      // setShowModal(false);
    }
  };

  // console.lg(selectedData && selectedData);

  const onPressNotification = () => {

  };

  return (
    <View style={{ height: AppHeight(90), backgroundColor: COLORS.white }}>
      <CustomHeader
        title={t('manage_availability')}
        back
        navigation={navigation}
        icon
        onPressNotification={onPressNotification}
      />

      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.titleCategory}>{t('schedule_title')}</Text>
          <View style={{ height: 100, marginTop: 20 }}>
            <ScrollView style={styles.scrollView} horizontal>
              {renderDays}
            </ScrollView>
          </View>

          <View>
            <Text style={[styles.titleCategory, { fontSize: 15 }]}>
              {t('schedule_subTitle')}
            </Text>

            {renderTime}
          </View>

          <View style={{ alignSelf: 'center' }}>
            <CustomButton
              title={t('add_schedule')}
              width={AppWidth(90)}
              onPress={updateAvailability}
              loading={updateLoading}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default ProfileManageAvailability;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
    paddingVertical: 30,
  },

  productContainer: {
    height: 80,
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#DBE3EB',
    borderBottomWidth: 1,
    marginBottom: 20,
  },
  coin: {
    height: 50,
    width: 50,
    justifyContent: 'center',
  },
  productText: {
    fontWeight: 'bold',
    color: '#7D8392',
    fontSize: 18,
  },
  productInfo: {
    color: '#7D8392',
    fontSize: 13,
  },
  titleCategory: {
    fontWeight: 'bold',
    color: COLORS.primary,
    fontSize: 20,
  },
  scrollView: {},
  dataBox: {
    height: 73,
    width: 63,
    borderColor: '#C7CBCF',
    borderWidth: 1,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },

  blueDataBox: {
    height: 73,
    width: 63,
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },

  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    borderColor: '#DBE3EB',
    borderBottomWidth: 1,
    paddingBottom: 15,
  },

  freeArea: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radio: {
    height: 15,
    width: 15,
    borderColor: '#7D8392',
    borderWidth: 1,
    borderRadius: 30,
    marginLeft: 10,
  },
});
