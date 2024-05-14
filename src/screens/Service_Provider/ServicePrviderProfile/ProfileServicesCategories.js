import { StyleSheet, Text, View } from "react-native";
import React from "react";
import CustomHeader from "../../../components/CustomHeader";

const ProfileServicesCategories = ({ navigation }) => {
  return (
    <View>
      <CustomHeader
        title="My Service Categories"
        back
        navigation={navigation}
      />

      <Text>ProfileServicesCategories</Text>
    </View>
  );
};

export default ProfileServicesCategories;

const styles = StyleSheet.create({});
