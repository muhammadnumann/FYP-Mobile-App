import React, { useState, useRef, useEffect } from 'react';

import { View, Text, Alert, StyleSheet, TouchableOpacity } from 'react-native';

import PhoneInput from 'react-native-phone-number-input';
import { AppHeight, COLORS } from '../utils';
import { country_list } from '../utils/country_state';
import { useTranslation } from 'react-i18next';
import { deviceCountryCode } from '../utils/helperFunction';
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


  const SelectCountry = () => {
    country_list.filter(function (item) {
      if (item.countryCode === phoneInput.current.state.countryCode) {
        // handleOnchange(item.name, "country");
        if (setStates) {
          setStates(item.stateProvinces);
        }
      }
    });
  };

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
            SelectCountry();
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
