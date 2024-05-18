import { ScrollView, StyleSheet, View, Platform, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { useDisclose, useToast } from "native-base";
import CustomHeader from "../../../components/CustomHeader";
import CustomButton from "../../../components/CustomButton";
import { AppHeight, COLORS } from "../../../utils";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { useSelector } from "react-redux";

import {
  GET_INVOICE_BOOKING_URL,
  UPLOAD_IMAGE_URL,
} from "../../../services/ApiConstants";
import { useDispatch } from "react-redux";
import { getBearerRequest } from "../../../services/ApiServices";
import BookingSummary from "../../../components/Cards/BookingSummary";

const ClientPaymentReceipt = ({ route, navigation }) => {
  const { data } = route.params;
  const [user, setUser] = useState(
    useSelector((state) => state.AuthReducer.user)
  );
  const toast = useToast();
  const { t } = useTranslation();
  const { isOpen, onOpen, onClose } = useDisclose();
  const [other, setOther] = useState(false);
  const [invoiceState, setInvoiceState] = useState(null);
  const dispatch = useDispatch();
  const [grandTotal, setGrandTotal] = useState(0);

  const [inputs, setInputs] = React.useState({
    images: null,
  });
  const handleOnchange = (text, input) => {
    setInputs((prevState) => ({ ...prevState, [input]: text }));
  };

  const [uploadProgress, setUploadProgress] = useState(
    new Array(inputs?.images?.length).fill(null)
  );

  const [uploadImage, setUploadImage] = useState();

  const calculateGrandTotal = (temp) => {
    var sum = 0;
    if (temp?.removeAlreadyExistingCharges === true) {
      for (let i = 0; i < temp?.otherExpenses.length; i++) {
        sum += temp.otherExpenses[i].amount;
      }
    } else {
      // Calculate total amount from otherExpenses
      if (temp?.otherExpenses && temp?.otherExpenses.length > 0) {
        for (let i = 0; i < temp?.otherExpenses.length; i++) {
          sum += temp.otherExpenses[i].amount;
        }
      }

      // Calculate total amount from services
      if (temp?.services && temp?.services.length > 0) {
        for (let i = 0; i < temp?.services.length; i++) {
          sum += temp.services[i].totalAmount;
        }
      }
    }
    setGrandTotal(sum);
  };

  const onPressPaymentRequest = (data, totalAmount) => {
    navigation.push("ClientPaymentMethod", {
      data: data,
      totalAmount: grandTotal,
    });
    dispatch({ type: "CLIENT_FEEDBACK_DATA", payload: data });
  };

  // useEffect(() => {
  //   navigation.getParent()?.setOptions({
  //     tabBarStyle: {
  //       display: "none",
  //     },
  //   });
  //   return () =>
  //     navigation.getParent()?.setOptions({
  //       tabBarStyle: {
  //         height: Platform.OS === "ios" ? 80 : 60,
  //       },
  //     });
  // }, [navigation]);

  useEffect(() => {
    calculateGrandTotal(invoiceState);
  }, [invoiceState]);

  useEffect(() => {
    getInvoiceBooking();
  }, []);

  const getInvoiceBooking = async () => {
    try {
      let response = await getBearerRequest(
        GET_INVOICE_BOOKING_URL + "?id=" + data.id
      );

      setInvoiceState(response.data);

      if (response) {
        calculateGrandTotal(response.data);
        console.log(response.data);
      }
      // setAvailableCountries(response.data);
    } catch (error) {
      console.log(error);
    }
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
          "Content-Type": "multipart/form-data",
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
        responses.push({ images: response.data }); // Push response to array if not null
      }
    });

    setUploadImage(responses);
  }, [inputs?.images]);

  function getTotalExpenses(expenses) {
    let total = 0;
    for (let i = 0; i < expenses?.length; i++) {
      total += expenses[i]?.amount;
    }
    return total;
  }

  const totalAmount = data?.services?.reduce((acc, service) => {
    return acc + service?.totalAmount;
  }, 0);

  const totalExpenses = getTotalExpenses(invoiceState?.otherExpenses);

  const onPressNotification = () => {
    navigation.navigate("AudioHomeScreens", { screen: "UserNotification" });
  };

  return (
    <View
      style={{
        height: AppHeight(100),
        backgroundColor: COLORS.white,
      }}
    >
      <CustomHeader
        title="Payment Receipt"
        back
        navigation={navigation}
        icon
        onPressNotification={onPressNotification}
      />
      <ScrollView
        style={{
          maxHeight:
            invoiceState?.status === "InvoiceGenerated"
              ? AppHeight(70)
              : AppHeight(75),
        }}
      >
        <BookingSummary data={invoiceState} />
        {/* <BookingInvoiceSummary
          data={invoiceState}
          total_amount={totalAmount}
          totalCharges={grandTotal}
          // newBooking={true}
        /> */}

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 5,
            paddingHorizontal: 24,
          }}
        >
          <View>
            <Text style={styles.mainHeading}>{t("grand_total")}</Text>
          </View>
          <View>
            <Text style={styles.mainHeading}>
              {grandTotal} {"  "}
              {user?.currencyCode}
            </Text>
          </View>
        </View>

        {invoiceState?.status === "InvoiceGenerated" ? (
          <View style={styles.viewBtn}>
            <CustomButton
              title="Select Payment Method"
              width={"100%"}
              top={8}
              onPress={() => onPressPaymentRequest(data, grandTotal)}
            />
          </View>
        ) : null}
      </ScrollView>
    </View>
  );
};

export default ClientPaymentReceipt;

const styles = StyleSheet.create({
  incrementBtn: {
    height: 20,
    width: 20,
    backgroundColor: COLORS.primary,
    borderRadius: 5,
  },

  viewBtn: {
    // height: AppHeight(23),
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 15,
  },

  inrementText: {
    color: COLORS.white,
    textAlign: "center",
  },
  mainHeading: {
    fontWeight: "bold",
    fontSize: 16,
    paddingVertical: 10,
  },
});
