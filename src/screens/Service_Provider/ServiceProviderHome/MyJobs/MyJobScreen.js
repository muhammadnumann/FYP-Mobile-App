import { StyleSheet, View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import CustomHeader from "../../../../components/CustomHeader";
import { AppHeight, COLORS } from "../../../../utils";
import { FlatList } from "react-native";
import CustomJobCard from "../../../../components/Cards/CustomJobCard";
import CustomLoading from "../../../../components/Loading/CustomLoading";
import { useDispatch, useSelector } from "react-redux";
import { getInProgressJobs } from "../../../../store/serviceprovider/SpAction";
import { useTranslation } from "react-i18next";

const MyJobScreen = ({ navigation }) => {
  const myJobs = useSelector((state) => state.SpReducer.inProgressJobs);
  const loadJobs = useSelector((state) => state.SpReducer.loadJobs);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    // dispatch(getInProgressJobs());
  }, []);

  const onPressNotification = () => {
    navigation.navigate("SpNotifications");
  };

  if (loadJobs) {
    return (
      <CustomLoading
        content={t("loading") + " " + t("My Jobs") + "..."}
        top={null}
      />
    );
  }

  return (
    <View style={{ backgroundColor: COLORS.white, height: AppHeight(105) }}>
      <CustomHeader
        title={t("My Jobs")}
        back
        icon
        navigation={navigation}
        onPressNotification={onPressNotification}
      />
      {myJobs?.length === 0 ? (
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ color: COLORS.grey }}>{t("myjob_placeholder")}</Text>
        </View>
      ) : (
        <FlatList
          data={myJobs}
          style={{ bottom: AppHeight(13), marginTop: AppHeight(13) }}
          renderItem={({ item, index }) => (
            <CustomJobCard
              data={item}
              index={index}
              footer={false}
              btnName={t("direction_btn")}
              onButtonPress={() =>
                navigation.navigate("JobDirection", { data: item })
              }
              myJobs={true}
              navigation={navigation}
            />
          )}
          keyExtractor={(item) => item.id}
        />
      )}
    </View>
  );
};

export default MyJobScreen;

const styles = StyleSheet.create({});
