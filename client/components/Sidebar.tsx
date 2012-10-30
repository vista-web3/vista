import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  IconButton,
  HStack,
  Text,
  VStack,
  Image,
  Link as ChakraLink,
} from "@chakra-ui/react";
import Link from "next/link";
import styles from "@styles/Navbar.module.css";
import { useAccount } from "wagmi";

type SidebarProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function abridgeAddress(address?: string) {
  if (!address) return address;
  const l = address.length;
  if (l < 20) return address;
  return `${address.substring(0, 6)}...${address.substring(l - 4, l)}`;
}

export const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const { address } = useAccount();

  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="md">
      <DrawerOverlay />
      <DrawerContent bgColor="#2E2E2E" paddingTop="3rem">
        <DrawerCloseButton color="white" />

        <DrawerBody className={styles.drawerBody}>
          <Text className={styles.title}>Profile</Text>
          <VStack className={styles.section}>
            <Text className={styles.sectionLabel}>Community name</Text>
            <Text className={styles.sectionText}>BuilderDAO</Text>
          </VStack>
          <VStack className={styles.section}>
            <Text className={styles.sectionLabel}>Wallet address</Text>
            <HStack w="100%" justifyContent="space-between">
              <Text className={styles.sectionText}>
                {abridgeAddress(address)}
              </Text>
              <Image src="copy.svg"></Image>
            </HStack>
          </VStack>
          <HStack className={styles.section}>
            <VStack w="100%" alignItems="flex-start" gap="1rem">
              <Text className={styles.sectionLabel}>Membership card</Text>
              <Text className={styles.sectionText2}>
                The soulbound NFT that dynamically updates based on user tiers.
              </Text>
              <Link href="/myNFT">
                <Button className={styles.secondaryBtn}>
                  View card details
                </Button>
              </Link>
            </VStack>
            <Image src="/bronze-sbt.png" className={styles.sbtSidebar}></Image>
          </HStack>
        </DrawerBody>

        <DrawerFooter className={styles.drawerFooter}>
          <HStack>
            <div className={styles.drawerFooterLabel}>
              Made With ❤️ for ETHLisbon 2022
            </div>
          </HStack>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
