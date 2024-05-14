import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export async function getRequest(url) {
  console.log(url);

  try {
    let res = await axios.get(url);
    return res.data;
  } catch (error) {

    if (error.response) {
      console.log(error.response.data);

      // return (
      //   error.response.data.detail ||
      //   error.response.data.error ||
      //   error.response.data.message
      // );
    } else if (error.request) {
      console.log('Network Error');
    } else {
      console.log(error.message);
    }

    // console.log("Testing by usman",e)
    // console.log("Testing by usman",e.response)
    // throw handler(e);
  }
}

export async function getBearerRequest(url) {
  console.log(url);

  try {
    let token = await AsyncStorage.getItem("token");
    const options = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: token,
      },
    };

    let res = await axios.get(url, options);
    return res.data;
  } catch (e) {
    console.log("error", e);
    throw handler(e);
  }
}

export async function getBearerParamsRequest(url, params) {
  console.log(url);

  try {
    let token = await AsyncStorage.getItem("token");
    const options = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: token,
      },
      params: params,
    };

    let res = await axios.get(url, options);
    return res.data;
  } catch (e) {
    console.log("rerte", e);
    throw handler(e);
  }
}

export async function postRequest(url, data) {
  console.log(url);

  try {
    console.log(data);
    let res = await axios.post(url, data);
    return res.data;
  } catch (e) {
    console.log(e);

    throw handler(e);
  }
}

export async function postBearerRequest(url, data) {
  console.log(url);

  try {
    let token = await AsyncStorage.getItem("token");
    const options = {
      headers: {
        Authorization: token,
      },
    };
    let res = await axios.post(url, data, options);
    return res;
  } catch (e) {
    throw handler(e);
  }
}

export async function deleteRequest(url) {
  console.log(url);

  try {
    let token = await AsyncStorage.getItem("token");
    const options = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: token,
      },
    };
    let res = await axios.delete(url, options);
    return res.data;
  } catch (e) {
    throw handler(e);
  }
}

export async function postFormDataRequest(url, data) {
  console.log(url);

  try {
    let token = await AsyncStorage.getItem("token");
    const options = {
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
        Authorization: token,
      },
    };

    let res = await axios.post(`${url}`, data, options);
    return res.data;
  } catch (e) {
    throw handler(e);
  }
}

export async function putFormDataRequest(url, data) {
  console.log(url);

  try {
    let token = await AsyncStorage.getItem("token");
    const options = {
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
        Authorization: token,
      },
    };

    const form_data = new FormData();
    for (let key in data) form_data.append(key, data[key]);

    let res = await axios.put(`${url}`, form_data, options);
    return res.data;
  } catch (e) {
    throw handler(e);
  }
}

export function handler(err) {
  let error = err;
  if (err.response && err.response.data.hasOwnProperty("Message"))
    error = err.response.data;
  else if (!err.hasOwnProperty("Message")) error = err.toJSON();
  return error.Message;
}

function ApiErrorType(error) {
  if (error.response) {
    console.log(error.response.data);

    return (
      error.response.data.detail ||
      error.response.data.error ||
      error.response.data.message
    );
  } else if (error.request) {
    return 'Network Error';
  } else {
    return error.message;
  }
}