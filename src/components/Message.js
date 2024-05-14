import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import {
  FlingGestureHandler,
  Directions,
  State,
} from 'react-native-gesture-handler';
import Animated, {
  withSpring,
  useAnimatedStyle,
  useAnimatedGestureHandler,
  useSharedValue,
} from 'react-native-reanimated';
import { AppWidth, COLORS, urlFormat } from '../utils';

import { Alert } from 'native-base';
import { Image } from 'react-native';
import moment from 'moment';

const Message = ({
  time,
  isLeft,
  message,
  onSwipe,
  reply,
  image,
  setShowModal,
  messageId,
  setMessageId,
}) => {
  const startingPosition = 0;
  const x = useSharedValue(startingPosition);

  const isOnLeft = (type) => {
    if (isLeft && type === 'messageContainer') {
      return {
        alignSelf: 'flex-start',
        backgroundColor: '#f0f0f0',
        borderTopLeftRadius: 0,
      };
    } else if (isLeft && type === 'message') {
      return {
        color: '#000',
      };
    } else if (isLeft && type === 'time') {
      return {
        color: 'darkgray',
      };
    } else {
      return {
        borderTopRightRadius: 0,
      };
    }
  };

  const eventHandler = useAnimatedGestureHandler({
    onStart: (event, ctx) => {},
    onActive: (event, ctx) => {
      x.value = isLeft ? 50 : -50;
    },
    onEnd: (event, ctx) => {
      x.value = withSpring(startingPosition);
    },
  });

  const uas = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: x.value }],
    };
  });

  const onLongPressMessage = () => {
    setShowModal(true);
    setMessageId(messageId);
  };

  let chatImage = urlFormat(image);
  return (
    <FlingGestureHandler
      direction={isLeft ? Directions.RIGHT : Directions.LEFT}
      onGestureEvent={eventHandler}
      onHandlerStateChange={({ nativeEvent }) => {
        if (nativeEvent.state === State.ACTIVE) {
          onSwipe(message, isLeft);
        }
      }}
      // onlongPress={onLongPressMessage}
    >
      <TouchableOpacity onLongPress={onLongPressMessage}>
        <Animated.View style={[styles.container, uas]}>
          <View style={[styles.messageContainer, isOnLeft('messageContainer')]}>
            {reply ? (
              <View>
                <View>
                  <Alert
                    // w="90%"
                    backgroundColor={COLORS.primary}
                    style={{
                      borderLeftWidth: 3,
                      borderLeftColor: '#8086ff',
                    }}
                  >
                    <Text
                      color={'left-accent'}
                      style={{
                        color: 'white',
                        fontWeight: '400',
                      }}
                    >
                      {reply}
                    </Text>
                  </Alert>
                </View>
                <View style={styles.messageView}>
                  <Text style={[styles.message, isOnLeft('message')]}>
                    {message}
                  </Text>
                </View>
              </View>
            ) : (
              <View style={styles.messageView}>
                {image !== null ? (
                  <Image
                    source={{ uri: chatImage }}
                    style={{ height: 200, width: 150 }}
                    resizeMode={'stretch'}
                  />
                ) : null}
                <Text style={[styles.message, isOnLeft('message')]}>
                  {message}
                </Text>
              </View>
            )}

            <View style={styles.timeView}>
              <Text style={[styles.time, isOnLeft('time')]}>
                {moment(time).format('hh:mm')}
              </Text>
            </View>
          </View>
        </Animated.View>
      </TouchableOpacity>
    </FlingGestureHandler>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    marginVertical: 5,
  },
  messageContainer: {
    backgroundColor: COLORS.primary,
    maxWidth: '80%',
    alignSelf: 'flex-end',
    flexDirection: 'row',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginHorizontal: 10,
    paddingTop: 5,
    paddingBottom: 10,
    flexDirection: 'column',
  },
  messageView: {
    backgroundColor: 'transparent',
    maxWidth: '80%',
  },
  timeView: {
    backgroundColor: 'transparent',
    justifyContent: 'flex-end',
    paddingLeft: 2,
  },
  message: {
    color: 'white',
    alignSelf: 'flex-start',
    fontSize: 15,
  },
  time: {
    color: 'lightgray',
    alignSelf: 'flex-end',
    fontSize: 10,
  },
});

export default Message;
