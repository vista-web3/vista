import {
  HStack,
  VStack,
  Image,
  Text,
  Button,
  Link as ChakraLink,
} from "@chakra-ui/react";
import Landing from "@components/Landing";
import withTransition from "@components/withTransition";
import styles from "@styles/Create.module.css";
import { useAccount } from "wagmi";

function MyNFT() {
  const { address } = useAccount();

  if (!address) return <Landing />;

  return (
    <VStack className={styles.container}>
      <HStack className={styles.contentContainer}>
        <VStack w="100%" gap="1.5rem">
          <Text className={styles.title}>My Builder DAO NFT</Text>
          <Image
            alt="builder dao"
            src="/silver-2.png"
            className={styles.nftImage}
          ></Image>
          <Button className={styles.secondaryBtn}>Refresh Metadata</Button>
        </VStack>
      </HStack>
    </VStack>
  );
}

export default withTransition(MyNFT);
