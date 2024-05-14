import React from "react";
import {
  Box,
  FlatList,
  HStack,
  VStack,
  Text,
  Spacer,
  Image,
} from "native-base";
import { TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import { COLORS } from "../../utils";
import { Rating } from "react-native-ratings";

const SpCustomList = ({ navigation, data, time }) => {
  const user = useSelector((state) => state.AuthReducer.user);

  const onPressList = (item) => {
    navigation.navigate("AgentProfileScreen", {
      ProfileInfo: item,
      serviceProviderId: item.serviceProviderId,
      bookingId: item.bookingId,
      action: item.action,
      // serviceId: serviceId,
    });
  };
  return (
    <Box>
      <FlatList
        data={data}
        style={{ paddingHorizontal: 15 }}
        renderItem={({ item, index }) => {
          return (
            <Box
              borderBottomWidth="0.4"
              borderColor={COLORS.grey}
              py="2"
              key={index}
            >
              <TouchableOpacity onPress={() => onPressList(item)}>
                <HStack space={3} justifyContent="space-between">
                  <Image
                    size={"sm"}
                    resizeMode="cover"
                    alt="fallback text"
                    borderRadius={12}
                    source={{
                      uri:
                        user?.uploadFileWebUrl + item?.serviceProviderImageUrl,
                    }}
                  />
                  <VStack>
                    <Text style={{ color: COLORS.black, fontWeight: "bold" }}>
                      {item.serviceProviderName}
                    </Text>

                    <Rating
                      imageSize={15}
                      readonly
                      startingValue={item?.serviceProviderRating}
                      style={{ marginTop: 10 }}
                    />
                  </VStack>
                  <Spacer />

                  {/* {time ? (
                  <Text style={{ color: COLORS.grey, fontSize: 12 }}>
                    {item.timeStamp}
                  </Text>
                ) : (
                  <CustomBorderButton
                    title="Available"
                    width="20%"
                    height={25}
                    fontSize={10}
                    top={1}
                  />
                )} */}
                </HStack>
              </TouchableOpacity>
            </Box>
          );
        }}
        keyExtractor={(item) => item.id}
      />
    </Box>
  );
};

export default SpCustomList;
