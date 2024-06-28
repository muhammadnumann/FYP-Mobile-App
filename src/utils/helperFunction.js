const GOOGLE_MAP_KEY = "AIzaSyCEBti2rubbjuMWzEJ_WNJbaMyU0YoYQQs";
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
