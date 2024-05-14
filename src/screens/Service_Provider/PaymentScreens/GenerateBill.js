import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { TextArea, useDisclose, useToast } from 'native-base';
import CustomHeader from '../../../components/CustomHeader';
import CustomButton from '../../../components/CustomButton';
import { AppHeight, AppWidth, COLORS } from '../../../utils';
import { useTranslation } from 'react-i18next';
import MultipleImagePiackAcionSheet from '../../../components/ActionSheet/MultipleImagePiackAcionSheet';
import BookingBillSummary from '../../../components/Cards/BookingBillSummary';
import ExpenseForm from './ExpenseForm';
import ChargesForm from './ChargesForm';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import BookingInvoiceSummary from '../../../components/Cards/BookingInvoiceSummary';

import * as Progress from 'react-native-progress';
import axios from 'axios';
import {
  GENERATE_BOOKING_INVO_URL,
  GET_INVOICE_BOOKING_URL,
  UPLOAD_IMAGE_URL,
} from '../../../services/ApiConstants';
import { useDispatch, useSelector } from 'react-redux';
import {
  getBearerRequest,
  postBearerRequest,
} from '../../../services/ApiServices';
import ImageView from 'react-native-image-viewing';
import CustomCheckBox from '../../../components/CustomCheckBox';

const min = 1; // minimum value
const max = 11203650; // maximum value

const GenerateBill = ({ route, navigation }) => {
  const { data, button, bookingAssigned, bookingID } = route.params;

  const [expenses, setExpenses] = useState([]);
  var completed = data?.status !== 'InProgress';

  const [additionalCharges, setAdditionalCharges] = useState([]);

  const toast = useToast();
  const { t } = useTranslation();
  const { isOpen, onOpen, onClose } = useDisclose();
  const [other, setOther] = useState(false);
  const [loading, setLoading] = useState(false);
  const [reason, setReason] = useState('');
  const [invoiceState, setInvoiceState] = useState(null);
  const [visible, setIsVisible] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [grandTotalValue, setGrandTotalValue] = useState(0);
  const [removeCharges, setRemoveCharges] = useState(false);
  const [grandTotal, setGrandTotal] = useState(0);

  const user = useSelector((state) => state.AuthReducer.user);

  const dispatch = useDispatch();
  let bookingId = data.hasOwnProperty('bookingId') ? data.bookingId : data.id;

  useEffect(() => {
    getInvoiceBooking(bookingId);
  }, [bookingId]);

  const getInvoiceBooking = async (bookingId) => {
    try {
      let response = await getBearerRequest(
        GET_INVOICE_BOOKING_URL + '?id=' + bookingId
      );

      setInvoiceState(response.data);

      calculateGrandTotal(response.data);

      var additional = [];
      var additionalExp = [];

      response?.data?.otherExpenses.map((expense, index) => {
        if (expense?.expensesType === 'Additional') {
          additional.push({
            name: expense.description,
            price: expense.amount,
          });
        } else {
          additionalExp.push({
            name: expense.description,
            price: expense.amount,
          });
        }
      });

      setAdditionalCharges(additional);
      setExpenses(additionalExp);
    } catch (error) {
      console.log(error);
    }
  };

  const [inputs, setInputs] = React.useState({
    images: null,
  });

  const [uploadProgress, setUploadProgress] = useState(
    new Array(inputs?.images?.length).fill(null)
  );

  const [uploadImage, setUploadImage] = useState();

  const handleOnchange = (text, input) => {
    setInputs((prevState) => ({ ...prevState, [input]: text }));
  };

  const handleAddExpense = () => {
    setExpenses([
      ...expenses,
      {
        id: Math.floor(Math.random() * (max - min + 1)) + min,
        name: '',
        price: '',
      },
    ]);
  };

  const handleRemoveExpense = (index) => {
    const expense = [...expenses];
    expense.splice(index, 1);
    setExpenses(expense);
    calculateGrandTotal();
  };

  const handleRemoveCharges = (index) => {
    const charges = [...additionalCharges];
    charges.splice(index, 1);
    setAdditionalCharges(charges);
    calculateGrandTotal();
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
        price: '',
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
      }
    });

    setUploadImage(responses);
  }, [inputs?.images]);

  useEffect(() => {
    calculateGrandTotal();
  }, [removeCharges, additionalCharges, expenses]);

  const removeImages = (index) => {
    let addedImages = inputs?.images;
    addedImages.splice(index, 1);

    let up_images = uploadImage;
    up_images.splice(index, 1);

    handleOnchange(addedImages, 'images');
    setUploadImage(up_images);
  };

  const EndBooking = async (Booking) => {
    setLoading(true);
    let data = {
      bookingId: bookingId,
      additionalCharges: additionalCharges,
      otherExpense: expenses,
      images: uploadImage,
      paymentMethod: 'Cash',
      RemoveAlreadyExistingCharges: removeCharges,
    };

    try {
      let response = await postBearerRequest(GENERATE_BOOKING_INVO_URL, data);
      // dispatch({ type: "FEEDBACK_VISIBLE", payload: true });

      SuccessToast(
        t('Success'),
        `Job Done\nBill of amount ${grandTotal} has been sent to your customer`
      );
      setLoading(false);
      navigation.push('Dashboard');
    } catch (error) {
      setLoading(false);
      console.log('error', error);
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
            <Text style={styles.inrementText}>x</Text>
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

  const calculateGrandTotal = (temp) => {
    var sum = 0;
    if (temp?.removeAlreadyExistingCharges) {
      for (let i = 0; i < temp?.otherExpenses.length; i++) {
        sum += temp.otherExpenses[i].amount;
      }
      setGrandTotal(sum);
    } else {
      // Calculate total amount from otherExpenses
      if (temp?.otherExpenses && temp?.otherExpenses.length > 0) {
        for (let i = 0; i < temp?.otherExpenses.length; i++) {
          sum += temp.otherExpenses[i].amount;
        }
        setGrandTotal(sum);
      }

      // Calculate total amount from services

      if (completed) {
        if (temp?.services && temp?.services.length > 0) {
          for (let i = 0; i < temp?.services.length; i++) {
            sum += temp.services[i].totalAmount;
          }
          setGrandTotal(sum);
        }
      } else {
        if (data?.services && data?.services.length > 0) {
          for (let i = 0; i < data?.services.length; i++) {
            sum += data.services[i].totalAmount;
          }
          setGrandTotal(sum);
        }
      }
    }
  };

  let renderAdditionalImages = invoiceState?.otherExpensesImages.map(
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

  function getTotalExpenses(expenses) {
    let total = 0;
    for (let i = 0; i < expenses?.length; i++) {
      total += Number(expenses[i]?.price);
    }
    return total;
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
      }}
    >
      <KeyboardAwareScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps='handled'
      >
        <CustomHeader
          title={t(completed ? 'Booking Details' : 'Generate Bill')}
          back
          navigation={navigation}
        />

        <ScrollView>
          {/* data?.services ? data?.services : invoiceState?.services */}
          <BookingBillSummary
            data={data}
            details={data}
            newBooking={true}
            generateBill={true}
          />

          {!completed && (
            <View
              style={{
                flexDirection: 'row',
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

          {completed && (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 5,
                paddingHorizontal: 24,
              }}
            >
              <View>
                <Text style={styles.heading}>{t('grand_total')}</Text>
              </View>
              <View>
                <Text style={styles.heading}>
                  {grandTotal} {'  '}
                  {user?.currencyCode}
                </Text>
              </View>
            </View>
          )}

          {/* <BookingInvoiceSummary data={invoiceState} /> */}
          {!completed && (
            <View style={{ paddingHorizontal: 15 }}>
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
                  <Text style={styles.inrementText}>+</Text>
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
                  <Text style={styles.inrementText}>+</Text>
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
                  <Text style={styles.inrementText}>+</Text>
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

                {invoiceState?.otherExpensesImages.length > 0 ? (
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
                      images={invoiceState?.otherExpensesImages.map((item) => ({
                        uri: user?.uploadFileWebUrl + item,
                      }))}
                      imageIndex={selectedImageIndex}
                      visible={visible}
                      onRequestClose={() => setIsVisible(false)}
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

              {completed && (
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: 5,
                  }}
                >
                  <View>
                    <Text style={styles.heading}>{t('grand_total')}</Text>
                  </View>
                  <View>
                    <Text style={styles.heading}>
                      {grandTotalValue} {'  '}
                      {user?.currencyCode}
                    </Text>
                  </View>
                </View>
              )}
            </View>
          )}

          {button === null ? null : (
            <View
              style={{ paddingHorizontal: 15, paddingBottom: AppHeight(5) }}
            >
              {!completed && (
                <CustomButton
                  title={t('Generate Bill')}
                  width={'100%'}
                  loading={loading}
                  onPress={() => EndBooking(data)}
                />
              )}
            </View>
          )}
        </ScrollView>
      </KeyboardAwareScrollView>
      <MultipleImagePiackAcionSheet
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        handleOnchange={handleOnchange}
        type={'user_image'}
      />
    </View>
  );
};

export default GenerateBill;

const styles = StyleSheet.create({
  incrementBtn: {
    height: 20,
    width: 20,
    backgroundColor: COLORS.primary,
    borderRadius: 5,
  },

  inrementText: {
    color: COLORS.white,
    textAlign: 'center',
  },
  heading: {
    fontWeight: 'bold',
    paddingVertical: 10,
  },
});
