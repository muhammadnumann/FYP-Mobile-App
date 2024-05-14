// import { showMessage } from "react-native-flash-message";
import { PermissionsAndroid, Platform, Alert } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import { GOOGLE_MAP_KEY } from './googleMapKey';
import { requestTrackingPermission } from 'react-native-tracking-transparency';

export const getCurrentLocation = () =>
  new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
      (position) => {
        const cords = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          heading: position?.coords?.heading,
        };
        console;
        resolve(cords);
      },
      (error) => {
        reject(error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  });

export const locationPermission = () =>
  new Promise(async (resolve, reject) => {
    if (Platform.OS === 'ios') {
      try {
        const permissionStatus = await Geolocation.requestAuthorization(
          'whenInUse'
        );
        if (permissionStatus === 'granted') {
          return resolve('granted');
        }
        reject('Permission not granted');
      } catch (error) {
        return reject(error);
      }
    }
    if (Platform.OS === 'android') {
      return PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      )
        .then((granted) => {
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            resolve('granted');

            getCurrentLocation()
              .then((location) =>
                getCountryCode(location.latitude, location.longitude)
              )
              .catch((error) => console.warn(error));
          } else {
            reject('Location Permission denied');
          }
          // return
        })
        .catch((error) => {
          console.log('Ask Location permission error: ', error);
          return reject(error);
        });
    }
  });

export const requestUserTrackingPermission = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const status = await requestTrackingPermission();
      if (status !== 'authorized') {
        reject('Tracking Permission not granted');
      } else if (status === 'unavailable') {
        reject('Tracking Permission not supported');
      }
      resolve('Tracking Permission granted');
    } catch (error) {
      console.error('Error requesting tracking permission:', error);
      reject('Error requesting tracking permission:', error);
    }
  });
};

const showError = (message) => {
  console.log('message-error', message);
  // showMessage({
  //   message,
  //   type: "danger",
  //   icon: "danger",
  // });
};

const showSuccess = (message) => {
  console.log('message-success', message);
  // showMessage({
  //   message,
  //   type: "success",
  //   icon: "success",
  // });
};

export { showError, showSuccess };

var code;

export const getCountryCode = (latitude, longitude) => {
  fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_MAP_KEY}`
  )
    .then((response) => response.json())
    .then((data) => {
      const result = data.results[0].address_components;
      let countryCode;
      for (let i = 0; i < result.length; i++) {
        if (result[i].types.includes('country')) {
          countryCode = result[i].short_name;
          break;
        }
      }
      code = countryCode;
    })
    .catch((error) => {
      console.warn(error);
    });
};

export const deviceCountryCode = () => {
  return code;
};
