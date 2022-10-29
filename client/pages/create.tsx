import { ArrowBackIcon, ChevronDownIcon, CloseIcon } from "@chakra-ui/icons";
import {
  VStack,
  Text,
  HStack,
  Image,
  Input,
  Textarea,
  Highlight,
  Checkbox,
  Divider,
  Button,
  SimpleGrid,
} from "@chakra-ui/react";
import { withTheme } from "@emotion/react";
import styles from "@styles/Create.module.css";
import { useState } from "react";

export default function Create() {
  const [files, setFiles] = useState<Blob[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<any>({});
  const [isCategoriesVisible, setCategoriesVisible] = useState<boolean>();
  const [isCountriesVisible, setCountriesVisible] = useState<boolean>();
  const [selectedTag, setSelectedTag] = useState<string>("");

  function handleFileUpload(e) {
    setFiles((prev) => [...prev, e.target.files[0]]);
  }

  function handleTagChange(tag) {
    setSelectedTag(tag);
    setCountriesVisible(false);
  }

  function handleSelectCategories(category: string) {
    const copiedCategories = { ...selectedCategories };
    if (selectedCategories[category]) {
      delete copiedCategories[category];
    } else {
      copiedCategories[category] = true;
    }
    setSelectedCategories(copiedCategories);
  }
  return (
    <VStack className={styles.container}>
      <HStack className={styles.backSection}>
        <ArrowBackIcon className={styles.backIcon} />
      </HStack>
      <HStack className={styles.contentContainer}>
        <VStack className={styles.leftSection}>
          <Text className={styles.steps}>Steps 1/2</Text>
          <Text className={styles.title}>Create Proof of Engagement</Text>
          <VStack className={styles.inputContainer}>
            <Text className={styles.inputHeader}>Name</Text>
            <Input
              onChange={() => {}}
              placeholder="Campaign name"
              className={styles.input}
            ></Input>
          </VStack>
          <VStack className={styles.inputContainer}>
            <Text className={styles.inputHeader}>Description</Text>
            <Textarea
              onChange={() => {}}
              placeholder="Jot down more details"
              className={styles.textarea}
            ></Textarea>
          </VStack>
          <VStack className={styles.inputContainer}>
            <Text className={styles.inputHeader}>Tags</Text>
            <HStack
              className={styles.selectBox}
              onClick={() => setCountriesVisible(!isCountriesVisible)}
            >
              {selectedTag ? (
                <Text fontWeight={500}>{selectedTag}</Text>
              ) : (
                <Text color="gray.500">Select tag</Text>
              )}
              <ChevronDownIcon className={styles.chevronIcon} />
            </HStack>
            {isCountriesVisible && (
              <VStack className={styles.selectionContainer}>
                {["Developers", "Appreciators", "Contributors"].map(
                  (tag, idx) => (
                    <VStack key={idx} onClick={() => handleTagChange(tag)}>
                      <HStack className={styles.tagsBox}>
                        <Text className={styles.checkboxTitle}>{tag}</Text>
                      </HStack>
                      {idx !== 2 && <Divider></Divider>}
                    </VStack>
                  )
                )}
              </VStack>
            )}
          </VStack>
        </VStack>
        <VStack className={styles.rightSection}>
          <Button className={styles.primaryBtn}>Next</Button>
          <VStack className={styles.inputContainer}>
            <VStack className={styles.fileUploadContainer}>
              <input
                type="file"
                name="images"
                id="images"
                required
                multiple
                onChange={handleFileUpload}
                className={styles.fileUploader}
              />
              <VStack className={styles.fileUploaderTextContainer}>
                <Image
                  alt="upload"
                  src="/upload.png"
                  className={styles.fileUploaderIcon}
                ></Image>
                <Text className={styles.fileUploaderText}>Upload Image</Text>
                <Text className={styles.fileUploaderSubtext}>
                  Supported formats: jpg, png, svg, gif
                </Text>
              </VStack>
            </VStack>
          </VStack>
        </VStack>
      </HStack>
    </VStack>
  );
}
