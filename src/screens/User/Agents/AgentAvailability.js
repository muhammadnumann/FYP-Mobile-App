import { StyleSheet, Text, View, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import CustomHeader from '../../../components/CustomHeader';
import { AppHeight, AppWidth, COLORS } from '../../../utils';
import { Checkbox, useToast } from 'native-base';
import CustomButton from '../../../components/CustomButton';
import { getSpAvailabilityService } from '../../../services/UserServices/UserService';
import CustomLoading from '../../../components/Loading/CustomLoading';
import { getBearerRequest } from '../../../services/ApiServices';
import { ASSIGN_SP_BOOKING_URL } from '../../../services/ApiConstants';
import { useTranslation } from 'react-i18next';

const AgentAvailability = ({ route, navigation }) => {
  const [selectedData, setSelectedData] = useState(null);
  const [loading, setLoading] = useState(false);
  const { ProfileInfo } = route.params;
  const [laodingAccept, setLaodingAccept] = useState(false);
  const toast = useToast();
  const { t } = useTranslation();
  useEffect(() => {
    getAvailability();
  }, []);

  const getAvailability = async () => {
    setLoading(true);
    try {
      let response = await getSpAvailabilityService(
        ProfileInfo.serviceProviderId
      );
      setSelectedData(response);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  let days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const renderDays = selectedData?.map((day, index) => {
    return (
      <View
        style={day.isAvailable ? styles.blueDataBox : styles.dataBox}
        key={day.day}
      >
        <Text
          style={{
            color: day.isAvailable ? 'white' : 'black',
          }}
        >
          {days[index]}
        </Text>
      </View>
    );
  });

  const renderTime = selectedData?.map((day, index) => {
    return (
      <View style={styles.timeContainer} key={index}>
        <Text style={{ color: '#707070' }}>9:00 AM - 5:00 PM</Text>
        <View style={styles.freeArea}>
          <Text style={{ color: '#707070' }}>Available</Text>
          <Checkbox
            isChecked={day?.isFullDayAvailable}
            style={{ marginLeft: 5 }}
            colorScheme={'blue'}
            accessibilityLabel='checkboxes'
          />
        </View>
      </View>
    );
  });

  if (loading) {
    return (
      <CustomLoading
        content={'Loading service provider availability....'}
        top={null}
      />
    );
  }

  const onPressAccept = async (id) => {
    setLaodingAccept(true);
    try {
      let response = await getBearerRequest(
        ASSIGN_SP_BOOKING_URL +
          `?bookingid=${ProfileInfo.bookingId}&spId=${ProfileInfo.serviceProviderId}`
      );
      // SuccessToast( t("Success"), t("job_accept_msg"));
      SuccessToast(t('Success'), 'Service Provider Assigned successfully');
      navigation.push('UserHome');
      setLaodingAccept(false);
    } catch (error) {
      setLaodingAccept(false);
      console.log(error);
    }
  };

  return (
    <View style={{ height: AppHeight(100), backgroundColor: COLORS.white }}>
      <CustomHeader
        title='Service Provider Availability'
        back
        navigation={navigation}
      />

      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.titleCategory}> Day's Schedule</Text>
          <View style={{ height: 100, marginTop: 20 }}>
            <ScrollView style={styles.scrollView} horizontal>
              {renderDays}
            </ScrollView>
          </View>

          <View>
            <Text style={[styles.titleCategory, { fontSize: 15 }]}>
              Time Schedule
            </Text>

            {renderTime}
          </View>

          <View style={{ alignSelf: 'center' }}>
            <CustomButton
              title='Assign'
              width={AppWidth(90)}
              loading={laodingAccept}
              onPress={onPressAccept}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default AgentAvailability;

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
