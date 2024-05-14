import { StyleSheet, Text, View } from "react-native";
import React from "react";
import CustomHeader from "../../../components/CustomHeader";

const ProfileInvoices = ({ navigation }) => {
  return (
    <View>
      <CustomHeader title="Invoices" back navigation={navigation} />
      <Text>Profile Invoices</Text>
    </View>
  );
};

export default ProfileInvoices;

const styles = StyleSheet.create({});
