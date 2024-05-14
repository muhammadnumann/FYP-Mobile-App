import { StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { View, Text, SafeAreaView, Keyboard } from 'react-native';
import {
  SEND_CODE_URL,
  VERIFY_EMAIL_URL,
} from '../../../services/ApiConstants';
import { postRequest } from '../../../services/ApiServices';
import WarnToast from '../../../components/Toast/WarnToast';
import { useToast } from 'native-base';
import { COLORS } from '../../../utils';
import { CustomIcon } from '../../../components/CustomIcon';
import AuthHeader from '../../../components/AuthHeader';
import CustomInput from '../../../components/CustomInput';
import CustomButton from '../../../components/CustomButton';
import CustomBorderButton from '../../../components/CustomBorderButton';
import { useTranslation } from 'react-i18next';

const ForgotPasswordOTP = ({ route, navigation }) => {
  const [inputs, setInputs] = useState({
    emailOtp: '',
    // mobileOtp: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const { t } = useTranslation();
  const toast = useToast();

  const { data } = route.params;

  const validate = async () => {
    Keyboard.dismiss();
    let isValid = true;
    if (!inputs.emailOtp) {
      handleError(t('otp_input_err_msg'), 'emailOtp');
      isValid = false;
    }

    if (isValid) {
      VerifyEmailCode();
    }
  };

  const VerifyEmailCode = async () => {
    setLoading(true);
    let emailData = {
      email: data.email,
      otp: inputs.emailOtp,
    };

    try {
      await postRequest(VERIFY_EMAIL_URL, emailData);
      navigation.navigate('ResetPassword', { data });
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      WarnToast(t('Error'), error);
    }
  };

  const ResendOtp = async () => {
    setLoading(true);
    let sendingData = {
      email: data.email,
      phoneNumber: data.phoneNumber,
    };

    try {
      let response = await postRequest(SEND_CODE_URL, sendingData);
      let sendingResponse = JSON.stringify(response);
      SuccessToast(t('Success'), JSON.parse(sendingResponse).message);
      setLoading(false);

      navigation.navigate('ForgotPasswordOTP', { data: sendingData });
    } catch (error) {
      console.log(error);
      setLoading(false);
      WarnToast(t('Error'), error);
    }
  };

  // const VerifyMoobileCode = async () => {};

  const handleOnchange = (text, input) => {
    setInputs((prevState) => ({ ...prevState, [input]: text }));
  };

  const handleError = (error, input) => {
    setErrors((prevState) => ({ ...prevState, [input]: error }));
  };
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
          {t('otp_sent_title')}
        </Text>

        <View style={{ marginVertical: 10 }}>
          <CustomInput
            onChangeText={(text) => handleOnchange(text, 'emailOtp')}
            onFocus={() => handleError(null, 'emailOtp')}
            placeholder={t('enter_email_otp')}
            error={errors.emailOtp}
          />
          {/* <CustomInput
            onChangeText={(text) => handleOnchange(text, "mobileOtp")}
            onFocus={() => handleError(null, "mobileOtp")}
            placeholder="Enter Mobile OTP"
            error={errors.mobileOtp}
          /> */}

          <CustomButton
            title={t('save')}
            loading={loading}
            onPress={validate}
          />
          <CustomBorderButton
            title={t('resend_otp')}
            top={1}
            loading={resendLoading}
            onPress={ResendOtp}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ForgotPasswordOTP;

const styles = StyleSheet.create({});
