import { FlatList, View, Text } from "react-native";
import React, { useEffect } from "react";
import CustomBookingCard from "../../../components/Cards/CustomBookingCard";
import { AppHeight, COLORS } from "../../../utils";
import { useDispatch, useSelector } from "react-redux";
import CustomLoading from "../../../components/Loading/CustomLoading";
import { getCancelBookings } from "../../../store/client/ClientActions";
import { useTranslation } from "react-i18next";

const CancelBooking = ({ route }) => {
  const cancelBookings = useSelector(
    (state) => state.ClientReducer.cancelledBookings
  );
  const loadBookings = useSelector((state) => state.ClientReducer.loadBookings);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(getCancelBookings());
  }, []);

  if (loadBookings) {
    return (
      <CustomLoading
        content={t("loading") + " " + t("cancel_booking") + "..."}
        top={AppHeight(30)}
      />
    );
  }

  return (
    <View style={{ height: AppHeight(80), backgroundColor: COLORS.lightGrey }}>
      {cancelBookings === null || cancelBookings?.length === 0 ? (
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ color: COLORS.grey }}>
            {t("cancel_booking_placeholder")}
          </Text>
        </View>
      ) : (
        <FlatList
          data={cancelBookings}
          style={{ paddingBottom: AppHeight(30) }}
          renderItem={({ item, index }) => (
            <View
              key={index}
              style={{ paddingHorizontal: 10, paddingVertical: 10 }}
            >
              <CustomBookingCard
                bookings={item}
                status={"Cancelled"}
                index={index}
              />
            </View>
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      )}
    </View>
  );
};

export default CancelBooking;
