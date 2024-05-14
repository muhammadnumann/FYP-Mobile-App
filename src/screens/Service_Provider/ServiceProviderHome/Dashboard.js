import { StyleSheet, View, TouchableOpacity, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import CustomHeader from '../../../components/CustomHeader';
import { AppHeight, AppWidth, COLORS, fontSize } from '../../../utils';
import { Box, HStack, VStack, Spacer, Text } from 'native-base';
import { CustomIcon } from '../../../components/CustomIcon';
import JobStatsBarChart from '../../../components/Charts/JobStatsBarChart';
import { useDispatch, useSelector } from 'react-redux';
import {
  getCompletedJobs,
  getCancelJobs,
  getInProgressJobs,
  getNewJobs,
} from '../../../store/serviceprovider/SpAction';
import { useTranslation } from 'react-i18next';
import { getNotifications } from '../../../store/notifications/NotificationActions';
import FeedBackModal from '../../../components/Modals/FeedBackModal';
import CustomLoading from '../../../components/Loading/CustomLoading';
import fcmService from '../../../utils/NotificationHandler/FCMService';
import localNotificationService from '../../../utils/NotificationHandler/LocalNotification';
import { navigate } from '../../../../RootNavigation';
import { USER_GET_DASHB_SP_URL } from '../../../services/ApiConstants';
import { getBearerRequest } from '../../../services/ApiServices';

let dashboard_list = [
  { title: 'My Jobs', icon: 'jobIcon' },
  { title: 'New Jobs', icon: 'newJobIcon' },
  // { title: "In Progress Jobs", icon: "inProgressIcon" },
  { title: 'Completed Jobs', icon: 'inProgressIcon' },
  { title: 'Cancelled Jobs', icon: 'cancelJobIcon' },
];

const Dashboard = ({ route, navigation }) => {
  const [barData , setBarData] = useState();
  const [showChart , setShowChart] = useState(false);
  const completeJobs = useSelector((state) => state.SpReducer.completedJobs);
  const cancelledJobs = useSelector((state) => state.SpReducer.cancelledJobs);
  const feedBackVisible = useSelector(
    (state) => state.NotificationReducer.feedBackVisible
  );

  const loadNotification = useSelector(
    (state) => state.NotificationReducer.loadNotification
  );

  const { t } = useTranslation();
  const dispatch = useDispatch();

  const onPressSection = (title) => {
    if (title === 'My Jobs') {
      navigation.navigate('MyJobScreen');
    } else if (title === 'New Jobs') {
      navigation.navigate('NewJobScreen');
    } else if (title === 'In Progress Jobs') {
      navigation.navigate('InProgressScreen');
    } else if (title === 'Completed Jobs') {
      navigation.navigate('ProfileCompletedJob');
    } else if (title === 'Cancelled Jobs') {
      navigation.navigate('CancelledJobScreen');
    }
  };

 
  useEffect(() => {
    const onRegister = (token) => {
      // console.log("[App] onRegister. We get FCM Token: ", token);
    };

    const onNotification = (notify, data) => {
      const options = {
        soundName: 'default',
        playSound: true,
      };

      if (notify)
        localNotificationService.showNotification(
          0,
          notify.title,
          notify.body,
          notify,
          options
        );
    };

    const onOpenNotification = (notify, data) => {
      if (data.type === 'AddBooking') {
        navigation.push('SpBookingDetail', {
          bookingId: data.bookingId,
          bookedById: data.initiatedById,
        });
      }

      if (data.type === 'AssignBookingSP') {
        dispatch(getInProgressJobs());
        dispatch({ type: 'FEEDBACK_DATA', payload: data });
        navigate('BookingDetailsCommon', {
          data: data,
          bookingId: data.bookingId,
        });
      }

      if (data.type === 'Message') {
        navigation.navigate('Inbox', {
          chatInfo: {
            bookedById: data.initiatedById,
            clientName: data.initiatedByName,
            clientImage: data.initiatedByImage,
          },
        });
      }

      if (data.type === 'HelpCenterMessage') {
        navigation.navigate('ServiceProviderProfile', {
          screen: 'ProfileHelpCenter',
        });
      }

      if (data.type === 'EndBooking') {
        navigate('BookingDetailsCommon', {
          data: notify,
          button: null,
          completed: true,
          bookingId: notify.bookingId,
        });
      }

      if (data.type === 'BookingReOpened') {
        dispatch(getInProgressJobs());
        navigate('Home', {
          screen: 'BookingDetailsCommon',
          params: { data: notify, bookingId: notify.bookingId },
        });
      }
    };

    fcmService?.registerAppWithFCM();
    fcmService?.register(onRegister, onNotification, onOpenNotification);
    localNotificationService.configure(onOpenNotification);

    return () => {
      fcmService.unRegister();
    };
  }, []);

  useEffect(() => {
    dispatch(getNotifications());
    dispatch(getNewJobs());
    dispatch(getInProgressJobs());
    dispatch(getCancelJobs());
    dispatch(getCompletedJobs());
  }, []);

  const totalJobs = () => {
    var complete;
    var cancelled;

    if (completeJobs !== null) {
      complete = completeJobs.length;
    } else {
      complete = 0;
    }

    if (cancelledJobs !== null) {
      cancelled = cancelledJobs.length;
    } else {
      cancelled = 0;
    }

    return complete + cancelled;
  };

  const onPressNotification = () => {
    navigation.navigate('SpNotifications');
  };

  const renderDashList = () => {
    return dashboard_list.map((item, index) => {
      return (
        <Box
          py='3'
          style={{
            borderWidth: 2,
            borderRadius: 12,
            marginVertical: 5,
            borderColor: COLORS.lightGrey,
            paddingHorizontal: 15,
          }}
          key={index}
        >
          <TouchableOpacity onPress={() => onPressSection(item.title)}>
            <HStack space={3} justifyContent='space-between'>
              <CustomIcon name={item.icon} />
              <VStack>
                <Text
                  style={{
                    color: COLORS.black,
                    // padding: 3,
                    fontWeight: 'bold',
                  }}
                >
                  {t(item.title)}
                </Text>
              </VStack>
              <Spacer />

              <CustomIcon name='nextIcon' />
            </HStack>
          </TouchableOpacity>
        </Box>
      );
    });
  };
  const loadDashboard = async () =>{
    try {
      let response = await getBearerRequest(USER_GET_DASHB_SP_URL);
      let data = [];
       for(let i=1 ; i <= response.data.length; i++)
       {
         if((i%2)== 0)
         {
          data.push({
            value: response.data[i-1].value, frontColor: response.data[i-1].frontColor
          });
        }
        else{
          data.push({
            spacing: 2,
            labelWidth: 30,
            labelTextStyle: { color: "gray" },
            value: response.data[i-1].value, frontColor: response.data[i-1].frontColor,
            label: response.data[i-1].label
          });
        } 
      }
      console.log(data)
      setBarData([...data]);
      setShowChart(true)
      console.log(showChart)
    } catch (error) {
      console.log(error, "This is testing");
    }
  }
  useEffect(() => {
    loadDashboard();

  },[]);
  if (loadNotification) {
    return <CustomLoading content={t('loading') + '....'} top={null} />;
  }

  return (
    <View style={{ height: AppHeight(100), backgroundColor: COLORS.white }}>
      <CustomHeader
        title={t('Home')}
        // back
        icon
        navigation={navigation}
        onPressNotification={onPressNotification}
      />

      <ScrollView
        contentContainerStyle={
          {
            // paddingBottom: AppHeight(10),
          }
        }
      >
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 15,
            marginTop: 15,
          }}
        >
          <View style={[styles.jobContainer, styles.activeJob]}>
            <Text style={styles.JobsNumber}>{totalJobs()}</Text>
            <Text style={styles.JobsText}>{t('total') + ' ' + t('jobs')}</Text>
          </View>
          <View style={[styles.jobContainer, styles.completedJob]}>
            <Text style={[styles.JobsNumber, { color: COLORS.greenSolid }]}>
              {completeJobs === null ? 0 : completeJobs?.length}
            </Text>
            <Text style={[styles.JobsText, { color: COLORS.greenSolid }]}>
              {t('Completed')}
            </Text>
          </View>
          <View style={[styles.jobContainer, styles.cancelledJob]}>
            <Text style={[styles.JobsNumber, { color: COLORS.redSolid }]}>
              {cancelledJobs === null ? 0 : cancelledJobs?.length}
            </Text>
            <Text style={[styles.JobsText, { color: COLORS.redSolid }]}>
              {t('Cancelled')}
            </Text>
          </View>
        </View>

        <View style={{ paddingHorizontal: 15 }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginVertical: AppHeight(1),
            }}
          >
            <Text style={{ fontWeight: 'bold' }}>
              {t('jobs') + ' ' + t('stats')}
            </Text>
            <TouchableOpacity>
              <CustomIcon name='chartFilterIcon' />
            </TouchableOpacity>
          </View>
          {showChart ? ( 
            <>          
              <JobStatsBarChart  barData={barData} />
            </>
          ) : null}

          {renderDashList()}
        </View>
      </ScrollView>

      {feedBackVisible ? (
        <FeedBackModal
          visible={feedBackVisible && feedBackVisible}
          dismiss={() => dispatch({ type: 'FEEDBACK_VISIBLE', payload: false })}
        />
      ) : null}
    </View>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  jobContainer: {
    padding: AppHeight(1.2),
    borderRadius: 10,
    borderWidth: 1,
    width: AppWidth(28),
  },
  activeJob: {
    borderColor: COLORS.primary,
    backgroundColor: 'rgba(98, 106, 255, 0.1)',
  },
  completedJob: {
    borderColor: COLORS.greenSolid,
    backgroundColor: COLORS.greenLight,
  },
  cancelledJob: {
    borderColor: COLORS.redSolid,
    backgroundColor: COLORS.redLight,
  },
  JobsNumber: {
    fontWeight: 'bold',
    fontSize: fontSize.medium,
    textAlign: 'center',
    color: COLORS.primary,
  },
  JobsText: {
    textAlign: 'center',
    color: COLORS.primary,
    marginTop: 5,
  },
});
