import { Keyboard, Platform, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import CustomHeader from "../../../components/CustomHeader";
import { AppHeight, COLORS, ScreenHeight, ScreenWidth } from "../../../utils";
import CustomInput from "../../../components/CustomInput";
import CustomButton from "../../../components/CustomButton";
import { Radio, Stack } from "native-base";
import SelectButton from "../../../components/SelectButton";
import { UpdateUserAddress } from "../../../services/UserServices/UserService";
import { useMutation } from "react-query";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GetUserProfileInfo } from "../../../services/SameApiServices";
import { useDispatch } from "react-redux";
import { handleRefresh } from "../../../store/AuthActions";
import RNRestart from "react-native-restart";
import { useTranslation } from "react-i18next";

const AddAddress = ({ navigation }) => {
  const [inputs, setInputs] = useState({
    country: "",
    state: "",
    address: "",
    city: "",
    countryId: "",
    stateId: "",
    cityId: "",
    homeAppartmentNumber: "",
    markAs: "Home",
  });
  const [errors, setErrors] = useState({});
  const {
    mutate,
    data: response,
    isSuccess,
    isLoading,
  } = useMutation(UpdateUserAddress);

  const { data: userDetails } = GetUserProfileInfo();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const handleOnchange = (text, input) => {
    setInputs((prevState) => ({ ...prevState, [input]: text }));
  };

  const handleError = (error, input) => {
    setErrors((prevState) => ({ ...prevState, [input]: error }));
  };

  const onPressCountry = () => {
    navigation.navigate("country", {
      handleOnchange,
      handleError,
      name: "country",
    });
  };

  const onPressState = () => {
    navigation.navigate("state", {
      handleOnchange,
      handleError,
      name: "state",
      countryId: inputs.countryId,
    });
  };

  const onPressCity = () => {
    navigation.navigate("city", {
      handleOnchange,
      handleError,
      name: "city",
      stateId: inputs.stateId,
    });
  };

  const validate = async () => {
    Keyboard.dismiss();
    let isValid = true;

    if (!inputs.country) {
      handleError(t("country_input_err_msg"), "country");
      isValid = false;
    }

    if (!inputs.state) {
      handleError(t("state_input_err_msg"), "state");
      isValid = false;
    }
    if (!inputs.city) {
      handleError(t("city_input_err_msg"), "city");
      isValid = false;
    }

    if (!inputs.homeAppartmentNumber) {
      handleError(t("add_address_err_msg"), "homeAppartmentNumber");
      isValid = false;
    }
    if (!inputs.address) {
      handleError(t("add_address_err_msg"), "address");
      isValid = false;
    }

    if (isValid) {
      handleSave();
    }
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch(handleRefresh(userDetails?.data));
      RNRestart.restart();
    }

    navigation.getParent()?.setOptions({
      tabBarStyle: {
        display: "none",
      },
    });
    return () =>
      navigation.getParent()?.setOptions({
        height: Platform.OS === "ios" ? 80 : 60,
      });
  }, [isSuccess, navigation]);

  const handleSave = async () => {
    let user = await AsyncStorage.getItem("user");
    let userData = JSON.parse(user);

    let data = {
      countryId: inputs.countryId,
      stateId: inputs.stateId,
      cityId: inputs.cityId,
      homeAppartmentNumber: inputs.homeAppartmentNumber,
      address: inputs.address,
      userId: userData.id,
      addressType: inputs.markAs,
    };

    mutate(data);
  };

  return (
    <View style={{ height: AppHeight(100), backgroundColor: COLORS.white }}>
      <CustomHeader title="Add Address" />

      <View style={{ paddingTop: 10, paddingHorizontal: 20 }}>
        <SelectButton
          placeholder={t("select_country")}
          IconName="LocationIcon"
          value={inputs.country}
          navigation={onPressCountry}
          error={errors.country}
        />

        <SelectButton
          placeholder={t("select_state")}
          IconName="LocationIcon"
          value={inputs.state}
          navigation={onPressState}
          error={errors.state}
        />

        <SelectButton
          error={errors.city}
          placeholder={t("select_city")}
          IconName="LocationIcon"
          value={inputs.city}
          navigation={onPressCity}
        />

        <CustomInput
          onChangeText={(text) => handleOnchange(text, "homeAppartmentNumber")}
          onFocus={() => handleError(null, "homeAppartmentNumber")}
          IconName="LocationIcon"
          placeholder={t("houseNumber")}
          error={errors.homeAppartmentNumber}
        />

        <CustomInput
          onChangeText={(text) => handleOnchange(text, "address")}
          onFocus={() => handleError(null, "address")}
          IconName="LocationIcon"
          placeholder={t("complete_address")}
          error={errors.address}
        />

        <Text style={styles.title}>{t("mark_as")}</Text>

        <Radio.Group
          name="exampleGroup"
          defaultValue="1"
          accessibilityLabel="favorite colorscheme"
        >
          <Stack
            direction={{
              base: "row",
              md: "row",
            }}
            alignItems={{
              base: "flex-start",
              md: "center",
            }}
            space={4}
            w="75%"
            maxW="300px"
          >
            <Radio value="1" colorScheme="blue" size="sm" my={1}>
              {t("Home")}
            </Radio>
            <Radio value="2" colorScheme="blue" size="sm" my={1}>
              {t("Office")}
            </Radio>
            <Radio value="3" colorScheme="blue" size="sm" my={1}>
              {t("Other")}
            </Radio>
          </Stack>
        </Radio.Group>
      </View>
      <View style={styles.viewBtn}>
        <CustomButton
          title={t("save")}
          top={10}
          loading={isLoading}
          onPress={validate}
        />
        {/* <CustomBorderButton title="Cancel" top={10} /> */}
      </View>
    </View>
  );
};

export default AddAddress;

const styles = StyleSheet.create({
  viewBtn: {
    position: "absolute",
    bottom: 0,
    height: ScreenHeight * 0.2,
    width: ScreenWidth * 1,
    justifyContent: "center",
    paddingHorizontal: 15,
  },
  title: {
    paddingVertical: 20,
    fontWeight: "bold",
    fontSize: 16,
  },
});
