const hre = require("hardhat");
const NEARTH_ADDRESS = process.env.NEARTH_ADDRESS || "0x0000000000000000000000000000000000000000";
const EXPLORER_API_KEY = process.env.EXPLORER_API_KEY || "0x0000000000000000000000000000000000000000";

async function main() {
  console.log("\nNEONEARTH ERC20 DEPLOYMENT\n");
  const [deployer] = await ethers.getSigners();
  console.log("Network:", network.name);
  console.log("Network Id:", await web3.eth.net.getId());
  console.log(`Deploying with the account: ${deployer.address} (owner)`);
  const balance = await deployer.getBalance();
  console.log(`Account balance: ${ethers.utils.formatEther(balance.toString())}`);
  console.log("\nProcessing deployment...");

  const NeonEarthERC20 = await ethers.getContractFactory('ERC20NeonEarth');
  const neonEarthERC20 = await NeonEarthERC20.attach(NEARTH_ADDRESS);

  if (EXPLORER_API_KEY != "0x0000000000000000000000000000000000000000") {
    await hre.run("verify:verify", {
      address: neonEarthERC20.address,
      constructorArguments: [
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
