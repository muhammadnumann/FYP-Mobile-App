import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { COLORS, ScreenHeight } from '../../../utils';
import CustomHeader from '../../../components/CustomHeader';
import { getCities } from '../../../services/SameApiServices';
import { useQuery } from 'react-query';
import CustomLoading from '../../../components/Loading/CustomLoading';

const SelectCity = ({ route, navigation }) => {
  const [Cities, setCities] = useState(null);
  const [BackupData, setBackupData] = useState(null);
  const [search, setSearch] = useState('');
  const searchRef = useRef();

  const { stateId, name, handleOnchange, handleError } = route.params;

  const { data: cities, isLoading } = useQuery(['stateId', stateId], () =>
    getCities(stateId)
  );

  const onSearch = (search) => {
    // Check if searched text is not blank
    if (search) {
      // Inserted text is not blank
      // Filter the masterDataSource
      // Update FilteredDataSource

      if (Cities) {
        const newData = Cities?.filter(function (item) {
          const itemData = item.name
            ? item.name.toUpperCase()
            : ''.toUpperCase();
          const textData = search.toUpperCase();
          return itemData.indexOf(textData) > -1;
        });
        setCities(newData);
      }
      setSearch(search);
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setCities(BackupData);
      setSearch(search);
    }
  };

  useEffect(() => {
    setCities(cities);
    setBackupData(cities);
  }, [cities]);

  const onSelect = (value) => {
    handleOnchange(value.name, name);
    handleOnchange(value.id, 'cityId');
    handleError(null, name);
    onSearch('');
    setSearch('');
    navigation.goBack();
  };

  if (isLoading) {
    return <CustomLoading content='Loading Cities ...' top={null} />;
  }

  return (
    <View style={{ height: ScreenHeight, backgroundColor: COLORS.white }}>
      <CustomHeader title={'Select City'} back navigation={navigation} />
      <View style={styles.searchInputContainer}>
        <TextInput
          placeholder='Search city name'
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
      <FlatList
        data={Cities}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity
              style={styles.dropdownList}
              onPress={() => onSelect(item)}
            >
              <Text style={{ fontWeight: '400', color: COLORS.black }}>
                {item.name}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default SelectCity;

const styles = StyleSheet.create({
  searchInputContainer: {
    elevation: 5,
    alignSelf: 'center',
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 10,
  },

  searchInput: {
    width: '100%',
    height: 50,
    alignSelf: 'center',
    paddingLeft: 20,
    color: COLORS.black,
  },
  dropdownList: {
    width: '100%',
    alignSelf: 'center',
    height: 40,
    justifyContent: 'center',
    paddingLeft: 20,
    marginTop: 10,
    paddingVertical: 10,
  },
});
