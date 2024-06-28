import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Text,
} from 'react-native';
import CustomBorderButton from '../../../components/CustomBorderButton';
import CustomButton from '../../../components/CustomButton';
import CustomHeader from '../../../components/CustomHeader';
import { CustomIcon } from '../../../components/CustomIcon';
import CustomInput from '../../../components/CustomInput';
import DatePicker from '../../../components/DatePicker';
import {
  AppHeight,
  AppWidth,
  COLORS,
  formatDate,
  urlFormat,
  userGender,
} from '../../../utils';
import ImagePickerActionSheet from '../../../components/ActionSheet/ImagePickerActionSheet';
import { ScrollView, useDisclose, useToast } from 'native-base';
import {
  EditProfile,

} from '../../../services/SameApiServices';
import SuccessToast from '../../../components/Toast/SuccessToast';
import { useMutation } from 'react-query';
import { useQuery, useQueryClient } from 'react-query';
import CustomDropdown from '../../../components/CustomDropdown';
import { useTranslation } from 'react-i18next';
import WarnToast from '../../../components/Toast/WarnToast';
import { useSelector } from 'react-redux';

export default function UserEditProfile({ navigation }) {
  const [inputs, setInputs] = useState({
    email: '',
    number: '',
    dob: '',
    gender: '',
    fullName: '',
  });
  const [errors, setErrors] = useState({});
  const userDetails = useSelector((state) => state.AuthReducer.user);
  console.log(userDetails)
  const { isOpen, onOpen, onClose } = useDisclose();
  const toast = useToast();
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  const {
    mutate,
    data: response,
    isError,
    isSuccess,
    isLoading: editLoading,
    error,
  } = useMutation(EditProfile);


  useEffect(() => {
    if (isSuccess) {
      SuccessToast(t('Success'), response.message);
      queryClient.setQueryData('get-profile-for-user');

      navigation.push('userProfile');
    }

    if (isError) {
      console.log('error', error);
    }

  }, [isError, isSuccess]);

  useEffect(() => {
    updateSate(userDetails);
  }, [userDetails]);

  const handleAddImage = (imagePath, fileName) => {
    const formData = new FormData();
    formData.append('fileName', {
      uri: imagePath,
      type: 'image/png',
      name: fileName,
    });
    uploadImage(formData);
    handleOnchange(imagePath, 'user_image');
    handleOnchange(fileName, 'selected_image');
  };

  const updateSate = (profile) => {
    if (profile) {
      handleOnchange(profile.email, 'email');
      handleOnchange(profile.phoneNo, 'number');
      handleOnchange(profile.dob, 'dob');
      handleOnchange(profile.gender, 'gender');
      handleOnchange(profile.name, 'fullName');
    }
  };
  const handleOnchange = (text, input) => {
    setInputs((prevState) => ({ ...prevState, [input]: text }));
  };

  const handleError = (error, input) => {
    setErrors((prevState) => ({ ...prevState, [input]: error }));
  };

  const hanldeEditProfile = () => {

    const data = {
      email: inputs.email,
      dob: formatDate(inputs.dob),
      gender: inputs.gender,
      fullName: inputs.firstName,
    };

    mutate(data);

  };


  let user_profile_image = urlFormat(userDetails?.data?.profileImage);

  return (
    <View
      style={{ height: AppHeight(100), backgroundColor: COLORS.white, flex: 1 }}
    >
      <CustomHeader title='Edit Profile' back navigation={navigation} />
      <ScrollView>
        <View
          style={{
            marginVertical: 10,
            marginHorizontal: 15,
            marginTop: AppHeight(5),
          }}
        >
          <CustomInput
            onChangeText={(text) => handleOnchange(text, 'fullName')}
            onFocus={() => handleError(null, 'fullName')}
            IconName={'role'}
            placeholder={t('fullName')}
            value={inputs.fullName}
          // error={errors.email}
          />

          <CustomInput
            onChangeText={(text) => handleOnchange(text, 'email')}
            onFocus={() => handleError(null, 'email')}
            IconName={'email'}
            placeholder={t('email')}
            value={inputs.email}
          // error={errors.email}
          />

          <CustomInput
            onChangeText={(text) => handleOnchange(text, 'number')}
            onFocus={() => handleError(null, 'number')}
            IconName={'phone'}
            placeholder='number'
            value={inputs.number}
            readOnly={true}
          // error={errors.email}
          />

          <DatePicker
            placeholder={t('dob')}
            IconName='DateIcon'
            handleOnchange={handleOnchange}
            error={errors.dob}
            handleError={handleError}
            name='dob'
            value={inputs.dob}
          />

          <CustomDropdown
            mode='date'
            data={userGender}
            placeholder={t('select_gender')}
            IconName='role'
            handleOnchange={handleOnchange}
            error={errors.gender}
            handleError={handleError}
            name='gender'
            value={inputs.gender}
          />

        </View>

        <View style={styles.viewBtn}>
          <CustomBorderButton
            title={t('cancel')}
            top={5}
            width={'47%'}
            onPress={() => navigation.navigate('userProfile')}
          />
          <CustomButton
            title={t('save')}
            width={'47%'}
            onPress={hanldeEditProfile}
            loading={editLoading}
            top={2}
          />
        </View>
      </ScrollView>

      <ImagePickerActionSheet
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        handleOnchange={handleOnchange}
        type={'user_image'}
        handleAddImage={handleAddImage}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  viewBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  profileImage: {
    height: 100,
    width: 90,
    alignSelf: 'center',
    marginTop: 30,
    borderRadius: 12,
  },
});
