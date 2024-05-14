import React, { useState } from "react";
import { Select, CheckIcon, View, Text } from "native-base";
import { AppHeight, AppWidth, COLORS } from "../utils";
import { CustomIcon } from "./CustomIcon";
import { StyleSheet } from "react-native";
import { useTranslation } from "react-i18next";

export const CustomSelect = ({
  data,
  IconName,
  handleOnchange,
  error,
  handleError,
  name,
  placeholder,
}) => {
  const [selectedValue, setSelectedValue] = useState("");
  const { t } = useTranslation();

  const onSelect = (value) => {
    setSelectedValue(value);
    handleOnchange(value, name);
    handleError(null, name);
  };
  return (
    <View>
      <View style={style.inputContainer}>
        <View style={{ marginTop: 24 }}>
          <CustomIcon name={IconName} />
        </View>

        <Select
          selectedValue={selectedValue}
          width={AppWidth(80)}
          accessibilityLabel="Select a Role"
          placeholder={placeholder}
          _selectedItem={{
            endIcon: <CheckIcon size="5" />,
          }}
          mt={1}
          backgroundColor={COLORS.lightGrey}
          style={{
            height: AppHeight(7),
            color: COLORS.primary,
            fontSize: 14,
          }}
          variant={"unstyled"}
          borderRadius={8}
          onValueChange={(itemValue) => onSelect(itemValue)}
        >
          {data.map((item, index) => {
            return (
              <Select.Item label={t(item.name)} value={item.name} key={index} />
            );
          })}
        </Select>
      </View>

      {error && (
        <Text style={{ marginTop: 7, color: COLORS.red, fontSize: 12 }}>
          {error}
        </Text>
      )}
    </View>
  );
};

const style = StyleSheet.create({
  inputContainer: {
    backgroundColor: COLORS.lightGrey,
    flexDirection: "row",
    paddingHorizontal: 15,
    justifyContent: "space-between",
    borderRadius: 8,
  },
});
