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
import MapView, { Marker } from "react-native-maps";
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
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={selectedLocation || region}
        region={selectedLocation ? selectedLocation : null}
        onPress={handleMapPress}
        provider="google"
        onMapReady={handleMapReady}
        onRegionChangeComplete={handleRegionChangeComplete}
      >
        {/* {markerCoordinate && (
          <Marker
            // coordinate={markerCoordinate}
            // anchor={{ x: 0.5, y: 0.5 }}
            coordinate={region}

            // draggable
            // onDragEnd={(e) => setMarkerCoordinate(e.nativeEvent.coordinate)}
          />
        )} */}
      </MapView>

      <View
        style={[
          styles.marker,
          { alignSelf: "center", marginTop: AppHeight(40) },
        ]}
      >
        {fixedMarkerCoordinate && (
          <Marker
            coordinate={markerCoordinate}
            anchor={{ x: 0.5, y: 0.5 }}
            draggable
            onDragEnd={(e) =>
              setFixedMarkerCoordinate(e.nativeEvent.coordinate)
            }
          >
            <Image
              source={{
                //  uri: data.avatarUrl
                uri: "https://cdn4.iconfinder.com/data/icons/symbol-blue-set-1/100/Untitled-2-09-512.png",
              }}
              style={{ height: 50, width: 50 }}
            />
          </Marker>
        )}
      </View>

      <View
        style={{
          bottom: AppHeight(95),
          width: AppWidth(90),
          flexDirection: "row",
          alignSelf: "center",
        }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: "white",
            padding: 7,
            height: 44,
            borderRadius: 5,
            margin: 5,
            marginTop: 20,
          }}
          onPress={() => navigation.goBack()}
        >
          <CustomIcon name={"backArrowBlack"} color={"black"} />
        </TouchableOpacity>

        <GooglePlacesAutocomplete
          placeholder={t("serch_add_input")}
          fetchDetails={true}
          GooglePlacesSearchQuery={{
            rankby: "distance",
          }}
          onPress={onPlaceSelected}
          query={{
            key: GOOGLE_MAP_KEY,
            language: "en",
            components: `country:${country}`,
            types: "establishment",
            radius: 30000,
            placeholderTextColor: "black",
          }}
          styles={{
            container: {
              width: "70%",
              color: "black",
              alignSelf: "center",
              marginTop: 20,
              borderRadius: 15,
            },
            listView: { backgroundColor: "white", color: "black" },
            textInput: {
              color: "black",
            },
          }}
        />
      </View>

      <View
        style={{
          position: "absolute",
          bottom: Platform.OS === "ios" ? AppHeight(5) : AppHeight(5),
          width: AppWidth(90),
          alignSelf: "center",
        }}
      >
        <CustomButton
          title={t("select_address")}
          onPress={() =>
            // navigation.navigate("ScheduleBooking", { ProfileInfo, serviceId })
            navigation.navigate("ScheduleBooking", {
              ProfileInfo,
              serviceId,
              latitude: region.latitude,
              longitude: region.longitude,
              selectedCheckboxes,
              total_amount,
              reason,
              other,
            })
          }
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },

  viewBtn: {
    position: "absolute",
    bottom: 0,
    height: ScreenHeight * 0.1,
    width: ScreenWidth * 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 15,
  },

  marker: {
    position: "absolute",
    zIndex: 9999,
    // Set the desired styles for the fixed marker
    width: 50,
    height: 50,
    // backgroundColor: "red",
  },
});
