import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import React, { useEffect, useState } from "react";
import { AppWidth, COLORS } from "../../utils";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { HStack } from "native-base";
import { API_URL, UPLOADED_IMAGES } from "../../services/ApiConstants";
import ImageView from "react-native-image-viewing";

const BookingBillSummary = ({
  data,
  details,
  completed,
  newBooking,
  generateBill,
}) => {
  const { t } = useTranslation();
  const user = useSelector((state) => state.AuthReducer.user);
  const [totalBill, setTotalBill] = useState(0);
  const [grandTotal, setGrandTotal] = useState(0);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [visible, setIsVisible] = useState(false);
  var renderNewServicesSummary;
  var renderServicesSummary;
  var renderAdditionalImages;
  var renderExpences;
  var renderAdditionalCharges;

  useEffect(() => {
    if (newBooking) {
      setTotalBill(0);
      if (generateBill) {
        data?.services.map((service) => {
          setTotalBill((prev) => prev + service.totalAmount);
        });
      } else {
        data?.map((service) => {
          setTotalBill((prev) => prev + service.totalAmount);
        });
      }
    }
    calculateGrandTotal();
  }, []);

  if (newBooking) {
    if (generateBill) {
      renderNewServicesSummary = data?.services.map((service, index) => {
        return (
          <View key={index}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                padding: 8,
              }}
            >
              <View style={{ width: AppWidth(35) }}>
                <Text>{service?.serviceName}</Text>
              </View>
              <View>
                <Text>{service?.count}</Text>
              </View>
              <View>
                <Text>
                  {service?.totalAmount} {user?.currencyCode}
                </Text>
              </View>
            </View>
          </View>
        );
      });
    } else {
      console.log("Summary: ", data);

      renderNewServicesSummary = data?.map((service, index) => {
        return (
          <View key={index}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                padding: 8,
              }}
            >
              <View style={{ width: AppWidth(35) }}>
                <Text>{service?.serviceName}</Text>
              </View>
              <View>
                <Text>{service?.count}</Text>
              </View>
              <View>
                <Text>
                  {service?.totalAmount} {user?.currencyCode}
                </Text>
              </View>
            </View>
          </View>
        );
      });
    }
  }

  //New functions by GR

  const openImageViewer = (index) => {
    setSelectedImageIndex(index);
    setIsVisible(true);
  };

  const calculateGrandTotal = () => {
    var sum = 0;
    if (data?.removeAlreadyExistingCharges) {
      for (let i = 0; i < data?.otherExpenses.length; i++) {
        sum += data.otherExpenses[i].amount;
      }
      setGrandTotal(sum);
    } else {
      // Calculate total amount from otherExpenses
      if (data?.otherExpenses && data?.otherExpenses.length > 0) {
        for (let i = 0; i < data?.otherExpenses.length; i++) {
          sum += data.otherExpenses[i].amount;
        }
        setGrandTotal(sum);
      }

      // Calculate total amount from services
      if (data?.services && data?.services.length > 0) {
        for (let i = 0; i < data?.services.length; i++) {
          sum += data.services[i].totalAmount;
        }
        setGrandTotal(sum);
      }
    }
  };

  if (!newBooking && newBooking !== null && newBooking !== undefined) {
    renderServicesSummary = data?.services.map((service, index) => {
      return (
        <View key={index}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              padding: 8,
            }}
          >
            <View style={{ width: AppWidth(35) }}>
              <Text>{service?.serviceName}</Text>
            </View>
            <View>
              <Text>{service?.count}</Text>
            </View>
            <View>
              <Text>
                {service?.totalAmount} {user?.currencyCode}
              </Text>
            </View>
          </View>
        </View>
      );
    });

    renderAdditionalImages = data?.otherExpensesImages.map((expense, index) => {
      return (
        <TouchableOpacity onPress={() => openImageViewer(index)} key={index}>
          <ImageBackground
            source={{
              uri: API_URL + UPLOADED_IMAGES + expense,
            }}
            style={{ height: 100, width: 100, margin: 4 }}
            borderRadius={15}
          ></ImageBackground>
        </TouchableOpacity>
      );
    });

    renderExpences = data?.otherExpenses?.map((expense, index) => {
      if (expense?.expensesType === "OtherExpenses") {
        return (
          <View key={index}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                padding: 8,
              }}
            >
              <View style={{ width: AppWidth(35) }}>
                <Text>{expense?.description}</Text>
              </View>
              <View>
                <Text>{expense?.amount}</Text>
              </View>
              <View>
                <Text>
                  {expense?.totalAmount} {user?.currencyCode}
                </Text>
              </View>
            </View>
          </View>
        );
      }
    });

    renderAdditionalCharges = data?.otherExpenses.map((expense, index) => {
      if (expense?.expensesType === "Additional") {
        return (
          <View key={index}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                padding: 8,
              }}
            >
              <View style={{ width: AppWidth(35) }}>
                <Text>{expense?.description}</Text>
              </View>
              <View>
                <Text>{expense?.amount}</Text>
              </View>
              <View>
                <Text>
                  {expense?.totalAmount} {user?.currencyCode}
                </Text>
              </View>
            </View>
          </View>
        );
      }
    });
  }

  return (
    <View
      style={{
        borderWidth: 2,
        borderColor: COLORS.primary,
        padding: 10,
        margin: 15,
        borderRadius: 12,
        backgroundColor: COLORS.primaryLight,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      }}
    >
      {(newBooking === null || newBooking === undefined) && (
        <View>
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 24,
              paddingVertical: 10,
            }}
          >
            {t("Summary")}
          </Text>

          {/* services section */}
          {data?.removeAlreadyExistingCharges ? null : (
            <>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={[styles.heading, { width: AppWidth(30) }]}>
                  {t("services")}
                </Text>
                <Text style={styles.heading}>{t("Qty")}</Text>
                <Text style={styles.heading}>{t("Price")}</Text>
              </View>
              {renderServicesSummary}

              {data?.otherDescription !== "" ? (
                <View>
                  <Text style={[styles.heading, { width: AppWidth(30) }]}>
                    {t("Other")}
                  </Text>

                  <Text> {data?.otherDescription}</Text>
                </View>
              ) : null}
            </>
          )}

          {data?.otherExpenses === null ||
          data?.otherExpenses?.length <= 0 ? null : (
            <>
              {/* additional expences section */}
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={[
                    styles.heading,
                    { width: AppWidth(30), fontWeight: "bold" },
                  ]}
                >
                  {t("Adittional Charges")}
                </Text>
                <Text style={styles.heading}>{t("Price")}</Text>
              </View>
              {renderExpences}

              {/* additional images section */}
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={[
                    styles.heading,
                    { width: AppWidth(30), fontWeight: "bold" },
                  ]}
                >
                  {t("Other Expenses")}
                </Text>
                <Text style={styles.heading}>{t("Price")}</Text>
              </View>
              {renderAdditionalCharges}
            </>
          )}

          {data?.otherExpensesImages?.length > 0 ? (
            <>
              <Text
                style={[
                  styles.heading,
                  { width: AppWidth(30), fontWeight: "bold" },
                ]}
              >
                {t("Uploaded Images")}
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                  justifyContent: "space-evenly",
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
                onRequestClose={() => setIsVisible(false)}
              />
            </>
          ) : null}

          {/* Grand Total section */}

          {!completed && (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 5,
              }}
            >
              {/* <View>
                <Text style={styles.heading}>{t("grand_total")}</Text>
              </View>
              <View>
                <Text style={styles.heading}>
                  {grandTotal} {"  "}
                  {user?.currencyCode}
                </Text>
              </View> */}
            </View>
          )}
        </View>
      )}

      {newBooking !== null && newBooking !== undefined && (
        <View>
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 24,
              paddingVertical: 10,
            }}
          >
            {t("Summary")}
          </Text>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text
              style={[
                { fontSize: 16, fontWeight: "bold" },
                { width: AppWidth(30) },
              ]}
            >
              {t("Service")}
            </Text>
            <Text style={[{ fontSize: 16, fontWeight: "bold" }]}>
              {t("Quantity")}
            </Text>
            <Text style={[{ fontSize: 16, fontWeight: "bold" }]}>
              {t("Price")}
            </Text>
          </View>

          {renderNewServicesSummary}

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 5,
            }}
          >
            {/* <View>
              <Text style={styles.heading}>{t("grand_total")}</Text>
            </View>
            <View>
              <Text style={styles.heading}>
                {totalBill} {"  "}
                {user?.currencyCode}
              </Text>
            </View> */}
          </View>
        </View>
      )}
    </View>
  );
};

export default BookingBillSummary;

const styles = StyleSheet.create({
  heading: {
    fontWeight: "bold",
    paddingVertical: 10,
  },
});
