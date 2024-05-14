import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import ImageView from 'react-native-image-viewing';
import axios from 'axios'; // Import axios for making HTTP requests

import * as Progress from 'react-native-progress';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import CustomHeader from '../components/CustomHeader';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import BookingSummary from '../components/Cards/BookingSummary';
import { jobdata, User } from '../dummy/data';
import CustomCheckBox from '../components/CustomCheckBox';

import { COLORS, AppHeight, AppWidth } from '../utils';
import { roles, jobStatuses } from '../utils';
import MultipleImagePiackAcionSheet from '../components/ActionSheet/MultipleImagePiackAcionSheet';
import ExpenseForm from './Service_Provider/PaymentScreens/ExpenseForm';
import ChargesForm from './Service_Provider/PaymentScreens/ChargesForm';
import { TextArea, useDisclose, useToast } from 'native-base';
import { useDispatch, useSelector } from 'react-redux';
import CustomButton from '../components/CustomButton';
import {
  GET_INVOICE_BOOKING_URL,
  UPLOAD_IMAGE_URL,
  GENERATE_BOOKING_INVO_URL,
} from '../services/ApiConstants';
import { getBearerRequest, postBearerRequest } from '../services/ApiServices';
import GenerateBill from './Service_Provider/PaymentScreens/GenerateBill';
import { useIsFocused } from '@react-navigation/native';

const min = 1; // minimum value
const max = 11203650; // maximum value

const BookingDetailsCommon = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const [user, setUser] = useState(
    useSelector((state) => state.AuthReducer.user)
  );
  const isFocused = useIsFocused();
  const bookingId = route.params.bookingId;
  const { t } = useTranslation();
  const [removeCharges, setRemoveCharges] = useState(false);
  const [expenses, setExpenses] = useState([]);
  const [additionalCharges, setAdditionalCharges] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclose();
  const [showRemoveExistingCharges, setShowRemoveExistingCharges] =
    useState(false);
  const [loading, setLoading] = useState(false);
  const [showOtherChargesForm, setShowOtherChargesForm] = useState(false);
  const [grandTotal, setGrandTotal] = useState(0);
  const [screenName, setScreenName] = useState('');
  // const user = User;
  const [showGenerateBillButton, setShowGenerateBillButton] = useState(false);

  const [data, setData] = useState();
  const [selectedImageIndex, setSelectedImageIndex] = useState();
  const [visible, setIsVisible] = useState(false);
  const [inputs, setInputs] = React.useState({
    images: [],
  });

  const [uploadProgress, setUploadProgress] = useState(
    new Array(inputs?.images?.length).fill(null)
  );

  const [uploadImage, setUploadImage] = useState();
  const [reason, setReason] = useState();
  const getInvoicedBooking = async () => {
    try {
      let response = await getBearerRequest(
        GET_INVOICE_BOOKING_URL + '?id=' + bookingId
      );
      setData(response.data);
      // console.log(response.data);
    } catch (error) {
      console.log('client -error', error);
    }
  };

  useEffect(() => {
    getInvoicedBooking();
  }, [isFocused]);

  const handleOnchange = (text, input) => {
    setInputs((prevState) => ({ ...prevState, [input]: text }));
  };

  const handleOnImagechange = (selectedImages) => {
    setInputs((prevState) => ({
      ...prevState,
      images: prevState.images
        ? [...prevState.images, ...selectedImages]
        : selectedImages,
    }));

    console.log(inputs);
  };

  const handleAddExpense = () => {
    setExpenses([
      ...expenses,
      {
        id: Math.floor(Math.random() * (max - min + 1)) + min,
        name: '',
        price: 0,
      },
    ]);
  };

  const handleRemoveExpense = (index) => {
    const expense = [...expenses];
    expense.splice(index, 1);
    setExpenses(expense);
  };

  const handleRemoveCharges = (index) => {
    const charges = [...additionalCharges];
    charges.splice(index, 1);
    setAdditionalCharges(charges);
  };

  const handleExpenseChange = (index, key, value) => {
    const expense = [...expenses];
    expense[index][key] = value;
    setExpenses(expense);
  };

  const handleAddCharges = () => {
    setAdditionalCharges([
      ...additionalCharges,
      {
        id: Math.floor(Math.random() * (max - min + 1)) + min,
        name: '',
        price: 0,
      },
    ]);
  };

  const handleChargesChange = (index, key, value) => {
    const charges = [...additionalCharges];
    charges[index][key] = value;
    setAdditionalCharges(charges);
  };

  const uploadImages = async (image, index, progressCallback) => {
    const formData = new FormData();

    formData.append(`image${index}`, {
      uri: image.uri,
      type: image.type,
      name: `image${index}.jpg`,
    });

    try {
      const response = await axios.post(UPLOAD_IMAGE_URL, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          const uploadPercentage = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );

          progressCallback(uploadPercentage); // Call progress callback with percentage
        },
      });
      return response.data; // Return response data
    } catch (error) {
      console.log('Error uploading images:', error);
      return null; // Return null on error
    }
  };

  const screenTitle = () => {
    if (user?.role === roles.Client) {
      setScreenName('Booking Details');
    } else {
      if (
        data?.status === jobStatuses.InProgress ||
        data?.status === jobStatuses.ReOpen
      ) {
        setScreenName('Generate Bill');
      } else {
        setScreenName('Booking Details');
      }
    }
  };
  const images = [
    {
      source: {
        uri: 'https://cdn.pixabay.com/photo/2017/08/17/10/47/paris-2650808_960_720.jpg',
      },
      title: 'Paris',
      width: 806,
      height: 720,
    },
  ];
  const getShowRemoveExistingCharges = () => {
    if (user.role === roles.Client) {
      setShowRemoveExistingCharges(false);
    } else {
      if (
        data?.status === jobStatuses.InProgress ||
        data?.status === jobStatuses.ReOpen
      ) {
        const additionalChargesList = data.otherExpenses
          .filter((item) => item.expensesType === 'Additional')
          .map((item) => ({
            id: Math.floor(Math.random() * 10000), // Generating a random number between 0 and 9999 as the ID
            name: item.description,
            price: item.amount,
          }));
        const otherExpensesList = data.otherExpenses
          .filter((item) => item.expensesType === 'OtherExpenses')
          .map((item) => ({
            id: Math.floor(Math.random() * 10000), // Generating a random number between 0 and 9999 as the ID
            name: item.description,
            price: item.amount,
          }));
        setAdditionalCharges([...additionalCharges, ...additionalChargesList]);
        setExpenses([...expenses, ...otherExpensesList]);
        setShowRemoveExistingCharges(true);
        setShowGenerateBillButton(true);
      } else {
        setShowRemoveExistingCharges(false);
        setShowGenerateBillButton(false);
      }
    }
  };

  const getShowOtherChargesForm = () => {
    if (user.role === roles.Client) {
      setShowOtherChargesForm(false);
    } else {
      if (
        data?.status === jobStatuses.InProgress ||
        data?.status === jobStatuses.ReOpen
      ) {
        setShowOtherChargesForm(true);
      } else {
        setShowOtherChargesForm(false);
      }
    }
  };

  const renderImages = inputs?.images?.map((image, index) => {
    return (
      <View key={index}>
        <ImageBackground
          source={{ uri: image.uri }}
          style={{ height: 100, width: 100, margin: 4 }}
          borderRadius={15}
        >
          <TouchableOpacity
            style={[styles.incrementBtn, { alignSelf: 'flex-end', left: 5 }]}
            onPress={() => removeImages(index)}
          >
            <Text style={styles.incrementText}>x</Text>
          </TouchableOpacity>
        </ImageBackground>

        <View style={{ flexDirection: 'row' }}>
          <Progress.Bar
            progress={uploadProgress[index] ?? 0}
            width={100}
            style={{ margin: 4 }}
            color='green'
            height={9}
          />

          <Text>{uploadProgress[index] + '%' ?? 0}</Text>
        </View>
      </View>
    );
  });

  const openImageViewer = (index) => {
    setSelectedImageIndex(index);
    setIsVisible(true);
  };

  const EndBooking = async (Booking) => {
    setLoading(true);

    let data123 = {
      bookingId: bookingId,
      additionalCharges: additionalCharges,
      otherExpense: expenses,
      images: uploadImage,
      paymentMethod: 'Cash',
      RemoveAlreadyExistingCharges: removeCharges,
    };
    try {
      let response = await postBearerRequest(
        GENERATE_BOOKING_INVO_URL,
        data123
      );
      // dispatch({ type: "FEEDBACK_VISIBLE", payload: true });
      if (response) {
        console.log('end-booking-response', response);
      }
      SuccessToast(t('Success'), `Job Done`);
      setLoading(false);
      navigation.push('Dashboard');
    } catch (error) {
      setLoading(false);
      console.log('error submitting bill', error);
    }
  };

  const removeImages = (index) => {
    let addedImages = inputs?.images;
    addedImages.splice(index, 1);

    let up_images = uploadImage;
    up_images.splice(index, 1);

    handleOnchange(addedImages, 'images');
    setUploadImage(up_images);
  };

  const generateBill = () => {
    var sum = 0;
    if (removeCharges === true) {
      // Calculate total amount from otherExpenses
      if (expenses && expenses.length > 0) {
        for (let i = 0; i < expenses.length; i++) {
          sum += parseInt(expenses[i].price);
        }
      }
      if (additionalCharges && additionalCharges.length > 0) {
        for (let i = 0; i < additionalCharges.length; i++) {
          sum += parseInt(additionalCharges[i].price);
        }
      }
    } else {
      // Calculate total amount from otherExpenses
      if (expenses && expenses.length > 0) {
        for (let i = 0; i < expenses.length; i++) {
          sum += parseInt(expenses[i].price);
        }
      }
      if (additionalCharges && additionalCharges.length > 0) {
        for (let i = 0; i < additionalCharges.length; i++) {
          sum += parseInt(additionalCharges[i].price);
        }
      }

      // Calculate total amount from services
      if (data?.services && data?.services.length > 0) {
        for (let i = 0; i < data?.services.length; i++) {
          sum += parseInt(data.services[i].totalAmount);
        }
      }
    }
    setGrandTotal(sum);
  };

  const bookingTotal = () => {
    var sum = 0;
    if (data?.removeAlreadyExistingCharges === true) {
      for (let i = 0; i < data?.otherExpenses.length; i++) {
        sum += data.otherExpenses[i].amount;
      }
    } else {
      // Calculate total amount from otherExpenses
      if (data?.otherExpenses && data?.otherExpenses.length > 0) {
        for (let i = 0; i < data?.otherExpenses.length; i++) {
          sum += data.otherExpenses[i].amount;
        }
      }

      // Calculate total amount from services
      if (data?.services && data?.services.length > 0) {
        for (let i = 0; i < data?.services.length; i++) {
          sum += data.services[i].totalAmount;
        }
      }
    }
    setGrandTotal(sum);
  };

  const onPressPaymentRequest = (data, totalAmount) => {
    navigation.push('ClientPaymentMethod', {
      data: data,
      totalAmount: grandTotal,
    });
    dispatch({ type: 'CLIENT_FEEDBACK_DATA', payload: data });
  };

  const getGrandTotal = () => {
    if (screenName === 'Generate Bill') {
      generateBill();
    } else {
      bookingTotal();
    }
  };

  useEffect(() => {
    getGrandTotal();
  }, [removeCharges, expenses, additionalCharges, data]);

  useEffect(() => {
    getShowRemoveExistingCharges();
    getShowOtherChargesForm();
    screenTitle();
  }, [data]);

  useEffect(() => {
    const responses = []; // Initialize empty array to store responses

    inputs?.images?.forEach(async (image, index) => {
      const response = await uploadImages(image, index, (percentage) => {
        // Update uploadProgress array with percentage for current image
        setUploadProgress((prevProgress) => {
          const newProgress = [...prevProgress];
          newProgress[index] = percentage;
          return newProgress;
        });
      });
      if (response) {
        responses.push({
          id: Math.floor(Math.random() * (max - min + 1)) + min,
          name: response.data,
        }); // Push response to array if not null

        setUploadImage(responses);
      }
    });
  }, [inputs?.images]);

  let renderAdditionalImages = data?.otherExpensesImages.map(
    (expense, index) => {
      return (
        <TouchableOpacity onPress={() => openImageViewer(index)} key={index}>
          <ImageBackground
            source={{ uri: user?.uploadFileWebUrl + expense }}
            style={{ height: 100, width: 100, margin: 4 }}
            borderRadius={15}
          ></ImageBackground>
        </TouchableOpacity>
      );
    }
  );

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <ScrollView>
        <KeyboardAwareScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps='handled'
        >
          {/* Rendering Custom Header */}
          <CustomHeader title={t(screenName)} back navigation={navigation} />

          {/* Rendering Booking Summary */}
          <BookingSummary data={data} />

          {/* Rendering Remove Existing Charges CheckBox */}
          {showRemoveExistingCharges && (
            <View
              style={{
                flexDirection: 'row',
                paddingHorizontal: 16,
              }}
            >
              <CustomCheckBox
                isChecked={removeCharges}
                onPress={() => {
                  setRemoveCharges(!removeCharges);
                }}
              />
              <Text style={{ color: COLORS.black, marginTop: 10 }}>
                {t('remove_charges')}
              </Text>
            </View>
          )}

          {/* Add Other Charges Form */}
          {showOtherChargesForm && (
            <View style={{ paddingHorizontal: 24 }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: 10,
                }}
              >
                <Text style={{ fontWeight: 'bold' }}>
                  {t('Other Expenses')}{' '}
                  <Text style={{ fontWeight: '300', color: COLORS.primary }}>
                    {' '}
                    {t('optional')}
                  </Text>
                </Text>

                <TouchableOpacity
                  style={styles.incrementBtn}
                  onPress={handleAddExpense}
                >
                  <Text style={styles.incrementText}>+</Text>
                </TouchableOpacity>
              </View>

              <ExpenseForm
                handleAddExpense={handleAddExpense}
                handleRemoveExpense={handleRemoveExpense}
                handleExpenseChange={handleExpenseChange}
                expenses={expenses}
              />

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: 10,
                }}
              >
                <Text style={{ fontWeight: 'bold' }}>
                  {t('Adittional Charges')}
                  <Text style={{ fontWeight: '300', color: COLORS.primary }}>
                    {' '}
                    {t('optional')}
                  </Text>
                </Text>

                <TouchableOpacity
                  style={styles.incrementBtn}
                  onPress={handleAddCharges}
                >
                  <Text style={styles.incrementText}>+</Text>
                </TouchableOpacity>
              </View>

              <ChargesForm
                handleAddCharges={handleAddCharges}
                handleRemoveCharges={handleRemoveCharges}
                handleChargesChange={handleChargesChange}
                additionalCharges={additionalCharges}
              />

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: 10,
                }}
              >
                <Text style={{ fontWeight: 'bold' }}>
                  {t('Upload Images')}
                  <Text style={{ fontWeight: '300', color: COLORS.primary }}>
                    {' '}
                    {t('optional')}
                  </Text>
                </Text>

                <TouchableOpacity style={styles.incrementBtn} onPress={onOpen}>
                  <Text style={styles.incrementText}>+</Text>
                </TouchableOpacity>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  justifyContent: 'space-evenly',
                }}
              >
                {renderImages}

                {data?.otherExpensesImages.length > 0 ? (
                  <>
                    <View
                      style={{
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        justifyContent: 'space-evenly',
                      }}
                    >
                      {renderAdditionalImages}
                    </View>

                    <ImageView
                      images={data?.otherExpensesImages.map((item) => ({
                        uri: user?.uploadFileWebUrl + item,
                      }))}
                      imageIndex={selectedImageIndex}
                      visible={visible}
                      onRequestClose={(data) => setIsVisible(false)}
                    />
                  </>
                ) : null}
              </View>

              <KeyboardAwareScrollView>
                {inputs?.images?.length > 0 ? (
                  <>
                    <TextArea
                      shadow={2}
                      h={20}
                      placeholder='Please add details here...'
                      style={[styles.inputStyle, { color: 'black' }]}
                      placeholderTextColor={'grey'}
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
                      onChangeText={(text) => setReason(text)}
                    />

                    <Text
                      style={{
                        color: COLORS.red,
                        fontSize: 11,
                        textAlign: 'justify',
                      }}
                    >
                      {t('other_thread')}
                    </Text>
                  </>
                ) : null}
              </KeyboardAwareScrollView>
            </View>
          )}

          {/* Render Grand Total */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 5,
              paddingHorizontal: 24,
            }}
          >
            <View>
              <Text style={styles.mainHeading}>{t('grand_total')}</Text>
            </View>
            <View>
              <Text style={styles.mainHeading}>
                {grandTotal} {'  '}
                {user?.currencyCode}
              </Text>
            </View>
          </View>

          {/* Render Generate Bill Button */}

          {data?.status === 'InvoiceGenerated' ? (
            <View style={styles.viewBtn}>
              <CustomButton
                title='Select Payment Method'
                width={'100%'}
                top={8}
                onPress={() => onPressPaymentRequest(data, grandTotal)}
              />
            </View>
          ) : null}

          {showGenerateBillButton && (
            <View style={styles.viewBtn}>
              <CustomButton
                title={t('Generate Bill')}
                width={'100%'}
                loading={loading}
                onPress={() => EndBooking(data)}
              />
            </View>
          )}
        </KeyboardAwareScrollView>
      </ScrollView>
      <MultipleImagePiackAcionSheet
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        handleOnchange={handleOnImagechange}
        type={"user_image"}
      />
    </View>
  );
};

export default BookingDetailsCommon;

const styles = StyleSheet.create({
  incrementBtn: {
    height: 20,
    width: 20,
    backgroundColor: COLORS.primary,
    borderRadius: 5,
  },

  incrementText: {
    color: COLORS.white,
    textAlign: 'center',
  },
  heading: {
    fontWeight: 'bold',
    paddingVertical: 10,
  },
  mainHeading: {
    fontWeight: 'bold',
    fontSize: 16,
    paddingVertical: 10,
  },
  viewBtn: {
    paddingHorizontal: 15,
    paddingBottom: AppHeight(5),
  },
});
