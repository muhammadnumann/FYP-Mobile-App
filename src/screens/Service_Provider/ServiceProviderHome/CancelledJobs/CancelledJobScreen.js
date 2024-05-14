import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import CustomHeader from "../../../../components/CustomHeader";
import { FlatList } from "react-native";
import { AppHeight, COLORS } from "../../../../utils";
import CustomJobCard from "../../../../components/Cards/CustomJobCard";
import CustomLoading from "../../../../components/Loading/CustomLoading";
import { useDispatch, useSelector } from "react-redux";
import { getCancelJobs } from "../../../../store/serviceprovider/SpAction";
import { useTranslation } from "react-i18next";

const CancelledJobScreen = ({ navigation }) => {
  const cancelJobs = useSelector((state) => state.SpReducer.cancelledJobs);
  const loadJobs = useSelector((state) => state.SpReducer.loadJobs);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(getCancelJobs());
  }, []);

  const onPressNotification = () => {
    navigation.navigate("SpNotifications");
  };

  if (loadJobs) {
    return (
      <CustomLoading
        content={t("loading") + t("Cancelled Jobs") + "..."}
        top={null}
      />
    );
  }

  return (
    <View style={{ backgroundColor: COLORS.white, height: AppHeight(100) }}>
      <CustomHeader
        title={t("Cancelled Jobs")}
        back
        icon
        navigation={navigation}
        onPressNotification={onPressNotification}
      />
      {cancelJobs === null ? (
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ color: COLORS.grey }}>
            {t("canceljob_placeholder")}
          </Text>
        </View>
      ) : (
        <FlatList
          data={cancelJobs}
          style={{ bottom: AppHeight(13), marginTop: AppHeight(13) }}
          renderItem={({ item, index }) => (
            <CustomJobCard data={item} index={index} />
          )}
          keyExtractor={(item) => item.id}
        />
      )}
    </View>
  );
};

export default CancelledJobScreen;

const styles = StyleSheet.create({});
