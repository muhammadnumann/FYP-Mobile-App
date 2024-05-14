import { StyleSheet, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { AppHeight } from '../../../utils';
import CustomHeader from '../../../components/CustomHeader';
import { getChatList } from '../../../services/SameApiServices';
import { useSelector } from 'react-redux';
import ChatList from '../../../components/List/ChatList';
import ConfirmationModal from '../../../components/Modals/ConfirmationModal';
import { getBearerRequest } from '../../../services/ApiServices';
import { DELETE_CHAT_URL } from '../../../services/ApiConstants';
import { useToast } from 'native-base';
import SuccessToast from '../../../components/Toast/SuccessToast';
import WarnToast from '../../../components/Toast/WarnToast';
import CustomLoading from '../../../components/Loading/CustomLoading';
import { useTranslation } from 'react-i18next';

const UserInboxHome = ({ navigation }) => {
  const [showModal, setShowModal] = useState(false);
  const [chatId, setChatId] = useState('');
  const [chatList, setChatList] = useState(null);
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();
  const user = useSelector((state) => state.AuthReducer.user);
  let userId = user?.id;
  const toast = useToast();

  useEffect(() => {
    getChatLists();
  }, []);

  const getChatLists = async () => {
    setLoading(true);
    try {
      let response = await getChatList(userId);
      setChatList(response);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setShowModal(false);
    }
  };

  const onPressList = (item) => {
    navigation.navigate('UserInbox', { chatInfo: item });
  };

  const deleteChat = async () => {
    try {
      let response = await getBearerRequest(
        DELETE_CHAT_URL + '?chatId=' + chatId
      );

      SuccessToast(t('Success'), t('chat_delete_success_msg'));
      getChatLists();
      setShowModal(false);
    } catch (error) {
      setShowModal(false);
      WarnToast(t('try_again'));
      console.log(error);
    }
  };

  if (loading) {
    return <CustomLoading content={'Loading chats....'} top={null} />;
  }

  return (
    <View
      style={{
        backgroundColor: 'white',
        height: AppHeight(100),
      }}
    >
      <CustomHeader title={t('inbox')} />
      {/* <Text>Home!</Text> */}
      <View style={{ height: AppHeight(80) }}>
        <ChatList
          data={chatList?.reverse()}
          onNavigation={onPressList}
          time
          setShowModal={setShowModal}
          setChatId={setChatId}
        />
      </View>

      <ConfirmationModal
        showModal={showModal}
        setShowModal={setShowModal}
        title={'Delete Chat'}
        content={'Are you sure you want to delete ?'}
        submitBtnName={'Delete'}
        onSubmit={deleteChat}
      />
    </View>
  );
};

export default UserInboxHome;

const styles = StyleSheet.create({});
