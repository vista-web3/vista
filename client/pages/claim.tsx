import { HStack, VStack, Image, Text, Button, Input } from "@chakra-ui/react";
import withTransition from "@components/withTransition";
import { useState } from "react";
import styles from "@styles/Create.module.css";

function Claim() {
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isSBT, setSBT] = useState<boolean>(false);

  if (isSuccess) {
    if (isSBT) {
      return (
        <VStack className={styles.container}>
          <HStack className={styles.contentContainer}>
            <VStack w="100%" gap="1.5rem">
              <Image
                alt="builder dao"
                src="/bronze-sbt.png"
                className={styles.sbtImage}
              ></Image>
              <Text className={styles.title}>Claim successful!</Text>
              <Text className={styles.successClaimHeader}>
                The ETH Lisbon membership NFT has been airdropped to your
                wallet.
              </Text>
              <HStack>
                <Button className={styles.primaryBtn}>View transaction</Button>
                <Button className={styles.secondaryBtn}>View NFT</Button>
              </HStack>
            </VStack>
          </HStack>
        </VStack>
      );
    }
    return (
      <VStack className={styles.container}>
        <HStack className={styles.contentContainer}>
          <VStack w="100%" gap="1.5rem">
            <Image alt="builder dao" src="/dao.png" pb="1rem"></Image>
            <Text className={styles.title}>Claim successful!</Text>
            <Text className={styles.successClaimHeader}>
              The ETH Lisbon proof of engagement NFT has been airdropped to your
              wallet.
            </Text>
            <HStack>
              <Button className={styles.primaryBtn}>View transaction</Button>
              <Button className={styles.secondaryBtn}>View NFT</Button>
            </HStack>
          </VStack>
        </HStack>
      </VStack>
    );
  }

  if (isSBT) {
    return (
      <VStack className={styles.container}>
        <HStack className={styles.contentContainer}>
          <VStack w="100%" gap="1rem">
            <Image
              alt="builder dao"
              src="/bronze-sbt.png"
              className={styles.sbtImage}
            ></Image>
            <Text className={styles.title}>Claim your membership NFT</Text>
            <Text className={styles.successHeader}>
              Welcome to BuilderDAO. Your token dynamically updates based on
              your involvement in the community. Please paste in your wallet
              address below to claim.
            </Text>
            <HStack>
              <Input
                onChange={() => {}}
                placeholder="Enter your wallet address"
                className={styles.claimInput}
              ></Input>
              <Button className={styles.primaryBtn}>Claim NFT</Button>
            </HStack>
          </VStack>
        </HStack>
      </VStack>
    );
  }

  return (
    <VStack className={styles.container}>
      <HStack className={styles.contentContainer}>
        <VStack w="100%" gap="1rem">
          <Image alt="builder dao" src="/dao.png" pb="1rem"></Image>
          <Text className={styles.title}>Congrats! You received a POE</Text>
          <Text className={styles.successHeader}>
            BuilderDAO has issued you a ETH Lisbon proof of engagement NFT.
            Please paste in your wallet address below to claim.
          </Text>
          <HStack>
            <Input
              onChange={() => {}}
              placeholder="Enter your wallet address"
              className={styles.claimInput}
            ></Input>
            <Button className={styles.primaryBtn}>Claim POE</Button>
          </HStack>
        </VStack>
      </HStack>
    </VStack>
  );
}

export default withTransition(Claim);
