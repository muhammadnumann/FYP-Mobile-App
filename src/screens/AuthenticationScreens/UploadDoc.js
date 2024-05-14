import React from 'react';
import { View, Text, SafeAreaView, Keyboard, ScrollView } from 'react-native';
import AuthHeader from '../../components/AuthHeader';
import CustomButton from '../../components/CustomButton';
import CustomDropdown from '../../components/CustomDropdown';
import CustomFileUpload from '../../components/CustomFileUpload';
import { CustomIcon } from '../../components/CustomIcon';
import { AppHeight, COLORS, docsType } from '../../utils';
import { launchImageLibrary } from 'react-native-image-picker';
import { useTranslation } from 'react-i18next';

const UploadDoc = ({ route, navigation }) => {
  const [inputs, setInputs] = React.useState({
    docsType: '',
    frontID: '',
    backID: '',
    frontDL: '',
    backDL: '',
    passportImage: '',
  });
  const [errors, setErrors] = React.useState({});
  const [loading, setLoading] = React.useState(false);
  const { t } = useTranslation();
  // const { data } = route.params;

  const validate = async () => {
    Keyboard.dismiss();
    let isValid = true;
    if (!inputs.docsType) {
      handleError(t('doc_type_error_msg'), 'docsType');
      isValid = false;
    }

    if (isValid) {
      //  login();
    }
  };

  const handleOnchange = (text, input) => {
    setInputs((prevState) => ({ ...prevState, [input]: text }));
  };

  const handleError = (error, input) => {
    setErrors((prevState) => ({ ...prevState, [input]: error }));
  };

  const onPressNext = () => {
    // navigation.navigate("OtpScreen");
  };

  const chooseImage = (type) => {
    let options = {
      storageOptions: {
        selectionLimit: 1,
        mediaType: 'photo',
      },
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        //  const image = response.assets[0];
        if (type === 'frontID') {
          handleOnchange(response.assets[0].uri, type);
        } else if (type === 'backID') {
          handleOnchange(response.assets[0].uri, type);
        } else if (type === 'frontDL') {
          handleOnchange(response.assets[0].uri, type);
        } else if (type === 'backDL') {
          handleOnchange(response.assets[0].uri, type);
        } else if (type === 'passportImage') {
          handleOnchange(response.assets[0].uri, type);
        }

        //  const formdata = new FormData()
        //  formdata.append('file', {
        //    uri: image.uri,
        //    type: image.type,
        //    name: image.name
        //  })
      }
    });
  };

  const renderFields = () => {
    if (inputs.docsType === 'National ID Card') {
      return (
        <>
          <CustomFileUpload
            title={t('id_card_front')}
            handleOnchange={handleOnchange}
            source={inputs.frontID}
            type={'frontID'}
          />
          <CustomFileUpload
            title={t('id_card_back')}
            handleOnchange={handleOnchange}
            source={inputs.backID}
            type={'backID'}
          />
        </>
      );
    } else if (inputs.docsType === 'Driving License') {
      return (
        <>
          <CustomFileUpload
            title={t('license_front')}
            handleOnchange={handleOnchange}
            source={inputs.frontDL}
            type={'frontDL'}
          />
          <CustomFileUpload
            title={t('license_back')}
            handleOnchange={handleOnchange}
            source={inputs.backDL}
            type={'backDL'}
          />
        </>
      );
    } else if (inputs.docsType === 'Passport') {
      return (
        <>
          <CustomFileUpload
            title={t('passport_image')}
            handleOnchange={handleOnchange}
            source={inputs.passportImage}
            type={'passportImage'}
          />
        </>
      );
    }
  };

  return (
    <SafeAreaView style={{ backgroundColor: COLORS.white, flex: 1 }}>
      <ScrollView>
        <View style={{ paddingHorizontal: 20 }}>
          <View style={{ alignSelf: 'center', paddingVertical: AppHeight(3) }}>
            <CustomIcon name={'FileIcon'} />
          </View>

          <AuthHeader title={'Upload Documents'} alignText={'center'} />

          <View>
            <CustomDropdown
              data={docsType}
              placeholder={'Select Document Type'}
              IconName='DocsIcon'
              handleOnchange={handleOnchange}
              error={errors.docsType}
              handleError={handleError}
              name='docsType'
            />

            <Text
              style={{
                paddingVertical: AppHeight(1),
                fontWeight: 'bold',
                marginTop: 20,
              }}
            >
              {t('uploadFiles')}
            </Text>

            {renderFields()}

            <CustomButton
              title='Register'
              onPress={onPressNext}
              top={AppHeight(1.5)}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default UploadDoc;
