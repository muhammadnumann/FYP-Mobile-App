import React, { useEffect, useState } from 'react';
import {
  AppHeight,
  AppWidth,
  COLORS,
  ScreenHeight,
  ScreenWidth,
} from '../../../../utils';
import CustomHeader from '../../../../components/CustomHeader';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import CustomButton from '../../../../components/CustomButton';
import CustomCheckBox from '../../../../components/CustomCheckBox';
import { TextArea } from 'native-base';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { ScrollView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {
  getBearerRequest,
  getBearerParamsRequest,
} from '../../../../services/ApiServices';
import {
  GET_VISIT_CHARGES_URL,
  GET_AVAILABLE_SERVICES,
} from '../../../../services/ApiConstants';
import WarnToast from '../../../../components/Toast/WarnToast';

export default function AvailableServices({ route, navigation }) {
  const { ProfileInfo, serviceId } = route.params;
  const [services, setServices] = useState();
  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);
  const [other, setOther] = useState(false);
  const [reason, setReason] = useState('');
  const { t } = useTranslation();
  const user = useSelector((state) => state.AuthReducer.user);
  const [charges, setCharges] = useState('');
  const [serviceCounts, setServiceCounts] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getServices();
    getVisitCharges();
  }, []);

  const getServices = async () => {
    setLoading(true);
    try {
      let response = await getBearerParamsRequest(GET_AVAILABLE_SERVICES, {
        countryCode: user?.countryCode,
        serviceId: serviceId,
      });

      if (response.data) {
        setServices([]);
        setServices(response.data);
        setLoading(false);
      }

      // setServiceProviders(response.data);
    } catch (error) {
      setLoading(false);
      console.log('error: ', error);
    }
  };

  const getVisitCharges = async () => {
    try {
      let response = await getBearerRequest(GET_VISIT_CHARGES_URL);

      setCharges(response.data);
      // setCharges()
    } catch (error) {
      console.log(error);
    }
  };

  const incrementCount = (serviceId, serviceName, price, total_amount) => {
    const newCounts = { ...serviceCounts };
    newCounts[serviceId] = newCounts[serviceId] ? newCounts[serviceId] + 1 : 1;

    const updatedSelectedCheckboxes = [...selectedCheckboxes];
    const index = updatedSelectedCheckboxes.findIndex(
      (checkbox) => checkbox.serviceId === serviceId
    );

    if (index !== -1) {
      updatedSelectedCheckboxes[index].count = newCounts[serviceId];
      updatedSelectedCheckboxes[index].totalAmount =
        newCounts[serviceId] * price;
    } else {
      updatedSelectedCheckboxes.push({
        serviceId: serviceId,
        serviceName: serviceName,
        count: newCounts[serviceId],
        amount: price,
        totalAmount: newCounts[serviceId] * price,
      });
    }

    setSelectedCheckboxes(updatedSelectedCheckboxes);
    setServiceCounts(newCounts);
  };

  const decrementCount = (serviceId, price) => {
    const newCounts = { ...serviceCounts };
    newCounts[serviceId] =
      newCounts[serviceId] && newCounts[serviceId] > 0
        ? newCounts[serviceId] - 1
        : 0;

    setServiceCounts(newCounts);

    const updatedSelectedCheckboxes = [...selectedCheckboxes];
    const index = updatedSelectedCheckboxes.findIndex(
      (checkbox) => checkbox.serviceId === serviceId
    );

    if (index !== -1) {
      updatedSelectedCheckboxes[index].count = newCounts[serviceId];
      updatedSelectedCheckboxes[index].totalAmount =
        newCounts[serviceId] * price;
    } else {
      updatedSelectedCheckboxes.push({
        serviceId: serviceId,
        serviceName: serviceName,
        count: newCounts[serviceId],
        amount: price,
        totalAmount: newCounts[serviceId] - price,
      });
    }

    setSelectedCheckboxes(updatedSelectedCheckboxes);
  };

  const onPressNotification = () => {
    navigation.navigate('Home', { screen: 'UserNotification' });
  };

  const onSelectSubService = (
    checkboxId,
    serviceName,
    serviceCount,
    total_amount,
    price
  ) => {
    if (serviceCount === undefined) {
      incrementCount(checkboxId);
    }

    const index = selectedCheckboxes.findIndex(
      (checkbox) => checkbox.serviceId === checkboxId
    );

    if (index !== -1) {
      const newSelectedCheckboxes = selectedCheckboxes.filter(
        (checkbox) => checkbox.serviceId !== checkboxId
      );
      setSelectedCheckboxes(newSelectedCheckboxes);
    } else {
      setSelectedCheckboxes([
        ...selectedCheckboxes,
        {
          serviceId: checkboxId,
          serviceName: serviceName,
          count: serviceCount === undefined ? 1 : serviceCount,
          amount: price,
          totalAmount: serviceCount === undefined ? price : total_amount,
        },
      ]);
    }
  };

  const onPressNext = () => {
    if (selectedCheckboxes.length === 0) {
      WarnToast('Please select services in order to move forward !');
    } else {
      navigation.navigate('AddBookingAddress', {
        ProfileInfo,
        serviceId,
        selectedCheckboxes: selectedCheckboxes,
        total_amount: totalAmount,
        reason: reason,
        other: other,
      });
    }
  };

  function getTotalAmount(services) {
    let total = 0;
    for (let i = 0; i < services.length; i++) {
      total += services[i].totalAmount;
    }
    return total;
  }

  const totalAmount = getTotalAmount(selectedCheckboxes);

  return (
    <View style={{ flex: 1 }}>
      <KeyboardAwareScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps='handled'
      >
        <View style={{ backgroundColor: COLORS.white }}>
          <KeyboardAwareScrollView>
            <CustomHeader
              title={t('available_services')}
              navigation={navigation}
              back
              icon
              onPressNotification={onPressNotification}
            />

            <ScrollView style={{ height: AppHeight(63) }}>
              {services?.map((service, index) => {
                return (
                  <View
                    style={{
                      paddingVertical: 10,
                      paddingHorizontal: 15,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}
                    key={index}
                  >
                    <View style={{ flexDirection: 'row', width: AppWidth(70) }}>
                      <CustomCheckBox
                        isChecked={selectedCheckboxes?.find(
                          (item) => item.serviceId === service.id
                        )}
                        onPress={() =>
                          onSelectSubService(
                            service.id,
                            service.name,
                            serviceCounts[service.id],
                            serviceCounts[service.id] * service?.price,
                            service?.price
                          )
                        }
                      />

                      <View>
                        <Text
                          style={{
                            color: COLORS.black,
                            padding: 5,
                            fontWeight: '500',
                          }}
                        >
                          {service?.name}
                        </Text>
                        <Text
                          style={{
                            color: COLORS.grey,
                            padding: 2,
                            marginLeft: 5,
                          }}
                        >
                          {service?.currencySymbol} {service?.price}
                        </Text>
                      </View>
                    </View>

                    {selectedCheckboxes?.find(
                      (item) => item.serviceId === service.id
                    ) ? (
                      <>
                        <TouchableOpacity
                          onPress={() =>
                            decrementCount(service.id, service?.price)
                          }
                          style={styles.incrementBtn}
                        >
                          <Text style={styles.inrementText}>-</Text>
                        </TouchableOpacity>

                        <Text style={{ paddingHorizontal: 5 }}>
                          {' '}
                          {serviceCounts[service.id] || 0}
                        </Text>

                        <TouchableOpacity
                          onPress={() =>
                            incrementCount(
                              service.id,
                              service.name,
                              service?.price,
                              serviceCounts[service.id],
                              serviceCounts[service.id] * service?.price
                            )
                          }
                          style={styles.incrementBtn}
                        >
                          <Text style={styles.inrementText}>+</Text>
                        </TouchableOpacity>
                      </>
                    ) : (
                      <>
                        <TouchableOpacity
                          style={[
                            styles.incrementBtn,
                            { backgroundColor: COLORS.grey },
                          ]}
                          disabled={true}
                        >
                          <Text style={styles.inrementText}>-</Text>
                        </TouchableOpacity>

                        <Text style={{ paddingHorizontal: 5 }}>
                          {' '}
                          {serviceCounts[service.id] || 0}
                        </Text>

                        <TouchableOpacity
                          style={[
                            styles.incrementBtn,
                            { backgroundColor: COLORS.grey },
                          ]}
                          disabled={true}
                        >
                          <Text style={styles.inrementText}>+</Text>
                        </TouchableOpacity>
                      </>
                    )}
                  </View>
                );
              })}

              <View
                style={{
                  paddingVertical: 10,
                  paddingHorizontal: 15,
                  flexDirection: 'row',
                }}
              >
                <CustomCheckBox
                  isChecked={other}
                  onPress={() => setOther(!other)}
                />
                <Text style={{ color: COLORS.black, padding: 5 }}>Other</Text>
              </View>

              <View style={{ paddingHorizontal: 20 }}>
                {other ? (
                  <>
                    <TextArea
                      shadow={2}
                      h={20}
                      placeholder='Add description of your booking here...'
                      w={'100%'}
                      _light={{
                        placeholderTextColor: 'trueGray.700',
                        bg: 'coolGray.100',
                        _hover: {
                          bg: 'coolGray.200',
                        },
                        _focus: {
                          bg: 'coolGray.200:alpha.70',
                        },
                      }}
                      _dark={{
                        bg: 'coolGray.800',
                        _hover: {
                          bg: 'coolGray.900',
                        },
                        _focus: {
                          bg: 'coolGray.900:alpha.70',
                        },
                      }}
                      onChangeText={(text) => setReason(text)}
                    />
                  </>
                ) : null}
              </View>
            </ScrollView>
          </KeyboardAwareScrollView>

          <View style={styles.viewBtn}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: ScreenWidth * 1,
                paddingHorizontal: 20,
              }}
            >
              <Text style={{ fontWeight: '500' }}>{t('total_balance')}</Text>
              <Text>
                {user?.currencyCode} {totalAmount}
              </Text>
            </View>
            <CustomButton title={t('next')} onPress={onPressNext} top={5} />
          </View>
          <Text
            style={{ color: 'red', textAlign: 'center', paddingVertical: 5 }}
          >
            * Visit charges will be apply {user?.currencySymbol} {charges}
          </Text>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  viewBtn: {
    // position: "absolute",
    // bottom: 0,
    height: AppHeight(12),
    // width: AppWidth(100),
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
  },

  incrementBtn: {
    height: 18,
    width: 20,
    backgroundColor: COLORS.primary,
    borderRadius: 5,
  },

  inrementText: {
    color: COLORS.white,
    textAlign: 'center',
  },
});
