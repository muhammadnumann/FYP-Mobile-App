import React, { useState } from 'react';
import { CustomModal } from './CustomModal';
import { StyleSheet, View } from 'react-native';
import { AppHeight, AppWidth, COLORS, fontSize, urlFormat } from '../../utils';
import CustomButton from '../CustomButton';
import { Text, Image } from 'native-base';
import { Rating } from 'react-native-ratings';
import { TextArea } from 'native-base';
import { useDispatch, useSelector } from 'react-redux';
import { postBearerRequest } from '../../services/ApiServices';
import { ADD_BOOKING_REVIEW_URL } from '../../services/ApiConstants';
import SuccessToast from '../Toast/SuccessToast';
import WarnToast from '../Toast/WarnToast';
import { useTranslation } from 'react-i18next';

export default function ClientFeedBackModal({ visible, dismiss }) {
  const user = useSelector((state) => state.AuthReducer.user);
  const feedBackData = useSelector(
    (state) => state.NotificationReducer.clientFeedbackData
  );
  const [ratings, setRatings] = useState(0);
  const [review, setReview] = useState('');
  const [loading, setLoading] = useState(false);

  const { t } = useTranslation();

  let checkUser = user && user?.id === feedBackData && feedBackData?.bookedById;

  const ratingCompleted = (rating) => {
    console.log('Rating is: ' + rating);
    setRatings(rating);
  };

  const dispatch = useDispatch();

  const sendFeedBack = async (booking) => {
    setLoading(true);

    let data = {
      bookingId: feedBackData?.id,
      review: review,
      rating: ratings,
    };

    try {
      let response = await postBearerRequest(ADD_BOOKING_REVIEW_URL, data);
      SuccessToast(t('Success'), response.message);
      setLoading(false);
      dispatch({ type: 'FEEDBACK_VISIBLE', payload: false });
    } catch (error) {
      setLoading(false);
      dispatch({ type: 'FEEDBACK_VISIBLE', payload: false });
      console.log(error);
      WarnToast(t('Error'), error);
    }
  };

  const onCancelFeedback = () => {
    dispatch({ type: 'FEEDBACK_VISIBLE', payload: false });
  };

  let serviceProviderImage =
    feedBackData && urlFormat(feedBackData?.serviceProviderImage);
  let clientImage = feedBackData && urlFormat(feedBackData?.clientImage);

  return (
    <CustomModal visible={visible && visible} feedback={true}>
      <View style={styles.header}>
        <Text style={{ fontSize: fontSize.subHeader, fontWeight: '600' }}>
          {t('Give Feedback')}
        </Text>
        {/* <TouchableOpacity onPress={dismiss && dismiss}>
          <CustomIcon name="modalCross" />
        </TouchableOpacity> */}
      </View>

      <View
        style={{
          borderWidth: 1,
          borderColor: COLORS.lightGrey,
          marginTop: 10,
        }}
      />

      <View>
        <Image
          source={{
            uri: checkUser
              ? serviceProviderImage && serviceProviderImage
              : clientImage && clientImage,
          }}
          alt='feedback-logo'
          style={styles.profileImage}
          resizeMode='cover'
        />
        <Text style={styles.profileName}>
          {feedBackData?.serviceProviderName}
        </Text>
        <Text style={styles.bio}>
          {feedBackData?.servicProviderPhoneNumber}
        </Text>
      </View>

      <View style={{ marginTop: 20 }}>
        <Text style={{ fontWeight: 'bold' }}>Give Rating</Text>
        <Rating
          imageSize={25}
          // readonly
          value={ratings}
          onFinishRating={ratingCompleted}
          style={{ alignSelf: 'flex-start', paddingVertical: 10 }}
        />
      </View>

      <View
        style={{
          borderWidth: 1,
          borderColor: COLORS.lightGrey,
          marginTop: 10,
        }}
      />

      <View style={{ marginTop: 10 }}>
        <Text style={{ fontWeight: 'bold', paddingVertical: 10 }}>
          {t('Comments')}
        </Text>
        <TextArea
          shadow={2}
          h={20}
          placeholder={t('comment_placeholder')}
          w={'100%'}
          _light={{
            placeholderTextColor: 'trueGray.700',
            bg: 'coolGray.100',
            _hover: {
              bg: 'coolGray.200',
            },
            _focus: {
              bg: 'coolGray.200:alpha.70',
            },
          }}
          _dark={{
            bg: 'coolGray.800',
            _hover: {
              bg: 'coolGray.900',
            },
            _focus: {
              bg: 'coolGray.900:alpha.70',
            },
          }}
          onChangeText={(text) => setReview(text)}
        />
      </View>

      <View style={{ alignSelf: 'center' }}>
        <CustomButton
          title={t('add')}
          width={AppWidth(40)}
          loading={loading}
          onPress={sendFeedBack}
        />
      </View>
    </CustomModal>
  );
}

const styles = StyleSheet.create({
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  profileImage: {
    height: AppHeight(10),
    width: AppWidth(20),
    alignSelf: 'center',
    marginTop: AppHeight(2),
    borderRadius: 12,
  },
  profileName: {
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
    fontSize: 17,
  },
  bio: {
    color: COLORS.grey,
    textAlign: 'center',
    marginTop: 5,
  },
});
