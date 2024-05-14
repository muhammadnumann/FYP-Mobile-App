import * as React from "react";
import { Animated, Pressable, TouchableOpacity } from "react-native";
import { SceneMap, TabView } from "react-native-tab-view";
import { Box } from "native-base";
import { COLORS, ScreenWidth } from "../../../utils";
import AgentDescription from "./AgentDescription";
import AgentReviews from "./AgentReviews";

export default AgentTabs = ({ navigation, ProfileInfo }) => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {
      key: "first",
      title: "Reviews",
      data: ProfileInfo && ProfileInfo,
    },
    // {
    //   key: "second",
    //   title: "Description",
    // },
  ]);

  const RenderScene = SceneMap({
    first: AgentReviews,
    // second: AgentDescription,
  });

  React.useEffect(() => {
    console.log("Agent Tabs: ", ProfileInfo);
  }, []);

  const renderTabBar = (props) => {
    return (
      <Box flexDirection="row">
        {props.navigationState.routes.map((route, i) => {
          const color = index === i ? COLORS.primary : COLORS.black;
          const borderColor = index === i ? COLORS.primary : COLORS.lightGrey;
          return (
            <Box
              borderBottomWidth="3"
              borderColor={borderColor}
              flex={1}
              alignItems="center"
              p="3"
              cursor="pointer"
              key={i}
            >
              <TouchableOpacity
                onPress={() => {
                  setIndex(i);
                }}
              >
                <Animated.Text
                  style={{
                    color,
                    fontWeight: index === i ? "bold" : 400,
                  }}
                >
                  {route.title}
                </Animated.Text>
              </TouchableOpacity>
            </Box>
          );
        })}
      </Box>
    );
  };

  return (
    <TabView
      navigationState={{
        index,
        routes,
      }}
      renderScene={(props) => <RenderScene {...props} />}
      renderTabBar={renderTabBar}
      onIndexChange={setIndex}
      initialLayout={ScreenWidth}
    />
  );
};
