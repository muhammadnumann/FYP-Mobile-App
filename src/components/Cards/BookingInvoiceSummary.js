import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { AppWidth, COLORS } from '../../utils';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import ImageView from 'react-native-image-viewing';
import { API_URL, UPLOADED_IMAGES } from '../../services/ApiConstants';

const BookingInvoiceSummary = ({ data, newBooking, totalCharges }) => {
  const { t } = useTranslation();
  const user = useSelector((state) => state.AuthReducer.user);
  const [visible, setIsVisible] = useState(false);

  const [grandTotal, setGrandTotal] = useState(0);
  const [hasAdditionalCharges, setHasAdditionalCharges] = useState(false);
  const [hasAdditionalExpenses, setHasAdditionalExpenses] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  useEffect(() => {
    calculateGrandTotal();
  }, []);

  const calculateGrandTotal = () => {
    var sum = 0;
    if (data?.removeAlreadyExistingCharges) {
      for (let i = 0; i < data?.otherExpenses.length; i++) {
        sum += data.otherExpenses[i].amount;
      }
    } else {
      // Calculate total amount from otherExpenses
      if (data?.otherExpenses && data?.otherExpenses.length > 0) {
        for (let i = 0; i < data?.otherExpenses.length; i++) {
          sum += data.otherExpenses[i].amount;
        }
      }

      // Calculate total amount from services
      if (data?.services && data?.services.length > 0) {
        for (let i = 0; i < data?.services.length; i++) {
          sum += data.services[i].totalAmount;
        }
      }
    }
    setGrandTotal(sum);
  };

  let renderServicesSummary = data?.services?.map((service, index) => {
    return (
      <View key={index}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 8,
          }}
        >
          <View style={{ width: AppWidth(35) }}>
            <Text>{service?.serviceName}</Text>
          </View>
          <View>
            <Text>{service?.count}</Text>
          </View>
          <View>
            <Text>
              {service?.totalAmount} {user?.currencyCode}
            </Text>
          </View>
        </View>
      </View>
    );
  });

  const openImageViewer = (index) => {
    setSelectedImageIndex(index);
    setIsVisible(true);
  };

  let renderExpences = data?.otherExpenses?.map((expense, index) => {
    if (expense?.expensesType === 'OtherExpenses') {
      return (
        <View key={index}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              padding: 8,
            }}
          >
            <View style={{ width: AppWidth(35) }}>
              <Text>{expense?.description}</Text>
            </View>
            <View>
              <Text>{expense?.amount}</Text>
            </View>
            <View>
              <Text>
                {expense?.totalAmount} {user?.currencyCode}
              </Text>
            </View>
          </View>
        </View>
      );
    }
  });

  let renderAdditionalCharges = data?.otherExpenses.map((expense, index) => {
    if (expense?.expensesType === 'Additional') {
      return (
        <View key={index}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              padding: 8,
            }}
          >
            <View style={{ width: AppWidth(35) }}>
              <Text>{expense?.description}</Text>
            </View>
            <View>
              <Text>{expense?.amount}</Text>
            </View>
            <View>
              <Text>
                {expense?.totalAmount} {user?.currencyCode}
              </Text>
            </View>
          </View>
        </View>
      );
    }
  });

  let renderAdditionalImages = data?.otherExpensesImages.map(
    (expense, index) => {
      return (
        <TouchableOpacity onPress={() => openImageViewer(index)} key={index}>
          <ImageBackground
            source={{
              uri: API_URL + UPLOADED_IMAGES + expense,
            }}
            style={{ height: 100, width: 100, margin: 4 }}
            borderRadius={15}
          ></ImageBackground>
        </TouchableOpacity>
      );
    }
  );

  function getTotalExpenses(expenses) {
    let total = 0;
    for (let i = 0; i < expenses?.length; i++) {
      total += expenses[i]?.amount;
    }
    return total;
  }

  const totalAmount = data?.services?.reduce((acc, service) => {
    return acc + service?.totalAmount;
  }, 0);

  const totalExpenses = getTotalExpenses(data?.otherExpenses);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>{t('Bill Summary')}</Text>
      <View
        style={{
          borderWidth: 1,
          borderColor: COLORS.lightGrey,
          marginTop: 5,
        }}
      />
      {/* services section */}
      {data?.removeAlreadyExistingCharges ? null : (
        <>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <Text style={[styles.heading, { width: AppWidth(30) }]}>
              {t('services')}
            </Text>
            <Text style={styles.heading}>{t('Qty')}</Text>
            <Text style={styles.heading}>{t('Price')}</Text>
          </View>
          {renderServicesSummary}

          {data?.otherDescription !== '' ? (
            <View>
              <Text style={[styles.heading, { width: AppWidth(30) }]}>
                {t('Other')}
              </Text>

              <Text> {data?.otherDescription}</Text>
            </View>
          ) : null}
        </>
      )}

      {data?.otherExpenses === null ||
      data?.otherExpenses.length <= 0 ? null : (
        <>
          {/* additional expences section */}
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <Text style={[styles.heading, { width: AppWidth(30) }]}>
              {t('Adittional Charges')}
            </Text>
            <Text style={styles.heading}>{t('Price')}</Text>
          </View>
          {renderExpences}

          {/* additional images section */}
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <Text style={[styles.heading, { width: AppWidth(30) }]}>
              {t('Other Expenses')}
            </Text>
            <Text style={styles.heading}>{t('Price')}</Text>
          </View>
          {renderAdditionalCharges}
        </>
      )}

      {data?.otherExpensesImages.length > 0 ? (
        <>
          <Text style={[styles.heading, { width: AppWidth(30) }]}>
            {t('Uploaded Images')}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'space-evenly',
            }}
          >
            {renderAdditionalImages}
          </View>

          <ImageView
            images={data?.otherExpensesImages.map((item) => ({
              uri: user?.uploadFileWebUrl + item,
            }))}
            imageIndex={selectedImageIndex}
            visible={visible}
            onRequestClose={() => setIsVisible(false)}
          />
        </>
      ) : null}

      {/* Grand Total section */}

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 5,
        }}
      >
        <View>
          <Text style={styles.heading}>{t('grand_total')}</Text>
        </View>
        <View>
          <Text style={styles.heading}>
            {grandTotal} {'  '}
            {user?.currencyCode}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default BookingInvoiceSummary;

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderColor: COLORS.primary,
    padding: 10,
    margin: 15,
    borderRadius: 12,
  },
  heading: {
    fontWeight: 'bold',
    paddingVertical: 10,
  },
});
