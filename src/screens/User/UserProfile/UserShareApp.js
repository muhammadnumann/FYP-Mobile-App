import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CustomHeader from '../../../components/CustomHeader';
import { COLORS, ScreenHeight } from '../../../utils';
import EmptyScreen from "../../../components/EmptyScreen";

const UserShareApp = ({ navigation }) => {
  return (
    <View style={{ backgroundColor: COLORS.white, height: ScreenHeight }}>
      <CustomHeader title="Share App" back navigation={navigation} />
      <EmptyScreen
        source={require("../../../../assets/shareApp.png")}
        subTitle={"Share with friends"}
        buttonName="Share Now"
        subText={
          "Lorem ipsum dolor sit amet consectetur. Pretium lacus congue maec. Lorem ipsum dolor."
        }
        height={143}
        width={208}
      />
    </View>
  );
}

export default UserShareApp

const styles = StyleSheet.create({})