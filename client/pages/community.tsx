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
} from "@chakra-ui/react";
import withTransition from "@components/withTransition";
import styles from "@styles/Community.module.css";

const users = [
  {
    address: "claudiahd.eth",
    tags: ["Developer", "Contributor"],
    tier: "Platinum",
    count: 20,
    joinedAt: "10/29/2022",
  },
  {
    address: "claudiahd.eth",
    tags: ["Developer", "Contributor"],
    tier: "Platinum",
    count: 20,
    joinedAt: "10/29/2022",
  },
  {
    address: "claudiahd.eth",
    tags: ["Developer", "Contributor"],
    tier: "Platinum",
    count: 20,
    joinedAt: "10/29/2022",
  },
  {
    address: "claudiahd.eth",
    tags: ["Developer", "Contributor"],
    tier: "Platinum",
    count: 20,
    joinedAt: "10/29/2022",
  },
  {
    address: "claudiahd.eth",
    tags: ["Developer", "Contributor"],
    tier: "Platinum",
    count: 20,
    joinedAt: "10/29/2022",
  },
  {
    address: "claudiahd.eth",
    tags: ["Developer", "Contributor"],
    tier: "Platinum",
    count: 20,
    joinedAt: "10/29/2022",
  },
  {
    address: "claudiahd.eth",
    tags: ["Developer", "Contributor"],
    tier: "Platinum",
    count: 20,
    joinedAt: "10/29/2022",
  },
  {
    address: "claudiahd.eth",
    tags: ["Developer", "Contributor"],
    tier: "Platinum",
    count: 20,
    joinedAt: "10/29/2022",
  },
  {
    address: "claudiahd.eth",
    tags: ["Developer", "Contributor"],
    tier: "Platinum",
    count: 20,
    joinedAt: "10/29/2022",
  },
  {
    address: "claudiahd.eth",
    tags: ["Developer", "Contributor"],
    tier: "Platinum",
    count: 20,
    joinedAt: "10/29/2022",
  },
];

function Community() {
  return (
    <VStack className={styles.container}>
      <VStack w="100%" alignItems="flex-start" pb="2rem">
        <Text className={styles.title}>Community management</Text>
      </VStack>
      <HStack alignItems="flex-start" gap="1rem">
        <VStack>
          <Button className={styles.secondaryBtn}>
            <HStack>
              <Image src="/airplane.svg"></Image>
              <Text>Airdrop Rewards</Text>
            </HStack>
          </Button>
          <VStack w="100%" alignItems="flex-start" p="1rem">
            <HStack w="100%" justifyContent="space-between" p=".5rem 0rem">
              <Text className={styles.text}>Select all</Text>
              <Switch colorScheme="pink" onChange={() => {}} size="lg"></Switch>
            </HStack>
            <Text className={styles.subtext}>0 users selected</Text>
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
                    className={`${styles.accordionCell} ${styles.selected}`}
                  >
                    <Text>Appreciator</Text>
                    <Text>15,423</Text>
                  </HStack>
                  <HStack className={styles.accordionCell}>
                    <Text>Contributor</Text>
                    <Text>3,566</Text>
                  </HStack>
                  <HStack className={styles.accordionCell}>
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
                  <HStack className={styles.accordionCell}>
                    <Text>Bronze</Text>
                    <Text>15,423</Text>
                  </HStack>
                  <HStack className={styles.accordionCell}>
                    <Text>Silver</Text>
                    <Text>3,566</Text>
                  </HStack>
                  <HStack className={styles.accordionCell}>
                    <Text>Gold</Text>
                    <Text>480</Text>
                  </HStack>
                  <HStack className={styles.accordionCell}>
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
          <HStack className={styles.tableHeaderContainer}>
            <Text className={styles.tableHeader1}>Address</Text>
            <Text className={styles.tableHeader2}>Tag(s)</Text>
            <Text className={styles.tableHeader3}>Tier</Text>
            <Text className={styles.tableHeader4}>NFTs</Text>
            <Text className={styles.tableHeader5}>Date joined</Text>
          </HStack>
          {users.map(({ address, tags, tier, count, joinedAt }, idx) => (
            <HStack key={idx} className={styles.tableRowContainer}>
              <Text className={styles.tableHeader1}>{address}</Text>
              <Text className={styles.tableHeader2}>
                {tags.length > 1 ? tags.join(", ") : tags[0]}
              </Text>
              <Text className={styles.tableHeader3}>{tier}</Text>
              <Text className={styles.tableHeader4}>{count}</Text>
              <Text className={styles.tableHeader5}>{joinedAt}</Text>
            </HStack>
          ))}
        </VStack>
      </HStack>
    </VStack>
  );
}

export default withTransition(Community);
