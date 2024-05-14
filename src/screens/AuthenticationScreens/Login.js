import React, { useEffect } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native';
import { AppHeight, COLORS, fontSize } from '../../utils';
import CustomButton from '../../components/CustomButton';
import { CustomIcon } from '../../components/CustomIcon';
import AuthHeader from '../../components/AuthHeader';
import { Keyboard } from 'react-native';
import { postRequest } from '../../services/ApiServices';
import {
  LOGIN_URL,
  USER_AUTHENTICATE_API_URL,
} from '../../services/ApiConstants';
import { useToast } from 'native-base';
import WarnToast from '../../components/Toast/WarnToast';
import SelectLanguageModal from '../../components/Modals/SelectLanguageModal';
import { useTranslation } from 'react-i18next';
import CustomLoading from '../../components/Loading/CustomLoading';
import CustomPhoneField from '../../components/PhoneInput/CustomPhoneField';
import { PermissionsAndroid } from 'react-native';
import CustomPhoneInput from '../../components/CustomPhoneInput';
import SuccessToast from '../../components/Toast/SuccessToast';
import CustomInput from '../../components/CustomInput';
import { useDispatch } from 'react-redux';
import { handleLogin } from '../../store/AuthActions';

const Login = ({ navigation }) => {
  const [inputs, setInputs] = React.useState({
    number: '',
  });
  const dispatch = useDispatch();

  const [errors, setErrors] = React.useState({});
  const [loading, setLoading] = React.useState(false);
  const [showModal, setShowModal] = React.useState(false);
  const [codeLoading, setCodeLoading] = React.useState(false);
  // const [showPermission, setShowPermission] = React.useState(false);

  const { t } = useTranslation();

  const validate = async () => {
    Keyboard.dismiss();
    let isValid = true;

    if (!inputs.email) {
      handleError(t('email_input_err_msg'), 'email');
      isValid = false;
    }
    if (isValid) {
      loginHandle();
    }
  };

  useEffect(() => {
    requestNotificationPermission();
  }, []);

  const requestNotificationPermission = async () => {
    try {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.POST_NOTIFICATION
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          // setShowPermission(false);
        } else {
          // setShowPermission(true);
          Alert.alert(
            'You have to give Allow notifications in order to use Mumtaz Services'
          );
        }
      }
    } catch (err) { }
  };

  useEffect(() => {
    setCodeLoading(true);
    const timerId = setTimeout(() => {
      setCodeLoading(false);
      requestNotificationPermission();
    }, 5000);
    return () => clearTimeout(timerId);
  }, []);

  const loginHandle = async () => {
    setLoading(true);
    let data = {
      email: inputs.email,

      password: inputs.password,
    };
    try {
      let response = await postRequest(LOGIN_URL, data);
      SuccessToast(t('Success'), JSON.stringify(response.message));
      dispatch(handleLogin(response));
      setLoading(false);
    } catch (error) {
      console.log('login - errors', error);
      setLoading(false);
      WarnToast(t('Error'), error);
    }
  };

  const handleOnchange = (text, input) => {
    setInputs((prevState) => ({ ...prevState, [input]: text }));
  };

  const handleError = (error, input) => {
    setErrors((prevState) => ({ ...prevState, [input]: error }));
  };

  if (codeLoading) {
    return <CustomLoading content={t('initializing') + ' ....'} top={null} />;
  }

  return (
    <SafeAreaView
      style={{ backgroundColor: COLORS.white, height: AppHeight(100) }}
    >
      <View style={{ paddingTop: 10, paddingHorizontal: 15 }}>
        <View style={{ alignSelf: 'center', paddingVertical: AppHeight(8) }}>
          <CustomIcon name={'LoginIcon'} />
        </View>

        <AuthHeader title={t('login_title')} alignText={'center'} />

        <View style={{ marginVertical: AppHeight(3), width: "100%" }}>
          <View style={{ alignSelf: 'center', width: "100%" }}>
            <CustomInput
              style={{ width: "100%" }}
              onChangeText={(text) => handleOnchange(text, "email")}
              onFocus={() => handleError(null, "email")}
              IconName={"email"}
              placeholder={'Email'}
              error={errors.number}
            />
          </View>
          <View style={{ alignSelf: 'center', width: "100%" }}>
            <CustomInput
              style={{ width: "100%" }}
              onChangeText={(text) => handleOnchange(text, "password")}
              onFocus={() => handleError(null, "password")}
              IconName="password"
              placeholder={t("password")}
              error={errors.password}
              password
            />
          </View>


          <View style={{ flexDirection: 'row', alignSelf: 'flex-end', marginTop: 10 }}>
            <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
              <Text
                style={{
                  color: COLORS.primary,
                  fontWeight: 700,
                  fontSize: fontSize.mini,
                }}
              >
                Forgotten password?
              </Text>
            </TouchableOpacity>
          </View>

          <View style={{ marginTop: 20 }}>
            <CustomButton
              title={t('login_btn')}
              onPress={loginHandle}
              loading={loading}
            />
          </View>

          <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
            <Text
              style={{
                color: COLORS.grey,
                fontWeight: 400,
                textAlign: 'center',
                fontSize: fontSize.mini,
              }}
            >
              {t('login_base_line')}
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text
                style={{
                  color: COLORS.primary,
                  fontWeight: 700,
                  fontSize: fontSize.mini,
                }}
              >
                {' '}
                {t('register')}!
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity onPress={() => setShowModal(!showModal)}>
          <Text
            style={{
              color: COLORS.primary,
              fontWeight: 700,
              fontSize: fontSize.mini,
              textAlign: 'center',
            }}
          >
            {t('change_language')}
          </Text>
        </TouchableOpacity>
      </View>

      <SelectLanguageModal showModal={showModal} setShowModal={setShowModal} />
    </SafeAreaView>
  );
};

export default Login;
