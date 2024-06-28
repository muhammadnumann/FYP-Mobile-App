import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  Image,
  StyleSheet,
  FlatList,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  ImageBackground,
  Platform,
} from 'react-native';
import {
  AppHeight,
  AppWidth,
  COLORS,
  fontSize,
  ScreenWidth,
} from '../../utils';
import { Vector2 } from '../../utils/SvgIcon';
import Header from './Header';
import { slides } from './slides';
import { useTranslation } from 'react-i18next';
import fcmService from '../../utils/NotificationHandler/FCMService';
import localNotificationService from '../../utils/NotificationHandler/LocalNotification';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Slide = ({ item }) => {
  const { t } = useTranslation();

  return (
    <View>
      {item.id === '2' ? (
        <View style={{ width: AppWidth(100) }}>
          <Image
            source={item?.image}
            style={{
              height: AppHeight(40),
              width: AppWidth(90),
              resizeMode: 'stretch',
              alignSelf: 'center',
              marginTop: AppHeight(10),
            }}
          />
          <View
            style={{ paddingHorizontal: AppWidth(5), marginTop: AppHeight(7) }}
          >
            <Text style={styles.title}>{t(item?.title)}</Text>
            <Text style={styles.subtitle}>{item?.subtitle}</Text>
          </View>
        </View>
      ) : (
        <View style={{ width: AppWidth(100) }}>
          <View style={{ paddingHorizontal: AppWidth(5) }}>
            <Text style={[styles.title, { marginTop: AppHeight(10) }]}>
              {t(item?.title)}
            </Text>
            <Text style={styles.subtitle}>{item?.subtitle}</Text>
          </View>
          <Image
            source={item?.image}
            style={{
              height: AppHeight(40),
              width: AppWidth(90),
              resizeMode: 'stretch',
              alignSelf: 'center',
              marginTop: AppHeight(5),
            }}
          />
        </View>
      )}
    </View>
  );
};

const OnboardingScreen = ({ navigation }) => {
  const [currentSlideIndex, setCurrentSlideIndex] = React.useState(0);
  const ref = React.useRef();

  const updateCurrentSlideIndex = (e) => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / ScreenWidth);
    setCurrentSlideIndex(currentIndex);
  };

  const goToNextSlide = () => {
    if (currentSlideIndex == '2') {
      skip();
    } else {
      const nextSlideIndex = currentSlideIndex + 1;
      if (nextSlideIndex != slides.length) {
        const offset = nextSlideIndex * ScreenWidth;
        ref?.current.scrollToOffset({ offset });
        setCurrentSlideIndex(currentSlideIndex + 1);
      }
    }
  };

  const goToBackSlide = () => {
    const backSlideIndex = currentSlideIndex - 1;
    if (backSlideIndex != slides.length) {
      const offset = backSlideIndex * ScreenWidth;
      ref?.current.scrollToOffset({ offset });
      setCurrentSlideIndex(currentSlideIndex - 1);
    }
  };

  useEffect(() => {
    const onRegister = async (token) => {
      await AsyncStorage.setItem('fcmtoken', token);
    };

    const onNotification = (notify, data) => {
      const options = {
        soundName: 'default',
        playSound: true,
      };

      localNotificationService.showNotification(
        0,
        notify.title,
        notify.body,
        notify,
        options
      );
    };

    const onOpenNotification = (notify, data) => {
      console.log('onOpenNotification ', { data });
    };

    fcmService.registerAppWithFCM();
    fcmService.register(onRegister, onNotification, onOpenNotification);
    localNotificationService.configure(onOpenNotification);

    return () => {
      fcmService.unregister();
    };
  }, []);

  const skip = () => {
    navigation.navigate('Login');
  };

  const Footer = () => {
    return (
      <View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            position: 'absolute',
          }}
        >
          {/* Render indicator */}
          <View style={styles.indicatorBtn}>
            {slides.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.indicator,
                  currentSlideIndex == index && {
                    backgroundColor: COLORS.primary,
                    width: 30,
                    height: 10,
                    borderRadius: 6,
                  },
                ]}
              />
            ))}
          </View>

          <View
            style={{
              flex: 1,
              left: 50,
              bottom: Platform.OS === 'ios' ? AppHeight(15) : AppHeight(17),
            }}
          >
            <ImageBackground
              source={require('../../../assets/Vector.png')}
              style={styles.btnContainer}
            >
              <TouchableOpacity activeOpacity={0.8} onPress={goToNextSlide}>
                <View style={styles.btn}>
                  <Vector2 height={20} width={30} />
                </View>
              </TouchableOpacity>
            </ImageBackground>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
      }}
    >
      <StatusBar backgroundColor={COLORS.black} />
      <Header
        currentSlideIndex={currentSlideIndex}
        goToBackSlide={goToBackSlide}
        skip={skip}
      />
      <FlatList
        ref={ref}
        onMomentumScrollEnd={updateCurrentSlideIndex}
        contentContainerStyle={
          {
            // height: ScreenHeight * 0.67,
          }
        }
        showsHorizontalScrollIndicator={false}
        horizontal
        data={slides}
        pagingEnabled
        renderItem={({ item }) => <Slide item={item} />}
      />

      <Footer />
    </SafeAreaView>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  subtitle: {
    color: COLORS.black,
    fontSize: fontSize.subHeader,
    marginTop: AppHeight(1),
    lineHeight: AppHeight(3),
    color: COLORS.grey,
  },
  title: {
    color: COLORS.black,
    fontSize: fontSize.header,
    fontWeight: 'bold',
  },
  indicator: {
    height: 10,
    width: 10,
    backgroundColor: '#E8E9FF',
    marginHorizontal: 3,
    borderRadius: 6,
  },
  btn: {
    width: 50,
    padding: 12,
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    alignSelf: 'center',
    marginTop: 50,
  },
  btnContainer: {
    height: 145,
    width: 128,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  indicatorBtn: {
    flex: 1,
    height: 50,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    bottom: Platform.OS === 'ios' ? AppHeight(6) : AppHeight(9),
  },
});
