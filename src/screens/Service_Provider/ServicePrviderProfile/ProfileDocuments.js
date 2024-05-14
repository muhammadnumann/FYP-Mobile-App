import React, { useEffect } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Keyboard,
  ScrollView,
  StyleSheet,
} from 'react-native';

import CustomButton from '../../../components/CustomButton';
import CustomFileUpload from '../../../components/CustomFileUpload';
import { AppHeight, COLORS, docsType } from '../../../utils';
import CustomDropdown from '../../../components/CustomDropdown';
import { UploadImagetoServer } from '../../../services/SameApiServices';
import { useMutation } from 'react-query';
import {
  getProfileDocService,
  updateProfileDocService,
} from '../../../services/ServiceProviderServices/ServiceProviderService';
import CustomLoading from '../../../components/Loading/CustomLoading';
import WarnToast from '../../../components/Toast/WarnToast';
import { useToast } from 'native-base';
import SuccessToast from '../../../components/Toast/SuccessToast';
import { useTranslation } from 'react-i18next';

const ProfileDocuments = ({ navigation }) => {
  const [inputs, setInputs] = React.useState({
    docsType: '',
    frontID: '',
    backID: '',
    frontDL: '',
    backDL: '',
    passportImage: '',

    frontIDFile: '',
    backIDFile: '',
    frontDLFile: '',
    backDLFile: '',
    passportImageFile: '',
  });
  const [errors, setErrors] = React.useState({});
  const [loading, setLoading] = React.useState(false);
  const [uploadLoading, setUploadLoading] = React.useState(false);
  const { t } = useTranslation();
  const toast = useToast();

  const {
    mutate: uploadImage,
    data: uploadImageResponse,
    isSuccess: uploadSuccess,
  } = useMutation(UploadImagetoServer);

  useEffect(() => {
    getProfileDocs();
  }, []);

  const getProfileDocs = async () => {
    setLoading(true);
    try {
      let response = await getProfileDocService();
      // setCancelJobs(response);
      setLoading(false);
      // if(response.doc)
      if (response.documentType === 1) {
        handleOnchange('National ID Card', 'docsType');
        handleOnchange(response.documentName1, 'frontID');
        handleOnchange(response.documentName2, 'backID');
        handleOnchange(response.documentName1, 'frontIDFile');
        handleOnchange(response.documentName2, 'backIDFile');
      } else if (response.documentType === 2) {
        handleOnchange('Driving License', 'docsType');
        handleOnchange(response.documentName1, 'frontDL');
        handleOnchange(response.documentName2, 'backDL');
        handleOnchange(response.documentName1, 'frontDLFile');
        handleOnchange(response.documentName2, 'backDLFile');
      } else if (response.documentType === 3) {
        handleOnchange('Passport', 'docsType');
        handleOnchange(response.documentName1, 'passportImage');
        handleOnchange(response.documentName1, 'passportImageFile');
      }
      // handleOnchange(response.documentName1, "frontID");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (inputs.docsType === 'National ID Card') {
      if (inputs.frontIDFile === '') {
        handleOnchange(uploadImageResponse?.data, 'frontIDFile');
      } else {
        handleOnchange(uploadImageResponse?.data, 'backIDFile');
      }
    } else if (inputs.docsType === 'Driving License') {
      if (inputs.frontDLFile === '') {
        handleOnchange(uploadImageResponse?.data, 'frontDLFile');
      } else {
        handleOnchange(uploadImageResponse?.data, 'backDLFile');
      }
    } else if (inputs.docsType === 'Passport') {
      handleOnchange(uploadImageResponse?.data, 'passportImageFile');
    }
  }, [uploadImageResponse]);

  const validate = async () => {
    Keyboard.dismiss();
    let isValid = true;
    if (!inputs.docsType) {
      handleError(t('doc_type_error_msg'), 'docsType');
      isValid = false;
    }

    if (isValid) {
      if (inputs.docsType === 'National ID Card') {
        if (inputs.frontIDFile === '') {
          WarnToast(t('add_front_card'));
        } else if (inputs.backIDFile === '') {
          WarnToast(t('add_back_card'));
        } else {
          updateDocs();
        }
      } else if (inputs.docsType === 'Driving License') {
        if (inputs.frontDLFile === '') {
          WarnToast(t('add_front_driving'));
        } else if (inputs.backDLFile === '') {
          WarnToast(t('add_back_driving'));
        } else {
          updateDocs();
        }
      } else if (inputs.docsType === 'Passport') {
        if (inputs.passportImageFile === '') {
          WarnToast(t('add_passpost_image'));
        } else {
          updateDocs();
        }
      }
    }
  };

  const updateDocs = async () => {
    setUploadLoading(true);
    if (inputs.docsType === 'National ID Card') {
      let data = {
        documenType: 1,
        documentName1: inputs.frontIDFile,
        documentName2: inputs.backIDFile,
      };

      try {
        let response = await updateProfileDocService(data);
        setUploadLoading(false);
        SuccessToast(t('Success'), t('id_added_msg'));
        // navigation.navigate("profile");
      } catch (error) {
        console.log(error);
        setUploadLoading(false);
      }
    } else if (inputs.docsType === 'Driving License') {
      let data = {
        documenType: 2,
        documentName1: inputs.frontDLFile,
        documentName2: inputs.backDLFile,
      };
      try {
        let response = await updateProfileDocService(data);
        SuccessToast(t('Success'), t('driving_updated_msg'));
        // navigation.navigate("profile");
        setUploadLoading(false);
      } catch (error) {
        console.log(error);
        setUploadLoading(false);
      }
    } else if (inputs.docsType === 'Passport') {
      let data = {
        documenType: 3,
        documentName1: inputs.passportImageFile,
        documentName2: '',
      };
      try {
        let response = await updateProfileDocService(data);
        SuccessToast(t('Success'), t('passport_updated_msg'));
        // navigation.navigate("profile");
        setUploadLoading(false);
      } catch (error) {
        console.log(error);
        setUploadLoading(false);
      }
    }
  };

  const handleOnchange = (text, input) => {
    setInputs((prevState) => ({ ...prevState, [input]: text }));
  };

  const handleError = (error, input) => {
    setErrors((prevState) => ({ ...prevState, [input]: error }));
  };

  const handleAddImage = (imagePath, fileName, type) => {
    const formData = new FormData();
    formData.append('fileName', {
      uri: imagePath,
      type: 'image/png',
      name: fileName,
    });
    uploadImage(formData);
    handleOnchange(imagePath, type);
  };

  if (loading) {
    return <CustomLoading content={'Loading docs....'} top={null} />;
  }

  const renderFields = () => {
    if (inputs.docsType === 'National ID Card') {
      return (
        <>
          <CustomFileUpload
            title='National ID Card Front'
            handleOnchange={handleOnchange}
            source={inputs.frontID}
            type={'frontID'}
            editProfile={inputs.frontID === '' ? false : true}
            handleAddImage={handleAddImage}
          />
          <CustomFileUpload
            title='National ID Card Back'
            handleOnchange={handleOnchange}
            source={inputs.backID}
            type={'backID'}
            editProfile={inputs.backID === '' ? false : true}
            handleAddImage={handleAddImage}
          />
        </>
      );
    } else if (inputs.docsType === 'Driving License') {
      return (
        <>
          <CustomFileUpload
            title='Driving License Card Front'
            handleOnchange={handleOnchange}
            source={inputs.frontDL}
            type={'frontDL'}
            height={AppHeight(30)}
            editProfile={inputs.frontDL === '' ? false : true}
            handleAddImage={handleAddImage}
          />
          <CustomFileUpload
            title='Driving License Card Back'
            handleOnchange={handleOnchange}
            source={inputs.backDL}
            type={'backDL'}
            editProfile={inputs.backDL === '' ? false : true}
            handleAddImage={handleAddImage}
          />
        </>
      );
    } else if (inputs.docsType === 'Passport') {
      return (
        <>
          <CustomFileUpload
            title='Passport Image'
            handleOnchange={handleOnchange}
            source={inputs.passportImage}
            type={'passportImage'}
            editProfile={inputs.passportImage === '' ? false : true}
            handleAddImage={handleAddImage}
          />
        </>
      );
    }
  };

  return (
    <SafeAreaView style={{ backgroundColor: COLORS.white, flex: 1 }}>
      <ScrollView>
        <View style={{ paddingHorizontal: 20 }}>
          <View>
            <CustomDropdown
              data={docsType}
              placeholder={'Select Document Type'}
              IconName='DocsIcon'
              value={inputs.docsType}
              handleOnchange={handleOnchange}
              error={errors.docsType}
              handleError={handleError}
              name='docsType'
            />

            {inputs.docsType !== '' ? (
              <Text
                style={{
                  paddingVertical: AppHeight(1),
                  fontWeight: 'bold',
                  marginTop: 20,
                }}
              >
                {t('Upload File')}
              </Text>
            ) : null}

            {renderFields()}

            {inputs.docsType !== '' ? (
              <CustomButton
                title={t('save')}
                onPress={validate}
                top={AppHeight(1.5)}
                loading={uploadLoading}
              />
            ) : null}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileDocuments;

const styles = StyleSheet.create({});
