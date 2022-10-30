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
import {
  useAccount,
  useSigner,
  usePrepareContractWrite,
  useContractWrite,
} from "wagmi";
import { ethers } from "ethers";
import POE from "@data/POE.json";
import Landing from "@components/Landing";
import { Web3Storage } from "web3.storage";

const inviteLink = "http://localhost:3000/claim/1";

function Create() {
  const { address } = useAccount();
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
  const [imageCID, setImageCID] = useState<string>("");
  const [jsonCID, setJsonCID] = useState<string>("");
  const [uploadedImage, setUploadedImage] = useState<Blob>();
  const toast = useToast();
  const WEB3_STORAGE_TOKEN = process.env.NEXT_PUBLIC_WEB3_STORAGE_API_KEY;

  function handleImageUpload(e) {
    setUploadedImage(e.target.files[0]);
  }

  //   const client = new Web3Storage({
  //     token: WEB3_STORAGE_TOKEN,
  //     endpoint: new URL("https://api.web3.storage"),
  //   });

  //   const demoTokenURI =
  //     "https://bafybeicynj2l3xinctywttkivp44me4dkh7kqi77twtyxipmmgblkoib2a.ipfs.w3s.link/tokenURI.json";

  //   async function uploadImage() {
  //     if (!uploadedImage) return;

  //     const blob = new Blob([uploadedImage], { type: "image/png" });
  //     const imageToUpload = [new File([blob], "file.png")];
  //     const imageCID = await client.put(imageToUpload);
  //     const imageLink = `https://${imageCID}.ipfs.w3s.link/file.png`;
  //     setImageCID(imageLink);

  //     return imageLink;
  //   }

  //   async function uploadJSON() {
  //     const imageCID = await uploadImage();

  //     const jsonObject = {
  //       name: name,
  //       description: description,
  //       collection: "Nexus Protocol Collection 3",
  //       image_url:
  //         imageCID ??
  //         "https://bafybeie6rfxujzadhx5t3ofso6sckg33jknl5vhobmgby7uetpmbzaojvm.ipfs.w3s.link/preview.png",
  //     };
  //     const blob = new Blob([JSON.stringify(jsonObject)], {
  //       type: "application/json",
  //     });

  //     const files = [new File([blob], "metadata.json")];
  //     const jsonCID = await client.put(files);
  //     const jsonLink = `https://${jsonCID}.ipfs.w3s.link/metadata.json`;
  //     setJsonCID(jsonLink);

  //     return jsonLink;
  //   }

  //   const { config } = usePrepareContractWrite({
  //     addressOrName: "0xd2d99f4dF0a6e489EB70EE471E42Af4677f5E474",
  //     contractInterface: MyNFT.abi,
  //     functionName: "mint",
  //     args: [jsonCID],
  //   });

  //   const {
  //     data: txnData,
  //     isLoading,
  //     isSuccess,
  //     write: mintNFT,
  //   } = useContractWrite(config);

  //   async function handleListAsset() {
  //     const jsonUploaded = await uploadJSON();
  //     mintNFT(jsonUploaded);
  //   }

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

  function triggerToast(address) {
    toast({
      position: "bottom-right",
      title: "Transaction Submitted",
      description: "Click to view your transaction on Cronoscan.",
      status: "success",
      duration: 5000,
      isClosable: true,
      render: () => {
        return (
          <ChakraLink
            href={`https://testnet.cronoscan.com/address/${address}`}
            isExternal
          >
            <VStack color="white" p={3} bg="green.500" borderRadius="5px">
              <Text fontWeight={700}>Transaction Submitted</Text>
              <Text>Click to view your transaction on Cronoscan.</Text>
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

  if (!address) return <Landing />;

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
                <Text>tryvista.xyz/claim/0x9c06...</Text>
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
                  onChange={handleImageUpload}
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
