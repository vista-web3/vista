import Link from "next/link";
import styles from "@styles/Navbar.module.css";
import { Button, HStack, Image, Text } from "@chakra-ui/react";

const Navbar = () => {
  return (
    <HStack className={styles.navbar}>
      <Link href="/">
        <Image
          src="/logo.png"
          alt="Logo"
          cursor="pointer"
          className={styles.logo}
        ></Image>
      </Link>
      <HStack className={styles.navLeftSection}>
        {/* <ConnectButton /> */}
      </HStack>
    </HStack>
  );
};

export default Navbar;
