import React from 'react';
import { Actionsheet } from 'native-base';
import { Alert } from 'react-native';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import { PermissionsAndroid, Platform } from 'react-native';

export default function MultipleImagePiackAcionSheet({
  isOpen,
  onOpen,
  onClose,
  handleOnchange,
}) {
  const chooseImageGallery = () => {
    let options = {
      storageOptions: {
        mediaType: 'photo',
        includeBase64: true,
      },
      selectionLimit: 0, // set to 0 for selecting unlimited images
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
        handleOnchange(response.assets, 'images');
      }
    });
  };

  return (
    <>
      <Actionsheet isOpen={isOpen} onClose={onClose}>
        <Actionsheet.Content>
          <Actionsheet.Item onPress={chooseImageGallery}>
            Choose from Gallery
          </Actionsheet.Item>
          <Actionsheet.Item onPress={onClose}>Cancel</Actionsheet.Item>
        </Actionsheet.Content>
      </Actionsheet>
    </>
  );
}
