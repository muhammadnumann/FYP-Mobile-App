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
  GetUserProfileInfo,
  UploadImagetoServer,
} from '../../../services/SameApiServices';
import SuccessToast from '../../../components/Toast/SuccessToast';
import { useMutation } from 'react-query';
import { useQuery, useQueryClient } from 'react-query';
import SelectButton from '../../../components/SelectButton';
import { Radio, Stack } from 'native-base';
import CustomDropdown from '../../../components/CustomDropdown';
import { useTranslation } from 'react-i18next';
import WarnToast from '../../../components/Toast/WarnToast';

export default function UserEditProfile({ navigation }) {
  const [inputs, setInputs] = useState({
    email: '',
    number: '',
    dob: '',
    user_name: '',
    user_image: null,
    idCardNumber: '',
    country: '',
    state: '',
    address: '',
    city: '',
    selected_image: '',
    countryId: '',
    stateId: null,
    cityId: null,
    homeAppartmentNumber: '',
    markAs: '',
    gender: '',
    firstName: '',
    lastName: '',
  });
  const [errors, setErrors] = useState({});
  const { isOpen, onOpen, onClose } = useDisclose();
  const toast = useToast();
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  const { data: userDetails } = GetUserProfileInfo();

  const {
    mutate,
    data: response,
    isError,
    isSuccess,
    isLoading: editLoading,
    error,
  } = useMutation(EditProfile);

  const {
    mutate: uploadImage,
    data: uploadImageResponse,
    isError: imageError,
    isSuccess: uploadSuccess,
    error: uploadError,
  } = useMutation(UploadImagetoServer);

  useEffect(() => {
    if (isSuccess) {
      SuccessToast(t('Success'), response.message);
      queryClient.setQueryData('get-profile-for-user');

      navigation.push('userProfile');
    }

    if (isError) {
      console.log('error', error);
    }

    if (uploadSuccess) {
      handleOnchange(uploadImageResponse.data, 'selected_image');
    }
  }, [isError, isSuccess, uploadImageResponse]);

  useEffect(() => {
    updateSate(userDetails?.data);
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
      handleOnchange(profile.title, 'user_name');
      handleOnchange(profile.email, 'email');
      handleOnchange(profile.phoneNumber, 'number');
      handleOnchange(profile.dob, 'dob');
      handleOnchange(profile.gender, 'gender');
      handleOnchange(profile.cityId, 'cityId');
      handleOnchange(profile.firstName, 'firstName');
      handleOnchange(profile.lastName, 'lastName');
      handleOnchange(profile.stateId, 'stateId');
      handleOnchange(profile.countryId, 'countryId');
      handleOnchange(profile.address, 'address');
      handleOnchange(profile.stateName, 'state');
      handleOnchange(profile.cityName, 'city');
      handleOnchange(profile.countryName, 'country');
      handleOnchange(profile.homeAppartmentNumber, 'homeAppartmentNumber');
      handleOnchange(profile.idCardNumber, 'idCardNumber');

      handleOnchange(
        inputs.selected_image !== '' ? inputs.user_image : profile.profileImage,
        'selected_image'
      );
    }
  };
  const handleOnchange = (text, input) => {
    setInputs((prevState) => ({ ...prevState, [input]: text }));
  };

  const handleError = (error, input) => {
    setErrors((prevState) => ({ ...prevState, [input]: error }));
  };

  const hanldeEditProfile = () => {
    if (inputs?.country === '') {
      WarnToast('Please select a country');
    } else {
      const data = {
        title: inputs.user_name,
        email: inputs.email,
        // phoneNumber: inputs.number,
        dob: formatDate(inputs.dob),
        profileImage: inputs.selected_image,
        gender: inputs.gender,
        firstName: inputs.firstName,
        lastName: inputs.lastName,
        cityId: inputs.cityId,
        stateId: inputs.stateId,
        countryId: inputs.countryId,
        address: inputs.address,
        homeAppartmentNumber: inputs.homeAppartmentNumber,
        idCardNumber: inputs.idCardNumber,
      };

      mutate(data);
    }
  };

  const onPressCountry = () => {
    navigation.navigate('country', {
      handleOnchange,
      handleError,
      name: 'country',
    });
  };

  const onPressState = () => {
    navigation.navigate('state', {
      handleOnchange,
      handleError,
      name: 'state',
      countryId: inputs.countryId,
    });
  };

  const onPressCity = () => {
    navigation.navigate('city', {
      handleOnchange,
      handleError,
      name: 'city',
      stateId: inputs.stateId,
    });
  };

  let user_profile_image = urlFormat(userDetails?.data?.profileImage);

  return (
    <View
      style={{ height: AppHeight(100), backgroundColor: COLORS.white, flex: 1 }}
    >
      <CustomHeader title='Edit Profile' back navigation={navigation} />
      <ScrollView>
        <ImageBackground
          source={{
            uri:
              inputs?.user_image === null
                ? user_profile_image && user_profile_image
                : inputs && inputs?.user_image,
          }}
          style={styles.profileImage}
          borderRadius={12}
        >
          <TouchableOpacity
            style={{
              alignSelf: 'center',
              bottom: -20,
              position: 'absolute',
            }}
            onPress={onOpen}
          >
            <CustomIcon name={'cameraIcon'} />
          </TouchableOpacity>
        </ImageBackground>

        <View
          style={{
            marginVertical: 10,
            marginHorizontal: 15,
            marginTop: AppHeight(5),
          }}
        >
          <CustomInput
            onChangeText={(text) => handleOnchange(text, 'user_name')}
            onFocus={() => handleError(null, 'user_name')}
            IconName={'role'}
            placeholder='User Name'
            value={inputs.user_name}
            // error={errors.email}
          />

          <CustomInput
            onChangeText={(text) => handleOnchange(text, 'firstName')}
            onFocus={() => handleError(null, 'firstName')}
            IconName={'role'}
            placeholder={t('firstName')}
            value={inputs.firstName}
            // error={errors.email}
          />

          <CustomInput
            onChangeText={(text) => handleOnchange(text, 'lastName')}
            onFocus={() => handleError(null, 'lastName')}
            IconName={'role'}
            placeholder={t('lastName')}
            value={inputs.lastName}
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
          <CustomInput
            onChangeText={(text) => handleOnchange(text, 'idCardNumber')}
            onFocus={() => handleError(null, 'idCardNumber')}
            IconName={'CardIcon'}
            placeholder={t('idCardNumber')}
            value={inputs.idCardNumber}
            error={errors.idCardNumber}
          />

          {/* <CustomCountryPickerModal
            handleOnchange={handleOnchange}
            name="country"
          /> */}

          <SelectButton
            placeholder={t('select_country')}
            IconName='LocationIcon'
            value={inputs.country}
            navigation={onPressCountry}
            error={errors.country}
          />

          <SelectButton
            placeholder={t('select_state')}
            IconName='LocationIcon'
            value={inputs.state}
            navigation={onPressState}
            error={errors.state}
          />

          <SelectButton
            error={errors.city}
            placeholder={t('select_city')}
            IconName='LocationIcon'
            value={inputs.city}
            navigation={onPressCity}
          />

          {/* <CustomInput
            onChangeText={(text) =>
              handleOnchange(text, "homeAppartmentNumber")
            }
            onFocus={() => handleError(null, "homeAppartmentNumber")}
            IconName="LocationIcon"
            placeholder="Apartment / House No."
            error={errors.homeAppartmentNumber}
            value={inputs.homeAppartmentNumber}
          /> */}

          <CustomInput
            onChangeText={(text) => handleOnchange(text, 'address')}
            onFocus={() => handleError(null, 'address')}
            IconName={'LocationIcon'}
            placeholder={t('complete_address')}
            value={inputs.address}
            error={errors.address}
          />

          <Text style={{ fontWeight: 'bold', marginTop: 10 }}>
            {t('mark_as')}
          </Text>

          <Radio.Group
            name='exampleGroup'
            defaultValue='1'
            accessibilityLabel='favorite colorscheme'
          >
            <Stack
              direction={{
                base: 'row',
                md: 'row',
              }}
              alignItems={{
                base: 'flex-start',
                md: 'center',
              }}
              space={4}
              w='75%'
              maxW='300px'
            >
              <Radio
                value='1'
                colorScheme='blue'
                size='sm'
                my={1}
                onPress={() => handleOnchange('Home', 'markAs')}
              >
                {t('Home')}
              </Radio>
              <Radio
                value='2'
                colorScheme='blue'
                size='sm'
                my={1}
                onPress={() => handleOnchange('Office', 'markAs')}
              >
                {t('Office')}
              </Radio>
              <Radio
                value='3'
                colorScheme='blue'
                size='sm'
                my={1}
                onPress={() => handleOnchange('Other', 'markAs')}
              >
                {t('Other')}
              </Radio>
            </Stack>
          </Radio.Group>
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
