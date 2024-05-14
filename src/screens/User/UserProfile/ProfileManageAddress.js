import { StyleSheet, Text, View } from "react-native";
import React from "react";
import CustomHeader from "../../../components/CustomHeader";

const ProfileManageAddress = ({ navigation }) => {
  return (
    <View>
      <CustomHeader title={"Manage Address"} back navigation={navigation} />

      <Text>Manage Address</Text>
    </View>
  );
};

export default ProfileManageAddress;

const styles = StyleSheet.create({});
