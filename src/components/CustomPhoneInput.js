import React, { useState, useRef, useEffect } from 'react';

import { View, Text, Alert, StyleSheet, TouchableOpacity } from 'react-native';

import PhoneInput from 'react-native-phone-number-input';
import { AppHeight, COLORS } from '../utils';
import { useTranslation } from 'react-i18next';
const CustomPhoneInput = ({
  handleOnchange,
  setStates,
  name,
  error,
  handleError,
}) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const { t } = useTranslation();
  const phoneInput = useRef(null);

  return (
    <View>
      <View style={styleSheet.MainContainer}>
        <PhoneInput
          ref={phoneInput}
          defaultValue={phoneNumber}
          defaultCode={'PK'}
          layout='first'
          placeholder={t('phone_number')}
          autoFocus={true}
          containerStyle={styleSheet.phoneNumberView}
          textContainerStyle={{ paddingVertical: 0 }}
          onChangeFormattedText={(text) => {
            handleOnchange(text, name);
            handleError(null, name);
          }}
        />
      </View>
      {error && (
        <Text
          style={{ marginTop: AppHeight(1), color: COLORS.red, fontSize: 12 }}
        >
          {t('number_input_err_msg')}
        </Text>
      )}
    </View>
  );
};

export default CustomPhoneInput;

const styleSheet = StyleSheet.create({
  MainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  phoneNumberView: {
    height: AppHeight(7),
    backgroundColor: COLORS.lightGrey,
    flexDirection: 'row',
    paddingHorizontal: 15,
    borderRadius: 8,
    width: '100%',
    marginTop: 15,
  },
});
