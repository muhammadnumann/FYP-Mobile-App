import React from 'react';
import {
  Box,
  FlatList,
  HStack,
  VStack,
  Spacer,
  Image,
  Alert,
} from 'native-base';
import {
  TouchableOpacity,
  View,
  Animated,
  Text,
  StyleSheet,
} from 'react-native';
import { COLORS, urlFormat } from '../../utils';
import moment from 'moment';
import { useSelector } from 'react-redux';
import Swipeable from 'react-native-gesture-handler/Swipeable';

const ChatList = ({ onNavigation, data, time, setShowModal, setChatId }) => {
  const user = useSelector((state) => state.AuthReducer.user);

  const onLongPressChat = (chatId) => {
    setShowModal(true);
    setChatId(chatId);
  };

  const renderSwipe = (item) => (progress, dragX) => {
    const scale = dragX.interpolate({
      inputRange: [0, 100],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    });
    return (
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() => onLongPressChat(item.id)}
      >
        <View style={styles.deleteBox}>
          <Text
            style={{
              color: 'white',
              fontWeight: 'bold',
              textAlign: 'center',
              padding: 15,
            }}
          >
            Delete
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderServiceProviderImage = (url) => {
    if (/^data:image\//.test(url)) {
      return url;
    } else {
      return user?.uploadFileWebUrl + url;
    }
  };

  const renderClientImage = (url) => {
    if (/^data:image\//.test(url)) {
      return url;
    } else {
      return user?.uploadFileWebUrl + url;
    }
  };

  return (
    <Box>
      <FlatList
        data={data}
        style={{ paddingHorizontal: 15 }}
        renderItem={({ item }) => {
          let checkUser = user?.id === item?.clientId;
          return (
            <Swipeable renderRightActions={renderSwipe(item)}>
              <Box borderBottomWidth='0.4' borderColor={COLORS.grey} py='2'>
                <TouchableOpacity
                  onPress={() => onNavigation(item)}
                  onLongPress={() => onLongPressChat(item.id)}
                >
                  <HStack space={3} justifyContent='space-between'>
                    <Image
                      size={'sm'}
                      resizeMode='cover'
                      alt='fallback text'
                      borderRadius={12}
                      source={{
                        uri: checkUser
                          ? renderServiceProviderImage(
                              item?.serviceProviderImage
                            )
                          : renderClientImage(item?.clientImage),
                      }}
                    />
                    <VStack>
                      <Text style={{ color: COLORS.black, fontWeight: 'bold' }}>
                        {checkUser ? item.serviceProviderName : item.clientName}
                      </Text>
                      <Text style={{ color: COLORS.grey, fontSize: 12 }}>
                        {item.lastMessage}
                      </Text>
                    </VStack>
                    <Spacer />

                    <Text style={{ color: COLORS.grey, fontSize: 12 }}>
                      {moment(item.createdAt).format('hh:mm:ss')}
                    </Text>
                    {/* {time ? (
                  <Text style={{ color: COLORS.grey, fontSize: 12 }}>
                    {item.timeStamp}
                  </Text>
                ) : (
                  <CustomBorderButton
                    title="Available"
                    width="20%"
                    height={25}
                    fontSize={10}
                    top={1}
                  />
                )} */}
                  </HStack>
                </TouchableOpacity>
              </Box>
            </Swipeable>
          );
        }}
        keyExtractor={(item) => item.id}
      />
    </Box>
  );
};

export default ChatList;

const styles = StyleSheet.create({
  deleteBox: {
    backgroundColor: 'red',
    // justifyContent: "center",
    // alignItems: "center",
    width: 100,
    height: 80,
  },
});
