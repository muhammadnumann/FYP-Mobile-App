import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { COLORS } from "../../utils";

const BillSummaryCard = ({ data }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Bill Summary</Text>

      <View
        style={{
          borderWidth: 1,
          borderColor: COLORS.lightGrey,
          marginTop: 5,
        }}
      />

      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <View>
          <Text style={styles.heading}>Items</Text>
          <Text>New Wiring</Text>
          <Text>Old Wiring Repair</Text>
        </View>
        <View>
          <Text style={styles.heading}>Qty</Text>
          <Text>1</Text>
          <Text>2</Text>
        </View>
        <View>
          <Text style={styles.heading}>Price</Text>
          <Text>150 AED</Text>
          <Text>400 AED</Text>
        </View>
      </View>

      <View
        style={{
          borderWidth: 1,
          borderColor: COLORS.lightGrey,
          marginTop: 15,
        }}
      />

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 10,
        }}
      >
        <View>
          <Text>Subtotal</Text>
          <Text>Est. Tax (5%)</Text>
        </View>

        <View>
          <Text>550 AED</Text>
          <Text>27.50 AED</Text>
        </View>
      </View>

      <View
        style={{
          borderWidth: 1,
          borderColor: COLORS.lightGrey,
          marginTop: 15,
        }}
      />

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 5,
        }}
      >
        <View>
          <Text style={styles.heading}>Grand Total</Text>
        </View>
        <View>
          <Text style={styles.heading}>577.50 AED</Text>
        </View>
      </View>
    </View>
  );
};

export default BillSummaryCard;

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
  },
});
