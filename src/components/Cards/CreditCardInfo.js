import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import { COLORS } from "../../utils";
import { TouchableOpacity } from "react-native";
import { CustomIcon } from "../CustomIcon";
import CustomCheckBox from "../CustomCheckBox";
import { useTranslation } from "react-i18next";

const CreditCardInfo = ({ data, method, setMethod }) => {
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [securityCode, setSecurityCode] = useState("");
  const { t } = useTranslation();
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row" }}>
        <CustomCheckBox
          isChecked={method === "creditCard"}
          onPress={() => setMethod("creditCard")}
        />
        <View style={{ marginLeft: 10 }}>
          <CustomIcon name={"CreditCardIcon"} />
        </View>
        <Text style={styles.heading}>{t("card_payment")}</Text>
      </View>

      <View
        style={{
          borderWidth: 1,
          borderColor: COLORS.lightGrey,
          marginTop: 5,
          marginBottom: 10,
        }}
      />

      <TextInput
        style={styles.input}
        value={cardName}
        placeholder={t("card_name")}
        onChangeText={setCardName}
      />

      <TextInput
        style={styles.input}
        value={cardNumber}
        placeholder={t("card_number")}
        onChangeText={setCardNumber}
        keyboardType="number-pad"
        maxLength={16}
      />

      <View style={styles.row}>
        <View style={styles.column}>
          <TextInput
            style={[styles.input, styles.smallInput]}
            value={expirationDate}
            onChangeText={setExpirationDate}
            keyboardType="number-pad"
            placeholder={t("card_expiry_date")}
            maxLength={4}
          />
        </View>

        <View style={styles.column}>
          <TextInput
            style={[styles.input, styles.smallInput]}
            value={securityCode}
            onChangeText={setSecurityCode}
            keyboardType="number-pad"
            placeholder={t("card_cvv")}
            maxLength={3}
          />
        </View>
      </View>
    </View>
  );
};

export default CreditCardInfo;

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderColor: COLORS.lightGrey,
    // height: AppHeight(),
    padding: 10,
    margin: 15,
    borderRadius: 12,
  },
  heading: {
    fontWeight: "bold",
    paddingVertical: 10,
    marginTop: -5,
    marginLeft: 10,
  },

  input: {
    borderRadius: 10,
    padding: 10,
    fontSize: 16,
    marginVertical: 5,
    backgroundColor: "#F4F4F4",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  column: {
    flex: 1,
    margin: 2,
  },
  smallInput: {
    flex: 1,
  },
});
