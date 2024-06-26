import { StyleSheet, Text, View, Linking } from 'react-native';
import React, { useState, useEffect } from 'react';
import { AppHeight, AppWidth, COLORS, urlFormat } from '../../utils';
import { useDispatch, useSelector } from 'react-redux';

const CustomAudioCard = React.memo(({
  audios,
  status,
  onButtonPress,
  onSuccessPress,
  navigation }) => {
  const user = useSelector((state) => state.AuthReducer.user);


  const dispatch = useDispatch();

  const totalAmount = audios?.services?.reduce((acc, service) => {
    return acc + service?.totalAmount;
  }, 0);

  return (
    <View style={styles.container}>
      <View>
        <View
          style={{ flexDirection: 'row', justifyContent: 'space-between' }}
        >
          <View style={{ width: AppWidth(100) }}>
            <Text>{audios?.orignalFileName}</Text>
          </View>
          <View style={{ width: AppWidth(100) }}>

          </View>
        </View>
      </View>
      <View
        style={{
          borderWidth: 1,
          borderColor: COLORS.lightGrey,
          marginTop: 15,
        }}
      />

    </View>
  );
}
);

export default CustomAudioCard;

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderColor: COLORS.lightGrey,
    padding: 10,
    // margin: 15,
    // paddingHorizontal: 40,

    borderRadius: 12,
    backgroundColor: COLORS.white,
  },
  profileSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  avatar: {
    height: 70,
    width: 70,
    borderRadius: 12,
  },
  subText: {
    fontSize: 15,
    color: COLORS.grey,
  },
  title: {
    fontSize: 15,
    fontWeight: 'bold',
    paddingVertical: 7,
  },
  heading: {
    fontWeight: 'bold',
    paddingVertical: 10,
    textAlign: 'center',
  },
  iconButtonContainer: {
    height: AppHeight(6),
    width: AppWidth(38),
    backgroundColor: COLORS.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    borderColor: COLORS.primary,
    borderWidth: 1,
  },
});
