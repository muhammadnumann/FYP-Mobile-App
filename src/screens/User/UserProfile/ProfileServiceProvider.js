import { StyleSheet, Text, View } from "react-native";
import React from "react";
import CustomHeader from "../../../components/CustomHeader";

const ProfileServiceProvider = ({ navigation }) => {
  return (
    <View>
      <CustomHeader
        title={"Become A Service Provider"}
        back
        navigation={navigation}
      />
      <Text>service profider screen</Text>
    </View>
  );
};

export default ProfileServiceProvider;

const styles = StyleSheet.create({});
