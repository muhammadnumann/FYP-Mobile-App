import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  AppFontSize,
  AppHeight,
  AppWidth,
  COLORS,
  truncateString,
  urlFormat,
} from "../utils";
import { CustomIcon } from "./CustomIcon";
// import Icon from "@expo/vector-icons/FontAwesome";

// import { theme } from "../../theme";

const ChatHeader = ({
  username,
  bio,
  picture,
  onlineStatus,
  onPress,
  booking,
}) => {
  const navigation = useNavigation();
  let profileImage = urlFormat(picture);

  return (
    <View style={[styles.container, { paddingBottom: booking ? null : 10 }]}>
      <TouchableOpacity
        // style={{ justifyContent: "center" }}
        onPress={() => navigation.goBack()}
        style={styles.backButton}
      >
        <CustomIcon name={"backArrowWhite"} />
      </TouchableOpacity>

      <View style={styles.profileOptions}>
        <TouchableOpacity style={styles.profile}>
          <Image
            style={styles.image}
            source={{ uri: profileImage && profileImage }}
          />
          <View style={styles.usernameAndOnlineStatus}>
            <Text style={styles.username}>{truncateString(username, 15)}</Text>
            <Text style={styles.onlineStatus}>{onlineStatus}</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.options}>
          {booking ? (
            <TouchableOpacity style={styles.button} onPress={onPress}>
              <Text
                style={{
                  color: COLORS.primary,
                  fontWeight: "bold",
                  fontSize: AppFontSize(1.3),
                }}
              >
                Book Now
              </Text>
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: COLORS.primary,
    paddingTop: Platform.OS === "ios" ? 40 : 10,
    paddingHorizontal: 10,
  },
  backButton: {
    alignSelf: "center",
    paddingHorizontal: 10,
  },
  profileOptions: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  profile: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#fff",
    flex: 4,
  },
  image: {
    height: 50,
    width: 50,
    borderRadius: 32.5,
  },
  usernameAndOnlineStatus: {
    flexDirection: "column",
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  username: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: "bold",
  },
  onlineStatus: {
    color: COLORS.white,
    fontSize: 16,
  },
  options: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  button: {
    height: AppHeight(4.5),
    width: AppWidth(25),
    backgroundColor: COLORS.white,
    marginVertical: 20,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
});

export default ChatHeader;
