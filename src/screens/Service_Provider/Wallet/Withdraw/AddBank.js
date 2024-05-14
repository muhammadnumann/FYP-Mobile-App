import React, { useState, useRef } from 'react';
import CustomHeader from '../../../../components/CustomHeader';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  Platform,
} from 'react-native';
import { AppHeight, COLORS } from '../../../../utils';
import { TextInput } from 'react-native';
import { AllBanks } from '../../../../utils/banks';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useTranslation } from 'react-i18next';

const AddBank = ({ navigation }) => {
  const searchRef = useRef();

  const [search, setSearch] = useState('');

  const [newData, setData] = useState(AllBanks.list);
  const { t } = useTranslation();

  React.useEffect(() => {
    navigation.getParent()?.setOptions({
      tabBarStyle: {
        display: 'none',
      },
    });
    return () =>
      navigation.getParent()?.setOptions({
        tabBarStyle: {
          height: Platform.OS === 'ios' ? 80 : 60,
        },
      });
  }, [navigation]);

  const onSearch = (search) => {
    // Check if searched text is not blank
    if (search) {
      // Inserted text is not blank
      // Filter the masterDataSource
      // Update FilteredDataSource
      const newData = AllBanks.list.filter(function (item) {
        const itemData = item.bank ? item.bank.toUpperCase() : ''.toUpperCase();
        const textData = search.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });

      setData(newData);
      setSearch(search);
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setData(AllBanks.list);
      setSearch(search);
    }
  };

  const onSelectBank = (bank) => {
    navigation.navigate('AddBankAccount', { bankName: bank });
  };

  const onPressNotification = () => {
    navigation.navigate('SpNotifications');
  };

  return (
    <View style={{ height: AppHeight(100), backgroundColor: COLORS.white }}>
      <CustomHeader
        title={t('Add_bank_header')}
        icon
        back
        navigation={navigation}
        onPressNotification={onPressNotification}
      />

      <View style={{ paddingHorizontal: 15 }}>
        <Text style={{ fontWeight: 'bold', paddingVertical: 10 }}>
          {t('add_bank_title')}
        </Text>
        <Text style={{ color: COLORS.grey, marginTop: 20 }}>
          {t('add_bank_search_title')}
        </Text>

        <View style={styles.searchInputContainer}>
          <TextInput
            placeholder={t('search')}
            value={search}
            ref={searchRef}
            onChangeText={(txt) => {
              onSearch(txt);
              setSearch(txt);
            }}
            style={styles.searchInput}
            placeholderTextColor={COLORS.grey}
          />
        </View>

        <Text style={{ color: COLORS.grey, marginTop: 20 }}>
          {t('bank_list_title')}
        </Text>

        <FlatList
          data={newData}
          keyExtractor={(item, index) => index.toString()}
          style={styles.dropdownList}
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity
                style={styles.bankButton}
                onPress={() => onSelectBank(item.bank)}
              >
                <View style={{ flexDirection: 'row' }}>
                  <View>
                    <Image
                      style={styles.bankImage}
                      alt='bankButton'
                      source={{
                        uri: 'https://www.citypng.com/public/uploads/preview/free-round-blue-bank-icon-png-11640250737wqyhgimzkr.png',
                      }}
                    />
                  </View>
                  <Text
                    style={{
                      fontWeight: '400',
                      color: COLORS.black,
                      padding: 4,
                    }}
                  >
                    {item.bank}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </View>
  );
};

export default AddBank;

const styles = StyleSheet.create({
  searchInputContainer: {
    alignSelf: 'center',
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginTop: 10,
  },

  searchInput: {
    width: '100%',
    height: 50,
    alignSelf: 'center',
    backgroundColor: COLORS.lightGrey,
    paddingLeft: 20,
    borderRadius: 10,
  },
  dropdownList: {
    backgroundColor: COLORS.white,
    paddingLeft: 20,
    borderWidth: 1,
    borderColor: COLORS.lightGrey,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 10,
    height: AppHeight(60),
  },
  bankButton: {
    width: '100%',
    height: 50,
    alignSelf: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 10,
    paddingVertical: 20,
  },
  bankImage: {
    width: 30,
    height: 30,
  },
});
