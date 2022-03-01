const hre = require("hardhat");
const NEARTH20_ADDRESS = process.env.NEARTH_ADDRESS  || "0x0000000000000000000000000000000000000000";

async function main() {
  console.log("\nNEONEARTH MINING CONTRACT DEPLOYMENT\n");
  const [deployer] = await ethers.getSigners();
  console.log("Network:", network.name);
  console.log("Network Id:", await web3.eth.net.getId());
  console.log(`Deploying with the account: ${deployer.address} (owner)`);
  const balance = await deployer.getBalance();
  console.log(`Account balance: ${ethers.utils.formatEther(balance.toString())}`);
  console.log("\nProcessing deployment...");

  const _rewardToken = NEARTH20_ADDRESS;
  const Mining = await ethers.getContractFactory('Mining');
  const mining = await Mining.deploy(_rewardToken);
  await mining.deployed();
  console.log("Deployed!");
  console.log(`NeonEarth Mining contract address: ${mining.address}\n`);


  // if (EXPLORER_API_KEY != "0x0000000000000000000000000000000000000000") {
  //   console.log("Verification: waiting for 5 confirmations...");
  //   await neonEarthERC20.deployTransaction.wait(5)

  //   await hre.run("verify:verify", {
  //     address: neonEarthERC20.address,
  //     constructorArguments: [
  //     ],
  //   })


  //   // await hre.run("verify:verify", {
  //   //   address: testToken.address,
  //   //   contract: "contracts/test/TestTokenERC20.sol:TestToken",
  //   //   constructorArguments: [
  //   //   ],
  //   // })
  // }
}

main()
    .then(() => process.exit(0))
    .catch(error => {
      console.error(error);
      process.exit(1);
    });