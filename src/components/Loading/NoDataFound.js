import { View, Text } from "react-native";
import { COLORS } from "../../utils";

export default function NoDataFound({ content, top }) {
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
      <Text style={{ marginTop: 3 }}>{content}</Text>
    </View>
  );
}
