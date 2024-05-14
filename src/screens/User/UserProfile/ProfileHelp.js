import { StyleSheet, Text, View } from "react-native";
import React from "react";
import CustomHeader from "../../../components/CustomHeader";
import UserAdminInbox from "../UserAdminChat/UserAdminInbox";

const ProfileHelp = ({ navigation }) => {
  return <UserAdminInbox navigation={navigation} />;
};

export default ProfileHelp;

const styles = StyleSheet.create({});
