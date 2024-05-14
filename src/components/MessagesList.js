import React, { useState, useRef } from 'react';
import { ScrollView } from 'react-native';
import { COLORS } from '../utils';

import Message from './Message';
import { useSelector } from 'react-redux';

const MessagesList = ({ onSwipeToReply, chat, setMessageId, setShowModal }) => {
  // const user = useRef(0);
  const user = useSelector((state) => state.AuthReducer.user);

  const scrollView = useRef();

  return (
    <ScrollView
      style={{ backgroundColor: COLORS.white, flex: 1, paddingHorizontal: 10 }}
      ref={(ref) => (scrollView.current = ref)}
      onContentSizeChange={() => {
        scrollView.current.scrollToEnd({ animated: true });
      }}
    >
      {chat?.map((message, index) => (
        <Message
          key={index}
          time={message.sentAt}
          isLeft={message.sentById !== user.id}
          message={message.message}
          onSwipe={onSwipeToReply}
          setShowModal={setShowModal}
          messageId={message.messageId}
          setMessageId={setMessageId}
          // reply={message.reply}
          image={message.file}
        />
      ))}
    </ScrollView>
  );
};

export default MessagesList;
