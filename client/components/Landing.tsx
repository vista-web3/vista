import { VStack, Text, HStack, Box, Image } from "@chakra-ui/react";
import styles from "@styles/Landing.module.css";
import withTransition from "@components/withTransition";

function Landing() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <VStack>
          <Text className={styles.title}>
            DAO community management, simplified
          </Text>
          <Text className={styles.subtitle}>
            Powered by NFTs, you can engage, monitor, and reward your community
            members, all on Vista.
          </Text>
          <Image
            src="/ipad.png"
            className={styles.ipadHero}
            alt="ipad hero"
          ></Image>
          <VStack gap="3rem" pt="8rem">
            <HStack className={styles.section}>
              <Image
                src="/filter.png"
                alt="ipad hero"
                className={styles.heroFilter}
              ></Image>
              <VStack alignItems="flex-start" gap="1rem">
                <Text className={styles.sectionTitle}>
                  Unlock powerful insights to fuel growth
                </Text>
                <Text className={styles.sectionSubtitle}>
                  Filter by attributes like status level, number of proof of
                  engagements, date joined, and participant type
                </Text>
              </VStack>
            </HStack>
            <HStack className={styles.section}>
              <Image
                src="/heroSbt.png"
                alt="ipad hero"
                className={styles.heroSbt}
              ></Image>
              <VStack alignItems="flex-start" gap="1rem">
                <Text className={styles.sectionTitle}>
                  Dynamic membership NFTs to engage your audience
                </Text>
                <Text className={styles.sectionSubtitle}>
                  Incentivize engagement with loyalty tiers that unlock
                  exclusive rewards
                </Text>
              </VStack>
            </HStack>
            <HStack className={styles.section}>
              <VStack className={styles.heroContainer}>
                <Image
                  src="/cronos_coin.png"
                  alt="ipad hero"
                  className={styles.heroCronos}
                ></Image>
                <Image
                  src="/heroAmount.png"
                  alt="ipad hero"
                  className={styles.heroAmount}
                ></Image>
              </VStack>
              <VStack alignItems="flex-start" gap="1rem">
                <Text className={styles.sectionTitle}>
                  Targeted airdrops in seconds
                </Text>
                <Text className={styles.sectionSubtitle}>
                  Select the audience based on tags and level of engagement, and
                  input how much and what token you want to airdrop.
                </Text>
              </VStack>
            </HStack>
          </VStack>
        </VStack>
        <VStack>
          <Box className={styles.divider}></Box>
          <VStack w="100%" alignItems="flex-start">
            <Image src="/footer_logo.svg" className={styles.footerLogo} />
            <Text className={styles.footerText}>
              Built with love for ETH Lisbon 🇵🇹
            </Text>
          </VStack>
        </VStack>
        <Image alt="hero" className={styles.ellipse} src="/hero.png" />
      </main>
    </div>
  );
}

export default withTransition(Landing);
