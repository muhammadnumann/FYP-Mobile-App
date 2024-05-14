import { useEffect, useState } from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";
import CountryPicker from "react-native-country-picker-modal";
import { AppHeight, COLORS } from "../utils";

const CustomCountryPickerModal = ({ handleOnchange, name }) => {
  const [country, setCountry] = useState(null);
  const [countryCode, setCountryCode] = useState("PK");

  useEffect(() => {
    handleOnchange("Pakistan", name);
    setCountry("Pakistan");
  }, []);

  const onSelect = (country) => {
    setCountryCode(country.cca2);
    setCountry(country.name);
    handleOnchange(country.name, name);
  };

  return (
    <TouchableOpacity>
      <CountryPicker
        withCountryNameButton={true}
        withFlag={true}
        withEmoji={true}
        withFilter={true}
        withAlphaFilter={false}
        withCallingCode={false}
        countryCode={countryCode}
        containerButtonStyle={styles.container}
        onSelect={onSelect}
      />
    </TouchableOpacity>
  );
};

export default CustomCountryPickerModal;

const styles = StyleSheet.create({
  container: {
    height: AppHeight(7),
    backgroundColor: COLORS.lightGrey,
    flexDirection: "row",
    paddingHorizontal: 15,
    borderRadius: 8,
    width: "100%",
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 15,
  },
});
