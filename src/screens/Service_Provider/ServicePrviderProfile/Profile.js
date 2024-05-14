import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React from 'react';
import {
  AppFontSize,
  AppHeight,
  AppWidth,
  COLORS,
  urlFormat,
} from '../../../utils';
import CustomHeader from '../../../components/CustomHeader';
import { Text, useToast } from 'native-base';
import { CustomIcon } from '../../../components/CustomIcon';
import { useDispatch, useSelector } from 'react-redux';
import { DeleteAccount, Logout } from '../../../store/AuthActions';
import { GetUserProfileInfo } from '../../../services/SameApiServices';
import CustomLoading from '../../../components/Loading/CustomLoading';
import { useTranslation } from 'react-i18next';
import { SafeAreaView, Switch } from 'react-native';

const SECTIONS = [
  // {
  //   icon: "ServiceProviderWallet",
  //   color: "#fd2d54",
  //   label: "My Wallet",
  //   type: "link",
  // },
  {
    icon: 'serviceProviderIcon',
    color: '#fe9400',
    label: 'Edit Profile',
    type: 'link',
  },
  {
    icon: 'serviceProviderIcon',
    color: '#007afe',
    label: 'Manage Availability',
  },
  {
    icon: 'privacyIcon',
    color: '#fe9400',
    label: 'Language',
    type: 'link',
  },
  // {
  //   icon: "serviceProviderIcon",
  //   color: "#007afe",
  //   label: "Become A Service Provider",
  // },
  {
    icon: 'helpCenter',
    color: '#32c759',
    label: 'Help Center',
    type: 'link',
  },
  { icon: 'faqsIcon', color: '#fd2d54', label: 'FAQs', type: 'link' },
  {
    icon: 'privacyIcon',
    color: '#fd2d54',
    label: 'Privacy Policy',
    type: 'link',
  },
  {
    icon: 'deleteIcon',
    color: '#fd2d54',
    label: 'Delete Account',
    type: 'link',
  },
  { icon: 'logoutIcon', color: '#fd2d54', label: 'Log Out', type: 'link' },
];

const Profile = ({ navigation }) => {
  const toast = useToast();
  const { isLoading, data: userDetails, isError, error } = GetUserProfileInfo();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const user = useSelector((state) => state.AuthReducer.user);

  const onPressSection = ({ title }) => {
    if (title === 'Jobs') {
      navigation.navigate('ProfileJob');
    } else if (title === 'Manage Availability') {
      navigation.navigate('ProfileManageAvailability');
    } else if (title === 'Jobs') {
      navigation.navigate('ProfileJob');
    } else if (title === 'Invoices') {
      navigation.navigate('ProfileInvoices');
    } else if (title === 'Manage Rates') {
      navigation.navigate('ProfileManageRates');
    } else if (title === 'Change Password') {
      navigation.navigate('ProfileChangePassword');
    } else if (title === 'My Service Categories') {
      navigation.navigate('ProfileServicesCategories');
    } else if (title === 'Help Center') {
      navigation.navigate('ProfileHelpCenter');
    } else if (title === 'Share App') {
      navigation.navigate('ProfileShareApp');
    } else if (title === 'Privacy Policy') {
      navigation.navigate('ProfilePrivacy');
    } else if (title === 'FAQs') {
      navigation.navigate('ProfileFaq');
    } else if (title === 'Language') {
      navigation.navigate('language');
    } else if (title === 'Edit Profile') {
      navigation.navigate('EditServiceProviderProfile');
    } else if (title === 'My Wallet') {
      navigation.navigate('wallet');
    } else if (title === 'Log Out') {
      dispatch(Logout());
    } else if (title === 'Delete Account') {
      dispatch(DeleteAccount(user.id));
    }
  };

  const onPressNotification = () => {
    navigation.navigate('ServiceProviderProfile', {
      screen: 'SpNotifications',
    });
  };

  return (
    <View style={{ backgroundColor: 'white' }}>
      <CustomHeader
        title={t('Setting')}
        back
        icon
        navigation={navigation}
        onPressNotification={onPressNotification}
      />

      <SafeAreaView>
        <View style={{ height: AppHeight(150) }}>
          <ScrollView
            contentContainerStyle={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              paddingBottom: AppHeight(80),
              paddingHorizontal: 15,
              marginTop: 15,
            }}
          >
            {SECTIONS.map(({ label, icon, type, value, color }, index) => {
              return (
                <View
                  style={{
                    flexDirection: 'row',
                  }}
                  key={index}
                >
                  <TouchableOpacity
                    style={styles.serviceCard}
                    onPress={() => onPressSection({ title: label })}
                  >
                    <CustomIcon name={icon} color={COLORS.primary} />
                    <Text style={styles.item}>{t(label)}</Text>
                  </TouchableOpacity>
                </View>
              );
            })}
          </ScrollView>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 24,
  },
  section: {
    paddingHorizontal: 24,
  },
  sectionHeader: {
    paddingVertical: 12,
    fontSize: 12,
    fontWeight: '600',
    color: '#9e9e9e',
    textTransform: 'uppercase',
    letterSpacing: 1.1,
  },
  profile: {
    padding: 24,
    backgroundColor: '#fff',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileAvatar: {
    width: 72,
    height: 72,
    borderRadius: 9999,
  },
  profileAvatarWrapper: {
    position: 'relative',
  },
  profileAction: {
    position: 'absolute',
    right: -4,
    bottom: -10,
    alignItems: 'center',
    justifyContent: 'center',
    width: 28,
    height: 28,
    borderRadius: 9999,
    backgroundColor: '#007bff',
  },
  profileName: {
    marginTop: 20,
    fontSize: 19,
    fontWeight: '600',
    color: '#414d63',
    textAlign: 'center',
  },
  profileAddress: {
    marginTop: 5,
    fontSize: 16,
    color: '#989898',
    textAlign: 'center',
  },
  rowIcon: {
    width: 32,
    height: 32,
    borderRadius: 9999,
    marginRight: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowLabel: {
    fontSize: 17,
    fontWeight: '400',
    color: '#0c0c0c',
  },
  rowSpacer: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },

  row: {
    flex: 1,
    justifyContent: 'space-between',
  },
  item: {
    textAlign: 'center',
    fontWeight: 600,
    marginTop: 3,
    fontSize: AppFontSize(1.5),
  },
  serviceCard: {
    alignItems: 'center',
    width: AppWidth(43),
    padding: AppHeight(2.5),
    marginTop: 13,
    borderWidth: 2,
    borderRadius: 12,
    borderColor: COLORS.lightGrey,
  },
});