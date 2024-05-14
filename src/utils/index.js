import moment from 'moment';
import { Dimensions, PixelRatio, Platform } from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import { AppState, YellowBox } from 'react-native';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getBearerRequest, getRequest } from '../services/ApiServices';
import { SET_LANG } from '../services/ApiConstants';

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

export const roles = {
  Client: 'Client',
  ServiceProvider: 'ServiceProvider',
};

export const userType = [
  {
    id: 1,
    name: 'Customer',
  },
  {
    id: 2,
    name: 'Service Provider',
  },
];

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

export const services_list = [
  {
    name: 'Appliances',
    service_image:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAATMSURBVHgB7ZlbTBxVGMf/Z3Z2ly2gFMrFNE2hPKi1KWpjfKhFqsaEJn3wocZEQ9m2wbLEVGJSjS/F+GJtUk1FQCrQ0IdiiTGmscYX34y3BH0wYikpUG7bKpTLXtjdmTl+s5u2O8MuPbDZ7tDsL9lM5sx/zpz/nsuc7xsGE7VvcWeZggOMoRLWYqS7jfWaC5nxlDN3I36kxm+mCz/BQnCghn5jPW2sJr7cYMDdxA8yjhOygh2dnSwAC1H/Ni+QwvhT0/DeuQ7Wd7tcjhdJHFWc4duVGl/XxItIty2kYORCJ/svma6hgdvDQKVNgqurg/2BFThyjJeqQZRLKq52dbHZRJpzn7I5t4dfkmx4lk7vGJDiRdR4mfpKTfYg91HeLHN4HTJ+c8m4WX+Un0iko/JyxY7fZQcGmQ0D7kY+fLiJb01Yp4cfV8OYtufgF+6Et76Jv5/s+TS0Q9Bgiy+TIIj7Tb7dJuP0E49BfroK2LkDzG5HCzXuebNWktBeXIiqXU8Cu54CSotRyTV8YdaRqRcddpzU69Lr3P4o7HYJH9Y18p0QRNgAdd0L+XlAbm7sPMcJFDwc/VeqE8irS0ui16K/4k3QZ9tus4h6fE8e1efKiZ3nUf0uFz1KWq5N2YDGsBiO0EP53bJgkNqlYTSBfFbX3tEtRQ/jy1QqvIpiLIqEo3NxAoIIG/A5cDEYwLWhYeDGTeDKVSAQxHDEhstmLXk8OToGTE4BE5PA9Ymo8VNmneZE36IPo8PXYnUODgGhMP7aUoLvIIiwgf5PWJC6vGZhAR+PjeP7eR8+imjY3fs5mzFraa1ujYRQNzmNb6a8uKBEsK+nnfWYdfrKQsvi3tlbOHN9HJf9fnzg5KhuaaF+FUTGKqCG6cPgXREtLZ3n6XD+Xjpa00fpcAxrRLgHrIqxBzhsNH7fONTIX4IV4dhMq9nF+CKjAQa1IB+lRYUohQWZoXf0/LzxRbtsDtA6jE1FsCSBQNSAgXU/Bx44A1xiWFcYDGzMR2+ZJadvcgwG5hbw6vQNrCvMAc1I7obEwlCIglLa3ywsIq08lA9UlANOh5jeYEB2YizRjfoO9B99oxXBaYeGz5AmFIreFhdRf2UIxylGEMJggBpYO3Pr7p7/NrRj1HvA293O3kGaOdDMW/JCqPf5UKLHB/dCaBlV1WhgMmku10PHgx7+OtbIEQ9/nGJnw6DVd720EE7ExxMrkdJ7wGbDHgpQ19wrGseXqg0vIwVWtZ02o9pxiVIdZygwP0XT5GfR+yhmZpqK52jvtXUhmFr+KSUDekBy2MOfoeF1lnaKNViWKEsChSv0wvRqCmr7e9i/SIGUDOh0tTEKMrEXGSK7mcs0WQOZJmsg02QNZJqsgUyTNZBphA1QWHlfzYpmd4Qa5XBEa6xobuYupBmPh+uB5BaHU0wvtJ3WMxX0Latgzo+vKIRspShMMOBbHRQmbFxiaNjgQnGy7IgZ4XigchswNYX9/gD2qyrSA42bwgLgkTLxW8wGVJ7k446ebqkoR0bRYh8Yl+LLDHOA/oCBeUpcRRRYDvr4F0utc/waX27oAdWP/iUN+/4exGt6bkiy0CI7N0eJLwV93R3s6/jyhKvVoSb+CjnVc2OWsEBJgzAlAQbOtrIfzNf+B2wXivGczGXXAAAAAElFTkSuQmCC',

    checked: false,
  },
  {
    name: 'Painting',
    service_image:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAS8SURBVHgB7ZpdbBRVGIbfb2e3TVsqP4aWBjSlRGK40KiRC2MUMcbARbEaICFW21RbSg3WqL0xxhqNBomJUlqa4rRIMIgoiolXGjExhPiLmlhFRdsaaFlqaAuxO9vdOb4zS1PZzLDdZWaXi32Szcycn5nznvN935k5ZwWX4dFGtSwYRI0CSuATMQMf79XlODJE3DLqN6s2CeDla0oRKgjBF+Jx4Ny43YrtvZ3ShgxwFFDXompDAey9cTm7vhi+YhjAL78B0Sjae7vkRaRJwDHRxFNLFvvfeIvCQqCq0j5tW79eaUgTRwEcl1tK5yBrzKGHiaB47kIsR5oE3DK0ALJGIJCwZVMwD2kSdMsYCTMzaUA1Xi8qZ+SIAWfCF2/AO5SXAVNTQPhsIq2oCFgwn/YdBUZHMSsUMsNVQDiMj3gYm742gTKOylpLQCQCnBrGeT71CCNVtSUgOmWnTdIUviouwipLwPkJpp3GANO+QCoBgk1K4UD9FnWW953g7z2tEIfeelPOIBMBHNNWvVMGpy/rm9QKGtzamSfiAnu9NVSAavvStFMn2JM7eFw1UwwDjC71SAEbvi6g4TXE8BdduYoVa+NRPFffolr6OuWwW70rsvTIEpzi4ScrDP7xp520D1fCFI7qu+ST3p3SwXnhjoDgFVE4SHEb3arMWoCpYHCIEYvb59YIjR9sl6hpYt2FcTTEY3hQ78Sz8BC9S7r4qE108O7mZjXfqYyzAEX7jmPB/5Pe7pGTdITvfu5nb5+0ax6w0vd0y4DeLb27O+VDEVFiImo5uSU2YtjRZRIpqH1GlbDcXM3ESHJeX5e8z/YcMwRtsxZAh/qUIe3J5HS9C7dHY6jhCNzDYW53qqvFccSYwq/HfwROj2CMOrYhBcFJNLCRQz09MgznVu7mfR5wrOuUSId8mg71bd0W9aoRw+v7eyQRDNnDOuzo5Aob8S/vsOKxJ3C3WYAf9rwhY25l16xRhRVV2MrnbYsHcJ9bObZlyIzB0YRcX+bqNqtKOpHOEqup3gqPJjyGDS/mM/rZw036TjnqVq6hRd1Fk9zPaLY4Oc81jFq2zcO9DzeqiqLQpf7gBWyQGVSY7N5lP+eysOeW0taHnPKCqSrvS9jlMHIIXy6f5+Elxzxc5dCUX6AJa8VBvOuUn3IEckVdq5qnGdjOiFhN/1vZ0SGGUznPBXDqv5VGW0PnLEAG0N5DjCxLEcVq2sf3EsFKXZ95pUlG4CF1TeoGLYh+OmgfrBeDTBBOocAJieMbTpBfpyru6Qjwdft+TkifMdw1Ikt46sTsOusLwkAWueqjUCryAnJNXkCu8WQeeKRZ3RQUdPButzGMFvA3yvMvDQ2Pv9MhE/ART+YBTXCYqxWV1158Y+cHT8XgEDbwW4zfb0h7uTAdPDEhDmNl+UIuRZYkftaq3qIye0XiTviMrz7AFQXffSwfhXJNXkCuyQuwYMg8ZO205AJPBJybwM3Wmmku8ESAEcEy5fmy1+zwREDlddgR8mkrNhWeCBj4G1uNrH5IzpCPQrkmL2AalbRPau1aqsQila94s7Cl8MGJ3/FQaelM0lhiW6MPPuOJgOvLsWEwjI3GP4m/CnDnPcZNv2N93fI5fOY/kCuCPX43CbwAAAAASUVORK5CYII=',

    checked: false,
  },
  {
    name: 'Cleaning',
    service_image:
      'data:image/png;base64,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',

    checked: false,
  },
  {
    name: 'Electrician',
    service_image:
      'data:image/png;base64,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',

    checked: false,
  },
  {
    name: 'AC Services',
    service_image:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAUNSURBVHgB7VhtTBxFGH5mb6/QViw0hRJbCzW20bZGgmmTaiRGE1ON/ugfY21oOA4RjpY0NWpi0hT/GGk1tIQ7kM+TKmpqajDxMzViYuoHiYJorTWmoVCQCuWr0HDc3vjsUSo9urvXFnJHck+ymZ3ZZ2bnfed935l3gBhiiCGGSEKENpSUSKWlBUpoe3IylNTU2fz5QEcHtOu1c15sF3Jm29UJ5brkTkgUsmULq3ZEJzQpcZJPjbdKHNUbggLkFMgDikCxEHjVp+LzwDgCoT3jFqF5zZ3ITFqGecXAINB1Hid8PjhCv9njcRv1n6VI7KeyK+oqRamaUyzXiUkcEArW1rlFp9HAjkI5otooSBzmFVSkrtWJ92pFtwHldI5L/kLej1T8h4rix7OsfGI2+eDAwHeDQ5h3jI9Dl6DdjOP1iFYWLZz3Nt1ZuSIYhAUCAtUUoPd8D98DmHNodM/OLqD/Ijq5AtVhdOnkvFNUzuWzMMho8IguZ4F8vKcXH/T2YaN9jt3c76diNPzAZ5f3bXNrmAZ9VqgsU+FHAstWqw51VeI3FptogxmYRCLmED6JnkaPOIMbhEobymTQTON7U7idaINtiBKotOd3uGyLEEHkFsonaM+rZBw+UkagiXhkawqGvBWiaUe+XLHYDkdAouWK814DVdhwP704ne83vHxzAadLulQ73LpPjY1hB+LQHb8Yu3SndhbKuxg8nAlLkT7GvYmh/NGGSvHtzP4KN4YMxYYMRAjU/OblScDatKBTPsQQmrX6DmBlMvRwms2IlL7ubuD2BM5VYGtofwWRR2PfBUz8eSYoQCknXfP3WaC7B6OaxGuU8MSvHcDwEM7x+/uhnVVEGPUe8U12sVxv05DAzfR3vS3PJT8OXEa/t0H8y2rT8y75oBaHU97DYtZWGnEBdBwtF+dm1ms94o+Z9RqPOGnUNxpM6JYwvQLLnEUyDQsIPFIHN9JpAbazYTsWHtqCAqxYzli1oPQPnOVpaeDi9Aow2CoL0BsYVqXKODs66b/2w8/tU6fDaMIiHnYy7vu/7puEnjb+o/KMcXx4GAe5VduWLpn6uOneoJNELUYvBR8fjebLYE6cWyT3Ml0sW5kS3LJhi1Jz0qjykRGqvS+YVL1S5xEHr95K8FD1NH1hHzW/ntV5znxvGhN82jnH0tBDXQyRguVNW85emSh8aGW8etJbLv4y4vFirJZ+f5q585tGHEeRfIpR75Ddjweqq8W44VhFso3BJSeczM/SXa+cAL/g3ZH5TYFAHbVxKG+PXG1EuXQBX5EzPGnDPtOhJN4lr5ax0FLBYcUbGcBb3DQeMRuw3i2+Z9FK7mNGnGPHuJZAFR9Djg6bH0e4UpnOIqyBBcILmDZsoHkMhF6shoIfkynhkAVno5iKJoZggF+lX5lodgzDAmHlA8yZK/jjMjOOY7d8WQQga92i2YjDq8B0aqxATF0gG/9PQSUlPXy9BGYW14qQVygfZpFU78brZjyuzXM0n2JTjoKd9JWvQxOWmXDskXo2vC2gp5dhwFIALucp/d85u7HBlCjRR9PYakahkB3chDbn58slRpxEFTwoYIgXVvcgDFgK0OgWA9zBy5UAms14NJ/9HO0l5wsyy4gz2o9PaYpdfhveMOKUlYnLVEQJjw2NegiHBcJy4vQUlPB89KIZh9eOP1HQLRMShnsFo5DmV/EMr3GOm47lEUfoB8Xh+EAMMcQQQwy3hP8Aew+2vOQ/ufcAAAAASUVORK5CYII=',

    checked: false,
  },
  {
    name: 'Plumber',
    service_image:
      'data:image/png;base64,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',

    checked: false,
  },
  {
    name: 'Labour',
    service_image:
      'data:image/png;base64,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',

    checked: false,
  },
  {
    name: 'Mechanic',
    service_image:
      'data:image/png;base64,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',

    checked: false,
  },
  {
    name: 'View More',
    service_image:
      'data:image/png;base64,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',
    checked: false,
  },
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

export const sampleListData = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    fullName: 'Aafreen Khan',
    timeStamp: '12:47 PM',
    recentText: 'Good Day!',
    review:
      'Lorem ipsum dolor sit amet consectetur. Pretium lacus congue maecenas facilisi viverra sit Diam gravi. Lorem ipsum dolor sit amet consectetur.',
    avatarUrl:
      'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    fullName: 'Sujitha Mathur',
    timeStamp: '11:11 PM',
    recentText: 'Cheer up, there!',
    review:
      'Lorem ipsum dolor sit amet consectetur. Pretium lacus congue maecenas facilisi viverra sit Diam gravi. Lorem ipsum dolor sit amet consectetur.',
    avatarUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyEaZqT3fHeNrPGcnjLLX1v_W4mvBlgpwxnA&usqp=CAU',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    fullName: 'Anci Barroco',
    timeStamp: '6:22 PM',
    recentText: 'Good Day!',
    review:
      'Lorem ipsum dolor sit amet consectetur. Pretium lacus congue maecenas facilisi viverra sit Diam gravi. Lorem ipsum dolor sit amet consectetur.',
    avatarUrl: 'https://miro.medium.com/max/1400/0*0fClPmIScV5pTLoE.jpg',
  },
  {
    id: '68694a0f-3da1-431f-bd56-142371e29d72',
    fullName: 'Aniket Kumar',
    timeStamp: '8:56 PM',
    recentText: 'All the best',
    review:
      'Lorem ipsum dolor sit amet consectetur. Pretium lacus congue maecenas facilisi viverra sit Diam gravi. Lorem ipsum dolor sit amet consectetur.',
    avatarUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSr01zI37DYuR8bMV5exWQBSw28C1v_71CAh8d7GP1mplcmTgQA6Q66Oo--QedAN1B4E1k&usqp=CAU',
  },
  {
    id: '28694a0f-3da1-471f-bd96-142456e29d72',
    fullName: 'Kiara',
    timeStamp: '12:47 PM',
    recentText: 'I will call today.',
    review:
      'Lorem ipsum dolor sit amet consectetur. Pretium lacus congue maecenas facilisi viverra sit Diam gravi. Lorem ipsum dolor sit amet consectetur.',
    avatarUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBwgu1A5zgPSvfE83nurkuzNEoXs9DMNr8Ww&usqp=CAU',
  },
];

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
    let res = getBearerRequest(SET_LANG + '?lang=' + language);
    console.log('response', res);
    // return res.data;
  } catch (e) {
    throw handler(e);
  }
};
