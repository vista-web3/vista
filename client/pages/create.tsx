import {
  ArrowBackIcon,
  ChevronDownIcon,
  CloseIcon,
  CopyIcon,
} from "@chakra-ui/icons";
import {
  VStack,
  Text,
  HStack,
  Image,
  Input,
  Textarea,
  Highlight,
  Checkbox,
  Divider,
  Button,
  SimpleGrid,
  Spinner,
  useToast,
  Box,
  Link as ChakraLink,
} from "@chakra-ui/react";
import withTransition from "@components/withTransition";
import styles from "@styles/Create.module.css";
import { useState } from "react";
import { FaPencilAlt } from "react-icons/fa";
import { useSigner } from "wagmi";
import { ethers } from "ethers";
import POE from "@data/POE.json";

const inviteLink = "hi";

function Create() {
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const { data: signer, isError } = useSigner();
  const [isLoading, setLoading] = useState<boolean>(false);
  const [file, setFile] = useState<Blob>();
  const [selectedCategories, setSelectedCategories] = useState<any>({});
  const [isCategoriesVisible, setCategoriesVisible] = useState<boolean>();
  const [isCountriesVisible, setCountriesVisible] = useState<boolean>();
  const [selectedTag, setSelectedTag] = useState<string>("");
  const [isSuccess, setIsSuccess] = useState<boolean>(true);
  const [isSBT, setSBT] = useState<boolean>(true);
  const [campaignName, setCampaignName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [publishedContract, setPublishedContract] = useState<string>("");
  const toast = useToast();

  function handleFileUpload(e) {
    setFile(e.target.files[0]);
  }

  function handleTagChange(tag) {
    setSelectedTag(tag);
    setCountriesVisible(false);
  }

  function handleNameChange(e) {
    setCampaignName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  function triggerToast() {
    toast({
      title: "Transaction Submitted",
      description: "We're unable to verify your completion.",
      status: "success",
      duration: 5000,
      isClosable: true,
      render: () => {
        return (
          <ChakraLink href="https://google.com" isExternal>
            <VStack color="white" p={3} bg="green.500">
              <Text>Transaction Submitted</Text>
            </VStack>
          </ChakraLink>
        );
      },
    });
  }

  async function deployContract() {
    if (!signer) return;
    setLoading(true);

    try {
      //   const [collectionURI, imageURI] = await uploadMetadata();

      const contractFactory = new ethers.ContractFactory(
        POE.abi,
        POE.bytecode,
        signer
      );

      const contract = await contractFactory.deploy(
        `${campaignName} NFT`,
        "HELLO",
        selectedTag
      );

      console.log("contract deployed at", contract.address);
      setPublishedContract(contract.address);
      //   saveContract(contract.address, imageURI);
      setIsSuccess(true);
      toast({
        title: "Verification failed.",
        description: "We're unable to verify your completion.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
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
          <VStack w="100%" gap="1rem">
            <Image alt="builder dao" src="/dao.png" pb="1rem"></Image>
            <Text className={styles.title}>Woo, your NFT is live!</Text>
            <Text className={styles.successHeader}>
              Your proof of engagement NFT is available for members to claim.
              Copy the link to share the NFT with your community.
            </Text>
            <HStack>
              <HStack className={styles.inputBox} onClick={triggerToast}>
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
      <HStack className={styles.contentContainer}>
        <VStack className={styles.leftSection}>
          <Text className={styles.title}>Create Proof of Engagement</Text>
          <VStack className={styles.inputContainer}>
            <Text className={styles.inputHeader}>Name</Text>
            <Input
              onChange={handleNameChange}
              placeholder="Campaign name"
              className={styles.input}
            ></Input>
          </VStack>
          <VStack className={styles.inputContainer}>
            <Text className={styles.inputHeader}>Description</Text>
            <Textarea
              onChange={handleDescriptionChange}
              placeholder="Jot down more details"
              className={styles.textarea}
            ></Textarea>
          </VStack>
          <VStack className={styles.inputContainer}>
            <Text className={styles.inputHeader}>Tags</Text>
            <HStack
              className={styles.selectBox}
              onClick={() => setCountriesVisible(!isCountriesVisible)}
            >
              {selectedTag ? (
                <Text fontWeight={500}>{selectedTag}</Text>
              ) : (
                <Text color="gray.500">Select tag</Text>
              )}
              <ChevronDownIcon className={styles.chevronIcon} />
            </HStack>
            {isCountriesVisible && (
              <VStack className={styles.selectionContainer}>
                {["Developers", "Supporters", "Contributors"].map(
                  (tag, idx) => (
                    <VStack key={idx} onClick={() => handleTagChange(tag)}>
                      <HStack className={styles.tagsBox}>
                        <Text className={styles.checkboxTitle}>{tag}</Text>
                      </HStack>
                      {idx !== 2 && <Divider></Divider>}
                    </VStack>
                  )
                )}
              </VStack>
            )}
          </VStack>
        </VStack>
        <VStack className={styles.rightSection}>
          <Button className={styles.primaryBtn} onClick={deployContract}>
            {isLoading ? <Spinner color="black" /> : "Confirm"}
          </Button>
          {!file ? (
            <VStack className={styles.inputContainer}>
              <VStack className={styles.fileUploadContainer}>
                <input
                  type="file"
                  name="images"
                  id="images"
                  required
                  multiple
                  onChange={handleFileUpload}
                  className={styles.fileUploader}
                />
                <VStack className={styles.fileUploaderTextContainer}>
                  <Image
                    alt="upload"
                    src="/upload.png"
                    className={styles.fileUploaderIcon}
                  ></Image>
                  <Text className={styles.fileUploaderText}>Upload Image</Text>
                  <Text className={styles.fileUploaderSubtext}>
                    Supported formats: jpg, png, svg, gif
                  </Text>
                </VStack>
              </VStack>
            </VStack>
          ) : (
            <VStack className={styles.previewImageContainer}>
              <Image
                alt="uploaded file"
                src={URL.createObjectURL(file) ?? ""}
                className={styles.previewImage}
              />
              <HStack className={styles.editPillContainer}>
                <HStack className={styles.editPillContentContainer}>
                  <HStack className={styles.editNFT} cursor="pointer">
                    <FaPencilAlt />
                    <Text fontSize="16px">Edit NFT</Text>
                  </HStack>
                  <input
                    type="file"
                    name="images"
                    id="images"
                    required
                    multiple
                    onChange={handleFileUpload}
                    className={styles.editPill}
                  />
                </HStack>
              </HStack>
            </VStack>
          )}
        </VStack>
      </HStack>
    </VStack>
  );
}
export default withTransition(Create);
