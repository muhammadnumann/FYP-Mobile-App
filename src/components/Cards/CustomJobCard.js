import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { AppHeight, AppWidth, COLORS, urlFormat } from "../../utils";
import { Rating } from "react-native-ratings";
import CustomButton from "../CustomButton";
import CustomBorderButton from "../CustomBorderButton";
import moment from "moment";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { HamburgerIcon, Menu } from "native-base";
import { getBearerRequest } from "../../services/ApiServices";
import { GET_INVOICE_BOOKING_URL } from "../../services/ApiConstants";

const CustomJobCard = ({
  data,
  index,
  onButtonPress,
  footer,
  btnName,
  newJobs,
  receipt,
  onPressAccept,
  onPressReject,
  myJobs,
  navigation,
  status,
  bookingId,
}) => {
  let image = urlFormat(data?.clientImage);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [totalAmount, setTotalAmount] = useState(0);

  const onPressGenerateBill = async (completed) => {

    dispatch({ type: "FEEDBACK_DATA", payload: data });
  };

  const getTotal = () => {
    setTotalAmount(0);
    let total = 0;

    if (!data.removeAlreadyExistingCharges) {
      for (const service of data.services) {
        total += service.totalAmount;
      }
    }

    for (const expense of data.otherExpenses) {
      if (expense.amount !== null && expense.amount !== undefined) {
        total += expense.amount;
      }
    }

    setTotalAmount(total);
  };

  useEffect(() => {
    // getInvoiceBooking();

    getTotal();

    console.log(data);
  }, []);

  const getInvoiceBooking = async () => {
    try {
      let response = await getBearerRequest(
        GET_INVOICE_BOOKING_URL + "?id=" + data.id
      );

      // setAvailableCountries(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container} key={index}>
      {/* card header  */}

      <View style={styles.profileSection}>
        <View
          style={{
            flexDirection: "row",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <View
            style={{
              flexDirection: "row",
            }}
          >
            <Image source={{ uri: image && image }} style={styles.avatar} />
            <View style={{ marginLeft: 10 }}>
              <Text style={styles.title}>{data?.clientName}</Text>
              {receipt ? (
                <Rating
                  imageSize={15}
                  readonly
                  startingValue={1}
                  style={{ marginRight: 0, marginTop: 0 }}
                />
              ) : status === "completed" ? (
                <View>
                  <Rating
                    imageSize={15}
                    readonly
                    startingValue={data?.ratingForServiceProvider}
                    style={{
                      marginTop: 0,
                      textAlign: "left",
                      float: "left",
                      alignSelf: "flex-start",
                    }}
                  />
                  <Text style={{ marginTop: 0, fontWeight: "bold" }}>
                    Total Amount : {totalAmount}
                  </Text>
                </View>
              ) : (
                <Text style={{ marginTop: 10 }}>{data?.clientPhoneNumber}</Text>
              )}
            </View>
          </View>

          {myJobs || status === "completed" ? (
            <Menu
              w="190"
              style={{ marginTop: 0 }}
              trigger={(triggerProps) => {
                return (
                  <TouchableOpacity
                    accessibilityLabel="More options menu"
                    {...triggerProps}
                    style={{ marginTop: 10 }}
                  >
                    <HamburgerIcon size={8} />
                  </TouchableOpacity>
                );
              }}
            >
              {status !== "completed" ? (
                <Menu.Item
                  onPress={() =>
                    navigation.navigate("Inbox", { chatInfo: data })
                  }
                >
                  {t("chat")}
                </Menu.Item>
              ) : null}

              <Menu.Item
                onPress={() => {
                  if (status === "completed") {
                    onPressGenerateBill(true);
                  } else {
                    onPressGenerateBill(false);
                  }
                }}
              >
                {t("View Details")}
              </Menu.Item>
              <Menu.Item onPress={onButtonPress}>{btnName}</Menu.Item>
            </Menu>
          ) : null}
        </View>
      </View>

      {/* card Body */}

      <View
        style={{
          borderWidth: 1,
          borderColor: COLORS.lightGrey,
          marginTop: 15,
        }}
      />

      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <View>
          {data?.removeAlreadyExistingCharges ? null : (
            <>
              <Text style={styles.title}>{t("Job Description")}</Text>

              {data?.services?.map((service, index) => (
                <Text style={styles.subText} key={index}>
                  {t(service?.serviceName)}
                </Text>
              ))}
            </>
          )}
        </View>

        {receipt ? (
          <CustomBorderButton
            title={t("Completed")}
            width={"30%"}
            height={30}
            fontSize={12}
            top={8}
            status={"Completed"}
          />
        ) : null}
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingVertical: 10,
        }}
      >
        <View>
          <Text style={styles.title}>{t("Job ID")}</Text>

          <Text style={styles.subText}>{data?.id}</Text>
        </View>

        <View>
          <Text style={styles.title}>{t("Date")}</Text>

          <Text style={styles.subText}>
            {moment(data?.bookedAt).format("DD-MM-YYYY")}
          </Text>
        </View>

        <View>
          <Text style={styles.title}>{t("Time")}</Text>

          <Text style={styles.subText}>
            {data?.bookedStartTime} to {data?.bookedEndTime}
          </Text>
        </View>
      </View>

      {/* <View>
        <Text style={styles.title}>{t("Address")}</Text>

        <Text style={styles.subText}>{data?.bookingAddress}</Text>
      </View> */}

      {/* card footer */}

      {footer ? (
        <View>
          <View
            style={{
              borderWidth: 1,
              borderColor: COLORS.lightGrey,
              marginTop: 15,
            }}
          />

          {newJobs ? (
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <CustomBorderButton
                title={"Cancel"}
                width={AppWidth(40)}
                height={45}
                fontSize={12}
                onPress={() => onPressReject(data?.id)}
              />
              <CustomButton
                title={"Accept"}
                width={AppWidth(40)}
                height={45}
                fontSize={12}
                onPress={() => onPressAccept(data?.id)}
              />
            </View>
          ) : (
            <>
              {/* <CustomButton
                title={btnName}
                width={AppWidth(85)}
                height={45}
                fontSize={12}
                top={0.2}
                onPress={onButtonPress}
              /> */}
            </>
          )}
        </View>
      ) : null}
    </View>
  );
};

export default CustomJobCard;

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderColor: COLORS.lightGrey,
    // height: AppHeight(),
    padding: 10,
    margin: 15,
    borderRadius: 12,
  },
  profileSection: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  avatar: {
    height: 70,
    width: 70,
    borderRadius: 12,
  },
  subText: {
    fontSize: 15,
    color: COLORS.grey,
  },
  title: {
    fontSize: 15,
    fontWeight: "bold",
    paddingVertical: 7,
  },
});
