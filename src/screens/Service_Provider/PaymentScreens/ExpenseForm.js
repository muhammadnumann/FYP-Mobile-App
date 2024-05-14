import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { AppWidth, COLORS } from '../../../utils';
import { useTranslation } from 'react-i18next';

const ExpenseForm = ({
  handleAddExpense,
  handleRemoveExpense,
  handleExpenseChange,
  expenses,
}) => {
  const { t } = useTranslation();

  return (
    <View>
      {expenses.length > 0 ? (
        <View
          style={{
            flexDirection: 'row',
            // justifyContent: "space-between",
            marginTop: 10,
          }}
        >
          <Text style={[styles.header, { width: AppWidth(45) }]}>
            {t('Items')}
          </Text>
          <Text style={styles.header}>{t('Price')}</Text>
        </View>
      ) : null}

      {expenses.map((product, index) => {
        return (
          <View
            key={index}
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginVertical: 5,
            }}
          >
            <TextInput
              placeholder='Item Name'
              value={product?.name}
              onChangeText={(text) => handleExpenseChange(index, 'name', text)}
              style={[styles.inputStyle, { color: 'black' }]}
              placeholderTextColor={'grey'}
            />
            <TextInput
              placeholder='Item Price'
              value={product?.price.toString()}
              onChangeText={(text) => handleExpenseChange(index, 'price', text)}
              keyboardType='numeric'
              style={[styles.inputStyle, { color: 'black' }]}
              placeholderTextColor={'grey'}
            />

            <TouchableOpacity
              style={styles.incrementBtn}
              onPress={() => handleRemoveExpense(index)}
            >
              <Text style={styles.inrementText}>x</Text>
            </TouchableOpacity>
          </View>
        );
      })}
    </View>
  );
};

export default ExpenseForm;

const styles = StyleSheet.create({
  incrementBtn: {
    height: 20,
    width: 20,
    backgroundColor: COLORS.primary,
    borderRadius: 5,
    marginTop: 5,
  },

  inrementText: {
    color: COLORS.white,
    textAlign: 'center',
  },

  header: {
    fontWeight: 'bold',
  },
  inputStyle: {
    backgroundColor: COLORS.lightGrey,
    width: AppWidth(40),
    borderRadius: 8,
    height: 35,
    padding: 10,
    fontSize: 12,
  },
});
