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
import { COLORS, urlFormat } from "../utils";
import { TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";

const CustomList = ({ onNavigation, data, time }) => {
  const user = useSelector((state) => state.AuthReducer.user);

  return (
    <Box>
      <FlatList
        data={data}
        style={{ paddingHorizontal: 15 }}
        renderItem={({ item }) => {
          var profileImage;
          if (/^data:image\//.test(item?.profileImage)) {
            profileImage = url;
          } else {
            profileImage = user?.uploadFileWebUrl + item?.profileImage;
          }

          return (
            <Box borderBottomWidth="0.4" borderColor={COLORS.grey} py="2">
              <TouchableOpacity onPress={() => onNavigation(item)}>
                <HStack space={3} justifyContent="space-between">
                  <Image
                    size={"sm"}
                    resizeMode="cover"
                    alt="fallback text"
                    borderRadius={12}
                    source={{
                      uri: profileImage && profileImage,
                    }}
                  />
                  <VStack>
                    <Text style={{ color: COLORS.black, fontWeight: "bold" }}>
                      {item.title}
                    </Text>
                    <Text style={{ color: COLORS.grey, fontSize: 12 }}>
                      {item.email}
                    </Text>
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

export default CustomList;
