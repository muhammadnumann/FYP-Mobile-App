import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useState } from "react";

import DateTimePickerModal from "react-native-modal-datetime-picker";
import { COLORS, formatDate } from "../utils";
import { CustomIcon } from "./CustomIcon";
import moment from "moment";

const DatePicker = ({
  placeholder,
  IconName,
  error,
  name,
  value,
  handleOnchange,
}) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const startingDate = new Date("1998-01-01");

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    // console.warn("A date has been picked: ", formatDate(date));
    handleOnchange(date, name);
    hideDatePicker();
  };

  const originalDateStr = value;
  const originalFormat = "M/D/YYYY h:mm:ss A";
  const newFormat = "YYYY-MM-DD";

  const originalDate = moment(originalDateStr, originalFormat);
  const newDateStr = originalDate.format(newFormat);

  return (
    <View>
      <TouchableOpacity style={styles.container} onPress={showDatePicker}>
        <View style={{ flexDirection: "row" }}>
          {<CustomIcon name={IconName} />}
          <Text
            style={{ fontWeight: "400", color: COLORS.grey, paddingLeft: 15 }}
          >
            {value == "" ? (
              placeholder
            ) : (
              <Text style={{ color: COLORS.primary }}>
                {value ? newDateStr : null}
              </Text>
            )}
          </Text>
        </View>
      </TouchableOpacity>

      {error && (
        <Text style={{ marginTop: 7, color: COLORS.red, fontSize: 12 }}>
          {error}
        </Text>
      )}

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        date={startingDate}
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </View>
  );
};

export default DatePicker;

const styles = StyleSheet.create({
  container: {
    height: 55,
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
    width: "100%",
    alignSelf: "center",
    height: 40,
    justifyContent: "center",
    backgroundColor: COLORS.lightGrey,
    paddingLeft: 20,
  },
});
