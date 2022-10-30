import { ChevronDownIcon, CopyIcon } from "@chakra-ui/icons";
import {
  VStack,
  Text,
  HStack,
  Image,
  Input,
  Divider,
  Button,
  Textarea,
  Spinner,
} from "@chakra-ui/react";
import withTransition from "@components/withTransition";
import styles from "@styles/Create.module.css";
import { useState } from "react";
import { useSigner } from "wagmi";
import { ethers } from "ethers";
import MembershipSBT from "@data/MembershipSBT.json";

const inviteLink = "hi";

function Create() {
  const { data: signer, isError } = useSigner();
  const [isLoading, setLoading] = useState<boolean>(false);
  const [isCountriesVisible, setCountriesVisible] = useState<boolean>();
  const [selectedTag, setSelectedTag] = useState<string>("");
  const [isSuccess, setIsSuccess] = useState<boolean>(true);
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const [communityName, setCommunityName] = useState<string>("");
  const [tokenSymbol, setTokenSymbol] = useState<string>("");
  const [publishedContract, setPublishedContract] = useState<string>("");

  function handleNameChange(e) {
    setCommunityName(e.target.value);
  }

  function handleSymbolChange(e) {
    setTokenSymbol(e.target.value);
  }

  function handleTagChange(tag) {
    setSelectedTag(tag);
    setCountriesVisible(false);
  }

  async function deployContract() {
    if (!signer) return;
    setLoading(true);

    try {
      //   const [collectionURI, imageURI] = await uploadMetadata();

      const contractFactory = new ethers.ContractFactory(
        MembershipSBT.abi,
        MembershipSBT.bytecode,
        signer
      );

      const contract = await contractFactory.deploy(
        `${communityName} Community NFT`,
        tokenSymbol
      );

      console.log("contract deployed at", contract.address);
      setPublishedContract(contract.address);
      //   saveContract(contract.address, imageURI);
      setIsSuccess(true);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  }

  async function handleCopy() {
    navigator.clipboard.writeText(inviteLink);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
  }

  if (isSuccess) {
    return (
      <VStack className={styles.container}>
        <HStack className={styles.contentContainer}>
          <VStack w="100%" gap="2rem">
            <Image
              alt="builder dao"
              src="/bronze-sbt.png"
              mb="1rem"
              className={styles.sbtImage}
            ></Image>
            <Text className={styles.title}>Awesome, you’re all set!</Text>
            <Text className={styles.successHeader}>
              The token will dynamically update based on member engagement in
              the community via proof of engagement tokens. Copy the link below
              to share this NFT with your community.
            </Text>
            <HStack>
              <HStack className={styles.inputBox}>
                <Text>vista.xyz/78123qqr</Text>
              </HStack>
              {isCopied ? (
                <Button className={styles.primaryBtn} onClick={handleCopy}>
                  Link copied!
                </Button>
              ) : (
                <Button className={styles.primaryBtn} onClick={handleCopy}>
                  Copy invite link <CopyIcon color="white" />
                </Button>
              )}
            </HStack>
          </VStack>
        </HStack>
      </VStack>
    );
  }

  return (
    <VStack className={styles.container}>
      <VStack className={styles.contentContainer}>
        <HStack className={styles.contentContainer}>
          <Text className={styles.title}>Create your membership NFT</Text>
          <Button className={styles.primaryBtn} onClick={deployContract}>
            {isLoading ? <Spinner color="black" /> : "Confirm"}
          </Button>
        </HStack>
        <HStack className={styles.contentContainer}>
          <VStack className={styles.leftSection2}>
            <VStack className={styles.inputContainer}>
              <Text className={styles.inputHeader}>Community name</Text>
              <Input
                onChange={handleNameChange}
                placeholder="Community name"
                className={styles.input}
              ></Input>
            </VStack>
            <VStack className={styles.inputContainer}>
              <Text className={styles.inputHeader}>Token symbol</Text>
              <Input
                onChange={handleSymbolChange}
                placeholder="Token symbol (e.g. TKSB)"
                className={styles.input}
              ></Input>
            </VStack>
            <VStack className={styles.inputContainer}>
              <Text className={styles.inputHeader}>Description</Text>
              <Textarea
                onChange={() => {}}
                placeholder="Description of community"
                className={styles.textarea}
              ></Textarea>
            </VStack>
            <VStack className={styles.inputContainer}>
              <Text className={styles.inputHeader}>Network</Text>
              <Text className={styles.inputSubheader}>
                Select the network to deploy your membership NFTs and following
                POEs.
              </Text>
              <HStack
                className={styles.selectBox}
                onClick={() => setCountriesVisible(!isCountriesVisible)}
              >
                {selectedTag ? (
                  <Text fontWeight={500}>{selectedTag}</Text>
                ) : (
                  <Text color="gray.500">Select network</Text>
                )}
                <ChevronDownIcon className={styles.chevronIcon} />
              </HStack>
            </VStack>
            {isCountriesVisible && (
              <VStack className={styles.networkSelectionContainer}>
                {[
                  { name: "Ethereum", image: "/eth.png" },

                  { name: "Cronos", image: "/cronos.png" },
                  { name: "Gnosis Chain", image: "/gnosis.png" },
                ].map(({ name, image }, idx) => (
                  <VStack key={idx} onClick={() => handleTagChange(name)}>
                    <HStack className={styles.tagsBox}>
                      <Image src={image}></Image>
                      <Text className={styles.checkboxTitle}>{name}</Text>
                    </HStack>
                    {idx !== 2 && <Divider></Divider>}
                  </VStack>
                ))}
              </VStack>
            )}
          </VStack>
          <VStack className={styles.rightSection}>
            <VStack className={styles.inputContainer}>
              <Text className={styles.inputHeader} color="#A8A8A8">
                Membership card preview
              </Text>
              <VStack className={styles.previewSBTContainer}>
                <Text className={styles.previewName}>
                  {communityName.replaceAll(" ", "").toUpperCase()}
                </Text>
                <Image
                  src="/preview.png"
                  className={styles.previewSBTImage}
                ></Image>
              </VStack>
            </VStack>
          </VStack>
        </HStack>
      </VStack>
    </VStack>
  );
}
export default withTransition(Create);
