import React, { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  StyleSheet,
  View,
  Platform,
  TouchableOpacity,
  Image,
} from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_MAP_KEY } from "../../../../utils/googleMapKey";
import { useSelector } from "react-redux";
import {
  AppHeight,
  AppWidth,
  ScreenHeight,
  ScreenWidth,
} from "../../../../utils";
import CustomButton from "../../../../components/CustomButton";
import { useTranslation } from "react-i18next";
import { CustomIcon } from "../../../../components/CustomIcon";
import { getCurrentLocation } from "../../../../utils/helperFunction";

export default function AddBookingAddress({ route, navigation }) {
  const {
    ProfileInfo,
    serviceId,
    selectedCheckboxes,
    total_amount,
    reason,
    other,
  } = route.params;

  const mapRef = useRef(null);
  const user = useSelector((state) => state.AuthReducer.user);
  const locationCords = useSelector(
    (state) => state.NotificationReducer.currentLocationCords
  );

  const [country, setCountry] = useState("sa");
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [region, setRegion] = useState({
    latitude: 23.8859,
    longitude: 45.0792,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const { t } = useTranslation();

  const [markerCoordinate, setMarkerCoordinate] = useState(null);
  const [fixedMarkerCoordinate, setFixedMarkerCoordinate] = useState(null);

  useEffect(() => {
    if (locationCords !== undefined) {
      if (user?.countryName === "Pakistan") {
        setCountry("pk");
        setRegion({
          latitude: locationCords?.latitude,
          longitude: locationCords?.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });
        setMarkerCoordinate({
          latitude: locationCords?.latitude,
          longitude: locationCords?.longitude,
        });
      } else {
        setCountry("sa");
        setRegion({
          latitude: locationCords?.latitude,
          longitude: locationCords?.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });
        setMarkerCoordinate({
          latitude: locationCords?.latitude,
          longitude: locationCords?.longitude,
        });
      }

      setFixedMarkerCoordinate({
        latitude: locationCords?.latitude,
        longitude: locationCords?.longitude,
      });
    }
  }, [user]);

  React.useEffect(() => {
    navigation.getParent()?.setOptions({
      tabBarStyle: {
        display: "none",
      },
    });
    return () =>
      navigation.getParent()?.setOptions({
        tabBarStyle: {
          height: Platform.OS === "ios" ? 80 : 60,
        },
      });
  }, [navigation]);

  const onPlaceSelected = (data, details = null) => {
    setRegion({
      latitude: details.geometry.location.lat,
      longitude: details.geometry.location.lng,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });
    setSelectedLocation({
      latitude: details.geometry.location.lat,
      longitude: details.geometry.location.lng,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });
    setMarkerCoordinate({
      latitude: details.geometry.location.lat,
      longitude: details.geometry.location.lng,
    });
  };

  const handleMapPress = (event) => {
    const { coordinate } = event.nativeEvent;
    setMarkerCoordinate({
      latitude: coordinate.latitude,
      longitude: coordinate.longitude,
    });
    setSelectedLocation({
      latitude: coordinate.latitude,
      longitude: coordinate.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });
  };

  const handleRegionChangeComplete = (region) => {
    const { latitude, longitude } = region;
    setMarkerCoordinate({ latitude, longitude });
    setRegion(region);
  };

  const handleMapReady = () => {
    mapRef.current
      .getCamera()
      .then((camera) => {
        // Calculate the center coordinates of the map
        const { center } = camera;
        setRegion({
          latitude: center.latitude,
          longitude: center.longitude,
          latitudeDelta: region.latitudeDelta,
          longitudeDelta: region.longitudeDelta,
        });
      })
      .catch((error) => console.log(error));
  };

  return (
    <View style={{ flex: 1 }}>




    </View>
  );
}
