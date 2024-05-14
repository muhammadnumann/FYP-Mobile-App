import { Platform, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useToast } from 'native-base';
import { useMutation } from 'react-query';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import {
  UploadImagetoServer,
  sendAdminChat,
} from '../../../services/SameApiServices';
import SuccessToast from '../../../components/Toast/SuccessToast';
import WarnToast from '../../../components/Toast/WarnToast';
import { getBearerRequest } from '../../../services/ApiServices';
import {
  DELETE_ADMIN_CHAT_URL,
  DELETE_ADMIN_MESSAGE_URL,
  GET_ADMIN_CHAT_URL,
} from '../../../services/ApiConstants';
import MessagesList from '../../../components/MessagesList';
import ChatInput from '../../../components/ChatInput';
import CustomHeader from '../../../components/CustomHeader';

const SpAdminInbox = ({ route, navigation }) => {
  const [reply, setReply] = useState('');
  const [isLeft, setIsLeft] = useState();
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [image, setImage] = useState('');
  const [imageUri, setImageUri] = useState('');
  const [chat, setChat] = useState([]);
  const [chatId, setChatId] = useState('');
  const [messageId, setMessageId] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [onSendMsg, setOnSend] = useState(false);

  const { t } = useTranslation();
  const user = useSelector((state) => state.AuthReducer.user);

  const {
    mutate,
    data: sendingResponse,
    isSuccess,
    isLoading: sendLoading,
    error,
  } = useMutation(sendAdminChat);

  const {
    mutate: uploadImage,
    data: uploadImageResponse,
    // isError,
    isSuccess: uploadSuccess,
    error: uploadError,
  } = useMutation(UploadImagetoServer);

  const toast = useToast();

  useEffect(() => {
    getChat(user?.id);
    const intervalId = setInterval(() => {
      getChat(user?.id);
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    getChat(sendingResponse?.data?.chatId);
    setMessage('');
    setImage('');
    setImageUri('');
    setOnSend(false);
  }, [isSuccess]);

  useEffect(() => {
    setImage(uploadImageResponse?.data);
  }, [uploadSuccess]);

  useEffect(() => {
    navigation.getParent()?.setOptions({
      tabBarStyle: {
        display: 'none',
      },
    });
    return () =>
      navigation.getParent()?.setOptions({
        tabBarStyle: {
          height: Platform.OS === 'ios' ? 80 : 60,
        },
      });
  }, [navigation]);

  const swipeToReply = (message, isLeft) => {
    setReply(message.length > 50 ? message.slice(0, 50) + '...' : message);
    setIsLeft(isLeft);
  };

  const onBooking = () => {
    SuccessToast(t('Success'), t('booking_success_msg'));
  };

  const closeReply = () => {
    setReply('');
  };

  const handleAddImage = (imagePath, fileName) => {
    const formData = new FormData();
    formData.append('fileName', {
      uri: imagePath,
      type: 'image/png',
      name: fileName,
    });
    uploadImage(formData);
    setImageUri(imagePath);
  };

  const onSend = async () => {
    if (imageUri.length > 0) {
      let data = {
        messageType: 2,
        file: image,
        message: message,
      };
      setOnSend(true);

      mutate(data);
    } else {
      if (message === '') {
        WarnToast(t('add_message'));
      } else {
        let data = {
          messageType: 1,
          message: message,
        };
        setOnSend(true);

        mutate(data);
      }
    }
  };
  const getChat = async () => {
    try {
      let response = await getBearerRequest(GET_ADMIN_CHAT_URL);
      setChat(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const onPressNotification = () => {
    navigation.navigate('ServiceProviderProfile', {
      screen: 'SpNotifications',
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <CustomHeader
        title={t('help_center')}
        back
        navigation={navigation}
        icon
        onPressNotification={onPressNotification}
      />

      <MessagesList
        onSwipeToReply={swipeToReply}
        chat={chat}
        setShowModal={setShowModal}
        setMessageId={setMessageId}
      />

      <ChatInput
        reply={reply}
        isLeft={isLeft}
        closeReply={closeReply}
        username={user.fullName}
        message={message}
        setMessage={setMessage}
        onSend={onSend}
        image={imageUri}
        setImage={setImageUri}
        handleAddImage={handleAddImage}
        onSendMsg={onSendMsg}
      />
    </View>
  );
};

export default SpAdminInbox;

const styles = StyleSheet.create({});
