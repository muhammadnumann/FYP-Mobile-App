import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import CustomHeader from "../../../components/CustomHeader";
import { COLORS, ScreenHeight } from "../../../utils";
import Accordion from "react-native-collapsible/Accordion";
import { Box, HStack, VStack, Spacer } from "native-base";
import { CustomIcon } from "../../../components/CustomIcon";
import { useTranslation } from "react-i18next";

const SECTIONS = [
  {
    title: "faq_q_1",
    content: "faq_a_1",
  },
  {
    title: "faq_q_2",
    content: "faq_a_2",
  },
  {
    title: "faq_q_3",
    content: "faq_a_3",
  },
  {
    title: "faq_q_4",
    content: "faq_a_4",
  },
  {
    title: "faq_q_5",
    content: "faq_a_5",
  },
];

const UserFaq = ({ navigation }) => {
  const [activeSections, setActiveSections] = useState([]);
  const { t } = useTranslation();

  const _renderSectionTitle = (section) => {
    return (
      <View style={styles.content}>
        <Text>{section.content}</Text>
      </View>
    );
  };

  const onPressNotification = () => {
    navigation.navigate("UserProfileHome", { screen: "UserNotification" });
  };

  const _renderHeader = (section, index, isActive) => {
    return (
      <View style={{ backgroundColor: COLORS.white }} key={index}>
        <Box
          borderBottomWidth="0.4"
          _dark={{
            borderColor: "muted.50",
          }}
          borderColor={COLORS.grey}
          py="3"
        >
          <HStack space={3} justifyContent="space-between">
            <VStack>
              <Text
                style={{
                  color: COLORS.black,
                  padding: 5,
                }}
              >
                {t(section.title)}
              </Text>
            </VStack>
            <Spacer />

            <View style={{ marginTop: 5 }}>
              <CustomIcon name={isActive ? "arrowUp" : "arrowDown"} />
            </View>
          </HStack>
        </Box>
      </View>
    );
  };

  const _renderContent = (section) => {
    return (
      <View style={{ paddingVertical: 15 }}>
        <Text style={{ color: COLORS.grey, textAlign: "justify" }}>
          {t(section.content)}
        </Text>
      </View>
    );
  };

  const _updateSections = (activeSections) => {
    setActiveSections(activeSections);
  };

  return (
    <View style={{ backgroundColor: COLORS.white, height: ScreenHeight }}>
      <CustomHeader
        title={t("FAQ's")}
        back
        navigation={navigation}
        icon
        onPressNotification={onPressNotification}
      />

      <Accordion
        sections={SECTIONS}
        activeSections={activeSections}
        // renderSectionTitle={_renderSectionTitle}
        renderHeader={_renderHeader}
        renderContent={_renderContent}
        onChange={_updateSections}
        containerStyle={{ paddingHorizontal: 15 }}
      />
    </View>
  );
};

export default UserFaq;

const styles = StyleSheet.create({});
