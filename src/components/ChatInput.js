import React, { useState, useEffect, useRef, memo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import Animated, {
  useSharedValue,
  withSpring,
  withTiming,
  useAnimatedStyle,
} from 'react-native-reanimated';

import { AppHeight, AppWidth, COLORS } from '../utils';
import { CustomIcon } from './CustomIcon';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import { Image } from 'react-native';
import { PermissionsAndroid, Platform } from 'react-native';

import { Box, useDisclose, Stagger, Spinner } from 'native-base';
import { useTranslation } from 'react-i18next';

const ChatInput = ({
  reply,
  closeReply,
  isLeft,
  username,
  message,
  setMessage,
  onSend,
  image,
  setImage,
  handleAddImage,
  onSendMsg,
}) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const height = useSharedValue(70);
  const { isOpen, onToggle } = useDisclose();
  const { t } = useTranslation();

  useEffect(() => {
    if (showEmojiPicker) {
      height.value = withTiming(400);
    } else {
      height.value = reply ? withSpring(130) : withSpring(70);
    }
  }, [showEmojiPicker]);

  useEffect(() => {
    if (reply) {
      height.value = showEmojiPicker ? withTiming(450) : withTiming(130);
    } else if (image) {
      height.value = showEmojiPicker ? withTiming(450) : withTiming(200);
    } else {
      height.value = showEmojiPicker ? withSpring(400) : withSpring(70);
    }
  }, [reply, image]);

  const heightAnimatedStyle = useAnimatedStyle(() => {
    return {
      height: height.value,
    };
  });

  const chooseImageGallery = () => {
    onToggle();
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
        setImage(response?.assets[0].uri);
        const imagePath = response.assets[0].uri;
        const fileName = response.assets[0].fileName;
        handleAddImage(imagePath, fileName);
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
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    launchCamera(options, (response) => {
      console.log('Response = ', response);
      onToggle();
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        // const source = { uri: response.assets.uri };
        setImage(response.assets[0].uri);
        const imagePath = response.assets[0].uri;
        const fileName = response.assets[0].fileName;
        handleAddImage(imagePath, fileName);
      }
    });
  };

  const closeImageUpload = () => {
    setImage('');
  };

  return (
    <Animated.View style={[styles.container, heightAnimatedStyle]}>
      {image ? (
        <View style={styles.imageUploadContainer}>
          <TouchableOpacity
            onPress={closeImageUpload}
            style={styles.closeReply}
          >
            <CustomIcon name='modalCross' />
          </TouchableOpacity>
          <Image
            source={{ uri: image }}
            style={{ height: 80, width: 80 }}
            resizeMode='stretch'
          />
        </View>
      ) : null}

      {reply !== '' ? (
        <View style={styles.replyContainer}>
          <TouchableOpacity onPress={closeReply} style={styles.closeReply}>
            <CustomIcon name='modalCross' />
          </TouchableOpacity>
          <Text style={styles.title}>
            Response to {isLeft ? username : 'Me'}
          </Text>
          <Text style={styles.reply}>{reply}</Text>
        </View>
      ) : null}
      <View style={styles.innerContainer}>
        <View style={styles.inputAndMicrophone}>
          {/* <TouchableOpacity
            style={styles.emoticonButton}
            onPress={() => setShowEmojiPicker((value) => !value)}
          >
            <Icon
              name={showEmojiPicker ? "close" : "emoticon-outline"}
              size={23} 
              // color={theme.colors.description}
            />  
          </TouchableOpacity> */}
          <TextInput
            // multiline
            placeholder={t('Message')}
            style={styles.input}
            value={message}
            placeholderTextColor={COLORS.grey}
            onChangeText={(text) => setMessage(text)}
          />
          {/* <TouchableOpacity
            style={styles.rightIconButtonStyle}
            onPress={chooseImageGallery}
          >
            <CustomIcon name="chatCameraIcon" />
          </TouchableOpacity> */}

          <Box>
            <Box alignItems='center'>
              <Stagger
                visible={isOpen}
                initial={{
                  opacity: 0,
                  scale: 2,
                  translateY: 34,
                }}
                animate={{
                  translateY: -80,
                  scale: 1,
                  opacity: 1,
                  transition: {
                    type: 'spring',
                    mass: 0.8,
                    stagger: {
                      offset: 30,
                      reverse: true,
                    },
                  },
                }}
                exit={{
                  translateY: 34,
                  scale: 0.5,
                  opacity: 0,
                  transition: {
                    duration: 100,
                    stagger: {
                      offset: 30,
                      reverse: true,
                    },
                  },
                }}
              >
                <TouchableOpacity
                  style={[styles.rightIconButtonStyle]}
                  onPress={
                    Platform.OS === 'ios'
                      ? chooseLaunchCamera
                      : requestCameraPermission
                  }
                >
                  <Image
                    source={require('../../assets/camera.png')}
                    style={{ height: 30, width: 30 }}
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.rightIconButtonStyle,
                    {
                      marginVertical: 10,
                    },
                  ]}
                  onPress={chooseImageGallery}
                >
                  <Image
                    source={require('../../assets/gallery.png')}
                    style={{ height: 30, width: 30 }}
                  />
                </TouchableOpacity>
              </Stagger>
            </Box>

            <TouchableOpacity
              style={[
                styles.rightIconButtonStyle,
                { marginTop: -80, borderLeftWidth: 1, borderLeftColor: '#fff' },
              ]}
              onPress={onToggle}
            >
              <CustomIcon name='chatCameraIcon' />
            </TouchableOpacity>
          </Box>
        </View>
        <TouchableOpacity style={styles.sendButton} onPress={onSend}>
          {onSendMsg ? (
            <Spinner color='white' />
          ) : (
            <CustomIcon name='chatIcon' />
          )}
        </TouchableOpacity>
      </View>
      {/* <EmojiPicker /> */}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    backgroundColor: COLORS.white,
  },
  replyContainer: {
    paddingHorizontal: 10,
    marginHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  imageUploadContainer: {
    paddingHorizontal: 10,
    marginHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: COLORS.white,
    padding: 20,
  },
  title: {
    marginTop: 5,
    fontWeight: 'bold',
  },
  closeReply: {
    position: 'absolute',
    right: 10,
    top: 5,
  },
  reply: {
    marginTop: 5,
  },
  innerContainer: {
    paddingHorizontal: 10,
    marginHorizontal: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: 10,
  },
  inputAndMicrophone: {
    flexDirection: 'row',
    backgroundColor: COLORS.lightGrey,
    flex: 3,
    marginRight: 10,
    paddingVertical: Platform.OS === 'ios' ? 5 : 0,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  input: {
    backgroundColor: 'transparent',
    paddingLeft: 20,
    color: COLORS.black,
    flex: 3,
    fontSize: 15,
    height: Platform.OS === 'ios' ? AppHeight(6) : AppHeight(7),
    alignSelf: 'center',
  },
  rightIconButtonStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 15,
    paddingLeft: 10,
  },
  swipeToCancelView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 30,
  },
  swipeText: {
    color: COLORS.black,
    fontSize: 15,
  },
  emoticonButton: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 10,
  },
  recordingActive: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 10,
  },
  recordingTime: {
    color: COLORS.black,
    fontSize: 20,
    marginLeft: 5,
  },
  microphoneAndLock: {
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  lockView: {
    backgroundColor: '#eee',
    width: 60,
    alignItems: 'center',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    height: 130,
    paddingTop: 20,
  },
  sendButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    height: AppHeight(7),
    width: AppWidth(15),
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ChatInput;
