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
} from "@chakra-ui/react";
import styles from "@styles/Navbar.module.css";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";

type SidebarProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
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
              <Text className={styles.sectionText}>0xdF...428D</Text>
              <Image src="copy.svg"></Image>
            </HStack>
          </VStack>
          <HStack className={styles.section}>
            <VStack w="100%" alignItems="flex-start" gap="1rem">
              <Text className={styles.sectionLabel}>Membership card</Text>
              <Text className={styles.sectionText2}>
                The soulbound NFT that dynamically updates based on user tiers.
              </Text>
              <Button className={styles.secondaryBtn}>View card details</Button>
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
