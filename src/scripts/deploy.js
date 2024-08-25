const hre = require("hardhat");

async function main() {
  const IdentityVerifier = await hre.ethers.getContractFactory("IdentityVerifier");
  const identityVerifier = await IdentityVerifier.deploy();
  await identityVerifier.deployed();

  console.log("IdentityVerifier deployed to:", identityVerifier.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
