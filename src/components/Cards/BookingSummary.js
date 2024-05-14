import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AppWidth, COLORS } from '../../utils';
import { useSelector } from 'react-redux';
import { jobStatuses, roles } from '../../utils';
import { User } from '../../dummy/data';
import { API_URL, UPLOADED_IMAGES } from '../../services/ApiConstants';
import ImageView from 'react-native-image-viewing';

const BookingSummary = ({ data }) => {
  const { t } = useTranslation();
  const [user, setUser] = useState(
    useSelector((state) => state.AuthReducer.user)
  );
  // const user = User;
  const [showOtherExpenses, setShowOtherExpenses] = useState(false);
  const [showExpenses, setShowExpenses] = useState(false);
  const [showAdditionalCharges, setShowAdditionalCharges] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [visible, setVisible] = useState(false);
  let renderServices = data?.services?.map((service, index) => {
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

  let renderExpenses = data?.otherExpenses?.map((expense, index) => {
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

  let renderAdditionalCharges = data?.otherExpenses?.map((expense, index) => {
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

  const getShowExpense = () => {
    if (data?.otherExpenses && data?.otherExpenses.length > 0) {
      for (let i = 0; i < data?.otherExpenses.length; i++) {
        // Check if the expense has "OtherExpenses" as expensesType
        if (data?.otherExpenses[i].expensesType === 'OtherExpenses') {
          setShowExpenses(true);
          return;
        }
      }
    }
  };

  const getShowAdditionalCharges = () => {
    if (data?.otherExpenses && data?.otherExpenses.length > 0) {
      for (let i = 0; i < data?.otherExpenses.length; i++) {
        // Check if the expense has "OtherExpenses" as expensesType
        if (data?.otherExpenses[i].expensesType === 'Additional') {
          setShowAdditionalCharges(true);
          return;
        }
      }
    }
  };

  const getShowOtherExpenses = () => {
    if (user?.role === roles.Client) {
      if (data?.otherExpenses !== null || data?.showOtherExpenses.length > 0) {
        if (data?.status === jobStatuses.New) {
          setShowOtherExpenses(false);
        } else {
          setShowOtherExpenses(true);
        }
      } else {
        setShowOtherExpenses(false);
      }
    } else {
      if (data?.otherExpenses !== null || data?.showOtherExpenses.length > 0) {
        if (
          data?.status === jobStatuses.InProgress ||
          data?.status === jobStatuses.ReOpen
        ) {
          setShowOtherExpenses(false);
        } else {
          setShowOtherExpenses(true);
        }
      } else {
        setShowOtherExpenses(false);
      }
    }
  };

  useEffect(() => {
    if (showOtherExpenses) {
      getShowExpense();
      getShowAdditionalCharges();
    }
  }, [showOtherExpenses, data]);

  useEffect(() => {
    getShowOtherExpenses();
  }, [data, user]);

  return (
    <View style={styles.container}>
      <Text style={styles.mainHeading}>{t('Bill Summary')}</Text>
      <View
        style={{
          borderWidth: 1,
          borderColor: COLORS.lightGrey,
          marginTop: 5,
        }}
      />

      {/* Rendering Services if removeAlreadyExistingCharging is not true */}
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
          {renderServices}
        </>
      )}

      {showOtherExpenses ? (
        <>
          {/* additional expences section */}
          {showExpenses && (
            <>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <Text style={[styles.heading, { width: AppWidth(30) }]}>
                  {t('Other Expenses')}
                </Text>
                <Text style={styles.heading}>{t('Price')}</Text>
              </View>
              {renderExpenses}
            </>
          )}

          {/* additional images section */}
          {showAdditionalCharges && (
            <>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <Text style={[styles.heading, { width: AppWidth(30) }]}>
                  {t('Additional Charges')}
                </Text>
                <Text style={styles.heading}>{t('Price')}</Text>
              </View>
              {renderAdditionalCharges}
            </>
          )}
        </>
      ) : null}

      {data?.otherExpensesImages ? (
        <React.Fragment>
          <Text style={styles.heading}>{t('Images')}</Text>
          <FlatList
            data={data.otherExpensesImages}
            scrollEnabled={false}
            keyExtractor={(i) => i}
            numColumns={3}
            contentContainerStyle={{
              alignItems: 'center',
            }}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                onPress={() => {
                  setSelectedImageIndex(index);
                  setVisible(true);
                }}
                style={{ margin: 12 }}
              >
                <Image
                  source={{ uri: API_URL + UPLOADED_IMAGES + item }}
                  style={{ width: 90, height: 90 }}
                />
              </TouchableOpacity>
            )}
          />
        </React.Fragment>
      ) : null}

      {/* Rendering Other Description if available */}
      {data?.otherDescription !== '' && data?.otherDescription ? (
        <View>
          <Text style={[styles.heading, { width: AppWidth(30) }]}>
            {t('Notes')}
          </Text>

          <Text> {data?.otherDescription}</Text>
        </View>
      ) : null}
       {data?.otherExpensesImages !== null && data?.otherExpensesImages?.length > 0 ? (
        <ImageView
          animationType='slide'
          images={data?.otherExpensesImages.map((item) => {
            return { uri: API_URL + UPLOADED_IMAGES + item };
          })}
          imageIndex={selectedImageIndex}
          visible={visible}
          onRequestClose={() => setVisible(false)}
        />
      ) : null}
    </View>
  );
};

export default BookingSummary;

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderColor: COLORS.primary,
    padding: 10,
    margin: 15,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    backgroundColor: COLORS.primaryLight,
  },
  heading: {
    fontWeight: 'bold',
    paddingVertical: 10,
    lineHeight: 21,
  },
  mainHeading: {
    fontWeight: 'bold',
    fontSize: 16,
    paddingVertical: 10,
  },
});
