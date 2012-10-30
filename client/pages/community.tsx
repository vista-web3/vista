import {
  VStack,
  Text,
  HStack,
  Button,
  Box,
  Switch,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Input,
  Image,
  filter,
  CloseButton,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Link as ChakraLink,
  Divider,
  Spinner,
} from "@chakra-ui/react";
import Link from "next/link";
import withTransition from "@components/withTransition";
import styles from "@styles/Community.module.css";
import { Checkbox } from "@chakra-ui/react";
import { useState } from "react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  useAccount,
  useSigner,
  useSendTransaction,
  usePrepareSendTransaction,
} from "wagmi";
import { ethers } from "ethers";
import Landing from "@components/Landing";

const users = [
  {
    id: Math.random() * 1000,
    address: "claudiahd.eth",
    tags: ["Developer", "Contributor"],
    tier: "Platinum",
    count: 20,
    joinedAt: "6/22/2022",
  },
  {
    id: Math.random() * 1000,
    address: "0xdF...428D",
    tags: ["Contributor"],
    tier: "Bronze",
    count: 3,
    joinedAt: "9/23/2022",
  },
  {
    id: Math.random() * 1000,
    address: "0x37...4c08",
    tags: ["Supporter"],
    tier: "Silver",
    count: 9,
    joinedAt: "6/3/2022",
  },
  {
    id: Math.random() * 1000,
    address: "0xjm",
    tags: ["Developer"],
    tier: "Gold",
    count: 11,
    joinedAt: "8/30/2022",
  },
  {
    id: Math.random() * 1000,
    address: "kanwar.eth",
    tags: ["Developer", "Contributor"],
    tier: "Silver",
    count: 10,
    joinedAt: "9/3/2022",
  },
  {
    id: Math.random() * 1000,
    address: "0x96...7632",
    tags: ["Contributor"],
    tier: "Bronze",
    count: 29,
    joinedAt: "4/30/2022",
  },
  {
    id: Math.random() * 1000,
    address: "0x4s...0134",
    tags: ["Contributor"],
    tier: "Bronze",
    count: 12,
    joinedAt: "5/1/2022",
  },
  {
    id: Math.random() * 1000,
    address: "0xgucci.eth",
    tags: ["Developer", "Contributor"],
    tier: "Silver",
    count: 18,
    joinedAt: "8/12/2022",
  },
  {
    id: Math.random() * 1000,
    address: "ngmilol.eth",
    tags: ["Contributor"],
    tier: "Platinum",
    count: 23,
    joinedAt: "7/13/2022",
  },
  {
    id: Math.random() * 1000,
    address: "0x13...9dh8",
    tags: ["Supporter"],
    tier: "Platinum",
    count: 25,
    joinedAt: "3/9/2022",
  },
];

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function Community() {
  const { address } = useAccount();
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedToken, setSelectedToken] = useState<string>("");
  const [amount, setAmount] = useState<number>(0);
  const [selectedTiers, setSelectedTiers] = useState<string[]>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [optionsVisible, setOptionsVisible] = useState<boolean>();
  const [modalStep, setModalStep] = useState(0);

  const { config } = usePrepareSendTransaction({
    request: {
      to: "0x9c060aa7Cbc374e92Aa2D23Ec4C9f992b10a843b",
      value: ethers.utils.parseEther("0.1"),
    },
  });

  const { data, isLoading, isSuccess, sendTransaction } =
    useSendTransaction(config);

  function handleAmountChange(e) {
    setAmount(e.target.value);
  }

  function handleCheckChange(e, id) {
    if (e.target.checked) {
      setSelectedUsers((prev) => [...prev, id]);
    } else {
      const filteredUsers = selectedUsers.filter(function (value) {
        return value !== id;
      });

      setSelectedUsers(filteredUsers);
    }
  }

  function toggleTag(filter) {
    if (selectedTags.includes(filter)) {
      const filteredUsers = selectedTags.filter(function (value) {
        return value !== filter;
      });
      setSelectedTags(filteredUsers);
    } else {
      setSelectedTags((prev) => [...prev, filter]);
    }
  }

  function toggleTier(filter) {
    if (selectedTiers.includes(filter)) {
      const filteredUsers = selectedTiers.filter(function (value) {
        return value !== filter;
      });
      setSelectedTiers(filteredUsers);
    } else {
      setSelectedTiers((prev) => [...prev, filter]);
    }
  }

  const filteredUsers =
    selectedTags.length > 0 || selectedTiers.length > 0
      ? users.filter((user) => {
          return (
            user.tags.some((value) => selectedTags.includes(value)) ||
            selectedTiers.includes(user.tier)
          );
        })
      : users;

  function handleSwitchChange(e: any) {
    const filteredIds = filteredUsers.map((user) => user.id);
    if (e.target.checked) {
      setSelectedUsers([...filteredIds]);
    } else {
      setSelectedUsers([]);
    }
  }

  function handleTokenChange(name) {
    setSelectedToken(name);
    setOptionsVisible(false);
  }

  const isAirdropSuccess = false;
  const txnHash = "";

  if (!address) return <Landing />;

  if (isAirdropSuccess)
    return (
      <VStack className={styles.container}>
        <HStack className={styles.contentContainer}>
          <VStack w="100%" gap="1.5rem">
            <Image
              alt="builder dao"
              src="/cronos_coin2.png"
              className={styles.sbtImage}
            ></Image>
            <Box h="10px" />
            <Text className={styles.title}>
              Woo, you just airdropped tokens!
            </Text>
            <Text className={styles.successClaimHeader}>
              We’ve airdropped 0.1 CRO tokens to developers
            </Text>
            <HStack>
              <ChakraLink
                href={
                  txnHash
                    ? `https://cronos.org/explorer/testnet3/tx/${txnHash}`
                    : "https://cronos.org/explorer/testnet3/tx/0x73b89429e1c02520ff5cfabe28df0d8b2bd85ece3bb69e33deba314f8827e866"
                }
                isExternal
              >
                <Button className={styles.primaryBtn}>View transaction</Button>
              </ChakraLink>
              <Link href="/">
                <Button className={styles.secondaryBtn2}>Go to home</Button>
              </Link>
            </HStack>
          </VStack>
        </HStack>
      </VStack>
    );

  return (
    <VStack className={styles.container}>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay className={styles.modalOverlay} />
        {modalStep === 0 ? (
          <ModalContent className={styles.modalContent}>
            <ModalHeader className={styles.modalHeader}>
              Token Airdrop
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <VStack alignItems="flex-start">
                <Text className={styles.modalSubtitle}>Enter amount</Text>
                <HStack className={styles.modalSubContainer}>
                  <Input
                    onChange={handleAmountChange}
                    placeholder="Enter amount"
                    className={styles.input}
                  ></Input>
                  <HStack
                    className={styles.selectBox}
                    onClick={() => setOptionsVisible(!optionsVisible)}
                  >
                    {selectedToken ? (
                      <Text fontWeight={500}>{selectedToken}</Text>
                    ) : (
                      <Text color="gray.500" w="100%">
                        Select token
                      </Text>
                    )}
                    <ChevronDownIcon className={styles.chevronIcon} />
                  </HStack>
                  {optionsVisible && (
                    <VStack className={styles.selectionContainer}>
                      {[
                        { name: "ETH", image: "/eth.png" },

                        { name: "CRO", image: "/cronos.png" },
                        { name: "DAI", image: "/gnosis.png" },
                      ].map(({ name, image }, idx) => (
                        <VStack
                          key={idx}
                          onClick={() => handleTokenChange(name)}
                        >
                          <HStack className={styles.tagsBox}>
                            <Image src={image}></Image>
                            <Text className={styles.checkboxTitle}>{name}</Text>
                          </HStack>
                          {idx !== 2 && <Divider></Divider>}
                        </VStack>
                      ))}
                    </VStack>
                  )}
                </HStack>
                <Box h="1rem"></Box>
                <Button
                  className={styles.modalBtn}
                  onClick={() => setModalStep(1)}
                >
                  Continue
                </Button>
              </VStack>
            </ModalBody>
          </ModalContent>
        ) : (
          <ModalContent className={styles.modalContent}>
            <ModalHeader className={styles.modalHeader}>
              Token Airdrop
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <VStack alignItems="flex-start">
                <Text className={styles.modalSubtitle}>
                  Selected user attributes
                </Text>
                <HStack className={styles.modalSubContainer}>
                  {selectedTags.map((filter, idx) => (
                    <HStack key={idx} className={styles.filterContainer}>
                      <Text>{capitalizeFirstLetter(filter)}</Text>
                      <CloseButton />
                    </HStack>
                  ))}
                  {selectedTiers.map((filter, idx) => (
                    <HStack key={idx} className={styles.filterContainer}>
                      <Text>{capitalizeFirstLetter(filter)}</Text>
                      <CloseButton />
                    </HStack>
                  ))}
                </HStack>
                <Text className={styles.modalSubtitle}>
                  Token amount per user
                </Text>
                <HStack className={styles.modalSubContainer}>
                  <Text>
                    {amount} {selectedToken}
                  </Text>
                </HStack>
                <Box h="1rem"></Box>
                <Button
                  className={styles.modalBtn}
                  onClick={() => sendTransaction?.()}
                >
                  {isLoading ? <Spinner color="white" /> : "Confirm"}
                </Button>
              </VStack>
            </ModalBody>
          </ModalContent>
        )}
      </Modal>
      <VStack w="100%" alignItems="flex-start" pb="2rem">
        <Text className={styles.title}>Community management</Text>
      </VStack>
      <HStack alignItems="flex-start" gap="1rem">
        <VStack>
          <Button className={styles.secondaryBtn} onClick={onOpen}>
            <HStack>
              <Image src="/airplane.svg"></Image>
              <Text>Airdrop Rewards</Text>
            </HStack>
          </Button>
          <VStack w="100%" alignItems="flex-start" p="1rem">
            <HStack w="100%" justifyContent="space-between" p=".5rem 0rem">
              <Text className={styles.text}>Select all</Text>
              <Switch
                colorScheme="pink"
                onChange={handleSwitchChange}
                size="lg"
              ></Switch>
            </HStack>
            <Text className={styles.subtext}>
              {selectedUsers.length} users selected
            </Text>
          </VStack>
          <Box className={styles.divider}></Box>
          <Accordion
            allowMultiple
            className={styles.accordion}
            defaultIndex={[0, 1]}
          >
            <AccordionItem className={styles.accordionItem}>
              <h2>
                <AccordionButton className={styles.accordionButton}>
                  <HStack flex="1">
                    <Text className={styles.text}>User tags</Text>
                  </HStack>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                <VStack>
                  <HStack
                    className={`${styles.accordionCell} ${
                      selectedTags.includes("Supporter") && styles.selected
                    }`}
                    onClick={() => toggleTag("Supporter")}
                  >
                    <Text>Supporter</Text>
                    <Text>15,423</Text>
                  </HStack>
                  <HStack
                    className={`${styles.accordionCell} ${
                      selectedTags.includes("Contributor") && styles.selected
                    }`}
                    onClick={() => toggleTag("Contributor")}
                  >
                    <Text>Contributor</Text>
                    <Text>3,566</Text>
                  </HStack>
                  <HStack
                    className={`${styles.accordionCell} ${
                      selectedTags.includes("Developer") && styles.selected
                    }`}
                    onClick={() => toggleTag("Developer")}
                  >
                    <Text>Developer</Text>
                    <Text>480</Text>
                  </HStack>
                </VStack>
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem className={styles.accordionItem}>
              <h2>
                <AccordionButton className={styles.accordionButton}>
                  <HStack flex="1">
                    <Text className={styles.text}>Engagement tiers</Text>
                  </HStack>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                <VStack>
                  <HStack
                    className={`${styles.accordionCell} ${
                      selectedTiers.includes("Bronze") && styles.selected
                    }`}
                    onClick={() => toggleTier("Bronze")}
                  >
                    <Text>Bronze</Text>
                    <Text>15,423</Text>
                  </HStack>
                  <HStack
                    className={`${styles.accordionCell} ${
                      selectedTiers.includes("Silver") && styles.selected
                    }`}
                    onClick={() => toggleTier("Silver")}
                  >
                    <Text>Silver</Text>
                    <Text>3,566</Text>
                  </HStack>
                  <HStack
                    className={`${styles.accordionCell} ${
                      selectedTiers.includes("Gold") && styles.selected
                    }`}
                    onClick={() => toggleTier("Gold")}
                  >
                    <Text>Gold</Text>
                    <Text>480</Text>
                  </HStack>
                  <HStack
                    className={`${styles.accordionCell} ${
                      selectedTiers.includes("Platinum") && styles.selected
                    }`}
                    onClick={() => toggleTier("Platinum")}
                  >
                    <Text>Platinum</Text>
                    <Text>480</Text>
                  </HStack>
                </VStack>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
          <Box className={styles.divider}></Box>
          <VStack w="100%" p="1rem" gap="1rem">
            <Text className={styles.text}>Proof of engagement</Text>
            <HStack w="100%" justifyContent="space-between">
              <Input placeholder="Min" className={styles.rangeInput}></Input>
              <Input placeholder="Max" className={styles.rangeInput}></Input>
            </HStack>
            <Button className={styles.secondaryBtn}>Apply</Button>
          </VStack>
        </VStack>
        <VStack>
          <HStack w="100%" justifyContent="flex-start" gap=".5rem">
            {selectedTags.map((filter, idx) => (
              <HStack key={idx} className={styles.filterContainer}>
                <Text>{capitalizeFirstLetter(filter)}</Text>
                <CloseButton />
              </HStack>
            ))}
            {selectedTiers.map((filter, idx) => (
              <HStack key={idx} className={styles.filterContainer}>
                <Text>{capitalizeFirstLetter(filter)}</Text>
                <CloseButton />
              </HStack>
            ))}
          </HStack>
          <HStack className={styles.tableHeaderContainer}>
            <Text className={styles.tableHeader1}>Address</Text>
            <Text className={styles.tableHeader2}>Tag(s)</Text>
            <Text className={styles.tableHeader3}>Tier</Text>
            <Text className={styles.tableHeader4}>NFTs</Text>
            <Text className={styles.tableHeader5}>Date joined</Text>
          </HStack>
          {filteredUsers.map(({ address, tags, tier, count, joinedAt, id }) => (
            <HStack key={id} className={styles.tableRowContainer}>
              <Text className={styles.tableHeader1}>{address}</Text>
              <Text className={styles.tableHeader2}>
                {tags.length > 1 ? tags.join(", ") : tags[0]}
              </Text>
              <Text className={styles.tableHeader3}>{tier}</Text>
              <Text className={styles.tableHeader4}>{count}</Text>
              <Text className={styles.tableHeader5}>{joinedAt}</Text>
              <Checkbox
                colorScheme="pink"
                isChecked={selectedUsers.includes(id)}
                onChange={(e) => handleCheckChange(e, id)}
                className={styles.tableHeader6}
              />
            </HStack>
          ))}
        </VStack>
      </HStack>
    </VStack>
  );
}

export default withTransition(Community);
