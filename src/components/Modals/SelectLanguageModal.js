import React, { useState, useEffect } from "react";
import { Button, Modal } from "native-base";
import { Radio, Stack } from "native-base";
import { COLORS, changeLanguage } from "../../utils";
import { useTranslation } from "react-i18next";
import { View } from "react-native";

export default SelectLanguageModal = ({ showModal, setShowModal }) => {
  const [selectLanguage, setSelectedLanguage] = useState("en");
  const { i18n } = useTranslation();
  const { t } = useTranslation();

  useEffect(() => {
    if (i18n.language === "en") {
      setSelectedLanguage("en");
    } else {
      setSelectedLanguage("ar");
    }
  }, []);

  const onSelectChange = () => {
    changeLanguage(selectLanguage, i18n);
    setShowModal(false);
  };

  const onLanguageChange = (value) => {
    setSelectedLanguage(value);
  };

  return (
    <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
      <Modal.Content maxWidth="350">
        <View style={{ flexDirection: "row" }}>
          <Modal.CloseButton />
          <Modal.Header style={{ width: 350, flexDirection: "row" }}>
            {t("select")} {t("language")}
          </Modal.Header>
        </View>

        <Modal.Body>
          <Radio.Group
            name="exampleGroup"
            defaultValue={selectLanguage}
            accessibilityLabel="favorite colorscheme"
          >
            <Stack
              direction={{
                base: "row",
                md: "row",
              }}
              alignItems={{
                base: "flex-start",
                md: "center",
              }}
              space={4}
              w="75%"
              maxW="300px"
            >
              <Radio
                value={"en"}
                colorScheme="blue"
                size="sm"
                selected={selectLanguage === "en"}
                my={1}
                onPress={() => onLanguageChange("en")}
              >
                {t("english")}
              </Radio>
              <Radio
                value="ar"
                colorScheme="blue"
                selected={selectLanguage === "ar"}
                size="sm"
                my={1}
                onPress={() => onLanguageChange("ar")}
              >
                {t("arabic")}
              </Radio>
            </Stack>
          </Radio.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button.Group space={2}>
            <Button
              variant="ghost"
              colorScheme="blueGray"
              onPress={() => {
                setShowModal(false);
              }}
            >
              {t("cancel")}
            </Button>
            <Button
              onPress={onSelectChange}
              style={{ backgroundColor: COLORS.primary }}
            >
              {t("change")}
            </Button>
          </Button.Group>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};
