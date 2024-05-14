import React, { useState, useRef, useCallback } from 'react';
import { Alert, StyleSheet, Text, ToastAndroid, View } from 'react-native';
import CustomBorderButton from '../../../../components/CustomBorderButton';
import CustomButton from '../../../../components/CustomButton';
import CustomHeader from '../../../../components/CustomHeader';
import { CustomIcon } from '../../../../components/CustomIcon';
import {
  AppHeight,
  AppWidth,
  COLORS,
  fontSize,
  truncateString,
} from '../../../../utils';
import { captureRef } from 'react-native-view-shot';
import { PermissionsAndroid, Platform } from 'react-native';
import { CameraRoll } from '@react-native-camera-roll/camera-roll';
import Share from 'react-native-share';
import { useTranslation } from 'react-i18next';

const WithdrawSuccess = ({ route, navigation }) => {
  const { bankName, phone, bank_account, currency } = route.params;
  const { t } = useTranslation();
  const [imageUri, setImageUri] = useState('');

  // create a ref
  const viewRef = useRef();

  React.useEffect(() => {
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

  // get permission on android
  const getPermissionAndroid = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Image Save Permission',
          message: 'Your permission is required to save images to your device',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        return true;
      } else {
        Alert.alert(
          '',
          'Your permission is required to save images to your device',
          [{ text: 'OK', onPress: () => {} }],
          { cancelable: false }
        );
      }
    } catch (err) {
      // handle error as you please
      console.log('err', err);
    }
  };

  // download image
  const downloadImage = async () => {
    try {
      // react-native-view-shot caputures component
      const uri = await captureRef(viewRef, {
        format: 'png',
        quality: 0.8,
      });

      if (Platform.OS === 'android') {
        const granted = await getPermissionAndroid();
        if (!granted) {
          // return;
          getPermissionAndroid();
        }
      }

      // cameraroll saves image
      const image = CameraRoll.save(uri, 'photo');
      setImageUri(uri);
      if (image) {
        Alert.alert(
          '',
          'Image saved successfully.',
          [{ text: 'OK', onPress: () => {} }],
          { cancelable: false }
        );
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  const shareImage = async () => {
    try {
      const uri = await captureRef(viewRef, {
        format: 'png',
        quality: 0.8,
      });

      await Share.open({ url: uri });
    } catch (error) {
      console.log('error', error);
    }
  };

  const onPressNotification = () => {
    navigation.navigate('SpNotifications');
  };

  return (
    <View style={{ height: AppHeight(100), backgroundColor: COLORS.white }}>
      <CustomHeader
        title={t('add_bank_title')}
        icon
        back
        navigation={navigation}
        onPressNotification={onPressNotification}
      />
      <View
        style={{ paddingHorizontal: 15, backgroundColor: COLORS.white }}
        ref={viewRef}
      >
        <View style={{ alignItems: 'center' }}>
          <View style={{ paddingVertical: 25 }}>
            <CustomIcon name='successWithdraw' />
          </View>
          <Text style={{ fontWeight: 'bold', fontSize: fontSize.subHeader }}>
            {t('transaction_success')}
          </Text>
          <Text style={{ color: COLORS.grey }}>TID: 08745672993</Text>
          <Text style={{ color: COLORS.grey }}>
            On October 19, 2022 at 8:24PM{' '}
          </Text>
        </View>

        <View style={styles.container}>
          <View style={{ alignItems: 'center' }}>
            <Text style={{ fontWeight: 'bold', fontSize: fontSize.large }}>
              AED {truncateString(currency, 10)}
            </Text>
            <Text style={{ color: COLORS.grey }}>
              {t('transfered_to')} {truncateString(bankName, 15)}{' '}
            </Text>
          </View>

          <View style={{ paddingHorizontal: 15 }}>
            <View
              style={{
                borderWidth: 1,
                borderColor: COLORS.lightGrey,
                marginTop: 15,
              }}
            />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 15,
              }}
            >
              <Text style={{ color: COLORS.grey }}>{t('transaction_fee')}</Text>
              <Text style={{ fontWeight: 'bold' }}>AED 5.00</Text>
            </View>

            <View
              style={{
                borderWidth: 1,
                borderColor: COLORS.lightGrey,
                marginTop: 15,
              }}
            />

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 15,
              }}
            >
              <Text style={{ color: COLORS.grey }}>{t('to')}</Text>
              <View>
                <Text style={{ textAlign: 'right' }}>{bank_account}</Text>
                <Text style={{ textAlign: 'right' }}>
                  {truncateString(bankName, 35)}{' '}
                </Text>
              </View>
            </View>

            <View
              style={{
                borderWidth: 1,
                borderColor: COLORS.lightGrey,
                marginTop: 15,
              }}
            />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 15,
              }}
            >
              <Text style={{ color: COLORS.grey }}>{t('from')}</Text>
              <Text>Mumtaz Tech Wallet</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.viewBtn}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <CustomBorderButton
            title={t('share')}
            width={AppWidth(42)}
            height={40}
            fontSize={14}
            top={1}
            onPress={shareImage}
            iconName={'shareIcon'}
          />
          <CustomButton
            title={t('save')}
            width={AppWidth(42)}
            height={40}
            fontSize={14}
            top={1}
            onPress={downloadImage}
            iconName={'saveIcon'}
          />
        </View>
      </View>
    </View>
  );
};

export default WithdrawSuccess;

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: COLORS.lightGrey,
    borderRadius: 10,
    // paddingHorizontal: 15,
    paddingVertical: 20,
    marginTop: 20,
  },
  viewBtn: {
    position: 'absolute',
    bottom: 0,
    height: AppHeight(100 / 4),
    width: AppWidth(100),
    justifyContent: 'center',
    paddingHorizontal: 15,
  },
});
