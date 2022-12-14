import { VStack, Text, HStack, Box, Image, Button } from "@chakra-ui/react";
import styles from "@styles/Home.module.css";
import Link from "next/link";
import withTransition from "@components/withTransition";
import { useState } from "react";
import { useAccount } from "wagmi";
import Landing from "@components/Landing";
import Onboarding from "@components/Onboarding";

const campaigns = [
  {
    title: "ETHLisbon Happy Hour",
    image: "/1.png",
    createdAt: "Today",
    tokenSupply: 250,
    claimed: 150,
    tag: "Supporter",
  },
  {
    title: "Developing on Testnet",
    image: "/testnet.png",
    createdAt: "Sunday, 10/30",
    tokenSupply: 777,
    claimed: 172,
    tag: "Developer",
  },
];

const pastCampaigns = [
  {
    title: "DAO Follower on Twitter",
    image: "/twitter.png",
    createdAt: "Wednesday, 10/28",
    tokenSupply: 250,
    claimed: 150,
    tag: "Supporter",
  },
  {
    title: "Devcon Tech Talk",
    image: "/devcon.png",
    createdAt: "Friday, 10/7",
    tokenSupply: 777,
    claimed: 573,
    tag: "Contributor",
  },
  {
    title: "Merged PR into DAO Repo",
    image: "/pr.png",
    createdAt: "Tuesday, 9/23",
    tokenSupply: 500,
    claimed: 182,
    tag: "Developer",
  },
  {
    title: "Boo! IRL BuilderDAO Meetup",
    image: "/boo.png",
    createdAt: "Monday, 9/13",
    tokenSupply: 500,
    claimed: 371,
    tag: "Contributor",
  },
];

function Home() {
  const { address } = useAccount();
  const [isOnboarding, setIsOnboarding] = useState<boolean>(true);
  const [isNull, setIsNull] = useState<boolean>(null);

  if (!address) return <Landing />;

  if (isOnboarding) return <Onboarding setIsOnboarding={setIsOnboarding} />;

  if (isNull)
    return (
      <div className={styles.container}>
        <main className={styles.main}>
          <VStack>
            <Image alt="null" src="/null.png"></Image>
            <VStack gap="1rem">
              <Text className={styles.title}>Start your first campaign</Text>
              <Text className={styles.nullSubtitle}>
                You don???t have any active campaigns. Start a new campaign to
                drop a proof of engagement NFT.
              </Text>
              <Link href="/create">
                <Button className={styles.primaryBtn}>
                  Start new campaign
                </Button>
              </Link>
            </VStack>
          </VStack>
        </main>
      </div>
    );

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <HStack className={styles.topContainer}>
          <VStack className={styles.titleContainer}>
            <Text className={styles.title}>GM Builder DAO! ????</Text>
            <HStack>
              <Box className={styles.green}></Box>
              <Text className={styles.subtitle}>
                Dashboard last updated 10/30/22
              </Text>
            </HStack>
          </VStack>
          <Link href="/create">
            <Button className={styles.primaryBtn}>+ New Campaigns</Button>
          </Link>
        </HStack>
        <HStack className={styles.audienceContainer}>
          <VStack className={styles.audienceSubcontainer}>
            <Text className={styles.sectionTitle}>Audience Growth</Text>
            <Image
              src="/chart.png"
              className={styles.chart}
              alt="chart"
            ></Image>
          </VStack>
          <VStack className={styles.audienceSubcontainer}>
            <Text className={styles.sectionTitle}>Audience Snapshot</Text>
            <HStack className={styles.snapshotContainer}>
              <VStack className={styles.snapshotStatsContainer}>
                <Text className={styles.snapshotTitle}>15,006</Text>
                <Text className={styles.snapshotSubtitle}>Total members</Text>
                <Box className={styles.divider} />
                <Text className={styles.snapshotTitle}>8,554</Text>
                <Text className={styles.snapshotSubtitle}>
                  Proof of engagement NFTs issued
                </Text>
                <Box className={styles.divider} />
                <Text className={styles.snapshotTitle}>112,383</Text>
                <Text className={styles.snapshotSubtitle}>
                  Proof of engagement NFTs claimed
                </Text>
              </VStack>
              <VStack className={styles.snapshotTiersContainer}>
                <HStack w="100%" justifyContent="space-between">
                  <HStack>
                    <Image src="/platinum.png" alt="platinum"></Image>
                    <Text className={styles.tier}>Platinum</Text>
                  </HStack>
                  <Text className={styles.tierCount}>11</Text>
                </HStack>
                <HStack w="100%" justifyContent="space-between">
                  <HStack>
                    <Image src="/gold.png" alt="gold"></Image>
                    <Text className={styles.tier}>Gold</Text>
                  </HStack>
                  <Text className={styles.tierCount}>1095</Text>
                </HStack>
                <HStack w="100%" justifyContent="space-between">
                  <HStack>
                    <Image src="/silver.png" alt="silver"></Image>
                    <Text className={styles.tier}>Silver</Text>
                  </HStack>
                  <Text className={styles.tierCount}>5100</Text>
                </HStack>
                <HStack w="100%" justifyContent="space-between">
                  <HStack>
                    <Image src="/bronze.png" alt="bronze"></Image>
                    <Text className={styles.tier}>Bronze</Text>
                  </HStack>
                  <Text className={styles.tierCount}>8700</Text>
                </HStack>
              </VStack>
            </HStack>
          </VStack>
        </HStack>
        <VStack className={styles.campaignListContainer}>
          <Text className={styles.sectionTitle}>Active campaigns</Text>
          <HStack className={styles.campaignCarousel}>
            {campaigns.map(
              ({ image, title, createdAt, claimed, tokenSupply, tag }, idx) => (
                <VStack key={idx} className={styles.campaignContainer}>
                  <VStack className={styles.campaignImageContainer}>
                    <Image
                      alt="campaign image"
                      src={image}
                      className={styles.campaignImage}
                    ></Image>
                    <VStack className={styles.pill}>
                      <Text className={styles.pillText}>{createdAt}</Text>
                    </VStack>
                  </VStack>
                  <Text className={styles.campaignTitle}>{title}</Text>
                  <Text className={styles.campaignSubtitle}>
                    {claimed}{" "}
                    <Text as="span" color="#A8A8A8">
                      {" "}
                      /{tokenSupply} claimed
                    </Text>
                  </Text>
                  <HStack>
                    <Image alt="user" src="/user.svg"></Image>
                    <Text className={styles.campaignSubtitle}>{tag}</Text>
                  </HStack>
                </VStack>
              )
            )}
          </HStack>
        </VStack>
        <VStack className={styles.campaignListContainer}>
          <Text className={styles.sectionTitle}>Past campaigns</Text>
          <HStack className={styles.campaignCarousel}>
            {pastCampaigns.map(
              ({ image, title, createdAt, claimed, tokenSupply, tag }, idx) => (
                <VStack key={idx} className={styles.campaignContainer}>
                  <VStack className={styles.campaignImageContainer}>
                    <Image
                      alt="campaign image"
                      src={image}
                      className={styles.campaignImage}
                    ></Image>
                    <VStack className={styles.pill}>
                      <Text className={styles.pillText}>{createdAt}</Text>
                    </VStack>
                  </VStack>
                  <Text className={styles.campaignTitle}>{title}</Text>
                  <Text className={styles.campaignSubtitle}>
                    {claimed}{" "}
                    <Text as="span" color="#A8A8A8">
                      {" "}
                      /{tokenSupply} claimed
                    </Text>
                  </Text>
                  <HStack>
                    <Image alt="user" src="/user.svg"></Image>
                    <Text className={styles.campaignSubtitle}>{tag}</Text>
                  </HStack>
                </VStack>
              )
            )}
          </HStack>
        </VStack>
      </main>
    </div>
  );
}

export default withTransition(Home);
