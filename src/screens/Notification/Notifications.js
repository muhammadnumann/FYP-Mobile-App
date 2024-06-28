import { StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import { COLORS, sampleListData, ScreenHeight } from "../../utils";
import CustomHeader from "../../components/CustomHeader";
import {
  Box,
  FlatList,
  HStack,
  VStack,
  Text,
  Spacer,
  Image,
} from "native-base";
import { useTranslation } from "react-i18next";

const Seprator = () => {
  return (
    <View
      style={{
        flexDirection: "row",
        paddingHorizontal: 15,
        paddingVertical: 15,
      }}
    >
      <View
        style={{
          backgroundColor: COLORS.lightGrey,
          height: 2,
          flex: 1,
          alignSelf: "center",
        }}
      />
      <Text style={{ alignSelf: "center", paddingHorizontal: 5 }}>Today</Text>
      <View
        style={{
          backgroundColor: COLORS.lightGrey,
          height: 2,
          flex: 1,
          alignSelf: "center",
        }}
      />
    </View>
  );
};

const Notifications = ({ navigation }) => {
  const { t } = useTranslation();
  return (
    <View>
      <CustomHeader title={t("notification")} back navigation={navigation} />
      {/* <Text>Today</Text> */}
      <View
        style={{
          backgroundColor: "white",
          height: ScreenHeight,
        }}
      >
        {Seprator()}
        <Box>
          <FlatList
            data={sampleListData}
            style={{ paddingHorizontal: 15 }}
            renderItem={({ item }) => (
              <Box
                style={{
                  borderWidth: 3,
                  padding: 10,
                  marginTop: 10,
                  borderRadius: 12,
                  borderColor: COLORS.lightGrey,
                }}
                py="2"
              >
                <TouchableOpacity                >
                  <HStack space={3} justifyContent="space-between">
                    <Image
                      size={"sm"}
                      resizeMode="cover"
                      alt="fallback text"
                      borderRadius={12}
                      source={{
                        uri: item.avatarUrl,
                      }}
                    />
                    <VStack>
                      <Text
                        _dark={{
                          color: "warmGray.50",
                        }}
                        color="coolGray.800"
                        bold
                      >
                        {item.fullName}
                      </Text>
                      <Text
                        color="coolGray.600"
                        _dark={{
                          color: "warmGray.200",
                        }}
                      >
                        {item.recentText}
                      </Text>
                    </VStack>
                    <Spacer />
                  </HStack>
                </TouchableOpacity>
              </Box>
            )}
            keyExtractor={(item) => item.id}
          />
        </Box>
      </View>
    </View>
  );
};

export default Notifications;

const styles = StyleSheet.create({});
