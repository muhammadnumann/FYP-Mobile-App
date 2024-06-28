import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  SafeAreaView,
  Keyboard,
  Platform,
} from 'react-native';
import { AppHeight, AppWidth, COLORS } from '../../utils';
import { CustomIcon } from '../../components/CustomIcon';
import AuthHeader from '../../components/AuthHeader';
import CustomButton from '../../components/CustomButton';
import CustomBorderButton from '../../components/CustomBorderButton';
import { useTranslation } from 'react-i18next';
import { useToast } from 'native-base';
import {
} from '../../services/ApiConstants';
import { useDispatch } from 'react-redux';
import WarnToast from '../../components/Toast/WarnToast';
import DeviceInfo from 'react-native-device-info';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomLoading from '../../components/Loading/CustomLoading';
import OTPInputView from '@twotalltotems/react-native-otp-input';

const OtpVerification = ({
  route: {
    params: { phoneNumber },
  },
}) => {
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const toast = useToast();
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [counter, setCounter] = React.useState(59);

  React.useEffect(() => {
    const timer =
      counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    return () => clearInterval(timer);
  }, [counter]);

  React.useEffect(() => {
    if (otp) {
      login();
    }
  }, [otp]);

  const validate = async () => {
    Keyboard.dismiss();
    let isValid = true;

    if (otp !== '') {
      WarnToast('please add OTP');
      isValid = false;
    }
    if (isValid) {
      login();
    }
  };

  const resendOtp = async () => {
    setResendLoading(true);
    let data = {
      userName: phoneNumber,
    };

    try {

      setResendLoading(false);
    } catch (error) {
      setResendLoading(false);
      WarnToast(t('Error'), error);
    }
  };

  const login = async () => {
    setLoading(true);

    let device_name = DeviceInfo.getDeviceId();
    let device_id = await AsyncStorage.getItem('fcmtoken');

    let data = {
      UserName: phoneNumber,
      Code: otp,
      Type: 'Login',
      deviceId: device_id,
      deviceName: device_name,
    };

    try {

    } catch (error) {
      setLoading(false);
      setOtp('');
      console.log('error: ', error);
      WarnToast(t('Error'), error);
    }
  };

  if (loading) {
    return <CustomLoading content='Logging in' />;
  }

  return (
    <SafeAreaView style={{ backgroundColor: COLORS.white, flex: 1 }}>
      <View style={{ paddingHorizontal: 20 }}>
        <View style={{ alignSelf: 'center', paddingVertical: 30 }}>
          <CustomIcon name={'RegisterIcon'} />
        </View>

        <AuthHeader title={t('otp_header_title')} alignText={'center'} />

        <Text
          style={{
            color: COLORS.grey,
            textAlign: 'center',
            paddingVertical: 15,
          }}
        >
          {t('otp_title')}
        </Text>

        <View style={{ marginVertical: 10 }}>
          <OTPInputView
            style={{
              width: AppWidth(85),
              height: 50,
              alignSelf: 'center',
              color: 'black',
              backgroundColor: 'white',
            }}
            pinCount={6}
            editable={counter === 0 ? false : true}
            autoFocusOnLoad
            codeInputFieldStyle={styles.underlineStyleBase}
            codeInputHighlightStyle={styles.underlineStyleHighLighted}
            secureTextEntry={true}
            onCodeFilled={(code) => {
              setOtp(code);
            }}
          />

          <View
            style={{ flexDirection: 'row', alignSelf: 'center', marginTop: 10 }}
          >
            <Text>Resend OTP in</Text>
            <Text
              style={{
                fontWeight: 'bold',
                color: COLORS.primary,
                marginLeft: 10,
              }}
            >
              00:{counter}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.viewBtn}>
        <CustomButton
          title={t('save')}
          loading={loading}
          onPress={validate}
          disable={counter === 0 ? true : false}
        />
        <CustomBorderButton
          title={t('resend_otp')}
          top={1}
          loading={resendLoading}
          onPress={resendOtp}
          disable={counter !== 0 ? true : false}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  viewBtn: {
    bottom: 0,
    marginTop: AppHeight(100 / 5),
    alignSelf: 'center',
    paddingHorizontal: 15,
  },
  otpContainer: {
    marginHorizontal: 20,
    marginBottom: 20,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'row',
  },
  otpBox: {
    borderRadius: 5,
    borderColor: COLORS.primary,
    borderWidth: 0.5,
  },
  otpText: {
    fontSize: 25,
    color: 'black',
    padding: 0,
    textAlign: 'center',
    paddingHorizontal: Platform.OS === 'ios' ? 16 : 9,
    paddingVertical: 8,
  },

  borderStyleBase: {
    width: 30,
    height: 45,
    color: 'black',
    backgroundColor: 'white',
  },

  borderStyleHighLighted: {
    borderColor: 'black',
    color: 'black',
    backgroundColor: 'white',
  },

  underlineStyleBase: {
    backgroundColor: 'white',
    height: 45,
    borderRadius: 5,
    borderWidth: 0,
    borderWidth: 1,
    borderColor: 'black',
    color: 'black',
  },

  underlineStyleHighLighted: {
    borderColor: 'black',
    color: 'black',
    backgroundColor: 'white',
  },
});

export default OtpVerification;
