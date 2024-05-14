import React from "react";
import { FlatList, Text, View } from "react-native";
import CustomJobCard from "../../../components/Cards/CustomJobCard";
import CustomDivider from "../../../components/Divider/CustomDivider";
import { AppHeight, COLORS, sampleListData } from "../../../utils";
import { useSelector } from "react-redux";
import CustomLoading from "../../../components/Loading/CustomLoading";

const ProfileRejectedJob = ({ navigation }) => {
  const cancelledJobs = useSelector((state) => state.SpReducer.cancelledJobs);
  const loadJobs = useSelector((state) => state.SpReducer.loadJobs);

  const totalJobs = () => {
    var complete;

    if (cancelledJobs !== null) {
      complete = cancelledJobs.length;
    } else {
      complete = 0;
    }

    return complete;
  };

  if (loadJobs) {
    return <CustomLoading content={"Loading cancelled jobs...."} top={null} />;
  }

  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingHorizontal: 15,
          paddingVertical: 10,
        }}
      >
        <Text>Total Rejected Jobs </Text>
        <Text style={{ fontWeight: "bold" }}>{totalJobs()}</Text>
      </View>
      <View style={{ paddingHorizontal: 15 }}>
        <CustomDivider />
      </View>

      {cancelledJobs === null ? (
        <View
          style={{
            marginTop: AppHeight(30),
          }}
        >
          <Text style={{ color: COLORS.grey, textAlign: "center" }}>
            Whoops , there is no rejected job...
          </Text>
        </View>
      ) : (
        <FlatList
          data={cancelledJobs}
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

export default ProfileRejectedJob;
