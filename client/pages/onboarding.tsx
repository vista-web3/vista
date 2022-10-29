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
  Box,
} from "@chakra-ui/react";
import withTransition from "@components/withTransition";
import { withTheme } from "@emotion/react";
import styles from "@styles/Create.module.css";
import { useState } from "react";

function Create() {
  const [files, setFiles] = useState<Blob[]>([]);
  const [filters, setFilters] = useState<any>([]);
  const [isCountriesVisible, setCountriesVisible] = useState<boolean>();
  const [selectedTag, setSelectedTag] = useState<string>("");
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const [communityName, setCommunityName] = useState<string>("");

  function handleNameChange(e) {
    setCommunityName(e.target.value);
  }

  function handleTagChange(tag) {
    setSelectedTag(tag);
    setCountriesVisible(false);
  }

  if (isSuccess) {
    return (
      <VStack className={styles.container}>
        <HStack className={styles.contentContainer}>
          <VStack w="100%" gap="2rem">
            <Image
              alt="builder dao"
              src="/bronze-sbt.png"
              pb="1rem"
              className={styles.sbtImage}
            ></Image>
            <Text className={styles.title}>Awesome, you’re all set!</Text>
            <Text className={styles.successHeader}>
              The token dynamically updates based on audience involvement in the
              community. Please copy the link below to share the membership
              cards with your community.
            </Text>
            <HStack>
              <HStack className={styles.inputBox}>
                <Text>vista.xyz/78123qqr</Text>
              </HStack>
              <Button className={styles.primaryBtn}>Copy invite link</Button>
            </HStack>
          </VStack>
        </HStack>
      </VStack>
    );
  }

  return (
    <VStack className={styles.container}>
      <VStack className={styles.contentContainer}>
        <HStack className={styles.contentContainer}>
          <Text className={styles.title}>Create your membership NFT</Text>
          <Button className={styles.primaryBtn}>Confirm</Button>
        </HStack>
        <HStack className={styles.contentContainer}>
          <VStack className={styles.leftSection}>
            <VStack className={styles.inputContainer}>
              <Text className={styles.inputHeader}>Community name</Text>
              <Input
                onChange={handleNameChange}
                placeholder="Community name"
                className={styles.input}
              ></Input>
            </VStack>
            <VStack className={styles.inputContainer}>
              <Text className={styles.inputHeader}>Network</Text>
              <Text className={styles.inputSubheader}>
                Select the network to deploy your membership NFTs and following
                POEs.
              </Text>
              <HStack
                className={styles.selectBox}
                onClick={() => setCountriesVisible(!isCountriesVisible)}
              >
                {selectedTag ? (
                  <Text fontWeight={500}>{selectedTag}</Text>
                ) : (
                  <Text color="gray.500">Select network</Text>
                )}
                <ChevronDownIcon className={styles.chevronIcon} />
              </HStack>
              {isCountriesVisible && (
                <VStack className={styles.networkSelectionContainer}>
                  {[
                    { name: "Ethereum", image: "/eth.png" },

                    { name: "Cronos", image: "/cronos.png" },
                    { name: "Gnosis Chain", image: "/gnosis.png" },
                  ].map(({ name, image }, idx) => (
                    <VStack key={idx} onClick={() => handleTagChange(name)}>
                      <HStack className={styles.tagsBox}>
                        <Image src={image}></Image>
                        <Text className={styles.checkboxTitle}>{name}</Text>
                      </HStack>
                      {idx !== 2 && <Divider></Divider>}
                    </VStack>
                  ))}
                </VStack>
              )}
            </VStack>
          </VStack>
          <VStack className={styles.rightSection}>
            <VStack className={styles.inputContainer}>
              <Text className={styles.inputHeader} color="#A8A8A8">
                Membership card preview
              </Text>
              <VStack className={styles.previewSBTContainer}>
                <Text className={styles.previewName}>
                  {communityName.replaceAll(" ", "").toUpperCase()}
                </Text>
                <Image
                  src="/preview.png"
                  className={styles.previewSBTImage}
                ></Image>
              </VStack>
            </VStack>
          </VStack>
        </HStack>
      </VStack>
    </VStack>
  );
}
export default withTransition(Create);
