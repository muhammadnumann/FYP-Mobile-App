import React, { useState, useEffect } from "react";
import { View, Text, SafeAreaView, StyleSheet, ScrollView } from "react-native";
import AuthHeader from "../../components/AuthHeader";
import CustomButton from "../../components/CustomButton";
import { CustomIcon } from "../../components/CustomIcon";
import { COLORS } from "../../utils";
import Accordion from "react-native-collapsible/Accordion";
import { Box, HStack, VStack, Spacer, useToast } from "native-base";
import CustomCheckBox from "../../components/CustomCheckBox";
import { getRequest, postRequest } from "../../services/ApiServices";
import { SEND_CODE_URL, SERVICE_URL } from "../../services/ApiConstants";
import CustomLoading from "../../components/Loading/CustomLoading";
import WarnToast from "../../components/Toast/WarnToast";
import SuccessToast from "../../components/Toast/SuccessToast";
import { deviceCountryCode } from "../../utils/helperFunction";
import CustomHeader from "../../components/CustomHeader";
import { useTranslation } from "react-i18next";
import { err } from "react-native-svg/lib/typescript/xml";

const SelectServices = ({ route, navigation }) => {
  const { data } = route.params;
  const [activeSections, setActiveSections] = useState([]);
  const [serviceList, setServiceList] = useState([]);
  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);
  const { t } = useTranslation();

  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const onSelectService = (checkboxId) => {
    if (selectedCheckboxes.includes(checkboxId)) {
      // Service is already selected, so deselect it and its subservices
      const selectedService = serviceList.find(
        (service) => service.id === checkboxId
      );
      const allSubservices = selectedService.subDropdowns.map(
        (subservice) => subservice.id
      );
      const updatedCheckboxes = selectedCheckboxes.filter((id) => {
        // Filter out the selected service and its subservices
        return id !== checkboxId && !allSubservices.includes(id);
      });
      setSelectedCheckboxes(updatedCheckboxes);
    } else {
      // Service is not selected, so select it and its subservices
      const selectedService = serviceList.find(
        (service) => service.id === checkboxId
      );
      const allSubservices = selectedService.subDropdowns.map(
        (subservice) => subservice.id
      );
      setSelectedCheckboxes([
        ...selectedCheckboxes,
        checkboxId,
        ...allSubservices,
      ]);
    }
  };

  const onSelectSubService = (checkboxId) => {
    if (selectedCheckboxes.includes(checkboxId)) {
      setSelectedCheckboxes(
        selectedCheckboxes.filter((id) => id !== checkboxId)
      );
    } else {
      setSelectedCheckboxes([...selectedCheckboxes, checkboxId]);
    }
  };

  useEffect(() => {
    getServiceList();
  }, []);

  const getServiceList = async () => {
    setLoading(true);
    try {
      let response = await getRequest(
        SERVICE_URL + "?deviceId=" + deviceCountryCode()
      );
      if (response) {
        setServiceList(response.data);
        console.log("in try: ", response.data);
        setLoading(false);
      }
    } catch (error) {
      console.log("in error: ");
      console.log(error);

      WarnToast(t("Error"), error);
      setLoading(false);
    }
  };

  const onPressNext = async () => {
    setLoading(true);
    let sendingData = {
      phoneNumber: data.number,
    };

    try {
      let response = await postRequest(SEND_CODE_URL, sendingData);
      let sendingResponse = JSON.stringify(response);
      SuccessToast(t("Success"), JSON.parse(sendingResponse).message);
      setLoading(false);

      const ResgisterData = {
        AcceptTerms: true,
        Title: data.firstname + " " + data.lastname,
        FirstName: data.firstname,
        LastName: data.lastname,
        PhoneNumber: data.number,
        Role: 2,
        DOB: data.dob,
        Gender: data.gender === "Male" ? 1 : 2,
        Services: selectedCheckboxes,
        IdCardNumber: data.id_card_number,
        Country: data.country,
        State: data.state,
        Address: data.address,
        countryCode: deviceCountryCode(),
      };

      console.log("select servoces: ", ResgisterData);

      navigation.navigate("OtpScreen", { data: ResgisterData });
    } catch (error) {
      console.log(error);
      setLoading(false);
      WarnToast(t("Error"), error);
    }
  };

  const _renderHeader = (section, index, isActive) => {
    return (
      <View
        style={{
          paddingHorizontal: 10,
          backgroundColor: COLORS.white,
          borderBottomWidth: 1,
          borderBottomColor: COLORS.lightGrey,
          borderRadius: 12,
        }}
        key={index}
      >
        <Box py="3">
          <HStack space={2} justifyContent="space-between">
            <CustomCheckBox
              isChecked={selectedCheckboxes.includes(section?.id)}
              onPress={() => onSelectService(section?.id)}
            />
            <VStack>
              <Text
                style={{
                  color: COLORS.black,
                  padding: 5,
                }}
              >
                {section?.name}
              </Text>
            </VStack>
            <Spacer />

            <View style={{ marginTop: 5 }}>
              <CustomIcon name={isActive ? "arrowUp" : "arrowDown"} />
            </View>
          </HStack>
        </Box>
      </View>
    );
  };

  const _renderContent = (section, index) => {
    const subDropdown = section?.subDropdowns?.map((dropdown, index) => {
      return (
        <View
          style={{
            paddingVertical: 10,
            paddingHorizontal: 35,
            flexDirection: "row",
          }}
          key={index}
        >
          <CustomCheckBox
            isChecked={selectedCheckboxes?.includes(dropdown.id)}
            onPress={() => onSelectSubService(dropdown.id)}
          />
          <Text style={{ color: COLORS.black, padding: 5 }}>
            {dropdown?.name}
          </Text>
        </View>
      );
    });

    return subDropdown;
  };

  const _updateSections = (activeSections) => {
    setActiveSections(activeSections);
  };

  if (loading) {
    return <CustomLoading content={"Loading services ...."} />;
  } else {
    return (
      <SafeAreaView style={{ backgroundColor: "white", flex: 1 }}>
        <CustomHeader title={t("select_services")} />
        <ScrollView>
          <View style={{ paddingTop: 10, paddingHorizontal: 20 }}>
            <Accordion
              sections={serviceList && serviceList}
              activeSections={activeSections}
              renderHeader={_renderHeader}
              renderContent={_renderContent}
              onChange={_updateSections}
              sectionContainerStyle={{
                borderWidth: 2,
                marginTop: 10,
                borderRadius: 12,
                borderColor: COLORS.lightGrey,
              }}
              underlayColor={COLORS.lightGrey}
            />
          </View>
        </ScrollView>

        <View style={{ marginVertical: 10, alignItems: "center" }}>
          <CustomButton title="Next" onPress={onPressNext} />
        </View>
      </SafeAreaView>
    );
  }
};

export default SelectServices;

const styles = StyleSheet.create({
  container: {},
  wrapItem: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
  },
  icon: {
    marginHorizontal: 8,
  },
  name: {
    fontSize: 20,
    marginLeft: 8,
  },
});
