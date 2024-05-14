import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { COLORS, ScreenHeight } from "../../../utils";
import CustomHeader from "../../../components/CustomHeader";
import { getCountries } from "../../../services/SameApiServices";
import CustomLoading from "../../../components/Loading/CustomLoading";

const SelectCountry = ({ route, navigation }) => {
  const { data: countries, isLoading } = getCountries();
  const { handleOnchange, handleError, name } = route.params;

  const [States, setStates] = useState(null);
  const [BackupData, setBackupData] = useState(null);
  const [search, setSearch] = useState("");
  const searchRef = useRef();

  const onSearch = (search) => {
    // Check if searched text is not blank
    if (search) {
      // Inserted text is not blank
      // Filter the masterDataSource
      // Update FilteredDataSource
      const newData = States.filter(function (item) {
        const itemData = item.name ? item.name.toUpperCase() : "".toUpperCase();
        const textData = search.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setStates(newData);
      setSearch(search);
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setStates(BackupData);
      setSearch(search);
    }
  };

  useEffect(() => {
    setStates(countries?.data);
    setBackupData(countries?.data);
  }, [countries]);

  const onSelect = (value) => {
    handleOnchange(value.name, name);
    handleOnchange(value.id, "countryId");
    handleError(null, name);
    onSearch("");
    setSearch("");
    navigation.goBack();
  };

  if (isLoading) {
    return <CustomLoading content="Loading Countries ..." top={null} />;
  }
  return (
    <View style={{ height: ScreenHeight, backgroundColor: COLORS.white }}>
      <CustomHeader title={`Select Country`} back navigation={navigation} />
      <View style={styles.searchInputContainer}>
        <TextInput
          placeholder={`Search ${name} name`}
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
        data={States}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity
              style={styles.dropdownList}
              onPress={() => onSelect(item)}
            >
              <Text style={{ fontWeight: "400", color: COLORS.black }}>
                {item.name}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default SelectCountry;

const styles = StyleSheet.create({
  searchInputContainer: {
    elevation: 5,
    alignSelf: "center",
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 10,
  },

  searchInput: {
    width: "100%",
    height: 50,
    alignSelf: "center",
    paddingLeft: 20,
    color: COLORS.black,
  },
  dropdownList: {
    width: "100%",
    alignSelf: "center",
    height: 40,
    justifyContent: "center",
    paddingLeft: 20,
    marginTop: 10,
    paddingVertical: 10,
  },
});
