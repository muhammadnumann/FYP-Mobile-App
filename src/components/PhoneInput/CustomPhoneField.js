import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  Text,
  Platform,
  SafeAreaView,
} from 'react-native';
import PropTypes from 'prop-types';
import {
  Input,
  Button,
  Overlay,
  ListItem,
  SearchBar,
  Icon,
  Avatar,
} from '@rneui/themed';
import countries from './countryCode.json';
import { AppHeight, AppWidth, COLORS } from '../../utils';
import { deviceCountryCode } from '../../utils/helperFunction';
import { useTranslation } from 'react-i18next';
import { getBearerRequest, getRequest } from '../../services/ApiServices';
import { GET_AVAILABLE_COUNTRY_URL } from '../../services/ApiConstants';

export default CustomPhoneField = ({
  onChangeText,
  errorMessage,
  placeholder,

  handleOnchange,
  setStates,
  name,
  error,
  handleError,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [search, setSearch] = useState('');
  const [emoji, setEmoji] = useState('🇮🇳');
  const [code, setCode] = useState('+91');
  const [con, setCon] = useState([]);
  const [list, setList] = useState([]);
  const [phonenumber, setPhoneNumber] = useState([]);

  const { t } = useTranslation();

  useEffect(() => {
    let code = deviceCountryCode();
    var country = 'Saudi Arabia';
    if (code === 'PK') {
      country = 'Pakistan';
    } else {
      country = 'Saudi Arabia';
    }

    countries['countries'].filter(function (item) {
      if (item.name === country) {
        setCode(item.phone);
        setEmoji(item.emoji);
      }
    });
  }, [countries]);

  useEffect(() => {
    getAvailableCountries();
  }, []);
  useEffect(() => {
    inputTextChange(phonenumber);
  }, [code])
  const getAvailableCountries = async () => {
    try {
      let response = await getRequest(GET_AVAILABLE_COUNTRY_URL);

      setCon(response.data);
      setList(response.data);
      // setAvailableCountries(response.data);
    } catch (error) {
      console.log('get countries error', error);
    }
  };


  const closeOverlay = () => {
    setIsVisible(false);
  };

  const selectedCountry = (item) => {
    setIsVisible(false);
    setEmoji(item.emoji);
    setCode(item.phone);

  };

  const keyExtractor = (item, index) => index.toString();

  const renderItem = ({ item }) => {
    return (
      <ListItem bottomDivider onPress={() => selectedCountry(item)}>
        <ListItem.Content>
          <Text>
            {JSON.parse(`"${item.emoji}"`)} {'  '} {item.phone} {'  '}{' '}
            {item.name}
          </Text>
        </ListItem.Content>
      </ListItem>
    );
  };

  const updateSearch = (search) => {
    const filteredList = con.filter((item) => {
      const itemName = item.name.toLowerCase();
      const itemCode = item.phone.toLowerCase();
      const textData = search.toLowerCase();
      if (itemName.indexOf(textData) > -1 || itemCode.indexOf(textData) > -1) {
        return true;
      }
    });
    setList(filteredList);
    setSearch(search);
  };

  const inputTextChange = (text) => {
    const number = code + text;
    console.log("newnumber", number)
    setPhoneNumber(text)
    handleOnchange(number, name);
    handleError(null, name);

    // onChangeText(number);
  };

  return (
    <View style={styles.container}>
      <View style={styles.fieldContainer}>
        <TouchableOpacity
          style={styles.buttonTitleStyle}
          onPress={() => { }}
        >
          {/* <View style={{ flexDirection: "row" }}> */}

          <Text style={{ textAlign: 'center', marginLeft: 5 }}>
            <Text style={{ fontSize: 15, marginLeft: 4 }}>
              {JSON.parse(`"${emoji}"`)}
            </Text>{' '}
            {' ' + code}
          </Text>
          {/* </View> */}
        </TouchableOpacity>

        <TextInput
          keyboardType='number-pad'
          placeholder={placeholder}
          //   inputStyle={styles.inputStyle}
          placeholderTextColor={'grey'}
          style={styles.inputContainerStyle}
          onChangeText={inputTextChange}
        //   errorMessage={errorMessage}
        />
      </View>
      <Overlay fullScreen isVisible={isVisible} onBackdropPress={closeOverlay}>
        <SafeAreaView>
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity
              style={styles.iconContainerStyle}
              onPress={closeOverlay}
            >
              <Text>X</Text>
            </TouchableOpacity>

            <TextInput
              placeholder='Search by country or code'
              onChangeText={updateSearch}
              value={search}
              placeholderTextColor={'grey'}
              containerStyle={styles.searchBarContainerStyle}
              inputContainerStyle={styles.searchBarInputContainerStyle}
              inputStyle={styles.searchBarInputStyle}
              style={{ color: 'black' }}
            />
          </View>

          <FlatList
            keyboardShouldPersistTaps='handled'
            keyExtractor={keyExtractor}
            data={list}
            renderItem={renderItem}
          />
        </SafeAreaView>
      </Overlay>

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

const styles = StyleSheet.create({
  buttonStyle: {
    backgroundColor: COLORS.lightGrey,
    padding: 15,
  },
  buttonTitleStyle: {
    color: 'black',
    justifyContent: 'center',
    padding: 2,
    fontSize: Platform.OS === 'ios' ? 14 : null,
  },
  container: {
    // alignItems: "center",
    backgroundColor: 'white',
    // flexDirection: "row",
    // margin: 10,
    // marginRight: 20,
  },
  iconContainerStyle: {
    height: 50,
    width: 50,
    padding: Platform.OS === 'ios' ? 15 : 10,
  },

  inputContainerStyle: {
    width: AppWidth(60),
    color: 'black',
    // fontSize: 15,
  },

  searchBarContainerStyle: {
    backgroundColor: 'white',
    borderBottomColor: 'white',
    borderTopColor: 'white',
  },
  searchBarInputContainerStyle: {
    backgroundColor: 'white',
  },
  searchBarInputStyle: {
    color: 'black',
    fontSize: Platform.OS === 'ios' ? 14 : null,
  },

  fieldContainer: {
    height: AppHeight(7),
    backgroundColor: COLORS.lightGrey,
    flexDirection: 'row',
    borderRadius: 8,
    width: AppWidth(90),
    marginTop: 15,
  },
});
