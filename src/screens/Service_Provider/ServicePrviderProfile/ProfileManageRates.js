import { StyleSheet, Text, View } from "react-native";
import React from "react";
import CustomHeader from "../../../components/CustomHeader";

const ProfileManageRates = ({ navigation }) => {
  return (
    <View>
      <CustomHeader title="Manage Rates" back navigation={navigation} />
      <Text>Profile Manage Rates</Text>
    </View>
  );
};

export default ProfileManageRates;

const styles = StyleSheet.create({});
