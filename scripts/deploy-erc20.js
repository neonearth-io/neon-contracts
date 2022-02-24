const hre = require("hardhat");
const EXPLORER_API_KEY = process.env.EXPLORER_API_KEY || "0x0000000000000000000000000000000000000000";
const VAULT_ADDRESS = process.env.VAULT_ADDRESS || "0x0000000000000000000000000000000000000000";

async function main() {
  console.log("\nNEONEARTH ERC20 DEPLOYMENT\n");
  const [deployer] = await ethers.getSigners();
  console.log("Network:", network.name);
  console.log("Network Id:", await web3.eth.net.getId());
  console.log(`Deploying with the account: ${deployer.address} (owner)`);
  const balance = await deployer.getBalance();
  console.log(`Account balance: ${ethers.utils.formatEther(balance.toString())}`);
  console.log("\nProcessing deployment...");

  // TEST===============
  // const TestToken = await ethers.getContractFactory('TestToken');
  //  testToken = await TestToken.attach("0x1196AcaAa549EFDa7342402996Ebc27f3e61de59");
  //====================

  // const testToken = await TestToken.deploy();
  // await testToken.deployed();
  // console.log(`TestToken ERC20 address: ${testToken.address}\n`);

  const NeonEarthERC20 = await ethers.getContractFactory('ERC20NeonEarth');
  const neonEarthERC20 = await NeonEarthERC20.deploy();
  await neonEarthERC20.deployed();

  console.log("Deployed!");
  console.log(`NeonEarth ERC20 address: ${neonEarthERC20.address}\n`);


  if (EXPLORER_API_KEY != "0x0000000000000000000000000000000000000000") {
    console.log("Verification: waiting for 5 confirmations...");
    await neonEarthERC20.deployTransaction.wait(5)

    await hre.run("verify:verify", {
      address: neonEarthERC20.address,
      constructorArguments: [
      ],
    })

    // await hre.run("verify:verify", {
    //   address: testToken.address,
    //   contract: "contracts/test/TestTokenERC20.sol:TestToken",
    //   constructorArguments: [
    //   ],
    // })
  }
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
