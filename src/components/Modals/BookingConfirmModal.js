import React from 'react';
import { CustomModal } from './CustomModal';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { CustomIcon } from '../CustomIcon';
import { COLORS, fontSize } from '../../utils';
import CustomButton from '../CustomButton';
import CustomBorderButton from '../CustomBorderButton';
import { HStack, VStack, Text, Spacer, Image } from 'native-base';
import { Rating } from 'react-native-ratings';

export default function BookingConfirmModal({
  visible,
  dismiss,
  chatInfo,
  onBooking,
}) {
  const ratingCompleted = (rating) => {
    console.log('Rating is: ' + rating);
  };

  const onPressCofirm = () => {
    dismiss();
    onBooking();
  };

  const onPressCancel = () => {
    dismiss();
  };

  return (
    <CustomModal visible={visible}>
      <View style={styles.header}>
        <Text style={{ fontSize: fontSize.subHeader, fontWeight: '600' }}>
          Confirmation
        </Text>
        <TouchableOpacity onPress={dismiss}>
          <CustomIcon name='modalCross' />
        </TouchableOpacity>
      </View>

      <View
        style={{
          borderWidth: 1,
          borderColor: COLORS.lightGrey,
          marginTop: 10,
        }}
      />

      <View style={{ paddingVertical: 20 }}>
        <HStack space={3} justifyContent='space-between'>
          <Image
            size={'sm'}
            resizeMode='cover'
            alt='fallback text'
            borderRadius={12}
            source={{
              uri: chatInfo?.avatarUrl,
            }}
          />
          <VStack>
            <Text
              _dark={{
                color: 'warmGray.50',
              }}
              color='coolGray.800'
              bold
            >
              {chatInfo?.serviceProviderName}
            </Text>
            <Text color={COLORS.grey}>Appliances Technician</Text>
            <Rating
              imageSize={15}
              readonly
              startingValue={2.4}
              onFinishRating={ratingCompleted}
            />
          </VStack>

          <Spacer />
        </HStack>
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingVertical: 20,
        }}
      >
        <View>
          <Text style={{ fontWeight: 'bold' }}>Date</Text>
          <Text style={{ color: COLORS.grey }}>Wed 21, Dec 2022</Text>
        </View>
        <View>
          <Text style={{ fontWeight: 'bold' }}>Time</Text>
          <Text style={{ color: COLORS.grey }}>04:30 PM </Text>
        </View>
      </View>

      <View>
        <Text style={{ fontWeight: 'bold' }}>Address</Text>
        <Text style={{ color: COLORS.grey }}>
          Lorem ipsum dolor sit amet consectetur. Pretium lacus congue maec.
        </Text>
      </View>

      <View
        style={{
          borderWidth: 1,
          borderColor: COLORS.lightGrey,
          marginTop: 10,
        }}
      />

      <CustomButton title='Confirm' width={'100%'} onPress={onPressCofirm} />
      <CustomBorderButton title='Cancel' top={1} onPress={onPressCancel} />
    </CustomModal>
  );
}

const styles = StyleSheet.create({
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
