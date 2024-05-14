import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import CustomHeader from "../../../components/CustomHeader";
import { AppFontSize, AppHeight, AppWidth, COLORS } from "../../../utils";
import CustomSearchInput from "../../../components/CustomSearchInput";
import CustomImageSlider from "../../../components/CustomImageSlider";

import { useToast } from "native-base";
import {
  API_URL,
  GET_AVAILABLE_SERVICES,
  GET_SERVICE_BOOKING_URL,
} from "../../../services/ApiConstants";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Skeleton, VStack } from "native-base";
import { availableServices } from "../../../dummy/data";
import {
  deviceCountryCode,
  getCountryCode,
  getCurrentLocation,
} from "../../../utils/helperFunction";
import { getNotifications } from "../../../store/notifications/NotificationActions";
import {
  getBearerParamsRequest,
  getBearerRequest,
  postRequest,
} from "../../../services/ApiServices";
import FeedBackModal from "../../../components/Modals/FeedBackModal";
import ClientFeedBackModal from "../../../components/Modals/ClientFeedBackModal";
import CustomButton from "../../../components/CustomButton";
import { postBearerRequest } from "../../../services/ApiServices";
import { ColorSpace } from "react-native-reanimated";

const AllServices = ({ navigation, route }) => {
  const [inputs, setInputs] = useState({
    search: "",
    services: null,
    code: deviceCountryCode(),
  });

  const [serviceId, setServiceId] = useState(
    route.params.serviceId ? route.params.serviceId : 0
  );
  const [services, setServices] = useState([]);
  const toast = useToast();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.AuthReducer.user);

  var address = route.params.address;

  const handleOnchange = (text, input) => {
    setInputs((prevState) => ({ ...prevState, [input]: text }));
  };

  const handleError = (error, input) => {
    setErrors((prevState) => ({ ...prevState, [input]: error }));
  };

  useEffect(() => {
    dispatch(getNotifications());
  }, []);

  useEffect(() => {
    getServicesList();
    // setServices(null);
    // if (route.params.subCatAvailable) {
    //   setServices(route.params.subCat);
    // } else {
    //   setServices(availableServices);
    // }
    getBookingDetails(user?.countryCode);
  }, [user]);

  const getBookingDetails = async (code) => {
    setLoading(true);
    try {
      let response = await getBearerRequest(
        GET_SERVICE_BOOKING_URL + "?countryCode=" + code
      );

      setLoading(false);
      handleOnchange(response.data, "services");
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const getServicesList = async () => {
    setLoading(true);
    try {
      let response = await getBearerParamsRequest(GET_AVAILABLE_SERVICES, {
        countryCode: user?.countryCode,
        serviceId: serviceId,
      });

      if (response.data) {
        console.log(response.data);
        setServices([]);
        setServices(response.data);
        setLoading(false);
      }

      // setServiceProviders(response.data);
    } catch (error) {
      setLoading(false);
      console.log("error: ", error);
    }
  };

  const renderServiceList = () => {
    // inputs?.services?

    return services.map((service, index) => {
      return (
        <View
          style={{
            width: AppWidth(30),
            flexDirection: "row",
          }}
          key={index}
        >
          <TouchableOpacity
            onPress={() => {
              if (service.hasSubService) {
                navigation.push("AllServices", {
                  serviceId: service.id,
                  subCat: service.subCat,
                  address: `${address} / ${service.name}`,
                });
              } else {
                navigation.push("AvailableServices", {
                  ProfileInfo: service,
                  serviceId: service.id,
                });
              }
            }}
          >
            <View style={styles.serviceCard}>
              <Image
                style={styles.imageStyle}
                source={{
                  uri: API_URL + service.image,
                }}
                height={AppHeight(5)}
                width={AppWidth(10)}
              />
              <View
                style={{
                  ...StyleSheet.absoluteFillObject,
                  backgroundColor: COLORS.lightGrey,
                  zIndex: -1,
                  borderRadius: 50,
                  height: AppWidth(15),
                  width: AppWidth(15),
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 14,
                  marginLeft: 24,
                  padding: AppHeight(2.5),
                }}
              />
            </View>
            <Text style={styles.item}>{t(service.name)}</Text>
          </TouchableOpacity>
        </View>
      );
    });
  };

  const items = [...Array(9).keys()]; // generate an array of 10 elements

  const onPressNotification = () => {
    navigation.navigate("Home", { screen: "UserNotification" });
  };

  return (
    <View style={{ backgroundColor: COLORS.white, height: AppHeight(100) }}>
      <CustomHeader
        title={t("services")}
        back
        navigation={navigation}
        icon
        onPressNotification={onPressNotification}
      />

      <Text style={{ paddingLeft: 16, paddingTop: 8, color: COLORS.primary }}>
        {address}
      </Text>

      <View style={{ paddingHorizontal: 15, marginTop: 15 }}>
        {loading ? (
          <ScrollView
            contentContainerStyle={{
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-between",
              paddingBottom: AppHeight(70),
            }}
          >
            {items.map((item) => (
              <VStack
                key={item}
                w={AppWidth(28)}
                borderWidth="1"
                space={3}
                _dark={{
                  borderColor: "coolGray.500",
                }}
                _light={{
                  borderColor: "coolGray.200",
                }}
                style={{
                  padding: AppHeight(1.3),
                  borderRadius: 12,
                  marginTop: 13,
                }}
              >
                <Skeleton w="50" h="10" rounded="md" alignSelf="center" />
                <Skeleton h="3" rounded="full" />
              </VStack>
            ))}
          </ScrollView>
        ) : inputs?.services ? (
          <ScrollView
            contentContainerStyle={{
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-between",
              paddingBottom: AppHeight(70),
            }}
          >
            {renderServiceList()}
          </ScrollView>
        ) : null}
      </View>
    </View>
  );
};

export default AllServices;
const styles = StyleSheet.create({
  row: {
    flex: 1,
    justifyContent: "space-between",
  },
  item: {
    textAlign: "center",
    fontWeight: 600,
    marginTop: 3,
    fontSize: AppFontSize(1.3),
  },
  serviceCard: {
    position: "relative",
    alignItems: "center",
    width: AppWidth(28),
    padding: AppHeight(2.5),
    marginTop: 13,
    borderWidth: 0,
    borderRadius: 12,
    borderColor: COLORS.lightGrey,
  },

  imageStyle: {
    width: AppWidth(10),
    resizeMode: "center",
  },

  viewBtn: {
    justifyContent: "center",
    alignItems: "center",
    // paddingHorizontal: 15,
  },
});
