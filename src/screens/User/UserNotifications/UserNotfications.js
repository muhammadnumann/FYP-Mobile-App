import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import {
  Box,
  FlatList,
  HStack,
  VStack,
  Text,
  Spacer,
  Image,
  Badge,
} from 'native-base';
import CustomHeader from '../../../components/CustomHeader';
import {
  AppHeight,
  COLORS,
} from '../../../utils';

import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

const Seprator = () => {
  return (
    <View
      style={{
        flexDirection: 'row',
        paddingHorizontal: 15,
        paddingVertical: 15,
      }}
    >
      <View
        style={{
          backgroundColor: COLORS.lightGrey,
          height: 2,
          flex: 1,
          alignSelf: 'center',
        }}
      />
      <Text style={{ alignSelf: 'center', paddingHorizontal: 5 }}>Today</Text>
      <View
        style={{
          backgroundColor: COLORS.lightGrey,
          height: 2,
          flex: 1,
          alignSelf: 'center',
        }}
      />
    </View>
  );
};

const UserNotification = ({ navigation }) => {
  const notifications = useSelector(
    (state) => state.NotificationReducer.notifications
  );

  const loadNotification = useSelector(
    (state) => state.NotificationReducer.loadNotification
  );

  const [loading, setLoading] = useState(false);

  const { t } = useTranslation();

  const user = useSelector((state) => state.AuthReducer.user);

  const dispatch = useDispatch();



  const showBadgeMessage = (message) => {
    if (message === 'Message') {
      return 'New Message';
    }
  };

  const renderNorifications = notifications?.map((notification, index) => {
    let image = user?.uploadFileWebUrl + notification?.initiatedByImage;
    return (
      <View key={index}>
        <TouchableOpacity
          style={{
            alignSelf: 'flex-end',
            backgroundColor: 'red',
            height: 22,
            width: 22,
            borderRadius: 50,
            marginTop: 10,
            top: 10,
            zIndex: 2,
            marginLeft: 10,
          }}
          onPress={() => { }}
        >
          <Text
            style={{
              textAlign: 'center',
              color: 'white',
              fontWeight: 'bold',
            }}
          >
            x
          </Text>
        </TouchableOpacity>

        <Box
          style={{
            borderWidth: 3,
            padding: 10,
            // marginTop: 10,
            borderRadius: 12,
            borderColor: COLORS.lightGrey,
            backgroundColor:
              notification.readAt === null ? null : COLORS.lightGrey,
          }}
          py='2'
        >
          <TouchableOpacity onPress={() => { }}>
            <HStack space={2} justifyContent='space-between'>
              <VStack>
                <Image
                  size={'sm'}
                  resizeMode='cover'
                  alt='img loading..'
                  borderRadius={12}
                  source={{
                    uri: image,
                  }}
                />
              </VStack>

              <VStack w={260}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    // paddingHorizontal: 10,
                  }}
                >
                  <Text
                    _dark={{
                      color: 'warmGray.50',
                    }}
                    color='coolGray.800'
                    bold
                  >
                    {notification?.initiatedByName}
                  </Text>

                  <Badge
                    colorScheme='info'
                    style={{ marginTop: 5, marginRight: 15 }}
                  >
                    {showBadgeMessage(notification?.type)}
                  </Badge>
                </View>
                <Text
                  color='coolGray.600'
                  _dark={{
                    color: 'warmGray.200',
                  }}
                >
                  {notification?.description}
                </Text>
              </VStack>
            </HStack>
          </TouchableOpacity>
        </Box>
      </View>
    );
  });

  return (
    <View>
      <CustomHeader title={t('notification')} back navigation={navigation} />
      <ScrollView
        style={{
          backgroundColor: 'white',
          height: AppHeight(85),
          paddingHorizontal: 15,
        }}
      >
        {/* {Seprator()} */}
        {loadNotification ? (
          <Text>{t('loading') + '...'}</Text>
        ) : (notifications && notifications === null) ||
          notifications?.length === 0 ? (
          <View
            style={{
              marginTop: AppHeight(35),
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text style={{ color: COLORS.grey }}>
              {t('notification_placeholder')}
            </Text>
          </View>
        ) : (
          <Box>{renderNorifications && renderNorifications}</Box>
        )}
      </ScrollView>
    </View>
  );
};

export default UserNotification;

const styles = StyleSheet.create({});
