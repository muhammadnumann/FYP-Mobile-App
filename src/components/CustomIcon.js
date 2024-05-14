import { SvgXml } from 'react-native-svg';
import { COLORS, width } from '../utils';
import {
  AcServicesIcon,
  AppliancesServicesIcon,
  arrowDown,
  arrowDownBlue,
  arrowDownWhite,
  arrowUp,
  arrowUpBlue,
  arrowUpRed,
  arrowUpWhite,
  backArrowBlack,
  backArrowWhite,
  bacnkIcon,
  bankFormatIcon,
  BookingIcon,
  BookingIconFill,
  cameraIcon,
  cancekJobIcon,
  CardIcon,
  categoriesIcon,
  changePassword,
  chartFilterIcon,
  chatCameraIcon,
  chatIcon,
  CheckedIcon,
  CleaningServicesIcon,
  CreditCardIcon,
  DateIcon,
  DocsIcon,
  earningIcon,
  editIcon,
  ElectricianServicesIcon,
  EmailIcon,
  faqsIcon,
  favouriteIcon,
  FileIcon,
  ForgotIcon,
  handCash,
  helpCenter,
  HomeIcon,
  HomeIconFill,
  InboxIcon,
  InboxIconFill,
  inProgressIcon,
  invoiceIcon,
  jobIcon,
  jobsIcon,
  LabourServicesIcon,
  LocationIcon,
  LoginIcon,
  logoutIcon,
  manageBooking,
  maneageAddress,
  MapIcon,
  MechanicServicesIcon,
  messageIcon,
  MobileNumberIcon,
  modalCross,
  newJobIcon,
  nextIcon,
  NotificationIcon,
  PaintingServicesIcon,
  PasswordIcon,
  phone,
  phoneIcon,
  PlumberServicesIcon,
  privacyIcon,
  ProfileIcon,
  ProfileIconFill,
  ratesIcon,
  RegisterIcon,
  RoleIcon,
  saveIcon,
  searchIcon,
  ServiceIcon,
  serviceProviderIcon,
  settingFill,
  settingOutline,
  shareApp,
  shareIcon,
  ShowPasswordIcon,
  successWithdraw,
  UnCheckIcon,
  ViewMoreIcon,
  waletIcon,
  walletFillIcon,
  walletIcon,
  withdrawAmount,
  reviewIcon,
  DeleteIcon,
} from '../utils/SvgIcon';

export const CustomIcon = ({ name, color, height, width }) => {
  if (name === 'email') {
    return <SvgXml xml={EmailIcon} />;
  } else if (name === 'reviewIcon') {
    return <SvgXml xml={reviewIcon} />;
  } else if (name === 'password') {
    return <SvgXml xml={PasswordIcon} />;
  } else if (name === 'role') {
    return <SvgXml xml={RoleIcon} />;
  } else if (name === 'showPassword') {
    return <SvgXml xml={ShowPasswordIcon} />;
  } else if (name === 'LoginIcon') {
    return <SvgXml xml={LoginIcon} />;
  } else if (name === 'ForgotIcon') {
    return <SvgXml xml={ForgotIcon} />;
  } else if (name === 'RegisterIcon') {
    return <SvgXml xml={RegisterIcon} />;
  } else if (name === 'MobileNumberIcon') {
    return <SvgXml xml={MobileNumberIcon} />;
  } else if (name === 'CardIcon') {
    return <SvgXml xml={CardIcon} />;
  } else if (name === 'DateIcon') {
    return <SvgXml xml={DateIcon} />;
  } else if (name === 'LocationIcon') {
    return <SvgXml xml={LocationIcon} />;
  } else if (name === 'MapIcon') {
    return <SvgXml xml={MapIcon} />;
  } else if (name === 'ServiceIcon') {
    return <SvgXml xml={ServiceIcon} />;
  } else if (name === 'FileIcon') {
    return <SvgXml xml={FileIcon} />;
  } else if (name === 'DocsIcon') {
    return <SvgXml xml={DocsIcon} />;
  } else if (name === 'UnCheckIcon') {
    return <SvgXml xml={UnCheckIcon} />;
  } else if (name === 'CheckedIcon') {
    return <SvgXml xml={CheckedIcon} />;
  } else if (name === 'HomeIcon') {
    return <SvgXml xml={COLORS.primary === color ? HomeIconFill : HomeIcon} />;
  } else if (name === 'SettingIcon') {
    return (
      <SvgXml xml={COLORS.primary === color ? settingFill : settingOutline} />
    );
  } else if (name === 'InboxIcon') {
    return (
      <SvgXml xml={COLORS.primary === color ? InboxIconFill : InboxIcon} />
    );
  } else if (name === 'BookingIcon') {
    return (
      <SvgXml xml={COLORS.primary === color ? BookingIconFill : BookingIcon} />
    );
  } else if (name === 'ProfileIcon') {
    return (
      <SvgXml xml={COLORS.primary === color ? ProfileIconFill : ProfileIcon} />
    );
  } else if (name === 'backArrowWhite') {
    return <SvgXml xml={backArrowWhite} />;
  } else if (name === 'searchIcon') {
    return <SvgXml xml={searchIcon} />;
  } else if (name === 'Appliances') {
    return <AppliancesServicesIcon height={height} width={width} />;
  } else if (name === 'Painting') {
    return <PaintingServicesIcon height={height} width={width} />;
  } else if (name === 'Cleaning') {
    return <CleaningServicesIcon height={height} width={width} />;
  } else if (name === 'Electrician') {
    return <ElectricianServicesIcon height={height} width={width} />;
  } else if (name === 'AC Services') {
    return <AcServicesIcon height={height} width={width} />;
  } else if (name === 'Plumber') {
    return <PlumberServicesIcon height={height} width={width} />;
  } else if (name === 'Labour') {
    return <LabourServicesIcon height={height} width={width} />;
  } else if (name === 'Mechanic') {
    return <MechanicServicesIcon height={height} width={width} />;
  } else if (name === 'View More') {
    return <ViewMoreIcon height={height} width={width} />;
  } else if (name === 'NotificationIcon') {
    return <SvgXml xml={NotificationIcon} />;
  } else if (name === 'messageIcon') {
    return <SvgXml xml={messageIcon} />;
  } else if (name === 'phoneIcon') {
    return <SvgXml xml={phoneIcon} />;
  } else if (name === 'nextIcon') {
    return <SvgXml xml={nextIcon} />;
  } else if (name === 'serviceProviderIcon') {
    return <SvgXml xml={serviceProviderIcon} />;
  } else if (name === 'manageBooking') {
    return <SvgXml xml={manageBooking} />;
  } else if (name === 'changePassword') {
    return <SvgXml xml={changePassword} />;
  } else if (name === 'maneageAddress') {
    return <SvgXml xml={maneageAddress} />;
  } else if (name === 'helpCenter') {
    return <SvgXml xml={helpCenter} />;
  } else if (name === 'shareApp') {
    return <SvgXml xml={shareApp} />;
  } else if (name === 'faqsIcon') {
    return <SvgXml xml={faqsIcon} />;
  } else if (name === 'privacyIcon') {
    return <SvgXml xml={privacyIcon} />;
  } else if (name === 'logoutIcon') {
    return <SvgXml xml={logoutIcon} />;
  } else if (name === 'arrowUp') {
    return <SvgXml xml={arrowUp} />;
  } else if (name === 'arrowDown') {
    return <SvgXml xml={arrowDown} />;
  } else if (name === 'chatIcon') {
    return <SvgXml xml={chatIcon} />;
  } else if (name === 'chatCameraIcon') {
    return <SvgXml xml={chatCameraIcon} />;
  } else if (name === 'modalCross') {
    return <SvgXml xml={modalCross} />;
  } else if (name === 'phone') {
    return <SvgXml xml={phone} />;
  } else if (name === 'cameraIcon') {
    return <SvgXml xml={cameraIcon} />;
  } else if (name === 'ServiceProviderWallet') {
    return (
      <SvgXml xml={COLORS.primary === color ? walletFillIcon : walletIcon} />
    );
  } else if (name === 'jobIcon') {
    return <SvgXml xml={jobIcon} />;
  } else if (name === 'newJobIcon') {
    return <SvgXml xml={newJobIcon} />;
  } else if (name === 'inProgressIcon') {
    return <SvgXml xml={inProgressIcon} />;
  } else if (name === 'cancelJobIcon') {
    return <SvgXml xml={cancekJobIcon} />;
  } else if (name === 'chartFilterIcon') {
    return <SvgXml xml={chartFilterIcon} />;
  } else if (name === 'jobsIcon') {
    return <SvgXml xml={jobsIcon} />;
  } else if (name === 'invoiceIcon') {
    return <SvgXml xml={invoiceIcon} />;
  } else if (name === 'ratesIcon') {
    return <SvgXml xml={ratesIcon} />;
  } else if (name === 'categoriesIcon') {
    return <SvgXml xml={categoriesIcon} />;
  } else if (name === 'earningIcon') {
    return <SvgXml xml={earningIcon} />;
  } else if (name === 'arrowUpWhite') {
    return <SvgXml xml={arrowUpWhite} />;
  } else if (name === 'arrowDownWhite') {
    return <SvgXml xml={arrowDownWhite} />;
  } else if (name === 'arrowUpBlue') {
    return <SvgXml xml={arrowUpBlue} />;
  } else if (name === 'arrowDownBlue') {
    return <SvgXml xml={arrowDownBlue} />;
  } else if (name === 'arrowUpRed') {
    return <SvgXml xml={arrowUpRed} />;
  } else if (name === 'withdrawAmount') {
    return <SvgXml xml={withdrawAmount} />;
  } else if (name === 'bacnkIcon') {
    return <SvgXml xml={bacnkIcon} />;
  } else if (name === 'waletIcon') {
    return <SvgXml xml={waletIcon} />;
  } else if (name === 'editIcon') {
    return <SvgXml xml={editIcon} />;
  } else if (name === 'bankFormatIcon') {
    return <SvgXml xml={bankFormatIcon} />;
  } else if (name === 'saveIcon') {
    return <SvgXml xml={saveIcon} />;
  } else if (name === 'shareIcon') {
    return <SvgXml xml={shareIcon} />;
  } else if (name === 'successWithdraw') {
    return <SvgXml xml={successWithdraw} />;
  } else if (name === 'CreditCardIcon') {
    return <SvgXml xml={CreditCardIcon} />;
  } else if (name === 'handCash') {
    return <SvgXml xml={handCash} />;
  } else if (name === 'backArrowBlack') {
    return <SvgXml xml={backArrowBlack} />;
  } else if (name === 'favouriteIcon') {
    return <SvgXml xml={favouriteIcon} />;
  } else if (name === 'deleteIcon') {
    return <SvgXml xml={DeleteIcon} />;
  }
};
