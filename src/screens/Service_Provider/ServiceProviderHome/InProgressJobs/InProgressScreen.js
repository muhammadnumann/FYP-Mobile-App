import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import CustomHeader from "../../../../components/CustomHeader";
import { AppHeight, COLORS } from "../../../../utils";
import { FlatList } from "react-native";
import CustomJobCard from "../../../../components/Cards/CustomJobCard";
import CustomLoading from "../../../../components/Loading/CustomLoading";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

const InProgressScreen = ({ navigation }) => {
  const inProgressJobs = useSelector((state) => state.SpReducer.inProgressJobs);
  const loadJobs = useSelector((state) => state.SpReducer.loadJobs);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  useEffect(() => {
  }, []);

  const onPressNotification = () => {

  };

  const onPressGenerateBill = async (item) => {
    dispatch({ type: "FEEDBACK_DATA", payload: item });
  };

  if (loadJobs) {
    return (
      <CustomLoading content={"Loading in progress jobs...."} top={null} />
    );
  }

  return (
    <View style={{ backgroundColor: COLORS.white, height: AppHeight(100) }}>
      <CustomHeader
        title="In Progress Jobs"
        back
        icon
        navigation={navigation}
        onPressNotification={onPressNotification}
      />
      {inProgressJobs?.length === 0 ? (
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ color: COLORS.grey }}>
            Whoops , there is no in progress job...
          </Text>
        </View>
      ) : (
        <FlatList
          data={inProgressJobs}
          style={{ bottom: AppHeight(13), marginTop: AppHeight(13) }}
          renderItem={({ item, index }) => (
            <CustomJobCard
              data={item}
              index={index}
              footer={true}
              btnName={"Generate Bill"}
              onButtonPress={() =>
                // navigation.navigate("ServiceReceipts", { data: item })
                onPressGenerateBill(item)
              }
            />
          )}
          keyExtractor={(item) => item.id}
        />
      )}
    </View>
  );
};

export default InProgressScreen;

const styles = StyleSheet.create({});
