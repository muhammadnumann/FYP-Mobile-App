import React, { useRef, useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import CustomHeader from '../../components/CustomHeader';

const CheckoutScreen = ({ navigation }) => {
  const webViewRef = useRef(null);
  const [URL, setURL] = useState('');

  // Function to pass parameters to the WebView
  const passParamsToWebView = () => {
    const params = {
      amount: 5,
      currency: 'SAR',
      description: 'Coffee Order #1',
    };

    webViewRef.current?.injectJavaScript(
      `Moyasar.init(${JSON.stringify(params)});`
    );
  };

  useEffect(() => {
    const params = {
      amount: 5,
      currency: 'SAR',
      description: 'Coffee Order #1',
    };

    const queryString = Object.keys(params)
      .map(
        (key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
      )
      .join('&');

    const url = `https://defy.w3spaces.com/?${queryString}`;
    setURL(url);
    //   Linking.openURL(url);
  }, []);

  const handleNavigationStateChange = (event) => {
    // Check if the URL matches the callback URL
    // if (event.url === 'https://example.com/callback') {
    //   // Handle the callback URL here
    //   // You can extract any data from the URL and perform necessary actions
    //   console.log('Callback URL:', event.url);
    // }

    console.log('Callback URL:', event.url);
  };

  return (
    <View style={styles.container}>
      <CustomHeader title='Payment' />
      <WebView
        ref={webViewRef}
        source={{ uri: URL }}
        // source={require("./checkout.html")}
        style={styles.webView}
        // onLoadEnd={passParamsToWebView} // Call the function after WebView is loaded
        onNavigationStateChange={handleNavigationStateChange}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webView: {
    flex: 1,
  },
});

export default CheckoutScreen;
