import React from 'react';
import { Actionsheet } from 'native-base';
import { Alert } from 'react-native';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import { PermissionsAndroid, Platform } from 'react-native';

export default function ImagePickerActionSheet({
  isOpen,
  onOpen,
  onClose,
  handleOnchange,
  handleAddImage,
  type,
  doctype,
}) {
  const chooseImageGallery = () => {
    let options = {
      selectionLimit: 1,
      mediaType: 'photo',
    };
    onClose();
    launchImageLibrary(options, async (response, base64) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else if (response.assets[0].fileSize > 5242880) {
        Alert.alert(
          "Mumtaz Services Say's",
          'Oops! the photos are too big. Max photo size is 4MB per photo. Please reduce the resolution or file size and retry',
          [{ text: 'OK', onPress: () => console.log('ok Pressed') }],
          { cancelable: false }
        );
      } else {
        // get the image path
        const imagePath = response.assets[0].uri;
        const fileName = response.assets[0].fileName;
        if (doctype === true) {
          handleAddImage(imagePath, fileName, type);
        } else {
          handleAddImage(imagePath, fileName);
        }
      }
    });
  };

  const requestCameraPermission = async () => {
    try {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'App Camera Permission',
            message: 'App needs access to your camera ',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Camera permission given');
          chooseLaunchCamera();
        } else {
          console.log('Camera permission denied');
        }
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const chooseLaunchCamera = () => {
    let options = { mediaType: 'photo', quality: 0.5 };
    launchCamera(options, async (response) => {
      try {
        onClose();
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.errorCode || response.errorMessage) {
          Alert.alert('Camera Error', response.message || response.errorCode);
        } else {
          // get the image path
          const imagePath = response.assets[0].uri;
          const fileName = response.assets[0].fileName;
          if (doctype === true) {
            handleAddImage(imagePath, fileName, type);
          } else {
            handleAddImage(imagePath, fileName);
          }
        }
      } catch (err) {
        Alert.alert('Camera Error', JSON.stringify(err));
      }
    });
  };

  return (
    <>
      <Actionsheet isOpen={isOpen} onClose={onClose}>
        <Actionsheet.Content>
          <Actionsheet.Item
            onPress={
              Platform.OS === 'ios'
                ? chooseLaunchCamera
                : requestCameraPermission
            }
          >
            Take Photo
          </Actionsheet.Item>
          <Actionsheet.Item onPress={chooseImageGallery}>
            Choose from Gallery
          </Actionsheet.Item>
          <Actionsheet.Item onPress={onClose}>Cancel</Actionsheet.Item>
        </Actionsheet.Content>
      </Actionsheet>
    </>
  );
}
