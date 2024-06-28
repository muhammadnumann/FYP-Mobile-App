import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import CustomHeader from '../../../components/CustomHeader';
import { AppHeight, COLORS, fontSize } from '../../../utils';
import { useTranslation } from 'react-i18next';
import { GET_CONTACT } from '../../../services/ApiConstants';
import {
  getBearerRequest,
  getRequest,
  postBearerRequest,
} from '../../../services/ApiServices';

const ProfilePrivacy = ({ navigation }) => {
  const { t } = useTranslation();
  const [number, setNumber] = useState('');
  const onPressNotification = () => {

  };

  useEffect(() => {
    getContactNumber();
  }, []);

  const getContactNumber = async () => {
    try {
      let response = await getBearerRequest(GET_CONTACT);
      setNumber(response.data);
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <View style={{ backgroundColor: COLORS.white, height: AppHeight(100) }}>
      <CustomHeader
        title={t('Privacy Policy')}
        back
        navigation={navigation}
        icon
        onPressNotification={onPressNotification}
      />
      <ScrollView style={{ marginBottom: AppHeight(5) }}>
        <View style={{ paddingHorizontal: 15 }}>
          <Text style={styles.title}>{t('pr_q_1')}</Text>
          <Text style={styles.subText}>{t('pr_a_1')}</Text>

          <Text style={styles.title}>{t('pr_q_2')}</Text>
          <Text style={styles.subText}>{t('pr_a_2')}</Text>

          <Text style={styles.title}>{t('pr_q_3')}</Text>
          <Text style={styles.subText}>{t('pr_a_3')}</Text>

          <Text style={styles.title}>{t('pr_q_4')}</Text>
          <Text style={styles.subText}>{t('pr_a_4')}</Text>

          <Text style={styles.title}>{t('pr_q_5')}</Text>
          <Text style={styles.subText}>{t('pr_a_5')}</Text>

          <Text style={styles.title}>{t('pr_q_6')}</Text>
          <Text style={styles.subText}>
            {t('pr_a_6')}
            {number}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default ProfilePrivacy;

const styles = StyleSheet.create({
  title: {
    color: COLORS.black,
    fontWeight: 'bold',
    paddingVertical: 5,
    marginTop: 2,
    fontSize: fontSize.title,
  },
  subText: {
    color: COLORS.grey,
    // textAlign: "justify",
    // paddingVertical: 5,
    fontSize: fontSize.mini,
  },
});
