import {
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { AppWidth, COLORS, fontSize } from '../utils';
import { CustomIcon } from './CustomIcon';

import { Badge, VStack, Box } from 'native-base';
import { useDispatch, useSelector } from 'react-redux';
import {
  closeDrawer,
  openDrawer,
} from '../store/notifications/NotificationActions';

const CustomHeader = ({
  title,
  back,
  icon,
  navigation,
  onPressNotification,
  search,
  setSelectSearch,
  selectSearch,
}) => {
  const notifications = useSelector(
    (state) => state.NotificationReducer.notifications
  );

  const isDrawerOpen = useSelector(
    (state) => state.NotificationReducer.isDrawerOpen
  );

  const dispatch = useDispatch();

  const toggleDrawer = () => {
    if (isDrawerOpen) {
      dispatch(closeDrawer());
    } else {
      dispatch(openDrawer());
    }
  };

  const [unreadNotifications, setUnreadNotifications] = useState([]);

  useEffect(() => {
    if (notifications) {
      const unread = notifications?.filter(
        (notification) =>
          !notification?.hasOwnProperty('readAt') ||
          notification?.readAt === null
      );

      setUnreadNotifications((prevUnreadNotifications) => {
        return [...prevUnreadNotifications, ...unread];
      });
    }
  }, [notifications]);

  return (
    <SafeAreaView style={{ backgroundColor: COLORS.primary }}>
      <View style={styles.container}>
        {back ? (
          <TouchableOpacity
            style={{ justifyContent: 'center' }}
            onPress={() => navigation.goBack()}
          >
            <CustomIcon name={'backArrowWhite'} />
          </TouchableOpacity>
        ) : null}

        <Text style={[styles.title, { marginLeft: search ? AppWidth(15) : 0 }]}>
          {title}
        </Text>

        {search ? (
          <TouchableOpacity
            style={{ justifyContent: 'center', marginRight: 10 }}
            onPress={() => setSelectSearch(!selectSearch)}
          >
            <CustomIcon name={'searchIcon'} />
          </TouchableOpacity>
        ) : null}

        <Box alignItems='center'>
          <VStack>
            {unreadNotifications.length > 0 ? (
              <Badge
                colorScheme='danger'
                rounded='full'
                mb={-4}
                mr={-3}
                zIndex={1}
                variant='solid'
                alignSelf='flex-end'
                _text={{
                  fontSize: 12,
                }}
              >
                {unreadNotifications.length}
              </Badge>
            ) : null}

            <TouchableOpacity
              style={{
                justifyContent: 'center',
                backgroundColor: 'white',
                padding: 5,
                borderRadius: 5,
              }}
              onPress={toggleDrawer}
            >
              <CustomIcon name={'NotificationIcon'} />
            </TouchableOpacity>
          </VStack>
        </Box>
      </View>
    </SafeAreaView>
  );
};

export default CustomHeader;

const styles = StyleSheet.create({
  container: {
    paddingVertical: Platform.OS === 'ios' ? 10 : 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  title: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: fontSize.btnText,
    textAlign: 'center',
    flex: 1,
    marginTop: 5,
  },
});
