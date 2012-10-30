const hre = require("hardhat");
const fs = require("fs");

async function main() {
  const Membership = await hre.ethers.getContractFactory("Membership");

  const deployedContract = await Membership.deploy(
    "Sample Membership NFT",
    "SMNFT"
  );

  await deployedContract.deployed();

  console.log("Membership NFT deployed to:", deployedContract.address);

  return deployedContract;
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
