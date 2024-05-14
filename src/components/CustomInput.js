import React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { AppHeight, COLORS } from "../utils";
import { CustomIcon } from "./CustomIcon";
const CustomInput = ({
  label,
  IconName,
  error,
  password,
  readOnly,
  onFocus = () => {},
  ...props
}) => {
  const [hidePassword, setHidePassword] = React.useState(password);
  const [isFocused, setIsFocused] = React.useState(false);
  return (
    <View>
      <Text style={style.label}>{label}</Text>
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
        <CustomIcon name={IconName} />
        <TextInput
          autoCorrect={false}
          onFocus={() => {
            onFocus();
            setIsFocused(true);
          }}
          onBlur={() => setIsFocused(false)}
          secureTextEntry={hidePassword}
          style={{
            color: COLORS.black,
            flex: 1,
            paddingLeft: 15,
          }}
          placeholderTextColor={COLORS.grey}
          {...props}
          editable={readOnly ? false : true}
        />
        {password && (
          <TouchableOpacity onPress={() => setHidePassword(!hidePassword)}>
            <CustomIcon name={hidePassword ? "showPassword" : "showPassword"} />
          </TouchableOpacity>
        )}
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
    // marginVertical: 5,
    fontSize: 14,
    color: COLORS.grey,
  },
  inputContainer: {
    height: AppHeight(7),
    backgroundColor: COLORS.lightGrey,
    flexDirection: "row",
    paddingHorizontal: 15,
    borderRadius: 8,
  },
});

export default CustomInput;
