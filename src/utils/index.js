import moment from 'moment';
import { Dimensions, PixelRatio, Platform } from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import { AppState, YellowBox } from 'react-native';
import { useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AppHeight = responsiveHeight;
export const AppWidth = responsiveWidth;
export const AppFontSize = responsiveFontSize;

export const { height, width } = Dimensions.get('window');

export const ScreenHeight = height;
export const ScreenWidth = width;

export const COLORS = {
  primary: '#626AFF',
  primaryLight: '#e8e9fc',
  primaryLighter: '#989DFF',
  white: 'white',
  black: 'black',
  grey: '#707070',
  lightGrey: '#F4F4F4',
  red: 'red',
  greenSolid: '#49A700',
  greenLight: 'rgba(73, 167, 0, 0.1)',
  redSolid: '#CB0202',
  redLight: 'rgba(203, 2, 2, 0.1)',
  logout: '#CB0202',
  chartComplete: '#7EDE34',
  chartCancel: '#F06060',
};

export const jobStatuses = {
  New: 'New',
  InProgress: 'InProgress',
  Completed: 'Completed',
  Cancelled: 'Cancelled',
  //Rejected = 5,
  PartialCompleted: 'PartialCompleted',
  InvoiceGenerated: 'InvoiceGenerated',
  ReOpen: 'ReOpen',
};


export const userGender = [
  { id: 1, name: 'Male' },
  { id: 2, name: 'Female' },
  { id: 3, name: 'Other' },
];

export const docsType = [
  { id: 1, name: 'National ID Card' },
  { id: 2, name: 'Driving License' },
  { id: 3, name: 'Passport' },
];

// based on iphone 5s's scale
const scale = ScreenWidth / 320;

export function normalize(size) {
  const newSize = size * scale;
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
  }
}

export const fontSize = {
  header: responsiveFontSize(3),
  subHeader: AppHeight(2.2),
  btnText: responsiveFontSize(2),
  mini: responsiveFontSize(1.8),
  // mini: normalize(12),
  small: normalize(15),
  medium: normalize(17),
  large: normalize(20),
  xlarge: normalize(24),
};

const date = new Date();
export const currentYear = date.getFullYear();
export const currentMonth = date.getMonth() + 1; // 👈️ months are 0-based

export const getDayNames = (month, year) => {
  const currentDate = moment();
  const daysInMonth = moment(`${month}-01-${year}`, 'MM-DD-YYYY').daysInMonth();
  const names = [];

  for (let i = currentDate.date(); i <= daysInMonth; i++) {
    let date = moment(
      `${currentDate.month() + 1}-${i}-${currentDate.year()}`,
      'MM-DD-YYYY'
    );
    let dayName = date.format('dddd');

    names.push({ name: `${dayName}`, day: `${date.format('DD')}` });
  }

  return names;
};

export const nextMonthDayNames = () => {
  const currentDate = moment();
  const nextMonth = currentDate.clone().add(1, 'month');
  const daysInCurrentMonth = currentDate.daysInMonth();
  const daysInNextMonth = nextMonth.daysInMonth();
  const names = [];

  // Get days from the current date till the end of the current month
  for (let i = currentDate.date(); i <= daysInCurrentMonth; i++) {
    let date = currentDate.clone().date(i);
    let dayName = date.format('dddd');

    names.push({ name: dayName, day: date.format('DD') });
  }

  // Get days from the start of the next month till the desired range (e.g., 30 days)
  for (let i = 1; i <= daysInNextMonth && names.length < 30; i++) {
    let date = nextMonth.clone().date(i);
    let dayName = date.format('dddd');

    names.push({ name: dayName, day: date.format('DD') });
  }

  return names;
};

export const arrayChunk = (arr, n) => {
  // 👈️ making array in column in ma function
  const array = arr.slice();
  const chunks = [];
  while (array.length) chunks.push(array.splice(0, n));
  return chunks;
};

export function truncateString(str, num) {
  if (str?.length <= num) {
    return str;
  }
  return str?.slice(0, num) + '...';
}

export const formatDate = (data) => {
  const originalDateStr = data;
  const originalFormat = 'M/D/YYYY h:mm:ss A';

  const originalDate = moment(originalDateStr, originalFormat);
  const newDateStr = originalDate.utc().format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');

  return newDateStr;
};

export const urlFormat = (url) => {
  const user = useSelector((state) => state.AuthReducer.user);
  return user?.uploadFileWebUrl + url;
};

export const changeLanguage = async (language, i18n) => {
  await AsyncStorage.setItem('language', language);
  i18n.changeLanguage(language);
  try {

  } catch (e) {
    throw handler(e);
  }
};
