const hre = require("hardhat");
const EXPLORER_API_KEY = process.env.EXPLORER_API_KEY || "0x0000000000000000000000000000000000000000";
const BUSD_ADDRESS = process.env.BUSD_ADDRESS || "0x0000000000000000000000000000000000000000";
// const hre = require("hardhat");

async function main() {

  console.log("\nNEONEARTH ERC721 DEPLOYMENT\n");
  const [deployer] = await ethers.getSigners();
  console.log("Network:", network.name);
  console.log("Network Id:", await web3.eth.net.getId());
  console.log(`Deploying with the account: ${deployer.address} (owner)`);
  const balance = await deployer.getBalance();
  console.log(`Account balance: ${ethers.utils.formatEther(balance.toString())}`);
  console.log("\nProcessing deployment...");

  const MINTER_ROLE = ethers.utils.keccak256(ethers.utils.toUtf8Bytes("MINTER_ROLE"))

  // deploy ERC721
  const NeonEarthERC721 = await ethers.getContractFactory('ERC721NeonEarth');
  const neonEarthERC721 = await NeonEarthERC721.deploy();
  await neonEarthERC721.deployed();

  // deploy NeonBox
  const NeonBox = await ethers.getContractFactory('NeonBox');
  const neonBox = await NeonBox.deploy(BUSD_ADDRESS, neonEarthERC721.address);
  await neonBox.deployed();

  await neonEarthERC721.grantRole(MINTER_ROLE, neonBox.address);

  console.log("Deployed!");
  console.log("NeonBox:", neonBox.address);
  console.log(`NeonEarth ERC721 address: ${neonEarthERC721.address}\n`);


  if (EXPLORER_API_KEY != "0x0000000000000000000000000000000000000000") {
    console.log("Verification: waiting for 5 confirmations...");
    await neonEarthERC721.deployTransaction.wait(7)

    await hre.run("verify:verify", {
      address: neonEarthERC721.address,
      contract: "contracts/ERC721NeonEarth.sol:ERC721NeonEarth",
      constructorArguments: [
      ],
    })

    await hre.run("verify:verify", {
      address: neonBox.address,
      contract: "contracts/NeonBox.sol:NeonBox",
      constructorArguments: [
        BUSD_ADDRESS,
        neonEarthERC721.address
      ],
    })
  }
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
