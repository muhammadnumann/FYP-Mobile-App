import * as React from 'react';
import { Platform } from 'react-native';
import { Image, StyleSheet, Text, View } from 'react-native';
import CustomHeader from '../../../../components/CustomHeader';
import { AppHeight, AppWidth, COLORS, urlFormat } from '../../../../utils';
import { GOOGLE_MAP_KEY } from '../../../../utils/googleMapKey';
import {
  getCurrentLocation,
  locationPermission,
} from '../../../../utils/helperFunction';

const ASPECT_RATIO = AppWidth(100) / AppHeight(100);
const LATITUDE_DELTA = 0.04;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const JobDirection = ({ route, navigation }) => {
  const mapRef = React.useRef();
  const markerRef = React.useRef();

  const { data } = route.params;

  const [origin, setOrigin] = React.useState({
    latitude: 31.582045,
    longitude: 74.329376,
  });

  const [destination, setDestination] = React.useState({
    latitude: data.latitude,
    longitude: data.longitude,
  });

  const [distance, setDistance] = React.useState(0);
  const [duration, setDuration] = React.useState(0);

  React.useEffect(() => {
    getLiveLocation();
  }, []);

  React.useEffect(() => {
    navigation.getParent()?.setOptions({
      tabBarStyle: {
        display: 'none',
      },
    });
    return () =>
      navigation.getParent()?.setOptions({
        tabBarStyle: {
          height: Platform.OS === 'ios' ? 80 : 60,
        },
      });
  }, [navigation]);

  const getLiveLocation = async () => {
    const locPermissionDenied = await locationPermission();
    if (locPermissionDenied) {
      const { latitude, longitude, heading } = await getCurrentLocation();

      const current = {
        latitude: latitude,
        longitude: longitude,
      };
      setOrigin(current);
      animate(latitude, longitude);
      mapRef.current.animateToRegion({
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      });
    }
  };

  const animate = (latitude, longitude) => {
    const newCoordinate = { latitude, longitude };
    if (Platform.OS == 'android') {
      if (markerRef.current) {
        markerRef.current.animateMarkerToCoordinate(newCoordinate, 7000);
      }
    } else {
      coordinate.timing(newCoordinate).start();
    }
  };

  const onCenter = () => {
    mapRef.current.animateToRegion({
      latitude: origin.latitude,
      longitude: origin.longitude,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    });
  };

  React.useEffect(() => {
    const interval = setInterval(() => {
      getLiveLocation();
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const fetchTime = (d, t) => {
    setDistance(d);
    setDuration(t);
  };

  return (
    <View>
      <CustomHeader title='Direction on Map' back navigation={navigation} />


    </View>
  );
};

export default JobDirection;
