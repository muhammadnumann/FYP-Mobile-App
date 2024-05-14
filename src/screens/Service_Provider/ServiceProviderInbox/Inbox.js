import { Platform, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import ChatHeader from '../../../components/ChatHeader';
import MessagesList from '../../../components/MessagesList';
import ChatInput from '../../../components/ChatInput';
import { useToast } from 'native-base';
import {
  UploadImagetoServer,
  sendChat,
} from '../../../services/SameApiServices';
import { useMutation } from 'react-query';
import { getBearerRequest } from '../../../services/ApiServices';
import {
  DELETE_MESSAGE_URL,
  GET_CHAT_BY_ID_URL,
  GET_CHAT_URL,
} from '../../../services/ApiConstants';
import ConfirmationModal from '../../../components/Modals/ConfirmationModal';
import SuccessToast from '../../../components/Toast/SuccessToast';
import WarnToast from '../../../components/Toast/WarnToast';
import { useTranslation } from 'react-i18next';

const Inbox = ({ route, navigation }) => {
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

  const { chatInfo } = route.params;

  const {
    mutate,
    data: sendingResponse,
    isSuccess,
    isLoading: sendLoading,
  } = useMutation(sendChat);

  const {
    mutate: uploadImage,
    data: uploadImageResponse,
    // isError,
    isSuccess: uploadSuccess,
    error: uploadError,
  } = useMutation(UploadImagetoServer);

  const toast = useToast();

  useEffect(() => {
    getChatByUserId(chatInfo?.bookedById);
    const intervalId = setInterval(() => {
      getChatByUserId(chatInfo?.bookedById);
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  const getChatByUserId = async (id) => {
    try {
      let response = await getBearerRequest(
        GET_CHAT_BY_ID_URL + '?userId=' + id
      );
      if (response.data) {
        setChatId(response?.data[0]?.chatId);
        setChat(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getChatByUserId(chatInfo?.bookedById);
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
        userId: chatInfo?.bookedById,
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
          userId: chatInfo?.bookedById,
          messageType: 1,
          message: message,
        };
        setOnSend(true);

        mutate(data);
      }
    }
  };

  const getChat = async (id) => {
    try {
      let response = await getBearerRequest(GET_CHAT_URL + '?chatId=' + id);
      setChat(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteMessage = async () => {
    try {
      let response = await getBearerRequest(
        DELETE_MESSAGE_URL + '?message=' + messageId
      );
      SuccessToast(t('Success'), t('booking_delete_success_msg'));
      // getChat(chatId);
      getChatByUserId(chatInfo?.bookedById);

      setShowModal(false);
    } catch (error) {
      setShowModal(false);
      WarnToast(t('try_again'));
      console.log(error);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <ChatHeader
        onPress={() => setVisible(true)}
        username={chatInfo?.clientName}
        picture={chatInfo?.clientImage}
        onlineStatus={t('online')}
        booking={false}
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
        username={chatInfo.fullName}
        message={message}
        setMessage={setMessage}
        onSend={onSend}
        image={imageUri}
        setImage={setImageUri}
        handleAddImage={handleAddImage}
        onSendMsg={onSendMsg}
      />

      <ConfirmationModal
        showModal={showModal}
        setShowModal={setShowModal}
        title={'Delete Message'}
        content={'Are you sure you want to delete ?'}
        submitBtnName={'Delete'}
        onSubmit={deleteMessage}
      />
    </View>
  );
};

export default Inbox;

const styles = StyleSheet.create({});
