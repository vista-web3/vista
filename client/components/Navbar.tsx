import Link from "next/link";
import styles from "@styles/Navbar.module.css";
import { Button, HStack, Image, Text, useDisclosure } from "@chakra-ui/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";

import { HamburgerIcon } from "@chakra-ui/icons";
import { Sidebar } from "@components/Sidebar";

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <HStack className={styles.navbar}>
      <Link href="/">
        <Image
          src="/logo.svg"
          alt="Logo"
          cursor="pointer"
          className={styles.logo}
        ></Image>
      </Link>
      <HStack className={styles.navLeftSection}>
        <Link href="/">
          <Text fontWeight={700}>Dashboard</Text>
        </Link>
        <Link href="/community">
          <Text fontWeight={700}>Community Management</Text>
        </Link>
        <ConnectButton />
        <HamburgerIcon
          onClick={onOpen}
          className={styles.hamburgerButton}
          w={7}
          h={7}
        />
      </HStack>
      <Sidebar isOpen={isOpen} onClose={onClose} />
    </HStack>
  );
};

export default Navbar;
