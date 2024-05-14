import {
  Image,
  Platform,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import CustomHeader from "../../../components/CustomHeader";
import {
  AppHeight,
  AppWidth,
  COLORS,
  ScreenHeight,
  urlFormat,
} from "../../../utils";
import CustomButton from "../../../components/CustomButton";
import { CustomIcon } from "../../../components/CustomIcon";
import AgentTabs from "./AgentTabs";
import { Rating } from "react-native-ratings";
import { getBearerRequest } from "../../../services/ApiServices";
import {
  ASSIGN_SP_BOOKING_URL,
  GET_BOOKING_SP_INFO_URL,
} from "../../../services/ApiConstants";
import SuccessToast from "../../../components/Toast/SuccessToast";
import { useToast } from "native-base";
import CustomLoading from "../../../components/Loading/CustomLoading";
import { useDispatch } from "react-redux";
import {
  getActiveBookings,
  getInprogressBookings,
} from "../../../store/client/ClientActions";
import { useTranslation } from "react-i18next";

const AgentProfileScreen = ({ route, navigation }) => {
  const { ProfileInfo, serviceProviderId, bookingId, action } = route.params;
  const [loading, setLoading] = useState(false);
  const [spInfo, setSpInfo] = useState();
  const [laodingAccept, setLaodingAccept] = useState(false);
  const toast = useToast();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const onPressReview = () => {
    // try {
    //   dispatch({ type: "FEEDBACK_VISIBLE", payload: true });
    // } catch (e) {
    //   console.log(e);
    // }
  };

  const onPressChat = () => {
    navigation.navigate("UserInbox", { chatInfo: ProfileInfo });

    // navigation.navigate("UserInboxHome", {
    //   screen: "UserInbox",
    //   params: { chatInfo: ProfileInfo },
    // });
  };

  useEffect(() => {
    getServiceProviderProfileDetail();
  }, []);

  const getServiceProviderProfileDetail = async () => {
    setLoading(true);
    try {
      let response = await getBearerRequest(
        GET_BOOKING_SP_INFO_URL + "?userid=" + serviceProviderId
      );
      setLoading(false);
      setSpInfo(response.data);
      console.log("sp data: ", response.data);
    } catch (error) {
      setLoading(false);

      console.log(error);
    }
  };

  const onPressNotification = () => {
    navigation.navigate("Home", { screen: "UserNotification" });
  };

  const onPressHire = async (id) => {
    setLaodingAccept(true);
    try {
      let response = await getBearerRequest(
        ASSIGN_SP_BOOKING_URL +
          `?bookingid=${bookingId}&spId=${serviceProviderId}`
      );

      // SuccessToast( t("Success"), t("job_accept_msg"));
      SuccessToast(t("Success"), "Service Provider Assigned successfully");
      dispatch(getInprogressBookings());
      dispatch(getActiveBookings());

      // navigation.push("UserHome");
      setLaodingAccept(false);
      if (response) {
        navigation.replace("UserHome");
      }
    } catch (error) {
      setLaodingAccept(false);
      console.log(error);
    }
  };

  let profileImage = urlFormat(spInfo?.profileImage);

  if (loading) {
    return <CustomLoading title="Loading....." top={null} />;
  }

  return (
    <View>
      <CustomHeader
        title={t("Service Provider")}
        navigation={navigation}
        back
        icon
        onPressNotification={onPressNotification}
      />

      <View
        style={{
          height:
            Platform.OS === "ios" ? ScreenHeight / 1.27 : ScreenHeight / 1.16,
          backgroundColor: COLORS.white,
        }}
      >
        <Image
          source={{
            uri: profileImage && profileImage,
          }}
          style={styles.profileImage}
          resizeMode="cover"
        />
        <Text style={styles.profileName}>{spInfo?.fullName}</Text>
        {/* <Text style={styles.bio}>{ProfileInfo.email}</Text> */}
        <Rating
          imageSize={17}
          readonly
          startingValue={spInfo?.rating}
          style={{ marginTop: 4 }}
        />

        <View style={styles.statusContainer}>
          <View>
            <Text style={styles.heading}>{t("job_done")}</Text>
            <Text style={styles.status}>{spInfo?.jobsDone}</Text>
          </View>
          <View>
            <Text style={styles.heading}>{t("status")}</Text>
            <Text style={styles.status}>
              {spInfo?.isAvailable ? t("available") : t("unabvailable")}
            </Text>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          {action !== "Accepted" ? (
            <>
              {/* <TouchableOpacity
                style={styles.iconButtonContainer}
                onPress={onPressReview}
              >
                <CustomIcon name={'reviewIcon'} />
              </TouchableOpacity> */}

              <TouchableOpacity
                style={styles.iconButtonContainer}
                onPress={onPressChat}
              >
                <CustomIcon name={"messageIcon"} />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.iconButtonContainer}
                onPress={() =>
                  Linking.openURL(`tel:${ProfileInfo.phoneNumber}`)
                }
              >
                <CustomIcon name={"phoneIcon"} />
              </TouchableOpacity>
            </>
          ) : (
            <CustomButton
              title={t("hire")}
              width={"100%"}
              height={AppHeight(6)}
              top={1}
              loading={laodingAccept}
              onPress={onPressHire}
            />
          )}
        </View>

        {spInfo ? <AgentTabs ProfileInfo={spInfo} /> : null}
      </View>
    </View>
  );
};

export default AgentProfileScreen;

const styles = StyleSheet.create({
  profileImage: {
    height: AppHeight(12),
    width: AppWidth(20),
    alignSelf: "center",
    marginTop: AppHeight(2),
    borderRadius: 12,
  },
  profileName: {
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 10,
    fontSize: 17,
  },
  statusContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 50,
    marginTop: 10,
  },
  bio: {
    color: COLORS.grey,
    textAlign: "center",
    marginTop: 5,
  },
  heading: {
    textAlign: "center",
    color: COLORS.grey,
  },
  status: {
    textAlign: "center",
    color: COLORS.black,
    fontWeight: "bold",
    marginTop: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    justifyContent: "space-between",
    paddingVertical: AppHeight(1.5),
  },
  iconButtonContainer: {
    height: AppHeight(6),
    flex: 1,
    margin: 4,
    backgroundColor: COLORS.primaryLight,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    borderColor: COLORS.primary,
    borderWidth: 1,
  },
});
