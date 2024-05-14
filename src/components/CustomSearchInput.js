import React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { AppHeight, AppWidth, COLORS, fontSize } from "../utils";
import { CustomIcon } from "./CustomIcon";
const CustomSearchInput = ({
  label,
  IconName,
  error,
  password,
  onFocus = () => {},
  ...props
}) => {
  const [hidePassword, setHidePassword] = React.useState(password);
  const [isFocused, setIsFocused] = React.useState(false);
  return (
    <View>
      <View
        style={[
          style.inputContainer,
          {
            borderColor: error
              ? COLORS.red
              : isFocused
              ? COLORS.primary
              : COLORS.light,
            alignItems: "center",
          },
        ]}
      >
        <TextInput
          autoCorrect={false}
          onFocus={() => {
            onFocus();
            setIsFocused(true);
          }}
          onBlur={() => setIsFocused(false)}
          secureTextEntry={hidePassword}
          style={{
            color: COLORS.white,
            flex: 1,
            paddingLeft: 15,
            fontSize: fontSize.mini,
          }}
          placeholderTextColor={COLORS.primaryLight}
          {...props}
        />

        {/* <CustomIcon name={IconName} /> */}
        {/* {password && (
          <TouchableOpacity onPress={() => setHidePassword(!hidePassword)}>
            <CustomIcon name={hidePassword ? "showPassword" : "showPassword"} />
          </TouchableOpacity>
        )} */}
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
  label: {
    fontSize: 14,
    color: COLORS.grey,
  },
  inputContainer: {
    height: AppHeight(7),
    backgroundColor: COLORS.primaryLighter,
    flexDirection: "row",
    paddingHorizontal: 15,
    borderRadius: 8,
    width: AppWidth(90),
    alignSelf: "center",
  },
});

export default CustomSearchInput;
