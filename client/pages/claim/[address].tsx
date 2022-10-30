import {
  HStack,
  VStack,
  Image,
  Text,
  Button,
  Input,
  Link as ChakraLink,
  Box,
  Spinner,
} from "@chakra-ui/react";
import withTransition from "@components/withTransition";
import { useState } from "react";
import styles from "@styles/Create.module.css";
import { useAccount, usePrepareContractWrite, useContractWrite } from "wagmi";
import { useRouter } from "next/router";
import { ethers } from "ethers";
import POE from "@data/POE.json";

function Claim() {
  const router = useRouter();
  const { address } = router.query;
  const [isSBT, setSBT] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // const { config } = usePrepareContractWrite({
  //   addressOrName: address ?? "0x8Dec478C52c63552708559340B6Cc4456a454d49",
  //   contractInterface: POE.abi,
  //   functionName: "mint",
  //   args: [...],
  //   overrides: {
  //     value: ethers.utils.parseEther(".51"),
  //   },
  // });

  // const {
  //   data: txnData,
  //   isLoading,
  //   isSuccess,
  //   write: mintNFT,
  // } = useContractWrite(config);
  const txnHash = "";

  const isSuccess = false;

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
              <Box h="10px" />
              <Text className={styles.title}>Claim successful!</Text>
              <Text className={styles.successClaimHeader}>
                Your BuilderDAO membership NFT has been airdropped to your
                wallet.
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
                  <Button className={styles.primaryBtn}>
                    View transaction
                  </Button>
                </ChakraLink>
                <ChakraLink href="https://opensea.io" isExternal>
                  <Button className={styles.secondaryBtn}>View NFT</Button>
                </ChakraLink>
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
              <ChakraLink href="https://etherscan.io" isExternal>
                <Button className={styles.primaryBtn}>View transaction</Button>
              </ChakraLink>
              <ChakraLink href="https://opensea.io" isExternal>
                <Button className={styles.secondaryBtn}>View NFT</Button>
              </ChakraLink>
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
            <Box h="10px"></Box>
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
              <Button className={styles.primaryBtn} onClick={() => {}}>
                {isLoading ? <Spinner color="black" /> : "Claim NFT"}
              </Button>
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
