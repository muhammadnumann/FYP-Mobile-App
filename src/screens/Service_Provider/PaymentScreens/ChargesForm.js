import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { AppWidth, COLORS } from '../../../utils';
import { useTranslation } from 'react-i18next';

const ChargesForm = ({
  handleAddCharges,
  handleRemoveCharges,
  handleChargesChange,
  additionalCharges,
}) => {
  const { t } = useTranslation();

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 25}
    >
      <ScrollView>
        <View>
          {additionalCharges.length > 0 ? (
            <View
              style={{
                flexDirection: 'row',
                marginTop: 10,
              }}
            >
              <Text style={[styles.header, { width: AppWidth(45) }]}>
                {t('Items')}
              </Text>
              <Text style={styles.header}>{t('Price')}</Text>
            </View>
          ) : null}

          {additionalCharges.map((product, index) => (
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
                onChangeText={(text) =>
                  handleChargesChange(index, 'name', text)
                }
                style={[styles.inputStyle, { color: 'black' }]}
                placeholderTextColor={'grey'}
              />
              <TextInput
                placeholder='Item Price'
                value={product?.price.toString()}
                onChangeText={(text) =>
                  handleChargesChange(index, 'price', text)
                }
                keyboardType='numeric'
                style={[styles.inputStyle, { color: 'black' }]}
                placeholderTextColor={'grey'}
              />

              <TouchableOpacity
                style={styles.incrementBtn}
                onPress={() => handleRemoveCharges(index)}
              >
                <Text style={styles.inrementText}>x</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default ChargesForm;

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
