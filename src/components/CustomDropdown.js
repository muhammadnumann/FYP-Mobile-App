import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React, { useState } from "react";
import { DownArrow } from "../utils/SvgIcon";
import { AppHeight, AppWidth, COLORS } from "../utils";
import { CustomIcon } from "./CustomIcon";
import { useTranslation } from "react-i18next";

const CustomDropdown = ({
  data,
  placeholder,
  IconName,
  handleOnchange,
  error,
  handleError,
  name,
  value,
}) => {
  const [clicked, setClicked] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");
  const { t } = useTranslation();

  const onSelect = (value) => {
    setSelectedValue(value);
    setClicked(!clicked);
    handleOnchange(value, name);
    handleError(null, name);
  };

  const rederDropdownList = () => {
    return data.map((item, index) => {
      return (
        <TouchableOpacity
          style={styles.dropdownList}
          onPress={() => onSelect(item.name)}
          key={index}
        >
          <Text style={{ fontWeight: "400", color: COLORS.black }}>
            {t(item.name)}
          </Text>
        </TouchableOpacity>
      );
    });
  };

  return (
    <View>
      <TouchableOpacity
        style={styles.container}
        onPress={() => {
          setClicked(!clicked);
        }}
      >
        <View style={{ flexDirection: "row" }}>
          {<CustomIcon name={IconName} />}
          <Text
            style={{ fontWeight: "400", color: COLORS.grey, paddingLeft: 15 }}
          >
            {selectedValue === "" ? (
              value === "" ? (
                placeholder
              ) : (
                t(value)
              )
            ) : (
              <Text style={{ color: COLORS.primary }}>{t(selectedValue)}</Text>
            )}
          </Text>
        </View>

        {clicked ? <DownArrow /> : <DownArrow />}
      </TouchableOpacity>
      {clicked ? rederDropdownList() : null}

      {error && (
        <Text style={{ marginTop: 7, color: COLORS.red, fontSize: 12 }}>
          {error}
        </Text>
      )}
    </View>
  );
};

export default CustomDropdown;

const styles = StyleSheet.create({
  container: {
    height: AppHeight(7),
    backgroundColor: COLORS.lightGrey,
    flexDirection: "row",
    paddingHorizontal: 15,
    borderRadius: 8,
    width: AppWidth(90),
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: AppHeight(2),
  },
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
    backgroundColor: COLORS.lightGrey,
    paddingLeft: 20,
  },
  dropdownList: {
    width: AppWidth(90),
    alignSelf: "center",
    height: 40,
    justifyContent: "center",
    backgroundColor: COLORS.lightGrey,
    paddingLeft: 20,
    paddingHorizontal: 15,
  },
});
