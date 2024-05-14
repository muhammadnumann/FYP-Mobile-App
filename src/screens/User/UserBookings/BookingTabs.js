import * as React from 'react';
import { Animated, TouchableOpacity } from 'react-native';
import { SceneMap, TabView } from 'react-native-tab-view';
import { Box } from 'native-base';
import { COLORS, ScreenWidth } from '../../../utils';
import CompleteBooking from './CompleteBooking';
import CancelBooking from './CancelBooking';
import ActiveBooking from './ActiveBooking';
import { getBookings } from '../../../services/SameApiServices';
import { useTranslation } from 'react-i18next';
import NewBooking from './NewBooking';

export default BookingTabs = ({
  navigation,
  ProfileInfo,
  onCancel,
  indexNumber,
}) => {
  const [index, setIndex] = React.useState(indexNumber);
  // const { isLoading, data: activeBookings, isError, error } = getBookings();
  const { t } = useTranslation();
  const [routes] = React.useState([
    {
      key: 'first',
      title: 'New',
      data: ProfileInfo,
      navigation: navigation,
      onCancel: onCancel,
    },
    {
      key: 'second',
      title: 'In Progress',
      data: ProfileInfo,
      navigation: navigation,
    },
    {
      key: 'third',
      title: 'Completed',
      data: ProfileInfo,
      navigation: navigation,
    },
    {
      key: 'fourth',
      title: 'Cancelled',
      data: ProfileInfo,
      navigation: navigation,
    },
  ]);

  const renderScene = SceneMap({
    first: NewBooking,
    second: ActiveBooking,
    third: CompleteBooking,
    fourth: CancelBooking,
  });

  React.useEffect(() => {
    setIndex(indexNumber);
  }, [indexNumber]);

  const renderTabBar = (props) => {
    return (
      <Box flexDirection='row'>
        {props.navigationState.routes.map((route, i) => {
          const color = index === i ? COLORS.primary : COLORS.black;
          const borderColor = index === i ? COLORS.primary : COLORS.lightGrey;
          return (
            <TouchableOpacity
              onPress={() => {
                setIndex(i);
              }}
              style={{
                borderBottomWidth: 3,
                borderColor: borderColor,
                flex: 1,
                alignItems: 'center',
                padding: 13,
                cursor: 'pointer',
              }}
              key={i}
            >
              <Animated.Text
                style={{
                  color,
                  fontWeight: index === i ? 'bold' : 400,
                  fontSize: 12,
                }}
              >
                {t(route.title)}
              </Animated.Text>
            </TouchableOpacity>
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
      renderScene={renderScene}
      renderTabBar={renderTabBar}
      onIndexChange={setIndex}
      initialLayout={ScreenWidth}
    />
  );
};
