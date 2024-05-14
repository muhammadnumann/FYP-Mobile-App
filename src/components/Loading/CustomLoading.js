import { Spinner } from "native-base";
import React, { useEffect } from "react";
import { View, Text } from "react-native";
import { COLORS } from "../../utils";

export default function CustomLoading({ content, top }) {
  return (
    <View
      style={{
        backgroundColor: COLORS.white,
        alignItems: "center",
        justifyContent: "center",
        flex: top ? null : 1,
        marginTop: top ? top : null,
      }}
    >
      <Spinner color={COLORS.primary} size={"lg"} />
      <Text style={{ marginTop: 3 }}>{content ? content : null}</Text>
    </View>
  );
}
