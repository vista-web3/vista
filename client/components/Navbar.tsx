import Link from "next/link";
import styles from "@styles/Navbar.module.css";
import { Button, HStack, Image, Text } from "@chakra-ui/react";

const Navbar = () => {
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
        {/* <ConnectButton /> */}
        <Link href="/dashboard">
          <Text fontWeight={700}>Dashboard</Text>
        </Link>
        <Link href="/community">
          <Text fontWeight={700}>Community Management</Text>
        </Link>
        <Button className={styles.primaryBtn}>+ New Campaigns</Button>
      </HStack>
    </HStack>
  );
};

export default Navbar;
