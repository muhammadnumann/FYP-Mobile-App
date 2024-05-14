import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import CustomJobCard from "../../../components/Cards/CustomJobCard";
import CustomDivider from "../../../components/Divider/CustomDivider";
import { AppHeight, COLORS, sampleListData } from "../../../utils";
import { useSelector } from "react-redux";
import CustomLoading from "../../../components/Loading/CustomLoading";
import CustomHeader from "../../../components/CustomHeader";
import { useTranslation } from "react-i18next";

const ProfileCompletedJob = ({ navigation }) => {
  const completeJobs = useSelector((state) => state.SpReducer.completedJobs);
  const loadJobs = useSelector((state) => state.SpReducer.loadJobs);
  const { t } = useTranslation();

  const totalJobs = () => {
    var complete;

    if (completeJobs !== null) {
      complete = completeJobs.length;
    } else {
      complete = 0;
    }

    return complete;
  };

  if (loadJobs) {
    return (
      <CustomLoading
        content={t("loading") + t("Completed Jobs") + "..."}
        top={null}
      />
    );
  }

  const onPressNotification = () => {
    navigation.navigate("SpNotifications");
  };

  return (
    <View style={{ backgroundColor: "white", height: AppHeight(100) }}>
      <CustomHeader
        title={t("Completed Jobs")}
        back
        icon
        navigation={navigation}
        onPressNotification={onPressNotification}
      />
      {/* <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingHorizontal: 15,
          paddingVertical: 10,
        }}
      >
        <Text>Total Completed Jobs </Text>
        <Text style={{ fontWeight: "bold" }}>{totalJobs()}</Text>
      </View>
      <View style={{ paddingHorizontal: 15 }}>
        <CustomDivider />
      </View> */}

      {completeJobs === null ? (
        <View
          style={{
            marginTop: AppHeight(30),
          }}
        >
          <Text style={{ color: COLORS.grey, textAlign: "center" }}>
            {t("complete_job_placeholder")}
          </Text>
        </View>
      ) : (
        <FlatList
          data={completeJobs}
          style={{ bottom: AppHeight(13), marginTop: AppHeight(13) }}
          renderItem={({ item, index }) => (
            <CustomJobCard
              data={item}
              navigation={navigation}
              index={index}
              status={"completed"}
              bookingId={item.id}
            />
          )}
          keyExtractor={(item) => item.id}
        />
      )}
    </View>
  );
};

export default ProfileCompletedJob;

const styles = StyleSheet.create({});
