import { FlatList, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import CustomHeader from '../../../../components/CustomHeader';
import { AppHeight, COLORS } from '../../../../utils';
import CustomJobCard from '../../../../components/Cards/CustomJobCard';
import { useToast } from 'native-base';
import SuccessToast from '../../../../components/Toast/SuccessToast';
import CustomLoading from '../../../../components/Loading/CustomLoading';
import {
  rejectJob,
  setInprogress,
  setSpAcceptBooking,
} from '../../../../services/ServiceProviderServices/ServiceProviderService';
import { useDispatch, useSelector } from 'react-redux';
import { getNewJobs } from '../../../../store/serviceprovider/SpAction';
import { useTranslation } from 'react-i18next';
// import { err } from "react-native-svg/lib/typescript/xml";
import { getBearerRequest } from '../../../../services/ApiServices';
import {
  GET_INVOICE_BOOKING_URL,
  GET_NEW_BOOKING_URL,
} from '../../../../services/ApiConstants';

const NewJobScreen = ({ navigation }) => {
  // const [newJobs, setNewJobs] = useState();
  const [loading, setLoading] = useState(false);
  const newJobs = useSelector((state) => state.SpReducer.newJobs);
  const loadJobs = useSelector((state) => state.SpReducer.loadJobs);
  const [jobs, setJobs] = useState();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const toast = useToast();

  const getJobs = async () => {
    setLoading(true);
    try {
      let response = await getBearerRequest(GET_NEW_BOOKING_URL);
      setJobs(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    dispatch(getNewJobs());
    getJobs();
  }, []);

  const onPressAccept = async (id) => {
    setLoading(true);
    try {
      await setSpAcceptBooking(id);
      SuccessToast(t('Success'), t('job_accept_msg'));
      dispatch(getNewJobs());
      navigation.navigate('Dashboard');
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const onPressReject = async (id) => {
    setLoading(true);
    try {
      await rejectJob(id);
      SuccessToast(t('Success'), t('job_reject_msg'));
      dispatch(getNewJobs());
      navigation.navigate('Dashboard');
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const onPressNotification = () => {
    navigation.navigate('SpNotifications');
  };

  if (loading) {
    return (
      <CustomLoading
        content={t('loading') + ' ' + t('New Jobs') + '....'}
        top={null}
      />
    );
  }

  if (loadJobs) {
    return (
      <CustomLoading
        content={t('loading') + ' ' + t('New Jobs') + '....'}
        top={null}
      />
    );
  }

  return (
    <View style={{ backgroundColor: COLORS.white, height: AppHeight(100) }}>
      <CustomHeader
        title={t('New Jobs')}
        back
        icon
        navigation={navigation}
        onPressNotification={onPressNotification}
      />
      {newJobs === null ? (
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text style={{ color: COLORS.grey }}>{t('newjob_placeholder')}</Text>
        </View>
      ) : (
        <FlatList
          data={jobs}
          style={{ bottom: AppHeight(13), marginTop: AppHeight(13) }}
          renderItem={({ item, index }) => (
            <CustomJobCard
              data={item}
              index={index}
              footer={true}
              newJobs={true}
              onPressAccept={onPressAccept}
              onPressReject={onPressReject}
            />
          )}
          keyExtractor={(item) => item.id}
        />
      )}
    </View>
  );
};

export default NewJobScreen;

const styles = StyleSheet.create({});
