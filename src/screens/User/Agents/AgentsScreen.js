import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import CustomHeader from "../../../components/CustomHeader";
import CustomList from "../../../components/CustomList";
import { AppHeight, COLORS, ScreenHeight } from "../../../utils";
import { useQuery } from "react-query";
import CustomLoading from "../../../components/Loading/CustomLoading";
import NoDataFound from "../../../components/Loading/NoDataFound";
import { GetServiceProvidersById } from "../../../services/UserServices/UserService";

const AgentsScreen = ({ route, navigation }) => {
  const { serviceId } = route.params;
  const { data: response, isLoading } = useQuery(["serviceId", serviceId], () =>
    GetServiceProvidersById(serviceId)
  );

  const onPressList = (item) => {
    navigation.navigate("AgentProfileScreen", {
      ProfileInfo: item,
      serviceId: serviceId,
    });
  };

  const onPressNotification = () => {
    navigation.navigate("UserNotification");
  };

  if (isLoading) {
    return (
      <CustomLoading content={"Loading Service Providers ...."} top={null} />
    );
  } else {
    return (
      <View style={{ backgroundColor: COLORS.white }}>
        <CustomHeader
          title={"Service Providers"}
          navigation={navigation}
          back
          icon
          onPressNotification={onPressNotification}
        />

        <View style={{ height: ScreenHeight }}>
          {response?.length > 0 ? (
            <CustomList
              data={response}
              navigation={navigation}
              onNavigation={onPressList}
            />
          ) : (
            <NoDataFound
              content={"Whoops no Service Provider found :( "}
              top={AppHeight(40)}
            />
          )}
        </View>
      </View>
    );
  }
};

export default AgentsScreen;

const styles = StyleSheet.create({});
