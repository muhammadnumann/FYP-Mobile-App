import React, { useEffect } from "react";
import {
  Box,
  FlatList,
  HStack,
  VStack,
  Text,
  Spacer,
  Image,
} from "native-base";
import { StyleSheet, View } from "react-native";
import { COLORS, sampleListData, urlFormat } from "../../../utils";
import { TouchableOpacity } from "react-native";
import { Rating } from "react-native-ratings";
import moment from "moment";
import { useSelector } from "react-redux";

const AgentReviews = ({ route }) => {
  const { data } = route;

  const user = useSelector((state) => state.AuthReducer.user);

  const ratingCompleted = (rating) => {
    console.log("Rating is: " + rating);
  };

  useEffect(() => {
    console.log("data in agent reviews: ", data);
  }, []);

  return (
    <View style={{}}>
      <FlatList
        data={data?.reviews}
        style={{ paddingHorizontal: 15 }}
        renderItem={({ item, index }) => (
          <Box
            borderBottomWidth="0.4"
            _dark={{
              borderColor: "muted.50",
            }}
            borderColor={COLORS.grey}
            py="6"
            key={index}
          >
            <TouchableOpacity>
              <HStack space={3} justifyContent="space-between">
                <Image
                  size={"sm"}
                  resizeMode="cover"
                  alt="fallback text"
                  borderRadius={12}
                  source={{
                    uri: user?.uploadFileWebUrl + item?.reviewedByImage,
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
                    {item.reviewedBy}
                  </Text>
                  {/* <Text
                    color={COLORS.primary}
                    _dark={{
                      color: "warmGray.200",
                    }}
                  >
                    {moment(item?.reviewedAt).format("DD-MM-YYYY")}
                  </Text> */}
                  <Rating
                    imageSize={20}
                    readonly
                    startingValue={item?.rating}
                    // onFinishRating={ratingCompleted}
                  />
                </VStack>

                <Spacer />
              </HStack>
              <HStack>
                <Text color={COLORS.grey} style={{ marginTop: 20 }}>
                  {item?.review}
                </Text>
              </HStack>
            </TouchableOpacity>
          </Box>
        )}
        keyExtractor={(item) => item?.id}
      />
    </View>
  );
};

export default AgentReviews;

const styles = StyleSheet.create({});
